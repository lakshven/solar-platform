"use client";

import { API_URL } from "@/lib/api-url";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

type Status = "confirming" | "success" | "error";

export default function ConfirmPage() {
  const router = useRouter();

  const [status, setStatus] =
    useState<Status>("confirming");

  const [error, setError] =
    useState<string | null>(null);

  // Prevent the confirmation request from running twice.
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) {
      return;
    }

    hasStarted.current = true;

    async function confirmEmail() {
      try {
        const hash = window.location.hash;

        if (!hash) {
          setError("Invalid confirmation link.");
          setStatus("error");
          return;
        }

        const params = new URLSearchParams(
          hash.substring(1)
        );

        const accessToken =
          params.get("access_token");

        const refreshToken =
          params.get("refresh_token");

        const type = params.get("type");

        if (
          !accessToken ||
          !refreshToken ||
          type !== "signup"
        ) {
          setError("Invalid confirmation link.");
          setStatus("error");
          return;
        }

        const response = await fetch(
          `${API_URL}/api/auth/confirm`,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              access_token: accessToken,
              refresh_token: refreshToken,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setError(
            data.error ??
              "This confirmation link is invalid or has expired."
          );

          setStatus("error");
          return;
        }

        // Confirmation succeeded.
        setStatus("success");

        // Remove sensitive tokens from the browser URL.
        window.history.replaceState(
          {},
          document.title,
          "/auth/confirm"
        );

        // Give the user a moment to see success.
        setTimeout(() => {
          router.replace(data.destination ?? "/dashboard");
          router.refresh();
        }, 800);
      } catch (err) {
        console.error(
          "Confirmation error:",
          err
        );

        setError(
          "Unable to confirm your email."
        );

        setStatus("error");
      }
    }

    confirmEmail();
  }, [router]);

  if (status === "confirming") {
    return (
      <section className="section flex justify-center">
        <div className="container flex max-w-md flex-col items-center text-center">
          <Loader2 className="h-8 w-8 animate-spin" />

          <h1 className="mt-4 font-display text-2xl font-medium">
            Confirming your email
          </h1>

          <p className="mt-2 text-muted-foreground">
            Please wait while we activate your
            account.
          </p>
        </div>
      </section>
    );
  }

  if (status === "success") {
    return (
      <section className="section flex justify-center">
        <div className="container flex max-w-md flex-col items-center text-center">
          <CheckCircle2 className="h-10 w-10 text-leaf" />

          <h1 className="mt-4 font-display text-2xl font-medium">
            Email confirmed
          </h1>

          <p className="mt-2 text-muted-foreground">
            Your account has been successfully
            activated.
          </p>

          <p className="mt-4 text-sm text-muted-foreground">
            Redirecting you to your dashboard...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="section flex justify-center">
      <div className="container flex max-w-md flex-col items-center text-center">
        <AlertCircle className="h-10 w-10 text-red-600" />

        <h1 className="mt-4 font-display text-2xl font-medium">
          Confirmation failed
        </h1>

        <p className="mt-2 text-muted-foreground">
          {error}
        </p>
      </div>
    </section>
  );
}