import type { ReactNode } from "react";

export function Rail({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="px-5 font-display text-[1.1875rem] font-semibold text-marfim">{heading}</h2>
      <div className="rail flex gap-3 overflow-x-auto px-5 pb-1" style={{ scrollSnapType: "x proximity" }}>
        {children}
      </div>
    </section>
  );
}
