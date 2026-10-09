export const START_BALANCE = 10000;
export const ROUND_TICKS = 120;
export const TICK_MS = 1500;
export const PAIRS = [
  { id: 'EUR/USD', name: 'Euro / US Dollar', flag: '🇪🇺', start: 1.08426 },
  { id: 'GBP/USD', name: 'British Pound / US Dollar', flag: '🇬🇧', start: 1.27184 },
  { id: 'AUD/USD', name: 'Australian Dollar / US Dollar', flag: '🇦🇺', start: 0.65832 },
  { id: 'NZD/USD', name: 'New Zealand Dollar / US Dollar', flag: '🇳🇿', start: 0.61245 },
];
export const STRATEGIES = {
  momentum: { name: 'Momentum', detail: 'Follows the last 8 price moves. Closes positions after 12 ticks.' },
  contrarian: { name: 'Mean reversion', detail: 'Trades against the last 8 price moves. Closes positions after 12 ticks.' },
  cautious: { name: 'Cautious', detail: 'Follows momentum with smaller positions and waits for a stronger signal.' },
};
export function randomGenerator(seed) {
  let value = seed >>> 0;
  return () => { value += 0x6D2B79F5; let t = value; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}
export function account() { return { balance: START_BALANCE, positions: [], history: [] }; }
export function createGame(seed = 42, strategy = 'momentum') {
  const random = randomGenerator(seed);
  const markets = Object.fromEntries(PAIRS.map(pair => {
    let price = pair.start;
    const candles = Array.from({ length: 60 }, (_, i) => {
      const open = price; price *= 1 + (random() - 0.48) * 0.0015;
      return { open, close: price, high: Math.max(open, price) + random() * price * 0.0004, low: Math.min(open, price) - random() * price * 0.0004, tick: i - 60 };
    });
    return [pair.id, { price, opening: price, candles }];
  }));
  return { random, markets, player: account(), bot: account(), tick: 0, status: 'ready', strategy, nextId: 1, event: 'Opening bell', eventDetail: 'A fresh market. A level playing field.', volatility: 1 };
}
export function profit(position, game) {
  return (game.markets[position.pair].price - position.entry) * position.units * position.direction;
}
export function equity(owner, game) { return owner.balance + owner.positions.reduce((sum, p) => sum + profit(p, game), 0); }
export function available(owner, game) { return Math.max(0, equity(owner, game) - owner.positions.reduce((sum, p) => sum + p.stake, 0)); }
export function openTrade(game, owner, pair, direction, stake) {
  if (game.status !== 'running') return 'Start or resume the round to trade.';
  if (!game.markets[pair] || ![1, -1].includes(direction)) return 'Invalid order.';
  if (!Number.isFinite(stake) || stake < 100 || stake > 2500) return 'Choose a stake between $100 and $2,500.';
  if (owner.positions.length >= 5) return 'Close a position first. Maximum 5 open trades.';
  const fee = stake * 10 * 0.00004;
  if (stake + fee > available(owner, game)) return 'Not enough available margin for this order.';
  owner.balance -= fee;
  owner.positions.push({ id: game.nextId++, pair, direction, stake, units: stake * 10 / game.markets[pair].price, entry: game.markets[pair].price, opened: game.tick, fee });
  return null;
}
export function closeTrade(game, owner, id, reason = 'Manual close') {
  const position = owner.positions.find(p => p.id === id);
  if (!position) return null;
  const gross = profit(position, game);
  const exitFee = game.markets[position.pair].price * position.units * 0.00004;
  owner.balance += gross - exitFee;
  const closed = { ...position, exit: game.markets[position.pair].price, pnl: gross - exitFee - position.fee, closed: game.tick, reason };
  owner.history.unshift(closed);
  owner.positions = owner.positions.filter(p => p.id !== id);
  return closed;
}
export function runBot(game) {
  for (const position of [...game.bot.positions]) if (game.tick - position.opened >= 12) closeTrade(game, game.bot, position.id, 'Bot signal refresh');
  if (game.tick % 6 !== 0 || game.bot.positions.length >= 2) return;
  const pair = PAIRS[Math.floor(game.tick / 6) % PAIRS.length].id;
  const candles = game.markets[pair].candles;
  const move = candles.at(-1).close / candles.at(-8).close - 1;
  if (game.strategy === 'cautious' && Math.abs(move) < 0.001) return;
  const direction = (move >= 0 ? 1 : -1) * (game.strategy === 'contrarian' ? -1 : 1);
  openTrade(game, game.bot, pair, direction, game.strategy === 'cautious' ? 500 : 1000);
}
const EVENTS = [
  ['Liquidity surge', 'More activity enters the simulated market.', 1.4],
  ['Quiet session', 'Price movement softens. Patience has a place.', 0.7],
  ['Volatility spike', 'A fictional economic release shakes up prices.', 2],
  ['Market settles', 'Volatility returns to its normal range.', 1],
];
export function advance(game) {
  if (game.status !== 'running') return;
  game.tick++;
  if (game.tick % 20 === 0) {
    const event = EVENTS[(game.tick / 20 - 1) % EVENTS.length];
    [game.event, game.eventDetail, game.volatility] = event;
  }
  const shared = (game.random() - 0.5) * 0.0005;
  for (const market of Object.values(game.markets)) {
    const open = market.price;
    const close = Math.max(0.01, open * (1 + ((game.random() - 0.5) * 0.0018 + shared) * game.volatility));
    market.candles.push({ open, close, high: Math.max(open, close) + game.random() * open * 0.00035, low: Math.min(open, close) - game.random() * open * 0.00035, tick: game.tick });
    market.candles = market.candles.slice(-180);
    market.price = close;
  }
  for (const owner of [game.player, game.bot]) {
    for (const position of [...owner.positions]) {
      const pnl = profit(position, game);
      if (pnl <= -position.stake * 0.12 || pnl >= position.stake * 0.2) closeTrade(game, owner, position.id, pnl > 0 ? 'Take profit' : 'Stop loss');
    }
    if (equity(owner, game) <= owner.positions.reduce((sum, p) => sum + p.stake, 0) * 0.5) {
      for (const position of [...owner.positions]) closeTrade(game, owner, position.id, 'Margin protection');
    }
  }
  if (game.tick >= ROUND_TICKS) {
    for (const owner of [game.player, game.bot]) for (const position of [...owner.positions]) closeTrade(game, owner, position.id, 'Round ended');
    game.status = 'finished';
  } else runBot(game);
}
