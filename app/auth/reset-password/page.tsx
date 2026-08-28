"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Loader2,
  AlertCircle,
  CheckCircle2,
  LockKeyhole,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState<string | null>(
    null
  );

  const [success, setSuccess] = useState(false);

  const [sessionReady, setSessionReady] =
    useState(false);

  useEffect(() => {
    const supabase = createClient();

    let mounted = true;

    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!mounted) return;

      if (!session) {
        setError(
          "This password reset link is invalid or has expired. Please request a new one."
        );

        setLoading(false);
        return;
      }

      setSessionReady(true);
      setLoading(false);
    }

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!mounted) return;

        if (
          event === "PASSWORD_RECOVERY" &&
          session
        ) {
          setSessionReady(true);
          setLoading(false);
          setError(null);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  function validatePassword(value: string) {
    return value.length >= 8;
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError(null);

    if (!sessionReady) {
      setError(
        "Your password reset session is no longer valid. Please request a new reset link."
      );
      return;
    }

    if (!password) {
      setError(
        "Please fill this field: New password"
      );
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "Your password must be at least 8 characters long."
      );
      return;
    }

    if (!confirmPassword) {
      setError(
        "Please fill this field: Confirm password"
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSaving(true);

    const supabase = createClient();

    const { error } =
      await supabase.auth.updateUser({
        password,
      });

    setSaving(false);

    if (error) {
      console.error(
        "Password update error:",
        error
      );

      setError(
        "We couldn't update your password. Please request a new reset link and try again."
      );

      return;
    }

    setSuccess(true);
  }

  if (loading) {
    return (
      <section className="section flex justify-center">
        <div className="container flex max-w-md flex-col items-center">
          <Card className="flex w-full flex-col items-center p-8 text-center">
            <Loader2 className="h-7 w-7 animate-spin" />

            <p className="mt-4 text-sm text-muted-foreground">
              Verifying your password reset link...
            </p>
          </Card>
        </div>
      </section>
    );
  }

  if (success) {
    return (
      <section className="section flex justify-center">
        <div className="container flex max-w-md flex-col items-center">
          <Card className="w-full p-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <CheckCircle2 className="h-6 w-6" />
            </div>

            <h1 className="mt-5 font-display text-2xl font-medium">
              Password updated
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Your password has been successfully
              updated. You can now sign in with your
              new password.
            </p>

            <Button
              asChild
              variant="accent"
              className="mt-6 w-full"
            >
              <Link href="/login">
                Continue to sign in
              </Link>
            </Button>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="section flex justify-center">
      <div className="container flex max-w-md flex-col items-center">
        <Card className="w-full p-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <LockKeyhole className="h-6 w-6" />
          </div>

          <h1 className="mt-5 text-center font-display text-2xl font-medium">
            Create a new password
          </h1>

          <p className="mt-1 text-center text-sm text-muted-foreground">
            Choose a strong password for your
            BrightGrid account.
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
              <Label htmlFor="password">
                New password
              </Label>

              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                className="mt-1.5"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                disabled={saving}
              />

              <p className="mt-1.5 text-xs text-muted-foreground">
                Must be at least 8 characters.
              </p>
            </div>

            <div>
              <Label htmlFor="confirmPassword">
                Confirm password
              </Label>

              <Input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                className="mt-1.5"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                disabled={saving}
              />
            </div>

            <Button
              type="submit"
              variant="accent"
              className="w-full"
              disabled={saving || !sessionReady}
            >
              {saving && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}

              {saving
                ? "Updating password..."
                : "Update password"}
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
}