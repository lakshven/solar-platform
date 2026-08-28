"use client";

import { API_URL } from "@/lib/api-url";

import { Suspense } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Loader2,
  AlertCircle,
  Gift,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

function SignupPageContent() {
  const searchParams = useSearchParams();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [needsConfirmation, setNeedsConfirmation] =
    useState(false);

  const [isReferral, setIsReferral] = useState(false);
  const [referralCode, setReferralCode] = useState<string | null>(
    null
  );

  /*
   * Detect referral link.
   *
   * IMPORTANT:
   * This is only for displaying the referral UI.
   *
   * The actual referral attribution is performed
   * server-side using the HTTP-only cookie:
   *
   * brightgrid_referral
   */
  useEffect(() => {
    const ref = searchParams.get("ref");

    if (!ref) {
      setIsReferral(false);
      setReferralCode(null);
      return;
    }

    const normalizedRef = ref.trim().toUpperCase();

    if (/^BG-[A-Z0-9]+$/.test(normalizedRef)) {
      setIsReferral(true);
      setReferralCode(normalizedRef);
    } else {
      setIsReferral(false);
      setReferralCode(null);
    }
  }, [searchParams]);

  /*
   * Auto-dismiss errors.
   */
  useEffect(() => {
    if (!error) return;

    const timer = setTimeout(() => {
      setError(null);
    }, 4000);

    return () => clearTimeout(timer);
  }, [error]);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError(null);

    const trimmedName = fullName.trim();

    const normalizedEmail =
      email.trim().toLowerCase();

    /*
     * Client validation
     */

    if (!trimmedName) {
      setError(
        "Please fill this field: Full name"
      );
      return;
    }

    if (!normalizedEmail) {
      setError(
        "Please fill this field: Email"
      );
      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      setError(
        "Please use a valid email address."
      );
      return;
    }

    if (password.length < 8) {
      setError(
        "Password must be at least 8 characters."
      );
      return;
    }

    setLoading(true);

    try {
      /*
       * IMPORTANT:
       *
       * We intentionally DO NOT send the referral
       * code from the browser.
       *
       * The server reads:
       *
       * brightgrid_referral
       *
       * from the HTTP-only cookie.
       */
      const response = await fetch(
        `${API_URL}/api/auth/signup`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            fullName: trimmedName,
            email: normalizedEmail,
            password,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        setError(
          result.error ||
            "Unable to create your account."
        );

        setLoading(false);
        return;
      }

      /*
       * Account successfully created.
       *
       * The API handles:
       *
       * - Supabase Auth
       * - customer creation
       * - referral attribution
       * - referred lead creation
       */
      setLoading(false);

      setNeedsConfirmation(true);
    } catch (error) {
      console.error(
        "Signup request failed:",
        error
      );

      setLoading(false);

      setError(
        "Unable to connect to the server. Please try again."
      );
    }
  }

  /*
   * Confirmation screen
   */

  if (needsConfirmation) {
    return (
      <section className="section flex justify-center">
        <div className="container flex max-w-md flex-col items-center text-center">

          <CheckCircle2 className="h-10 w-10 text-leaf" />

          <h1 className="mt-4 font-display text-2xl font-medium">
            Check your inbox
          </h1>

          <p className="mt-2 text-muted-foreground">
            We&apos;ve sent a confirmation link to{" "}
            <strong>{email}</strong>.
          </p>

          <p className="mt-2 text-sm text-muted-foreground">
            Click the link in the email to activate
            your account.
          </p>

          {isReferral && (
            <div className="mt-5 w-full rounded-lg border border-accent/20 bg-accent/5 p-4 text-left">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10">
                  <Gift className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-medium">
                    Referral discount reserved
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Your referral has been recorded.
                    Once your account is confirmed,
                    you&apos;ll be eligible for{" "}
                    <span className="font-medium text-foreground">
                      £300 off
                    </span>{" "}
                    an eligible BrightGrid solar
                    installation.
                  </p>

                  {referralCode && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      Referral code:{" "}
                      <span className="font-mono font-medium text-foreground">
                        {referralCode}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          <Button
            asChild
            variant="outline"
            className="mt-6"
          >
            <Link href="/login">
              Back to sign in
            </Link>
          </Button>

        </div>
      </section>
    );
  }

  /*
   * Signup form
   */

  return (
    <section className="section flex justify-center">
      <div className="container flex max-w-md flex-col items-center">

        <Card className="w-full p-8">

          <h1 className="font-display text-2xl font-medium">
            Create your account
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Track your energy, maintenance and
            referrals in one place.
          </p>

          {isReferral && (
            <div className="mt-5 rounded-lg border border-accent/20 bg-accent/5 p-4">
              <div className="flex items-start gap-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10">
                  <Gift className="h-5 w-5" />
                </div>

                <div className="min-w-0">

                  <p className="text-sm font-medium">
                    You&apos;ve been referred to BrightGrid
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Create your account and receive{" "}
                    <span className="font-medium text-foreground">
                      £300 off
                    </span>{" "}
                    an eligible solar installation.
                  </p>

                  {referralCode && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      Referral code:{" "}
                      <span className="font-mono font-medium text-foreground">
                        {referralCode}
                      </span>
                    </p>
                  )}

                </div>
              </div>
            </div>
          )}

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
              <Label htmlFor="fullName">
                Full name
              </Label>

              <Input
                id="fullName"
                name="fullName"
                autoComplete="name"
                className="mt-1.5"
                value={fullName}
                onChange={(e) =>
                  setFullName(e.target.value)
                }
                disabled={loading}
                required
              />
            </div>

            <div>
              <Label htmlFor="email">
                Email
              </Label>

              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="mt-1.5"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                disabled={loading}
                required
              />
            </div>

            <div>
              <Label htmlFor="password">
                Password
              </Label>

              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                className="mt-1.5"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                disabled={loading}
                required
                minLength={8}
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
                ? "Creating account..."
                : "Create account"}
            </Button>

          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}

            <Link
              href="/login"
              className="font-medium text-foreground hover:underline"
            >
              Sign in
            </Link>
          </p>

          <p className="mt-1 text-center text-sm text-muted-foreground">
            Employee?{" "}

            <Link
              href="/signup/employee"
              className="font-medium text-foreground hover:underline"
            >
              Join
            </Link>
          </p>

        </Card>

      </div>
    </section>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={null}>
      <SignupPageContent />
    </Suspense>
  );
}