type ServiceDrawingProps = { service: "plumbing" | "electrical" };

export function ServiceDrawing({ service }: ServiceDrawingProps) {
  return (
    <svg
      className="block h-auto min-h-0 w-full flex-1 p-2"
      viewBox="0 -30 520 390"
      fill="none"
      role="img"
      aria-labelledby={`${service}-drawing-title`}
    >
      <title id={`${service}-drawing-title`}>
        {service === "plumbing"
          ? "Concept drawing of water pipes and drainage connections inside a building"
          : "Concept drawing of electrical distribution and wiring routes inside a building"}
      </title>
      <g
        className="stroke-sage/60 text-sage"
        strokeWidth="1.2"
        strokeLinejoin="round"
      >
        <path
          d="m64 211 226-130 168 97-226 130z"
          fill="currentColor"
          fillOpacity=".04"
        />
        <path d="M64 211V104L290 28v53M64 104l168 97v107M232 201l226-130v107M290 28l168 43M64 211l168 97 226-130" />
        <path
          d="m64 104 226-130M128 248V141m168 130V164m97 51V108M64 158l168 97 226-130"
          strokeDasharray="3 7"
        />
        <path d="m88 230 220-127 125 72M232 201 290 81" strokeOpacity=".3" />
        <path d="m48 230 183 106M250 328l225-130M48 223v14m183 92v14m19-22v14m225-144v14" />
      </g>
      {service === "plumbing" ? (
        <g
          className="stroke-current"
          strokeLinecap="square"
          strokeLinejoin="round"
        >
          <path
            d="m105 166 74 43 118-68V78M179 209v53l53 30 166-96v-82"
            strokeWidth="7"
          />
          <path
            d="m105 166 74 43 118-68V78M179 209v53l53 30 166-96v-82"
            className="stroke-copper-light"
            strokeWidth="1.5"
          />
          <path d="m297 141 46 26 55-32M232 292v-39l-40-23" strokeWidth="5" />
          <path d="m97 164 17-10m175-76 17-10m84 47 17-10" strokeWidth="9" />
          <path d="m264 160 16 9m-8-13v17m-10-14 19 11" strokeWidth="2.5" />
          <path d="m322 154 14-8m-7-4v17" strokeWidth="3" />
          <circle cx="179" cy="209" r="10" strokeWidth="2" />
          <path
            d="M100 154v-35H47m350-17V48h56"
            className="stroke-sage/60"
            strokeWidth="1"
          />
        </g>
      ) : (
        <g className="stroke-current" strokeLinejoin="round">
          <path
            d="m106 144 64-37v98l99-57V72M170 205l62 36 159-92V98"
            strokeWidth="3.5"
          />
          <path
            d="m232 241 1 46 166-96v-66M232 241v-45l94-54v-37"
            strokeWidth="3.5"
          />
          <path
            d="m310 74 32 18v59l-32-18z"
            fill="currentColor"
            fillOpacity=".17"
            strokeWidth="2"
          />
          <path
            d="m317 91 17 10m-17-1 17 10m-17-1 17 10m-17-1 17 10"
            strokeWidth="2"
          />
          <path
            d="m98 133 16 9v25l-16-9zm163-68 13-8v23l-13 8zm120 20 18 10v26l-18-10z"
            fill="currentColor"
            fillOpacity=".12"
            strokeWidth="2"
          />
          <path
            d="m303 200 14 8v22l-14-8z"
            fill="currentColor"
            fillOpacity=".12"
            strokeWidth="2"
          />
          <path
            d="m310 84-44-26h-51m180 28V47h58"
            className="stroke-sage/60"
            strokeWidth="1"
          />
          <circle cx="170" cy="205" r="7" strokeWidth="2" />
          <circle cx="232" cy="241" r="7" strokeWidth="2" />
        </g>
      )}
    </svg>
  );
}
