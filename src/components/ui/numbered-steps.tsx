import { MoveRight } from "lucide-react";
import { cx } from "@/lib/classes";
import { BodyCopy } from "./typography";

type Step = { title: string; description: string };

export function NumberedSteps({
  steps,
  inverse = false,
}: {
  steps: readonly Step[];
  inverse?: boolean;
}) {
  return (
    <ol
      className={cx(
        "grid grid-cols-1 divide-y border-y md:grid-cols-2 lg:grid-cols-4 lg:divide-y-0",
        inverse
          ? "divide-mineral/25 border-mineral/25"
          : "divide-sage/30 border-sage/30",
      )}
    >
      {steps.map((step, index) => (
        <li
          key={step.title}
          className={cx(
            "py-6 md:px-6 md:odd:pl-0 md:even:border-l lg:py-7 lg:first:pl-0 lg:last:pr-0 lg:nth-[n+2]:border-l lg:nth-[n+2]:pl-6",
            inverse ? "border-mineral/25" : "border-sage/30",
          )}
        >
          <div
            className={cx(
              "mb-6 flex items-center justify-between gap-4",
              inverse ? "text-copper-light" : "text-sage",
            )}
          >
            <span className="text-4xl font-semibold leading-none tracking-[-0.06em] md:text-5xl">
              {String(index + 1).padStart(2, "0")}
            </span>
            {index < steps.length - 1 && (
              <MoveRight size={23} strokeWidth={1.3} aria-hidden="true" />
            )}
          </div>
          <h3 className="mb-3 text-lg font-semibold leading-snug tracking-tight">
            {step.title}
          </h3>
          <BodyCopy className={inverse ? "text-mineral/75" : "text-muted"}>
            {step.description}
          </BodyCopy>
        </li>
      ))}
    </ol>
  );
}
