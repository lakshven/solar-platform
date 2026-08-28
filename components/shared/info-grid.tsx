export function InfoGrid({
  eyebrow,
  title,
  items,
}: {
  eyebrow?: string;
  title?: string;
  items: { title: string; description: string }[];
}) {
  return (
    <section className="section">
      <div className="container">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        {title && <h2 className="mt-3 max-w-lg text-balance font-display text-3xl font-medium md:text-4xl">{title}</h2>}
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <div key={item.title} className="border-t border-border pt-4">
              <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 font-display text-lg font-medium">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
