export function ServiceDetailDrawing() {
  return (
    <svg
      className="block h-auto w-full"
      viewBox="0 0 540 350"
      fill="none"
      role="img"
      aria-labelledby="service-detail-drawing-title service-detail-drawing-description"
    >
      <title id="service-detail-drawing-title">
        Water distribution and lighting, in detail
      </title>
      <desc id="service-detail-drawing-description">
        Concept illustration inspired by our site photos: a water tank feeds
        three individually valved pipes, beside a pendant light and a
        switchboard connected by surface conduit.
      </desc>

      <path d="M40 296V48h460v248" className="fill-mineral/60" />
      <g className="stroke-line" strokeWidth="1">
        <path d="M40 296V48h460v248M24 296h492" />
        <path d="M286 48v248" strokeDasharray="3 7" />
        <path d="M32 48h16m-8-8v16m452-8h16m-8-8v16" />
      </g>

      <g className="stroke-copper" strokeLinejoin="round">
        <path
          d="M68 84v58c0 10 28 17 62 17s62-7 62-17V84"
          className="fill-white"
          strokeWidth="2"
        />
        <ellipse
          cx="130"
          cy="84"
          rx="62"
          ry="17"
          className="fill-mineral"
          strokeWidth="2"
        />
        <path d="M69 112c12 10 110 10 122 0" strokeOpacity=".35" />
        <path
          d="M130 159v44H84m46 0h128m-154 0v89m66-89v89m66-89v89"
          strokeWidth="7"
        />
        <path
          d="M130 159v44H84m46 0h128m-154 0v89m66-89v89m66-89v89"
          className="stroke-copper-light"
          strokeWidth="1.5"
        />
        {[104, 170, 236].map((x) => (
          <g key={x}>
            <path
              d={`M${x - 6} 218h12m-12 55h12`}
              strokeWidth="5"
              strokeLinecap="round"
            />
            <circle
              cx={x}
              cy="244"
              r="10"
              className="fill-white"
              strokeWidth="2"
            />
            <path d={`M${x - 7} 237l14 14m-14 0 14-14`} strokeWidth="1.5" />
            <circle cx={x} cy="244" r="2.5" className="fill-copper" />
          </g>
        ))}
      </g>

      <g className="stroke-sage" strokeLinejoin="round" strokeWidth="2">
        <path d="M316 80h136v155M364 88v57" strokeWidth="3" />
        <rect
          x="356"
          y="72"
          width="16"
          height="16"
          rx="2"
          className="fill-white"
        />
        <path d="M332 74v12m100-12v12" strokeWidth="2.5" />
        <rect
          x="358"
          y="145"
          width="12"
          height="12"
          rx="2"
          className="fill-white"
        />
        <path
          d="M354 157h20c0 14 13 22 26 32h-72c13-10 26-18 26-32Z"
          className="fill-fog"
        />
        <ellipse cx="364" cy="189" rx="36" ry="6" className="fill-white" />
        <path
          d="M358 190a6 6 0 0 0 12 0"
          className="fill-copper-light stroke-copper"
          strokeWidth="1.5"
        />
        <rect
          x="430"
          y="235"
          width="44"
          height="53"
          rx="3"
          className="fill-white"
        />
        <rect x="439" y="247" width="8" height="25" rx="1" />
        <rect x="457" y="247" width="8" height="25" rx="1" />
        <path d="M440 259h6m12 0h6" strokeOpacity=".5" />
      </g>

      <g className="stroke-line" strokeWidth="1">
        <path d="M170 304v14H94m358-22v22h-76" />
      </g>
      <g className="fill-muted font-sans text-[11px]">
        <text x="68" y="337">
          Water distribution
        </text>
        <text x="348" y="337">
          Lighting & conduit
        </text>
      </g>
    </svg>
  );
}
