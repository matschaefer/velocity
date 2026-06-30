"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LockKeyhole, Mail, Phone, User } from "lucide-react";

import { useAuth } from "@/components/auth/AuthProvider";
import { apiFetch, User as UserDto } from "@/lib/api";

type Props = {
  mode: "login" | "register";
  returnUrl?: string;
};

export default function AuthForm({ mode, returnUrl = "/konto" }: Props) {
  const router = useRouter();
  const { refreshUser } = useAuth();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    const form = new FormData(event.currentTarget);

    try {
      await apiFetch<UserDto>(mode === "login" ? "/api/auth/login" : "/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          email: form.get("email"),
          password: form.get("password"),
          firstName: form.get("firstName") || "Velocity",
          lastName: form.get("lastName") || "Kunde",
          phoneNumber: form.get("phoneNumber"),
        }),
      });
      await refreshUser();
      router.replace(returnUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Anmeldung fehlgeschlagen.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const switchHref =
    mode === "login"
      ? `/registrieren?returnUrl=${encodeURIComponent(returnUrl)}`
      : `/login?returnUrl=${encodeURIComponent(returnUrl)}`;

  return (
    <div className="mx-auto grid max-w-5xl overflow-hidden border border-border bg-surface shadow-2xl lg:grid-cols-[0.9fr_1.1fr]">
      <div className="hidden bg-[linear-gradient(145deg,rgba(216,255,43,0.16),transparent_38%),url('/images/hero_background.webp')] bg-cover bg-center p-8 lg:flex lg:flex-col lg:justify-end">
        <p className="text-[11px] uppercase tracking-[0.18em] text-primary">
          Velocity Konto
        </p>
        <h2 className="mt-3 font-display text-6xl leading-none">
          Schneller buchen.
          <br />
          Sicher verwalten.
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4 p-6 sm:p-8">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-primary">
            {mode === "login" ? "Willkommen zurück" : "Konto erstellen"}
          </p>
          <h1 className="mt-2 font-display text-5xl">
            {mode === "login" ? "Anmelden" : "Registrieren"}
          </h1>
          <p className="mt-2 text-sm text-muted">
            {mode === "login"
              ? "Melde dich an, um deine Buchung abzuschließen."
              : "Erstelle dein Konto, danach geht es direkt zurück zur Buchung."}
          </p>
        </div>

        {mode === "register" && (
          <div className="grid gap-3 sm:grid-cols-2">
            <AuthInput icon={<User className="size-4" />} name="firstName" placeholder="Vorname" required />
            <AuthInput icon={<User className="size-4" />} name="lastName" placeholder="Nachname" required />
          </div>
        )}

        <AuthInput icon={<Mail className="size-4" />} name="email" type="email" placeholder="E-Mail" required />

        {mode === "register" && (
          <AuthInput icon={<Phone className="size-4" />} name="phoneNumber" placeholder="Telefonnummer" />
        )}

        <AuthInput
          icon={<LockKeyhole className="size-4" />}
          name="password"
          type="password"
          placeholder="Passwort"
          required
          minLength={8}
        />

        {mode === "register" && (
          <p className="text-xs text-muted">
            Das Passwort braucht mindestens 8 Zeichen, einen Großbuchstaben, einen Kleinbuchstaben und eine Zahl.
          </p>
        )}

        <button
          disabled={isSubmitting}
          className="mt-2 bg-primary px-5 py-3 font-semibold text-primary-foreground transition hover:brightness-95 disabled:opacity-50"
        >
          {isSubmitting
            ? "Bitte warten..."
            : mode === "login"
              ? "Anmelden"
              : "Konto erstellen"}
        </button>

        {error && <p className="border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">{error}</p>}

        <p className="text-center text-sm text-muted">
          {mode === "login" ? "Noch kein Konto?" : "Bereits registriert?"}{" "}
          <Link className="font-semibold text-primary" href={switchHref}>
            {mode === "login" ? "Jetzt registrieren" : "Anmelden"}
          </Link>
        </p>
      </form>
    </div>
  );
}

function AuthInput({
  icon,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { icon: React.ReactNode }) {
  return (
    <label className="flex items-center gap-3 border border-border bg-background px-4 py-3 focus-within:border-primary/70">
      <span className="text-muted">{icon}</span>
      <input
        {...props}
        className={`min-w-0 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted/70 focus:outline-none ${className ?? ""}`}
      />
    </label>
  );
}
