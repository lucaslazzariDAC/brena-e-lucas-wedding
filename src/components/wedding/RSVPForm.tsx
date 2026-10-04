import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useLang } from "@/i18n";
import { supabase } from "@/integrations/supabase/client";

export function RSVPForm() {
  const { t } = useLang();
  // O formulário nunca é desabilitado, mesmo após o prazo.
  const closed = false;

  const schema = z.object({
    name: z.string().trim().min(2, t("rsvp.err_name")).max(120, t("rsvp.err_name")),
    guests: z.coerce.number().int().min(1, t("rsvp.err_guests_min")).max(20, t("rsvp.err_guests_max")),
    phone: z.string().trim().min(8, t("rsvp.err_phone")).max(30),
    companions: z.string().trim().max(500).optional().or(z.literal("")),
    message: z.string().trim().max(500).optional().or(z.literal("")),
  });
  type FormInput = z.input<typeof schema>;
  type FormOutput = z.output<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormInput, unknown, FormOutput>({
    resolver: zodResolver(schema) as never,
    defaultValues: { name: "", guests: 1, phone: "", companions: "", message: "" },
  });

  const guestsCount = Number(watch("guests")) || 1;

  const onSubmit = async (data: FormOutput) => {
    const { error } = await supabase.from("rsvps").insert({
      full_name: data.name,
      phone: data.phone,
      guests_count: data.guests,
      companions: data.companions || null,
      message: data.message || null,
    });
    if (error) {
      toast.error(t("rsvp.err_save"), { description: error.message });
      return;
    }
    toast.success(t("rsvp.success"), { description: t("rsvp.success_desc") });
    reset();
  };

  if (closed) {
    return (
      <div className="mx-auto max-w-xl rounded-sm border border-silver/30 bg-navy/40 p-8 text-center backdrop-blur-sm">
        <p className="font-serif text-xl text-paper">
          {t("rsvp.closed", { date: t("rsvp.deadline_label") })}
        </p>
        <p className="mt-3 text-sm text-silver">{t("rsvp.closed_help")}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl">
      <p className="mb-6 text-center text-xs uppercase tracking-[0.3em] text-silver">
        {t("rsvp.confirm_until", { date: t("rsvp.deadline_label") })}
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 rounded-sm border border-silver/30 bg-navy/40 p-6 backdrop-blur-sm sm:p-8"
      >
        <Field label={t("rsvp.name")} error={errors.name?.message}>
          <input
            type="text"
            {...register("name")}
            className="rsvp-input"
            placeholder={t("rsvp.name_placeholder")}
          />
        </Field>
        <Field label={t("rsvp.guests")} error={errors.guests?.message}>
          <input
            type="number"
            min={1}
            max={20}
            {...register("guests")}
            className="rsvp-input"
          />
        </Field>
        {guestsCount > 1 && (
          <Field label={t("rsvp.companions")} error={errors.companions?.message}>
            <textarea
              rows={Math.min(guestsCount, 5)}
              {...register("companions")}
              className="rsvp-input resize-none"
              placeholder={t("rsvp.companions_placeholder")}
            />
          </Field>
        )}
        <Field label={t("rsvp.phone")} error={errors.phone?.message}>
          <input
            type="tel"
            {...register("phone")}
            className="rsvp-input"
            placeholder="(00) 00000-0000"
          />
        </Field>
        <Field label={t("rsvp.message")} error={errors.message?.message}>
          <textarea
            rows={3}
            {...register("message")}
            className="rsvp-input resize-none"
            placeholder={t("rsvp.message_placeholder")}
          />
        </Field>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-sm border border-silver bg-silver/10 px-6 py-4 text-xs uppercase tracking-[0.3em] text-paper transition-all hover:bg-silver/20 hover:shadow-[0_0_24px_rgba(183,183,183,0.35)] disabled:opacity-60"
        >
          {isSubmitting ? t("rsvp.submitting") : t("rsvp.submit")}
        </button>
      </form>
      <style>{`
        .rsvp-input {
          width: 100%;
          background: rgba(13, 27, 42, 0.5);
          border: 1px solid rgba(183, 183, 183, 0.3);
          color: #f2eee6;
          padding: 0.75rem 1rem;
          border-radius: 2px;
          font-family: var(--font-sans);
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .rsvp-input:focus {
          border-color: #4fa3c3;
          box-shadow: 0 0 0 2px rgba(79, 163, 195, 0.2);
        }
        .rsvp-input::placeholder { color: rgba(242, 238, 230, 0.4); }
      `}</style>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-silver">
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-300">{error}</span>}
    </label>
  );
}
