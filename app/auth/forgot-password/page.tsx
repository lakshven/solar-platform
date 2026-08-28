"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Loader2,
  AlertCircle,
  CheckCircle2,
  Mail,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

function validateEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    value.trim()
  );
}

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(
    null
  );

  const [success, setSuccess] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError(null);

    if (!email.trim()) {
      setError("Please fill this field: Email");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please use a valid email address.");
      return;
    }

    setLoading(true);

    const supabase = createClient();

    const { error } =
      await supabase.auth.resetPasswordForEmail(
        email.trim().toLowerCase(),
        {
          redirectTo: `${window.location.origin}/auth/reset-password`,
        }
      );

    setLoading(false);

    if (error) {
      console.error(
        "Password reset error:",
        error
      );

      if (
        error.status === 429 ||
        error.code === "over_email_send_rate_limit"
      ) {
        setError(
          "Too many password reset requests. Please wait a few minutes before trying again."
        );

        return;
      }

      setError(
        "Unable to send the password reset email right now. Please try again later."
      );

      return;
    }

    /*
     * We intentionally show the same success
     * message regardless of whether the account
     * exists. This prevents email enumeration.
     */
    setSuccess(true);
  }

  if (success) {
    return (
      <section className="section flex justify-center">
        <div className="container flex max-w-md flex-col items-center">
          <Card className="w-full p-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <Mail className="h-6 w-6" />
            </div>

            <h1 className="mt-5 font-display text-2xl font-medium">
              Check your email
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              If an account exists for{" "}
              <span className="font-medium text-foreground">
                {email.trim().toLowerCase()}
              </span>
              , we've sent instructions to reset
              your password.
            </p>

            <div className="mt-5 flex items-start gap-2 rounded-md bg-green-50 p-3 text-left text-sm text-green-700">
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" />

              <span>
                Please check your inbox and follow
                the password reset link.
              </span>
            </div>

            <p className="mt-5 text-sm text-muted-foreground">
              Didn't receive the email? Check your
              spam or junk folder.
            </p>

            <Button
              type="button"
              variant="outline"
              className="mt-6 w-full"
              onClick={() => {
                setSuccess(false);
                setError(null);
              }}
            >
              Try another email
            </Button>

            <p className="mt-5 text-sm text-muted-foreground">
              Remember your password?{" "}
              <Link
                href="/login"
                className="font-medium text-foreground hover:underline"
              >
                Back to sign in
              </Link>
            </p>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="section flex justify-center">
      <div className="container flex max-w-md flex-col items-center">
        <Card className="w-full p-8">
          <h1 className="font-display text-2xl font-medium">
            Forgot your password?
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Enter your email address and we'll
            send you a link to reset your password.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-4"
          >
            {error && (
              <div className="flex items-center gap-2 rounded-md bg-red-50 p-3 text-sm text-red-700">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />

                <span>{error}</span>
              </div>
            )}

            <div>
              <Label htmlFor="email">
                Email
              </Label>

              <Input
                id="email"
                type="email"
                autoComplete="email"
                autoFocus
                placeholder="you@example.com"
                className="mt-1.5"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              variant="accent"
              className="w-full"
              disabled={loading}
            >
              {loading && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}

              {loading
                ? "Sending..."
                : "Send reset link"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Remember your password?{" "}
            <Link
              href="/login"
              className="font-medium text-foreground hover:underline"
            >
              Back to sign in
            </Link>
          </p>
        </Card>
      </div>
    </section>
  );
}