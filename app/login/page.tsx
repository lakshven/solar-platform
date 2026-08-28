"use client";

import { Suspense } from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Loader2,
  AlertCircle,
  CheckCircle2,
  Mail,
} from "lucide-react";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import { createClient } from "@/lib/supabase/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

const MAX_LOGIN_ATTEMPTS = 10;
const RATE_LIMIT_MS = 15 * 60 * 1000; // 15 minutes

type ConfirmationState = {
  email: string;
  visible: boolean;
};

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [confirmation, setConfirmation] =
    useState<ConfirmationState>({
      email: "",
      visible: false,
    });

  const [resending, setResending] = useState(false);

  const [resendMessage, setResendMessage] =
    useState<string | null>(null);

  const [attempts, setAttempts] = useState(0);

  const [lockedUntil, setLockedUntil] =
    useState<number | null>(null);

  /*
   * Restore rate-limit state after page refresh.
   */
  useEffect(() => {
    const storedAttempts = Number(
      sessionStorage.getItem("login_attempts") ?? "0"
    );

    const storedLockedUntil = Number(
      sessionStorage.getItem("login_locked_until") ?? "0"
    );

    if (storedLockedUntil > Date.now()) {
      setAttempts(storedAttempts);
      setLockedUntil(storedLockedUntil);
    } else {
      sessionStorage.removeItem("login_attempts");
      sessionStorage.removeItem("login_locked_until");
    }
  }, []);

  /*
   * Auto-dismiss normal error.
   */
  useEffect(() => {
    if (!error) return;

    const timer = setTimeout(() => {
      setError(null);
    }, 4000);

    return () => clearTimeout(timer);
  }, [error]);

  /*
   * Clear lock when it expires.
   */
  useEffect(() => {
    if (!lockedUntil) return;

    const remaining = lockedUntil - Date.now();

    if (remaining <= 0) {
      clearRateLimit();
      return;
    }

    const timer = setTimeout(() => {
      clearRateLimit();
    }, remaining);

    return () => clearTimeout(timer);
  }, [lockedUntil]);

  function clearRateLimit() {
    setAttempts(0);
    setLockedUntil(null);

    sessionStorage.removeItem("login_attempts");
    sessionStorage.removeItem("login_locked_until");
  }

  function registerFailedAttempt() {
    const nextAttempts = attempts + 1;

    setAttempts(nextAttempts);

    sessionStorage.setItem(
      "login_attempts",
      String(nextAttempts)
    );

    if (nextAttempts >= MAX_LOGIN_ATTEMPTS) {
      const lockUntil =
        Date.now() + RATE_LIMIT_MS;

      setLockedUntil(lockUntil);

      sessionStorage.setItem(
        "login_locked_until",
        String(lockUntil)
      );

      setError(
        "Too many unsuccessful sign-in attempts. Please try again in 15 minutes."
      );

      return true;
    }

    return false;
  }

  function validateEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      value.trim()
    );
  }

  /*
   * Work out where to send someone after a successful sign-in.
   *
   * Employees (rows in `employees`) land on the employee
   * dashboard; everyone else goes to the regular customer
   * dashboard, or wherever `?redirect=` points if it's safe.
   */
  async function resolvePostLoginDestination(
    userId: string
  ) {
    const redirect = searchParams.get("redirect");

    const safeRedirect =
      redirect &&
      redirect.startsWith("/") &&
      !redirect.startsWith("//")
        ? redirect
        : null;

    if (safeRedirect) {
      return safeRedirect;
    }

    const supabase = createClient();

    const { data: employee } = await supabase
      .from("employees")
      .select("id")
      .eq("user_id", userId)
      .maybeSingle();

    return employee ? "/job" : "/dashboard";
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setError(null);
    setResendMessage(null);
    setConfirmation({
      email: "",
      visible: false,
    });

    /*
     * Rate limit
     */
    if (
      lockedUntil &&
      lockedUntil > Date.now()
    ) {
      const minutes = Math.ceil(
        (lockedUntil - Date.now()) / 60000
      );

      setError(
        `Too many unsuccessful sign-in attempts. Please try again in ${minutes} minute${
          minutes === 1 ? "" : "s"
        }.`
      );

      const redirect = searchParams.get("redirect");

      const safeRedirect =
        redirect &&
        redirect.startsWith("/") &&
        !redirect.startsWith("//")
          ? redirect
          : "/dashboard";

      router.replace(safeRedirect);
      router.refresh();

      return;
    }

    /*
     * Validation
     */
    if (!email.trim()) {
      setError("Please fill this field: Email");
      return;
    }

    if (!validateEmail(email)) {
      setError(
        "Please use a valid email address."
      );
      return;
    }

    if (!password) {
      setError(
        "Please fill this field: Password"
      );
      return;
    }

    setLoading(true);

    const supabase = createClient();

    const {
      data,
      error: signInError,
    } =
      await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

    setLoading(false);

    /*
     * Authentication failed
     */
    if (signInError) {
      console.error(
        "Login error:",
        signInError
      );

      const message =
        signInError.message?.toLowerCase() ?? "";

      /*
       * Email hasn't been confirmed.
       *
       * Depending on Supabase version/configuration,
       * this can appear as "Email not confirmed".
       */
      if (
        signInError.code ===
          "email_not_confirmed" ||
        message.includes(
          "email not confirmed"
        )
      ) {
        setConfirmation({
          email: email.trim().toLowerCase(),
          visible: true,
        });

        return;
      }

      /*
       * Invalid credentials.
       *
       * Don't reveal whether the email exists.
       */
      if (
        signInError.status === 400 ||
        message.includes(
          "invalid login credentials"
        ) ||
        message.includes("invalid credentials")
      ) {
        const locked =
          registerFailedAttempt();

        if (!locked) {
          const remaining =
            MAX_LOGIN_ATTEMPTS -
            (attempts + 1);

          setError(
            `Invalid email or password. ${remaining} attempt${
              remaining === 1 ? "" : "s"
            } remaining.`
          );
        }

        return;
      }

      /*
       * Rate limit returned by Supabase.
       */
      if (
        signInError.status === 429 ||
        signInError.code ===
          "over_request_rate_limit"
      ) {
        setError(
          "Too many sign-in attempts. Please wait a few minutes and try again."
        );

        return;
      }

      /*
       * Other errors.
       */
      setError(
        "Unable to sign in right now. Please try again."
      );

      return;
    }

    /*
     * Defensive check.
     */
    if (!data.user) {
      setError(
        "Unable to sign in. Please try again."
      );
      return;
    }

    /*
     * Successfully authenticated.
     *
     * Reset local failed-attempt counter.
     */
    clearRateLimit();

    /*
     * Check whether Supabase has confirmed
     * the email.
     */
    if (!data.user.email_confirmed_at) {
      /*
       * Sign out immediately if somehow an
       * unconfirmed user gets a session.
       */
      await supabase.auth.signOut();

      setConfirmation({
        email:
          data.user.email ??
          email.trim().toLowerCase(),
        visible: true,
      });

      return;
    }

    /*
     * Everything is valid — send employees to their
     * dashboard and everyone else to the customer one.
     */
    const destination = await resolvePostLoginDestination(
      data.user.id
    );

    router.replace(destination);
    router.refresh();
  }

  /*
   * Resend confirmation email
   */
  async function handleResendConfirmation() {
    if (!confirmation.email) {
      return;
    }

    setResending(true);
    setError(null);
    setResendMessage(null);

    const supabase = createClient();

    const { error } =
      await supabase.auth.resend({
        type: "signup",
        email: confirmation.email,
        options: {
          emailRedirectTo:
            `${window.location.origin}/auth/confirm`,
        },
      });

    setResending(false);

    if (error) {
      console.error(
        "Resend confirmation error:",
        error
      );

      if (
        error.status === 429 ||
        error.code ===
          "over_email_send_rate_limit"
      ) {
        setError(
          "Too many confirmation emails have been requested. Please wait a few minutes before trying again."
        );

        return;
      }

      setError(
        "We couldn't send the confirmation email. Please try again later."
      );

      return;
    }

    setResendMessage(
      "Confirmation email sent. Please check your inbox."
    );
  }

  /*
   * Confirmation required screen
   */
  if (confirmation.visible) {
    return (
      <section className="section flex justify-center">
        <div className="container flex max-w-md flex-col items-center">
          <Card className="w-full p-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <Mail className="h-6 w-6" />
            </div>

            <h1 className="mt-5 font-display text-2xl font-medium">
              Confirm your email
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Your account has been created, but
              your email address hasn't been
              confirmed yet.
            </p>

            <p className="mt-3 text-sm font-medium">
              {confirmation.email}
            </p>

            <p className="mt-4 text-sm text-muted-foreground">
              Check your inbox and click the
              confirmation link before signing in.
            </p>

            {resendMessage && (
              <div className="mt-5 flex items-center gap-2 rounded-md bg-green-50 p-3 text-left text-sm text-green-700">
                <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                <span>{resendMessage}</span>
              </div>
            )}

            {error && (
              <div className="mt-5 flex items-center gap-2 rounded-md bg-red-50 p-3 text-left text-sm text-red-700">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Button
              type="button"
              variant="accent"
              className="mt-6 w-full"
              onClick={
                handleResendConfirmation
              }
              disabled={resending}
            >
              {resending && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}

              {resending
                ? "Sending..."
                : "Resend confirmation email"}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="mt-3 w-full"
              onClick={() => {
                setConfirmation({
                  email: "",
                  visible: false,
                });

                setResendMessage(null);
                setError(null);
              }}
            >
              Back to sign in
            </Button>
          </Card>
        </div>
      </section>
    );
  }

  /*
   * Normal login screen
   */
  return (
    <section className="section flex justify-center">
      <div className="container flex max-w-md flex-col items-center">
        <Card className="w-full p-8">
          <h1 className="font-display text-2xl font-medium">
            Welcome back
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to see your energy,
            maintenance and referrals.
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
                className="mt-1.5"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                disabled={loading}
              />
            </div>

            <div>
              <Label htmlFor="password">
                Password
              </Label>

              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                className="mt-1.5"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                disabled={loading}
              />

              <div className="mt-2 text-right">
                <Link
                  href="/auth/forgot-password"
                  className="text-sm font-medium text-foreground hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              variant="accent"
              size="default"
              className="w-full"
              disabled={
                loading ||
                (!!lockedUntil &&
                  lockedUntil > Date.now())
              }
            >
              {loading && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}

              Sign in
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            New to BrightGrid?{" "}
            <Link
              href="/signup"
              className="font-medium text-foreground hover:underline"
            >
              Create an account
            </Link>
          </p>

          <p className="mt-1 text-center text-sm text-muted-foreground">
            Joining as staff?{" "}
            <Link
              href="/signup/employee"
              className="font-medium text-foreground hover:underline"
            >
              Employee sign up
            </Link>
          </p>
        </Card>
      </div>
    </section>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginPageContent />
    </Suspense>
  );
}