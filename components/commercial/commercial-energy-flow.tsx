export function CommercialEnergyFlow() {
  return (
    <section className="section bg-charcoal text-cream">
      <div className="container">
        <p className="eyebrow text-leaf-light">
          02 — Integrated energy architecture
        </p>

        <div className="mt-3 grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <h2 className="text-balance font-display text-3xl font-medium md:text-5xl">
            Solar is one part of a larger energy system.
          </h2>

          <p className="max-w-xl text-sm leading-7 text-cream/60">
            Generation, consumption, storage, EV charging and the grid all
            interact. The right configuration depends on the operating profile
            of the site.
          </p>
        </div>

        <div className="mt-14 overflow-hidden rounded-3xl border border-white/10 bg-[#171A1D] p-5 md:p-10">
          <svg
            viewBox="0 0 1100 520"
            className="h-auto w-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Solar */}
            <Node
              x={430}
              y={20}
              w={240}
              h={64}
              label="SOLAR GENERATION"
              sub="Rooftop / carport / ground"
            />

            {/* Inverter */}
            <Node
              x={430}
              y={150}
              w={240}
              h={64}
              label="ENERGY MANAGEMENT"
              sub="Control + optimisation"
            />

            {/* Building */}
            <Node
              x={80}
              y={360}
              w={230}
              h={70}
              label="BUSINESS LOAD"
              sub="Operations / HVAC / machinery"
            />

            {/* Battery */}
            <Node
              x={435}
              y={360}
              w={230}
              h={70}
              label="BATTERY STORAGE"
              sub="Shift / store / discharge"
            />

            {/* EV */}
            <Node
              x={790}
              y={360}
              w={230}
              h={70}
              label="EV CHARGING"
              sub="Fleet / workplace / customers"
            />

            {/* Grid */}
            <Node
              x={820}
              y={20}
              w={200}
              h={64}
              label="GRID"
              sub="Import / export"
            />

            {/* Solar → management */}
            <Flow d="M550 84V150" />

            {/* Grid → management */}
            <Flow d="M820 52H670" dashed />

            {/* Management → building */}
            <Flow d="M500 214C500 280 270 285 195 360" />

            {/* Management → battery */}
            <Flow d="M550 214V360" />

            {/* Management → EV */}
            <Flow d="M600 214C600 280 835 285 905 360" />

            {/* Battery → building */}
            <Flow d="M435 395H310" dashed />

            {/* Battery → EV */}
            <Flow d="M665 395H790" dashed />

            {/* Building ↔ grid */}
            <Flow d="M195 360C180 220 740 130 820 52" dashed />
          </svg>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Solar", "Generate electricity on-site."],
            ["Load", "Use energy where the business needs it."],
            ["Battery", "Store and shift electricity."],
            ["Grid", "Import or export when appropriate."],
          ].map(([title, description]) => (
            <div
              key={title}
              className="border-t border-white/10 pt-4"
            >
              <p className="font-display text-lg font-medium">{title}</p>

              <p className="mt-1 text-sm text-cream/50">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Node({
  x,
  y,
  w,
  h,
  label,
  sub,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub: string;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={16}
        fill="#202428"
        stroke="#3A3F45"
      />

      <text
        x={x + w / 2}
        y={y + 27}
        textAnchor="middle"
        fontSize="13"
        fontWeight="600"
        letterSpacing="1.2"
        fill="#FAF8F4"
      >
        {label}
      </text>

      <text
        x={x + w / 2}
        y={y + 48}
        textAnchor="middle"
        fontSize="11"
        fill="#92989F"
      >
        {sub}
      </text>
    </g>
  );
}

function Flow({
  d,
  dashed = false,
}: {
  d: string;
  dashed?: boolean;
}) {
  return (
    <path
      d={d}
      stroke={dashed ? "#6EA8FE" : "#F2B705"}
      strokeWidth="2"
      strokeDasharray={dashed ? "7 7" : undefined}
      opacity="0.8"
      className="animate-flow"
    />
  );
}