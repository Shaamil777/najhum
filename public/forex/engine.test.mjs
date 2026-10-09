import test from 'node:test';
import assert from 'node:assert/strict';
import { createGame, advance, openTrade, closeTrade, equity, available, ROUND_TICKS } from './engine.mjs';

function running(strategy = 'momentum') { const game = createGame(123, strategy); game.status = 'running'; return game; }
test('identical seeds produce identical markets; paused games freeze all accounts', () => {
  const first = running(), second = running();
  for (let i = 0; i < 30; i++) { advance(first); advance(second); }
  assert.deepEqual(first.markets, second.markets);
  assert.deepEqual(first.bot, second.bot);
  first.status = 'paused'; const snapshot = JSON.stringify(first); advance(first);
  assert.equal(JSON.stringify(first), snapshot);
});
test('long and short trades settle directionally and deduct both fees exactly once', () => {
  for (const direction of [1, -1]) {
    const game = running(); const initial = game.markets['EUR/USD'].price;
    assert.equal(openTrade(game, game.player, 'EUR/USD', direction, 1000), null);
    assert.equal(game.player.balance, 9999.6);
    assert.equal(available(game.player, game), 8999.6);
    game.markets['EUR/USD'].price = initial * 1.01;
    const result = closeTrade(game, game.player, game.player.positions[0].id);
    const expected = direction * 100 - .4 - .404;
    assert.ok(Math.abs(result.pnl - expected) < 1e-8);
    assert.ok(Math.abs(game.player.balance - 10000 - expected) < 1e-8);
    assert.equal(closeTrade(game, game.player, result.id), null);
    assert.equal(game.player.positions.length, 0);
  }
});
test('rejects invalid stakes, insufficient margin, excess positions, and paused orders', () => {
  const game = running();
  for (const stake of [NaN, Infinity, -1, 0, 99, 2501]) assert.ok(openTrade(game, game.player, 'EUR/USD', 1, stake));
  assert.ok(openTrade(game, game.player, 'INVALID', 1, 500));
  assert.ok(openTrade(game, game.player, 'EUR/USD', 0, 500));
  for (let i = 0; i < 5; i++) assert.equal(openTrade(game, game.player, 'EUR/USD', 1, 100), null);
  assert.match(openTrade(game, game.player, 'EUR/USD', 1, 100), /Maximum 5/);
  const poor = running(); poor.player.balance = 100;
  assert.match(openTrade(poor, poor.player, 'EUR/USD', 1, 100), /margin/);
  poor.status = 'paused'; assert.match(openTrade(poor, poor.player, 'EUR/USD', 1, 100), /resume/);
});
test('stop losses and profit targets close positions at the simulated tick', () => {
  for (const factor of [.98, 1.03]) {
    const game = running(); openTrade(game, game.player, 'EUR/USD', 1, 1000);
    game.markets['EUR/USD'].price *= factor;
    advance(game);
    assert.equal(game.player.positions.length, 0);
    assert.equal(game.player.history[0].reason, factor < 1 ? 'Stop loss' : 'Take profit');
  }
});
test('every strategy completes a round, settles all positions, and reconciles balances', () => {
  for (const strategy of ['momentum', 'contrarian', 'cautious']) {
    const game = running(strategy);
    for (let i = 0; i < ROUND_TICKS; i++) {
      if (i % 15 === 0) openTrade(game, game.player, 'GBP/USD', i % 30 ? -1 : 1, 1000);
      advance(game);
    }
    assert.equal(game.status, 'finished'); assert.equal(game.tick, ROUND_TICKS);
    for (const owner of [game.player, game.bot]) {
      assert.equal(owner.positions.length, 0); assert.ok(owner.history.length > 0);
      assert.ok(Math.abs(owner.balance - 10000 - owner.history.reduce((sum, p) => sum + p.pnl, 0)) < 1e-8);
      assert.equal(equity(owner, game), owner.balance);
    }
    const final = JSON.stringify(game); advance(game); assert.equal(JSON.stringify(game), final);
  }
});
