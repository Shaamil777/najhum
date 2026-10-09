import { PAIRS, STRATEGIES, START_BALANCE, ROUND_TICKS, TICK_MS, createGame, advance, equity, available, profit, openTrade, closeTrade } from './engine.mjs';

const $ = id => document.getElementById(id);
const money = value => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
const signed = value => `${value >= 0 ? '+' : '−'}${money(Math.abs(value))}`;
const price = value => value.toFixed(5);
let game = createGame(42), selectedPair = PAIRS[0].id, chartRange = 60, tableMode = 'open', sound = false, toastTimer, best = null;
let audioContext;
try { const saved = localStorage.getItem('pip-best-v1'); if (saved !== null && Number.isFinite(Number(saved))) best = Number(saved); } catch { /* Storage is optional. */ }
function setSigned(element, value, format = signed) { element.textContent = format(value); element.classList.toggle('positive', value >= 0); element.classList.toggle('negative', value < 0); }
function notify(message) { $('toast').textContent = message; $('toast').classList.add('visible'); clearTimeout(toastTimer); toastTimer = setTimeout(() => $('toast').classList.remove('visible'), 3500); }
function beep(direction = 1) {
  if (!sound) return;
  try { audioContext ??= new AudioContext(); void audioContext.resume(); const oscillator = audioContext.createOscillator(), gain = audioContext.createGain(); oscillator.connect(gain); gain.connect(audioContext.destination); oscillator.frequency.value = direction > 0 ? 660 : 440; gain.gain.setValueAtTime(.035, audioContext.currentTime); gain.gain.exponentialRampToValueAtTime(.001, audioContext.currentTime + .15); oscillator.start(); oscillator.stop(audioContext.currentTime + .16); } catch { /* Sound is optional. */ }
}
function renderMarkets() {
  $('market-list').innerHTML = PAIRS.map(pair => {
    const market = game.markets[pair.id], change = (market.price / market.opening - 1) * 100;
    return `<button class="market-row ${pair.id === selectedPair ? 'selected' : ''}" data-pair="${pair.id}" aria-pressed="${pair.id === selectedPair}"><span class="market-pair"><span>${pair.flag}</span><span><b>${pair.id}</b><small>${pair.name.split(' / ')[0]}</small></span></span><span class="market-price"><b>${price(market.price)}</b><small class="${change >= 0 ? 'positive' : 'negative'}">${change >= 0 ? '+' : ''}${change.toFixed(2)}%</small></span></button>`;
  }).join('');
}
function renderTables() {
  const positions = tableMode === 'open' ? game.player.positions : game.player.history;
  $('open-count').textContent = game.player.positions.length;
  $('history-count').textContent = game.player.history.length;
  $('exit-heading').textContent = tableMode === 'open' ? 'CURRENT' : 'EXIT';
  $('empty-positions').hidden = positions.length > 0;
  $('empty-positions').querySelector('h3').textContent = tableMode === 'open' ? 'Your next move starts here.' : 'Every trade tells a story.';
  $('empty-positions').querySelector('p').textContent = tableMode === 'open' ? 'Start the challenge and place your first trade.' : 'Close a position to see its result here.';
  $('positions-body').innerHTML = positions.map(p => {
    const pnl = tableMode === 'open' ? profit(p, game) - p.fee : p.pnl;
    return `<tr><td>${p.pair}<small class="${p.direction > 0 ? 'positive' : 'negative'}">${p.direction > 0 ? 'BUY' : 'SELL'}</small></td><td>${price(p.entry)}</td><td>${price(tableMode === 'open' ? game.markets[p.pair].price : p.exit)}</td><td>${money(p.stake)}</td><td class="${pnl >= 0 ? 'positive' : 'negative'}">${signed(pnl)}</td><td>${tableMode === 'open' ? `<button class="close-position" data-close-position="${p.id}" aria-label="Close ${p.pair} position" ${game.status !== 'running' ? 'disabled' : ''}>×</button>` : `<span title="${p.reason}">✓</span>`}</td></tr>`;
  }).join('');
  $('empty-journal').hidden = game.player.history.length > 0;
  $('journal-body').innerHTML = game.player.history.map(p => `<tr><td>${p.pair}</td><td>${p.direction > 0 ? 'BUY' : 'SELL'}</td><td>${price(p.entry)}</td><td>${price(p.exit)}</td><td class="${p.pnl >= 0 ? 'positive' : 'negative'}">${signed(p.pnl)}</td><td>${p.reason}</td></tr>`).join('');
}
function render() {
  const playerEquity = equity(game.player, game), botEquity = equity(game.bot, game), remaining = Math.max(0, (ROUND_TICKS - game.tick) * TICK_MS / 1000);
  $('equity').textContent = money(playerEquity);
  setSigned($('pnl'), playerEquity - START_BALANCE);
  setSigned($('return'), (playerEquity / START_BALANCE - 1) * 100, v => `${v >= 0 ? '+' : ''}${v.toFixed(2)}% this round`);
  $('margin').textContent = money(available(game.player, game));
  $('position-count').textContent = `${game.player.positions.length} of 5 positions open`;
  $('bot-equity').textContent = money(botEquity);
  const difference = playerEquity - botEquity;
  $('bot-comparison').textContent = Math.abs(difference) < .005 ? 'An even playing field' : `You’re ${difference > 0 ? 'ahead' : 'behind'} by ${money(Math.abs(difference))}`;
  $('time-left').textContent = `${Math.floor(remaining / 60).toString().padStart(2, '0')}:${Math.ceil(remaining % 60).toString().padStart(2, '0')}`;
  $('round-status').textContent = { ready: 'READY WHEN YOU ARE', running: 'CHALLENGE IN PROGRESS', paused: 'ROUND PAUSED', finished: 'ROUND COMPLETE' }[game.status];
  $('start-button').textContent = { ready: 'Start challenge →', running: 'Ⅱ Pause round', paused: '▶ Resume round', finished: 'View results →' }[game.status];
  $('buy-button').disabled = $('sell-button').disabled = game.status !== 'running';
  $('close-all').disabled = game.status !== 'running' || game.player.positions.length === 0;
  $('bot-strategy').disabled = game.status !== 'ready';
  $('strategy-detail').textContent = STRATEGIES[game.strategy].detail;
  $('bot-status').textContent = { ready: 'STANDBY', running: 'ACTIVE', paused: 'PAUSED', finished: 'FINISHED' }[game.status];
  $('bot-activity').textContent = game.bot.positions.length ? `${game.bot.positions.length} positions open · ${game.bot.history.length} closed` : game.status === 'ready' ? 'Waiting for the opening bell' : `Scanning signals · ${game.bot.history.length} trades closed`;
  $('market-state').textContent = { ready: 'Market ready', running: 'Market moving', paused: 'Market paused', finished: 'Session closed' }[game.status];
  const pair = PAIRS.find(p => p.id === selectedPair), market = game.markets[selectedPair];
  $('pair-flag').textContent = pair.flag; $('chart-pair').textContent = pair.id; $('pair-name').textContent = pair.name;
  $('current-price').textContent = price(market.price);
  setSigned($('pair-change'), (market.price / market.opening - 1) * 100, value => `${value >= 0 ? '+' : ''}${value.toFixed(2)}% this round`);
  $('event-title').textContent = game.event; $('event-detail').textContent = game.eventDetail;
  $('best-score').textContent = best === null ? '—' : signed(best);
  renderMarkets(); renderTables(); drawChart();
}
function drawChart() {
  const canvas = $('price-chart'), box = canvas.getBoundingClientRect();
  if (!box.width || !box.height) return;
  const scale = window.devicePixelRatio || 1;
  canvas.width = Math.round(box.width * scale); canvas.height = Math.round(box.height * scale);
  const ctx = canvas.getContext('2d'); ctx.scale(scale, scale);
  const w = box.width, h = box.height, left = 14, right = 62, top = 20, bottom = 24;
  const candles = game.markets[selectedPair].candles.slice(-chartRange);
  const visiblePositions = game.player.positions.filter(p => p.pair === selectedPair);
  const values = [...candles.flatMap(c => [c.low, c.high]), ...visiblePositions.map(p => p.entry)];
  const low = Math.min(...values), high = Math.max(...values), pad = Math.max((high - low) * .15, .0002), min = low - pad, max = high + pad;
  const y = value => top + (max - value) / (max - min) * (h - top - bottom);
  ctx.font = '9px ui-monospace, monospace'; ctx.lineWidth = .5;
  for (let i = 0; i <= 4; i++) {
    const value = min + (max - min) * i / 4, yy = y(value);
    ctx.strokeStyle = '#333e2a'; ctx.setLineDash([3, 4]); ctx.beginPath(); ctx.moveTo(left, yy); ctx.lineTo(w - right + 2, yy); ctx.stroke();
    ctx.fillStyle = '#718063'; ctx.fillText(price(value), w - right + 9, yy + 3);
  }
  const step = (w - left - right) / candles.length;
  candles.forEach((c, i) => {
    const x = left + i * step + step / 2;
    ctx.strokeStyle = ctx.fillStyle = c.close >= c.open ? '#9dc58b' : '#ce8582'; ctx.setLineDash([]); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x, y(c.high)); ctx.lineTo(x, y(c.low)); ctx.stroke();
    ctx.fillRect(x - Math.max(1.2, step * .56) / 2, Math.min(y(c.open), y(c.close)), Math.max(1.2, step * .56), Math.max(1.3, Math.abs(y(c.open) - y(c.close))));
    if (i % Math.max(1, Math.floor(candles.length / 5)) === 0) { ctx.fillStyle = '#687b5c'; ctx.fillText(`t${c.tick < 0 ? '−' : '+'}${Math.abs(c.tick)}`, x, h - 7); }
  });
  for (const p of visiblePositions) {
    ctx.strokeStyle = '#c6f68777'; ctx.setLineDash([5, 5]); ctx.beginPath(); ctx.moveTo(left, y(p.entry)); ctx.lineTo(w - right, y(p.entry)); ctx.stroke();
    ctx.fillStyle = '#c6f687'; ctx.fillText(`${p.direction > 0 ? 'BUY' : 'SELL'} ${price(p.entry)}`, left + 4, y(p.entry) - 5);
  }
  const current = game.markets[selectedPair].price, yy = y(current);
  ctx.strokeStyle = '#bfe28b'; ctx.lineWidth = .8; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(left, yy); ctx.lineTo(w - right + 3, yy); ctx.stroke();
  ctx.fillStyle = '#c6f687'; ctx.fillRect(w - right + 3, yy - 9, right - 6, 18); ctx.fillStyle = '#243318'; ctx.font = 'bold 9px ui-monospace, monospace'; ctx.fillText(price(current), w - right + 8, yy + 3);
  canvas.setAttribute('aria-label', `${selectedPair} simulated candlestick chart, latest price ${price(current)}, ${candles.length} ticks displayed.`);
}
function showResult() {
  const playerValue = equity(game.player, game), botValue = equity(game.bot, game), result = playerValue - botValue;
  $('result-title').textContent = Math.abs(result) < .005 ? 'An even finish.' : result > 0 ? 'You beat the bot.' : 'The bot takes this round.';
  $('result-description').textContent = `${Math.abs(result) < .005 ? 'Both accounts finished level.' : `You finished ${money(Math.abs(result))} ${result > 0 ? 'ahead of' : 'behind'} Pip Bot.`} Every round is a chance to learn.`;
  $('result-player').textContent = money(playerValue); $('result-bot').textContent = money(botValue);
  const wins = game.player.history.filter(p => p.pnl > 0).length;
  $('result-trades').textContent = `${game.player.history.length} trades · ${wins} wins · ${signed(playerValue - START_BALANCE)} net P&L after fees`;
  if (!$('result-dialog').open) $('result-dialog').showModal();
}
function resetRound() {
  document.querySelectorAll('dialog[open]').forEach(d => d.close());
  game = createGame(crypto.getRandomValues(new Uint32Array(1))[0], $('bot-strategy').value);
  tableMode = 'open'; document.querySelectorAll('[data-table]').forEach(b => b.classList.toggle('selected', b.dataset.table === 'open'));
  render(); notify('Fresh market. Both accounts reset to $10,000.');
}
function toggleRound() {
  if (game.status === 'finished') { showResult(); return; }
  game.status = game.status === 'running' ? 'paused' : 'running'; render();
}
function trade(direction) {
  const stake = Number($('stake').value), error = openTrade(game, game.player, selectedPair, direction, stake);
  if (error) { notify(error); return; }
  beep(direction); notify(`${direction > 0 ? 'Bought' : 'Sold'} ${selectedPair} · ${money(stake)} margin`); render();
}
function updateOrder() {
  const value = Number($('stake').value), valid = Number.isFinite(value) && value >= 100 && value <= 2500;
  $('position-value').textContent = valid ? money(value * 10) : '—'; $('entry-fee').textContent = valid ? money(value * .0004) : '—';
  document.querySelectorAll('[data-stake]').forEach(b => b.classList.toggle('selected', Number(b.dataset.stake) === value));
}
$('start-button').addEventListener('click', toggleRound);
$('new-round').addEventListener('click', () => { if (game.status === 'running' || game.status === 'paused') { game.status = 'paused'; render(); $('reset-dialog').showModal(); } else resetRound(); });
$('confirm-reset').addEventListener('click', resetRound);
$('play-again').addEventListener('click', resetRound);
$('buy-button').addEventListener('click', () => trade(1)); $('sell-button').addEventListener('click', () => trade(-1));
$('stake').addEventListener('input', updateOrder);
$('bot-strategy').addEventListener('change', () => { if (game.status === 'ready') { game.strategy = $('bot-strategy').value; render(); } });
$('market-list').addEventListener('click', event => { const button = event.target.closest('[data-pair]'); if (button) { selectedPair = button.dataset.pair; render(); } });
document.querySelectorAll('[data-stake]').forEach(button => button.addEventListener('click', () => { $('stake').value = button.dataset.stake; updateOrder(); }));
document.querySelectorAll('[data-range]').forEach(button => button.addEventListener('click', () => { chartRange = Number(button.dataset.range); document.querySelectorAll('[data-range]').forEach(b => b.classList.toggle('selected', b === button)); drawChart(); }));
document.querySelectorAll('[data-table]').forEach(button => button.addEventListener('click', () => { tableMode = button.dataset.table; document.querySelectorAll('[data-table]').forEach(b => b.classList.toggle('selected', b === button)); renderTables(); }));
$('positions-body').addEventListener('click', event => { const button = event.target.closest('[data-close-position]'); if (button && game.status === 'running') { const closed = closeTrade(game, game.player, Number(button.dataset.closePosition)); if (closed) notify(`Closed ${closed.pair} · ${signed(closed.pnl)} after fees`); render(); } });
$('close-all').addEventListener('click', () => { if (game.status !== 'running') return; for (const p of [...game.player.positions]) closeTrade(game, game.player, p.id); notify('All positions closed.'); render(); });
function showGuide() { if (game.status === 'running') { game.status = 'paused'; render(); } $('guide-dialog').showModal(); }
$('guide-button').addEventListener('click', showGuide); $('rules-button').addEventListener('click', showGuide);
document.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => $(button.dataset.close).close()));
function setView(view) {
  document.querySelectorAll('[data-view]').forEach(b => b.classList.toggle('active', b.dataset.view === view));
  $('terminal-view').hidden = view !== 'terminal'; $('journal-view').hidden = view !== 'journal';
  $('page-name').textContent = view === 'terminal' ? 'Trading terminal' : 'Trade journal';
  $('journal-toggle').textContent = view === 'terminal' ? 'Journal ↗' : 'Terminal ↗'; drawChart();
}
document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => setView(button.dataset.view)));
$('journal-toggle').addEventListener('click', () => setView($('journal-view').hidden ? 'journal' : 'terminal'));
$('sound-button').addEventListener('click', () => { sound = !sound; $('sound-button').setAttribute('aria-label', `${sound ? 'Disable' : 'Enable'} trade sounds`); $('sound-button').classList.toggle('positive', sound); notify(`Trade sounds ${sound ? 'on' : 'off'}`); if (sound) beep(); });
$('export-button').addEventListener('click', () => {
  if (!game.player.history.length) { notify('Close a trade first to export your journal.'); return; }
  const rows = [['Pair', 'Side', 'Entry', 'Exit', 'Margin USD', 'Net P&L USD', 'Reason'], ...game.player.history.map(p => [p.pair, p.direction > 0 ? 'BUY' : 'SELL', price(p.entry), price(p.exit), p.stake.toFixed(2), p.pnl.toFixed(2), p.reason])];
  const blob = new Blob([rows.map(row => row.join(',')).join('\r\n')], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob), link = document.createElement('a'); link.href = url; link.download = 'pip-trade-journal.csv'; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
});
document.addEventListener('keydown', event => {
  if (event.ctrlKey || event.metaKey || event.altKey || event.repeat || event.target.closest('input,select,textarea,button,a') || document.querySelector('dialog[open]')) return;
  if (event.code === 'Space') { event.preventDefault(); toggleRound(); }
  if (event.key.toLowerCase() === 'b') trade(1); if (event.key.toLowerCase() === 's') trade(-1);
});
document.addEventListener('visibilitychange', () => { if (document.hidden && game.status === 'running') { game.status = 'paused'; render(); notify('Round paused while you were away.'); } });
new ResizeObserver(drawChart).observe($('price-chart').parentElement);
setInterval(() => {
  if (game.status !== 'running') return;
  advance(game);
  if (game.status === 'finished') {
    const score = equity(game.player, game) - START_BALANCE;
    if (best === null || score > best) { best = score; try { localStorage.setItem('pip-best-v1', String(best)); } catch { /* Storage is optional. */ } }
    showResult();
  }
  render();
}, TICK_MS);
render(); updateOrder();
