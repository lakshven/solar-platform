import { Calculator } from "@/components/calculator/calculator";

export const metadata = { title: "Check Your Savings — BrightGrid Energy" };

export default function CheckYourSavingsPage() {
  return (
    <section className="section">
      <div className="container max-w-4xl">
        <p className="eyebrow">Check your savings</p>
        <h1 className="mt-3 text-balance font-display text-3xl font-medium md:text-4xl">
          What could your home become?
        </h1>
        <p className="mt-3 max-w-lg text-muted-foreground">
          Answer a few questions and we&apos;ll model seven system options against your own energy use —
          no obligation, no pushy sales call.
        </p>

        <div className="mt-10">
          <Calculator />
        </div>
      </div>
    </section>
  );
}
