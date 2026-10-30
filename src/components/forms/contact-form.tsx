"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useRecaptcha } from "@/hooks/use-recaptcha";
import {
  INTEREST_KEYS,
  INTEREST_LABELS,
  contactSchema,
  type ContactEnquiry,
  type ContactInput,
} from "@/lib/contact-schema";
import { countryOptions } from "@/lib/countries";
import { cn } from "@/lib/utils";

const RECAPTCHA_ACTION = "contact_submit";
const GENERIC_ERROR = "Your enquiry could not be sent. Please try again.";
const countries = countryOptions();

const fieldLabel =
  "text-stone mb-[7px] block text-[11.5px] font-medium tracking-[0.06em] uppercase";
const control = "h-[46px] rounded-[10px] text-sm";

export function ContactForm({
  className,
  defaults,
}: {
  className?: string;
  /** Prefill from a link, e.g. the "Enquire" buttons on the products page. */
  defaults?: Partial<ContactInput>;
}) {
  const { execute } = useRecaptcha();

  const {
    register,
    control: formControl,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput, unknown, ContactEnquiry>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      country: undefined,
      interest: "product",
      quantity: "",
      message: "",
      sendCatalogue: false,
      ...defaults,
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      const recaptchaToken = await execute(RECAPTCHA_ACTION);

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, recaptchaToken }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        fieldErrors?: Partial<Record<keyof ContactInput, string[]>>;
      };

      if (!res.ok) {
        for (const [field, msgs] of Object.entries(data.fieldErrors ?? {})) {
          setError(field as keyof ContactInput, {
            message: msgs?.[0] ?? "Invalid value",
          });
        }
        toast.error(data.error ?? GENERIC_ERROR);
        return;
      }

      reset();
      toast.success(
        "Thanks — your enquiry is with our export desk. We reply within one working day.",
      );
    } catch {
      toast.error(GENERIC_ERROR);
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={cn(
        "rounded-[20px] border border-[rgba(20,32,26,.09)] bg-white p-[30px]",
        className,
      )}
    >
      <p className="font-display mb-[22px] text-[26px] leading-[1.2]">
        Enquiry form
      </p>

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        <Field data-invalid={!!errors.name}>
          <label htmlFor="contact-name" className={fieldLabel}>
            Full name
          </label>
          <Input
            id="contact-name"
            autoComplete="name"
            placeholder="Your name"
            aria-invalid={!!errors.name}
            className={control}
            {...register("name")}
          />
          <FieldError errors={errors.name ? [errors.name] : undefined} />
        </Field>

        <Field data-invalid={!!errors.company}>
          <label htmlFor="contact-company" className={fieldLabel}>
            Company
          </label>
          <Input
            id="contact-company"
            autoComplete="organization"
            placeholder="Company name"
            aria-invalid={!!errors.company}
            className={control}
            {...register("company")}
          />
          <FieldError errors={errors.company ? [errors.company] : undefined} />
        </Field>

        <Field data-invalid={!!errors.email}>
          <label htmlFor="contact-email" className={fieldLabel}>
            Work email
          </label>
          <Input
            id="contact-email"
            type="email"
            autoComplete="email"
            placeholder="name@company.com"
            aria-invalid={!!errors.email}
            className={control}
            dir="ltr"
            {...register("email")}
          />
          <FieldError errors={errors.email ? [errors.email] : undefined} />
        </Field>

        <Field data-invalid={!!errors.country}>
          <span className={fieldLabel}>Country</span>
          <Controller
            control={formControl}
            name="country"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  className={cn(control, "w-full")}
                  aria-label="Country"
                  aria-invalid={!!errors.country}
                >
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent className="max-h-72">
                  <SelectGroup>
                    {countries.priority.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                  <SelectSeparator />
                  <SelectGroup>
                    {countries.rest.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          <FieldError errors={errors.country ? [errors.country] : undefined} />
        </Field>

        <Field data-invalid={!!errors.interest}>
          <span className={fieldLabel}>Interest</span>
          <Controller
            control={formControl}
            name="interest"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  className={cn(control, "w-full")}
                  aria-label="Interest"
                  aria-invalid={!!errors.interest}
                >
                  <SelectValue placeholder="Product enquiry" />
                </SelectTrigger>
                <SelectContent>
                  {INTEREST_KEYS.map((key) => (
                    <SelectItem key={key} value={key}>
                      {INTEREST_LABELS[key]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <FieldError errors={errors.interest ? [errors.interest] : undefined} />
        </Field>

        <Field data-invalid={!!errors.quantity}>
          <label htmlFor="contact-quantity" className={fieldLabel}>
            Quantity
          </label>
          <Input
            id="contact-quantity"
            placeholder="In metric tonnes"
            aria-invalid={!!errors.quantity}
            className={control}
            {...register("quantity")}
          />
          <FieldError errors={errors.quantity ? [errors.quantity] : undefined} />
        </Field>

        <Field className="sm:col-span-2" data-invalid={!!errors.message}>
          <label htmlFor="contact-message" className={fieldLabel}>
            Message
          </label>
          <Textarea
            id="contact-message"
            rows={4}
            placeholder="Product, grade, quantity, packing and destination port"
            aria-invalid={!!errors.message}
            className="min-h-[110px] rounded-[10px] text-sm"
            {...register("message")}
          />
          <FieldError errors={errors.message ? [errors.message] : undefined} />
        </Field>

        <Controller
          control={formControl}
          name="sendCatalogue"
          render={({ field }) => (
            <label className="text-body flex items-start gap-2.5 text-[12.5px] leading-[1.5] sm:col-span-2">
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                className="mt-px"
              />
              Send me the product catalogue and certification pack
            </label>
          )}
        />

        <Button
          type="submit"
          variant="brand"
          size="block"
          disabled={isSubmitting}
          className="sm:col-span-2"
        >
          {isSubmitting ? "Sending…" : "Submit enquiry"}
        </Button>

        <p className="text-stone text-[11.5px] leading-[1.5] sm:col-span-2">
          Protected by reCAPTCHA — the Google{" "}
          <a
            className="underline underline-offset-2"
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noreferrer"
          >
            Privacy Policy
          </a>{" "}
          and{" "}
          <a
            className="underline underline-offset-2"
            href="https://policies.google.com/terms"
            target="_blank"
            rel="noreferrer"
          >
            Terms of Service
          </a>{" "}
          apply.
        </p>
      </div>
    </form>
  );
}
