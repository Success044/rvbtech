export function ConnectionFaultDrawing() {
  return (
    <svg
      className="block h-auto w-full"
      viewBox="0 0 640 430"
      fill="none"
      role="img"
      aria-labelledby="connection-fault-title connection-fault-description"
    >
      <title id="connection-fault-title">
        A plumbing leak and a disconnected electrical cable
      </title>
      <desc id="connection-fault-description">
        A copper pipe with a loose joint and falling water droplets on the left.
        A separate green electrical conduit with a broken connection on the
        right.
      </desc>
      <defs>
        <pattern
          id="fault-grid"
          width="32"
          height="32"
          patternUnits="userSpaceOnUse"
        >
          <path
            className="stroke-sage"
            d="M32 0H0v32"
            strokeOpacity=".16"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <path d="M0 0h640v430H0z" fill="url(#fault-grid)" />
      <g className="stroke-sage" strokeWidth="1">
        <path d="M25 47V25h22m546 0h22v22M25 383v22h22m546 0h22v-22" />
        <path d="M320 58v314" strokeDasharray="3 8" strokeOpacity=".6" />
        <path d="M52 350h220m96 0h220" strokeOpacity=".55" />
        <path
          d="M42 90v200m-5-200h10m-10 200h10M598 90v200m-5-200h10m-10 200h10"
          strokeDasharray="3 5"
        />
      </g>
      <g
        className="stroke-copper-light"
        strokeLinecap="square"
        strokeLinejoin="round"
      >
        <path
          d="M76 136h115a27 27 0 0 1 27 27v40M218 233v45a20 20 0 0 0 20 20h30"
          strokeWidth="18"
        />
        <path
          className="stroke-mineral"
          d="M76 133h115a30 30 0 0 1 30 30v40M221 233v45a17 17 0 0 0 17 17h30"
          strokeWidth="2"
        />
        <path
          d="M72 122v28m15-28v28m117 48h28m-28 7h28m-28 27h28m-28 8h28m31 44v28m10-28v28"
          strokeWidth="4"
        />
        <path
          className="stroke-copper-light"
          d="m214 207-4 8 8 3-7 10"
          strokeWidth="2"
        />
        <path d="M137 124V98" strokeWidth="7" />
        <circle
          className="fill-forest"
          cx="137"
          cy="88"
          r="21"
          strokeWidth="3"
        />
        <path d="M125 76l24 24m-24 0 24-24" strokeWidth="3" />
        <circle
          className="fill-copper-light"
          cx="137"
          cy="88"
          r="5"
          stroke="none"
        />
        <path className="fill-forest" d="M127 121h20v30h-20z" strokeWidth="2" />
      </g>
      <g className="fill-water stroke-water" strokeWidth="1.2">
        <path d="M190 239s-6 8-6 12a6 6 0 0 0 12 0c0-4-6-12-6-12Z" />
        <path d="M204 271s-7 10-7 15a7 7 0 0 0 14 0c0-5-7-15-7-15Z" />
        <path d="M181 304s-5 7-5 11a5 5 0 0 0 10 0c0-4-5-11-5-11Z" />
        <ellipse
          cx="201"
          cy="345"
          rx="28"
          ry="4"
          fill="none"
          strokeOpacity=".7"
        />
      </g>
      <g className="stroke-electric" strokeLinejoin="round">
        <path
          d="M561 105h-70a32 32 0 0 0-32 32v44M459 236v41a22 22 0 0 0 22 22h79"
          strokeWidth="15"
        />
        <path
          className="stroke-fog"
          d="M561 102h-70a35 35 0 0 0-35 35v44M456 236v41a25 25 0 0 0 25 25h79"
          strokeWidth="1.8"
        />
        <path
          className="fill-forest"
          d="M447 175h24v12h-24zm0 52h24v12h-24z"
          strokeWidth="2"
        />
        <path
          className="stroke-copper-light"
          d="M451 187v10m8-10v13m8-13v10M451 217v10m8-13v13m8-10v10"
          strokeWidth="2"
        />
        <path
          className="stroke-copper-light"
          d="m428 190-9-6m7 23h-13m19 15-10 7m65-39 10-6m-7 23h13m-19 15 10 7"
          strokeWidth="2"
        />
        <path className="fill-forest" d="M547 74h37v62h-37z" strokeWidth="2" />
        <path className="fill-sage" d="M557 89h17v32h-17z" strokeWidth="1.5" />
        <path d="M561 93v11m9-11v11" strokeWidth="2" />
        <path className="fill-forest" d="M547 281h37v37h-37z" strokeWidth="2" />
        <circle cx="565.5" cy="299.5" r="8" strokeWidth="1.5" />
        <path d="m562 296 7 7m-7 0 7-7" strokeWidth="1.2" />
      </g>
      <g className="stroke-electric/70" strokeWidth="1">
        <path d="M111 254H74v-60" />
        <circle className="fill-electric/70" cx="74" cy="190" r="3" />
        <path d="M512 208h42v40" />
        <circle className="fill-electric/70" cx="554" cy="252" r="3" />
      </g>
      <g className="fill-electric">
        <circle cx="80" cy="381" r="2" />
        <circle cx="560" cy="381" r="2" />
      </g>
    </svg>
  );
}
