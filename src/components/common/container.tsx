import { cn } from "@/lib/utils";

/** The design's shared 1240px wrapper with its tighter mobile gutter. */
export function Container({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1240px] px-[18px] sm:px-7", className)}
      {...props}
    />
  );
}
