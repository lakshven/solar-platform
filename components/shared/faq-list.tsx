export function FaqList({ title = "Frequently asked questions", items }: { title?: string; items: { q: string; a: string }[] }) {
  return (
    <section className="section">
      <div className="container max-w-3xl">
        <h2 className="font-display text-3xl font-medium">{title}</h2>
        <div className="mt-8 divide-y divide-border">
          {items.map((item) => (
            <div key={item.q} className="py-6">
              <h3 className="font-medium">{item.q}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
