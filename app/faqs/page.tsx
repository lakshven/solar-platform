import { PageHero } from "@/components/shared/page-hero";
import { FaqList } from "@/components/shared/faq-list";

export const metadata = { title: "FAQs — BrightGrid Energy" };

const CATEGORIES = [
  {
    title: "Solar",
    items: [
      { q: "How much roof space do I need?", a: "A typical 4kWp system needs around 20m² of usable, unshaded roof — we confirm this on survey." },
      { q: "Do panels work in winter?", a: "Yes, though generation is lower — UK annual estimates already average across the seasons." },
    ],
  },
  {
    title: "Battery",
    items: [
      { q: "Can I add a battery later?", a: "In most cases, yes, provided your inverter is hybrid-compatible or gets upgraded at the same time." },
      { q: "How long do batteries last?", a: "Most manufacturers warranty 10 years, with meaningful capacity remaining well beyond that." },
    ],
  },
  {
    title: "EV",
    items: [
      { q: "Can I charge a PHEV and a full EV from the same charger?", a: "Yes — a single 7kW home charger works for both, though a PHEV will typically charge fully much sooner." },
    ],
  },
  {
    title: "Heat pumps",
    items: [
      { q: "Do I need to replace my radiators?", a: "Air-to-water systems often need larger radiators or underfloor heating; air-to-air systems don't use radiators at all." },
    ],
  },
  {
    title: "Finance",
    items: [
      { q: "Are you the lender?", a: "No — finance is provided by our finance partners, subject to their eligibility and affordability checks. We install; they handle the credit agreement." },
    ],
  },
  {
    title: "Maintenance",
    items: [
      { q: "What happens if I miss my service window?", a: "You can reschedule up to our stated cutoff before the visit — we'll always confirm this when we notify you." },
    ],
  },
];

export default function FaqsPage() {
  return (
    <>
      <PageHero eyebrow="FAQs" title="Answers by category." description="Can't find what you need? Get in touch and we'll answer directly." />
      {CATEGORIES.map((cat) => (
        <FaqList key={cat.title} title={cat.title} items={cat.items} />
      ))}
    </>
  );
}
