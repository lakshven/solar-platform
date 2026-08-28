"use client";

import { API_URL } from "@/lib/api-url";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Loader2,
  AlertCircle,
  HardHat,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

/*
 * Job titles offered at signup.
 *
 * Adjust this list to match whatever roles
 * BrightGrid actually hires for. An admin can
 * still change an employee's title later from
 * the `employees` table.
 */
const JOB_TITLES = [
  "Solar Installer",
  "Lead Installer",
  "Electrician",
  "Site Surveyor",
  "Project Manager",
  "Warehouse / Logistics",
] as const;

export default function EmployeeSignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [jobTitle, setJobTitle] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);

  useEffect(() => {
    if (!error) return;

    const timer = setTimeout(() => setError(null), 4000);
    return () => clearTimeout(timer);
  }, [error]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const trimmedName = fullName.trim();
    const normalizedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedName) {
      setError("Please fill this field: Full name");
      return;
    }

    if (!normalizedEmail || !emailRegex.test(normalizedEmail)) {
      setError("Please use a valid email address.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (!jobTitle) {
      setError("Please select a job title.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/signup/employee`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: trimmedName,
          email: normalizedEmail,
          password,
          jobTitle,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Unable to create your account.");
        setLoading(false);
        return;
      }

      setLoading(false);
      setNeedsConfirmation(true);
    } catch (err) {
      console.error("Employee signup request failed:", err);
      setLoading(false);
      setError("Unable to connect to the server. Please try again.");
    }
  }

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
            Click the link in the email, then sign in from the same
            page everyone else uses — we&apos;ll take you straight to
            your employee dashboard.
          </p>

          <Button asChild variant="outline" className="mt-6">
            <Link href="/login">Back to sign in</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="section flex justify-center">
      <div className="container flex max-w-md flex-col items-center">
        <Card className="w-full p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10">
              <HardHat className="h-5 w-5" />
            </div>

            <div>
              <h1 className="font-display text-2xl font-medium">
                Join the crew
              </h1>
              <p className="text-sm text-muted-foreground">
                Set up your BrightGrid employee account.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {error && (
              <div className="flex items-center gap-2 rounded-md bg-red-50 p-3 text-sm text-red-700">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <Label htmlFor="fullName">Full name</Label>
              <Input
                id="fullName"
                name="fullName"
                autoComplete="name"
                className="mt-1.5"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="mt-1.5"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            <div>
              <Label htmlFor="jobTitle">Job title</Label>
              <select
                id="jobTitle"
                name="jobTitle"
                className="mt-1.5 flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                disabled={loading}
                required
              >
                <option value="" disabled>
                  Select a job title
                </option>
                {JOB_TITLES.map((title) => (
                  <option key={title} value={title}>
                    {title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                className="mt-1.5"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading ? "Creating account..." : "Create employee account"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already on the team?{" "}
            <Link
              href="/login"
              className="font-medium text-foreground hover:underline"
            >
              Sign in
            </Link>
          </p>

          <p className="mt-1 text-center text-sm text-muted-foreground">
            Homeowner?{" "}
            <Link
              href="/signup"
              className="font-medium text-foreground hover:underline"
            >
              Create a customer account
            </Link>
          </p>
        </Card>
      </div>
    </section>
  );
}