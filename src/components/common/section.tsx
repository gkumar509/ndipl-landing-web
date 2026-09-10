import { Container } from "@/components/common/container";
import { cn } from "@/lib/utils";

type SectionProps = React.ComponentProps<"section"> & {
  containerClassName?: string;
};

/** A full-bleed band; `className` styles the band, `containerClassName` the content. */
export function Section({
  className,
  containerClassName,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn(className)} {...props}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

/** Small uppercase kicker above nearly every heading in the design. */
export function Eyebrow({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "text-stone text-[11.5px] font-medium tracking-[0.14em] uppercase",
        className,
      )}
      {...props}
    />
  );
}

/** Instrument Serif display heading. */
export function DisplayHeading({
  as: Tag = "h2",
  className,
  ...props
}: React.ComponentProps<"h2"> & { as?: "h1" | "h2" | "h3" }) {
  return (
    <Tag
      className={cn("font-display text-[42px] leading-[1.1]", className)}
      {...props}
    />
  );
}

/** The repeating diagonal hatch used as an image placeholder in the design. */
export function ImagePlaceholder({
  label,
  className,
  ...props
}: React.ComponentProps<"div"> & { label?: string }) {
  return (
    <div
      className={cn(
        "flex items-end bg-[repeating-linear-gradient(135deg,#e9e4d8_0_9px,#f3efe6_9px_18px)]",
        className,
      )}
      {...props}
    >
      {label ? (
        <span className="text-stone p-3.5 font-mono text-[10.5px] tracking-[0.08em]">
          {label}
        </span>
      ) : null}
    </div>
  );
}
