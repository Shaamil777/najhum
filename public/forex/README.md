# Pip — Forex trading playground

A browser game with generated currency prices and virtual funds. No market API, database, account, or additional dependency is required.

From the repository root, run:

```sh
node scripts/serve-forex.mjs
```

Open http://localhost:8080/forex/index.html. You can also use the existing Next.js development server and visit `/forex/index.html`.

Choose a bot strategy and start a three-minute challenge. Select a currency pair, choose $100–$2,500 of margin, and buy or sell. Both accounts start at $10,000. The bot follows either momentum, mean reversion, or cautious momentum using only previously generated prices. It checks for new trades every six ticks and closes positions after twelve ticks. Its maximum is two simultaneous positions; the player can hold five.

Each position uses 10× margin in USD notional exposure. Entry and exit each cost 0.004% of notional. Stops trigger at −12% of margin and targets at +20%, filled at the current simulated tick. Stop fills can differ from the threshold. All positions settle when the round ends; final equity determines the winner. Personal best net P&L is saved locally when storage is available. Rounds and journals reset on reload or a new round. Journals can be exported as CSV from the Trade journal navigation.

Use B to buy, S to sell, or Space to pause/resume when focus is outside a form control. The game pauses when its tab is hidden or rules are opened. Resume with the challenge button. Chart ranges show 30, 60, or 120 available ticks; each new tick represents 1.5 seconds of active simulation.

Run the engine checks:

```sh
node --test public/forex/engine.test.mjs
```

Files are isolated under `public/forex/`; the existing business website is unaffected.
