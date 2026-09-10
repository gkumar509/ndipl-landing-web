"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { useMemo } from "react";
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
  buildContactSchema,
  type ContactEnquiry,
  type ContactInput,
} from "@/lib/contact-schema";
import { countryOptions } from "@/lib/countries";
import { cn } from "@/lib/utils";

const RECAPTCHA_ACTION = "contact_submit";

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
  const t = useTranslations("form");
  const locale = useLocale();
  const { execute } = useRecaptcha();

  const countries = useMemo(() => countryOptions(locale), [locale]);

  const schema = useMemo(
    () =>
      buildContactSchema({
        name: t("errors.name"),
        email: t("errors.email"),
        country: t("errors.country"),
        interest: t("errors.interest"),
        message: t("errors.message"),
      }),
    [t],
  );

  const {
    register,
    control: formControl,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput, unknown, ContactEnquiry>({
    resolver: zodResolver(schema),
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
            message: msgs?.[0] ?? t("errors.invalid"),
          });
        }
        toast.error(data.error ?? t("genericError"));
        return;
      }

      reset();
      toast.success(t("success"));
    } catch {
      toast.error(t("genericError"));
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
        {t("heading")}
      </p>

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        <Field data-invalid={!!errors.name}>
          <label htmlFor="contact-name" className={fieldLabel}>
            {t("name")}
          </label>
          <Input
            id="contact-name"
            autoComplete="name"
            placeholder={t("namePlaceholder")}
            aria-invalid={!!errors.name}
            className={control}
            {...register("name")}
          />
          <FieldError errors={errors.name ? [errors.name] : undefined} />
        </Field>

        <Field data-invalid={!!errors.company}>
          <label htmlFor="contact-company" className={fieldLabel}>
            {t("company")}
          </label>
          <Input
            id="contact-company"
            autoComplete="organization"
            placeholder={t("companyPlaceholder")}
            aria-invalid={!!errors.company}
            className={control}
            {...register("company")}
          />
          <FieldError errors={errors.company ? [errors.company] : undefined} />
        </Field>

        <Field data-invalid={!!errors.email}>
          <label htmlFor="contact-email" className={fieldLabel}>
            {t("email")}
          </label>
          <Input
            id="contact-email"
            type="email"
            autoComplete="email"
            placeholder={t("emailPlaceholder")}
            aria-invalid={!!errors.email}
            className={control}
            dir="ltr"
            {...register("email")}
          />
          <FieldError errors={errors.email ? [errors.email] : undefined} />
        </Field>

        <Field data-invalid={!!errors.country}>
          <span className={fieldLabel}>{t("country")}</span>
          <Controller
            control={formControl}
            name="country"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  className={cn(control, "w-full")}
                  aria-label={t("country")}
                  aria-invalid={!!errors.country}
                >
                  <SelectValue placeholder={t("countryPlaceholder")} />
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
          <span className={fieldLabel}>{t("interest")}</span>
          <Controller
            control={formControl}
            name="interest"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  className={cn(control, "w-full")}
                  aria-label={t("interest")}
                  aria-invalid={!!errors.interest}
                >
                  <SelectValue placeholder={t("interestPlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  {INTEREST_KEYS.map((key) => (
                    <SelectItem key={key} value={key}>
                      {t(`interests.${key}`)}
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
            {t("quantity")}
          </label>
          <Input
            id="contact-quantity"
            placeholder={t("quantityPlaceholder")}
            aria-invalid={!!errors.quantity}
            className={control}
            {...register("quantity")}
          />
          <FieldError errors={errors.quantity ? [errors.quantity] : undefined} />
        </Field>

        <Field className="sm:col-span-2" data-invalid={!!errors.message}>
          <label htmlFor="contact-message" className={fieldLabel}>
            {t("message")}
          </label>
          <Textarea
            id="contact-message"
            rows={4}
            placeholder={t("messagePlaceholder")}
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
              {t("catalogue")}
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
          {isSubmitting ? t("submitting") : t("submit")}
        </Button>

        <p className="text-stone text-[11.5px] leading-[1.5] sm:col-span-2">
          {t.rich("recaptchaNotice", {
            privacy: (chunks) => (
              <a
                className="underline underline-offset-2"
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noreferrer"
              >
                {chunks}
              </a>
            ),
            terms: (chunks) => (
              <a
                className="underline underline-offset-2"
                href="https://policies.google.com/terms"
                target="_blank"
                rel="noreferrer"
              >
                {chunks}
              </a>
            ),
          })}
        </p>
      </div>
    </form>
  );
}
