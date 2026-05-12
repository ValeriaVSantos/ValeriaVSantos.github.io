// Interactive scatter plot: confidence vs correctness with transcript tooltips
const { useState, useMemo, useEffect: vEffect } = React;

function CalibrationScatter() {
  const data = window.SITE.scatter;
  const [hovered, setHovered] = React.useState(null);
  const [pinned, setPinned] = React.useState(null);

  // Auto-pin a default so the panel isn't empty on load
  React.useEffect(() => {
    if (!pinned && !hovered) setPinned(data[0]);
  }, []);

  const active = hovered || pinned;

  const W = 640, H = 460;
  const PAD = { l: 56, r: 24, t: 28, b: 56 };
  const innerW = W - PAD.l - PAD.r;
  const innerH = H - PAD.t - PAD.b;

  function sx(x) { return PAD.l + x * innerW; }
  function sy(y) { return PAD.t + (1 - y) * innerH; }

  const colorFor = (c, dim) => {
    const map = { cal: '#5cd0ff', over: '#ff7ad3', suppr: '#a78bfa' };
    return map[c] + (dim ? '88' : 'ff');
  };

  // Counts for metric tiles
  const counts = useMemo(() => {
    const out = { over: 0, cal: 0, suppr: 0 };
    for (const d of data) out[d.c]++;
    return out;
  }, [data]);

  return (
    <div>
      <div className="viz-shell">
        <div className="card viz-card">
          <div className="viz-head">
            <div className="viz-title">Length Bias · Pragmatic Insensitivity</div>
            <div className="viz-legend">
              <span><i className="cal"></i> Calibrated</span>
              <span><i className="over"></i> Overconfident error</span>
              <span><i className="suppr"></i> Hesitation-suppressed</span>
            </div>
          </div>
          <svg viewBox={`0 0 ${W} ${H}`} style={{width:'100%', height:'auto', display:'block', maxHeight: 480}}>
            <defs>
              <radialGradient id="dot-glow-v" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.55"/>
                <stop offset="100%" stopColor="#a78bfa" stopOpacity="0"/>
              </radialGradient>
              <radialGradient id="dot-glow-b" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#5cd0ff" stopOpacity="0.55"/>
                <stop offset="100%" stopColor="#5cd0ff" stopOpacity="0"/>
              </radialGradient>
              <radialGradient id="dot-glow-p" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ff7ad3" stopOpacity="0.55"/>
                <stop offset="100%" stopColor="#ff7ad3" stopOpacity="0"/>
              </radialGradient>
            </defs>

            {/* Plot area background */}
            <rect x={PAD.l} y={PAD.t} width={innerW} height={innerH}
              fill="rgba(11, 10, 20, 0.4)" stroke="rgba(168,145,255,0.10)" rx="8"/>

            {/* Gridlines */}
            {[0.2, 0.4, 0.6, 0.8].map(v => (
              <g key={'gx' + v}>
                <line className="grid-line" x1={sx(v)} y1={PAD.t} x2={sx(v)} y2={PAD.t + innerH} />
                <text className="axis-tick-label" x={sx(v)} y={PAD.t + innerH + 16} textAnchor="middle">{v.toFixed(1)}</text>
              </g>
            ))}
            {[0.2, 0.4, 0.6, 0.8].map(v => (
              <g key={'gy' + v}>
                <line className="grid-line" x1={PAD.l} y1={sy(v)} x2={PAD.l + innerW} y2={sy(v)} />
                <text className="axis-tick-label" x={PAD.l - 8} y={sy(v) + 3} textAnchor="end">{v.toFixed(1)}</text>
              </g>
            ))}

            {/* Diagonal — perfect calibration */}
            <line className="diag-line" x1={sx(0)} y1={sy(0)} x2={sx(1)} y2={sy(1)} />
            <text x={sx(0.92)} y={sy(0.92) - 8} fill="rgba(168,145,255,0.55)" fontSize="9" fontFamily="Geist Mono, monospace" textAnchor="end">y = x · perfect calibration</text>

            {/* Overconfidence region shading */}
            <path d={`M ${sx(0.55)} ${sy(0)} L ${sx(1)} ${sy(0)} L ${sx(1)} ${sy(0.45)} Z`}
              fill="rgba(255, 122, 211, 0.06)" stroke="rgba(255,122,211,0.15)" strokeDasharray="3 4"/>
            <text x={sx(0.92)} y={sy(0.08)} fill="rgba(255,122,211,0.55)" fontSize="9" fontFamily="Geist Mono, monospace" textAnchor="end">overconfidence region</text>

            {/* Axis labels */}
            <text className="axis-label" x={PAD.l + innerW/2} y={H - 18} textAnchor="middle">model confidence →</text>
            <text className="axis-label" transform={`rotate(-90 18 ${PAD.t + innerH/2})`} x="18" y={PAD.t + innerH/2} textAnchor="middle">correctness →</text>

            {/* Data points */}
            {data.map((d, i) => {
              const isActive = active && active === d;
              const glowId = d.c === 'over' ? 'dot-glow-p' : (d.c === 'cal' ? 'dot-glow-b' : 'dot-glow-v');
              return (
                <g key={i}
                   onMouseEnter={() => setHovered(d)}
                   onMouseLeave={() => setHovered(null)}
                   onClick={() => setPinned(d)}
                   style={{cursor: 'pointer'}}>
                  {isActive && <circle cx={sx(d.x)} cy={sy(d.y)} r="22" fill={`url(#${glowId})`} />}
                  <circle cx={sx(d.x)} cy={sy(d.y)} r="14" fill="transparent" className="dot-hit" />
                  <circle cx={sx(d.x)} cy={sy(d.y)} r={isActive ? 7 : 4.5}
                    fill={colorFor(d.c)}
                    stroke={isActive ? '#fff' : 'rgba(255,255,255,0.15)'}
                    strokeWidth={isActive ? 1.2 : 0.5}
                    style={{transition: 'r 0.18s ease, stroke 0.18s ease', filter: isActive ? 'drop-shadow(0 0 8px currentColor)' : 'none'}}
                  />
                </g>
              );
            })}
          </svg>
          <div style={{display:'flex', justifyContent:'space-between', fontFamily:'Geist Mono, monospace', fontSize:10, color:'var(--text-3)', marginTop:8, letterSpacing:'0.08em'}}>
            <span>n = {data.length} utterances · Roda Viva Corpus (BR-PT)</span>
            <span>hover ↺ explore · click ⌖ pin</span>
          </div>
        </div>

        <div className="viz-side">
          <div className="card viz-tooltip">
            <div className="tt-eyebrow">{active && active.q ? '◇ Query' : 'Select a point'}</div>
            {active ? (
              <React.Fragment>
                <div style={{fontSize:14, color:'var(--text)', marginBottom:12, lineHeight:1.4}}>{active.q}</div>
                <div className="tt-transcript" dangerouslySetInnerHTML={{ __html: active.t }} />
                <div className="tt-meta">
                  <div>
                    <span className="tt-lbl">Confidence</span>
                    <span className="tt-val">{Math.round(active.x * 100)}%</span>
                  </div>
                  <div>
                    <span className="tt-lbl">Correctness</span>
                    <span className={'tt-val ' + (active.y < 0.4 ? 'miss' : 'ok')}>{Math.round(active.y * 100)}%</span>
                  </div>
                  <div style={{gridColumn:'1 / -1'}}>
                    <span className="tt-lbl">Diagnosis</span>
                    <span className="tt-val" style={{fontSize:13, fontFamily:'Geist, Inter, sans-serif'}}>{active.cal}</span>
                  </div>
                </div>
                <div style={{marginTop:14, paddingTop:14, borderTop:'1px dashed var(--line)', fontSize:12, color:'var(--text-3)', lineHeight:1.55}}>
                  {active.truth}
                </div>
              </React.Fragment>
            ) : (
              <div style={{color:'var(--text-3)', fontSize:13, lineHeight:1.5}}>Hover any point on the chart to inspect the underlying transcript and confidence diagnosis.</div>
            )}
          </div>

          <div className="card viz-metric">
            <span className="vm-lbl">Expected Calibration Error</span>
            <span className="vm-val">0.31 <span>↓ 0.07 w/ hesitation</span></span>
            <span className="vm-sub">stripped vs. preserved disfluencies, n={data.length}</span>
          </div>

          <div className="card viz-metric">
            <span className="vm-lbl">Length Bias</span>
            <span className="vm-val">+0.42</span>
            <span className="vm-sub">Pearson r between response length & reported confidence (the longer the answer, the more confident — independent of truth)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

window.CalibrationScatter = CalibrationScatter;
