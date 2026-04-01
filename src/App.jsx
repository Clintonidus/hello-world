import React from 'react';

export default function PolymarketEdgeLab() {
  const [marketQuestion, setMarketQuestion] = React.useState('Will the Fed cut rates by the next FOMC meeting?');
  const [yesPrice, setYesPrice] = React.useState('0.46');
  const [noPrice, setNoPrice] = React.useState('0.54');
  const [deadline, setDeadline] = React.useState('2026-06-17');
  const [rules, setRules] = React.useState(
    'Resolves YES if the Federal Reserve announces a target rate cut at the next scheduled FOMC meeting.',
  );
  const [context, setContext] = React.useState(
    'Recent inflation prints softened, but Fed speakers remain cautious. Market sentiment is divided.',
  );
  const [trueProb, setTrueProb] = React.useState('0.58');
  const [conviction, setConviction] = React.useState(7);
  const [bankroll, setBankroll] = React.useState('1000');

  const marketProb = Number(yesPrice || 0);
  const fairProb = Number(trueProb || 0);
  const edge = fairProb - marketProb;

  const rubricScores = React.useMemo(() => {
    const ruleClarity = rules.length > 80 ? 4 : rules.length > 30 ? 3 : 2;
    const infoEdge = context.length > 120 ? 4 : context.length > 60 ? 3 : 2;
    const timingEdge = deadline ? 4 : 2;
    const narrative = context.toLowerCase().includes('sentiment') || context.toLowerCase().includes('macro') ? 4 : 3;
    const liquidity = 3;
    const mispricing = Math.min(5, Math.max(1, Math.round(Math.abs(edge) * 20)));
    const downside = conviction >= 7 ? 4 : 3;
    const total = ruleClarity + infoEdge + timingEdge + narrative + liquidity + mispricing + downside;
    return { ruleClarity, infoEdge, timingEdge, narrative, liquidity, mispricing, downside, total };
  }, [rules, context, deadline, edge, conviction]);

  const decision = React.useMemo(() => {
    const absEdge = Math.abs(edge);
    if (!rules || rules.length < 20) return 'NO TRADE';
    if (rubricScores.total <= 20) return 'NO TRADE';
    if (absEdge < 0.05) return 'WATCHLIST';
    if (edge > 0) return 'BUY YES';
    return 'BUY NO';
  }, [rules, edge, rubricScores.total]);

  const suggestedSizePct = React.useMemo(() => {
    if (decision === 'NO TRADE') return 0;
    if (decision === 'WATCHLIST') return 0.25;
    if (conviction >= 8) return 1.5;
    if (conviction >= 7) return 1.0;
    return 0.5;
  }, [decision, conviction]);

  const suggestedRisk = ((Number(bankroll || 0) * suggestedSizePct) / 100).toFixed(2);

  const finalLine = `${decision} • Fair ${(fairProb * 100).toFixed(0)}% • Market ${(marketProb * 100).toFixed(0)}% • Edge ${(
    edge * 100
  ).toFixed(1)} pts • Size ${suggestedSizePct}%`;

  const fieldClass =
    'w-full rounded-2xl border border-zinc-700 bg-zinc-950/70 p-3 text-sm text-zinc-100 outline-none focus:ring-2 focus:ring-zinc-400';
  const cardClass = 'rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5 shadow-2xl';

  return (
    <div className="min-h-screen bg-black text-zinc-100">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="mb-8 grid gap-4 lg:grid-cols-[1.3fr_.7fr]">
          <div className="rounded-[2rem] border border-zinc-800 bg-gradient-to-br from-zinc-950 to-zinc-900 p-6 shadow-2xl">
            <div className="mb-3 flex items-center gap-3">
              <div className="rounded-2xl border border-zinc-700 px-3 py-1 text-xs uppercase tracking-[0.25em] text-zinc-300">Codex App Idea</div>
              <div className="rounded-2xl border border-zinc-700 px-3 py-1 text-xs uppercase tracking-[0.25em] text-zinc-300">Prediction Research</div>
            </div>
            <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">Polymarket Edge Lab</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-300 md:text-base">
              A Codex-ready app concept that converts your Buffett × Earn Your Leisure market-thinking prompt into a working
              research dashboard. The app helps you score rule clarity, estimate fair probability, size positions conservatively,
              and avoid emotional trades.
            </p>
          </div>

          <div className={cardClass}>
            <div className="text-xs uppercase tracking-[0.25em] text-zinc-400">Instant Output</div>
            <div className="mt-3 rounded-3xl border border-zinc-800 bg-black p-4">
              <div className="text-2xl font-semibold">{decision}</div>
              <div className="mt-2 text-sm text-zinc-300">{finalLine}</div>
            </div>
            <div className="mt-4 space-y-3 text-sm text-zinc-300">
              <div className="flex items-center justify-between rounded-2xl border border-zinc-800 px-4 py-3">
                <span>Suggested risk</span>
                <span className="font-medium text-zinc-100">${suggestedRisk}</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-zinc-800 px-4 py-3">
                <span>Conviction</span>
                <span className="font-medium text-zinc-100">{conviction}/10</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-zinc-800 px-4 py-3">
                <span>Rubric total</span>
                <span className="font-medium text-zinc-100">{rubricScores.total}/35</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
          <div className={cardClass}>
            <h2 className="text-xl font-semibold">Market Input</h2>
            <div className="mt-4 space-y-4">
              <div>
                <label className="mb-2 block text-sm text-zinc-400">Market question</label>
                <textarea className={fieldClass} rows={3} value={marketQuestion} onChange={(e) => setMarketQuestion(e.target.value)} />
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm text-zinc-400">YES price</label>
                  <input className={fieldClass} value={yesPrice} onChange={(e) => setYesPrice(e.target.value)} />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-zinc-400">NO price</label>
                  <input className={fieldClass} value={noPrice} onChange={(e) => setNoPrice(e.target.value)} />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-zinc-400">Resolution date</label>
                  <input className={fieldClass} type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
                </div>
              </div>
            </div>
          </div>

          <div className={cardClass}>
            <h2 className="text-xl font-semibold">Valuation & Risk</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-zinc-400">Your fair probability</label>
                <input className={fieldClass} value={trueProb} onChange={(e) => setTrueProb(e.target.value)} />
              </div>
              <div>
                <label className="mb-2 block text-sm text-zinc-400">Bankroll</label>
                <input className={fieldClass} value={bankroll} onChange={(e) => setBankroll(e.target.value)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
