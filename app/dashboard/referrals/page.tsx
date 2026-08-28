"use client";

import { API_URL } from "@/lib/api-url";

import { useCallback, useEffect, useState } from "react";
import {
  CheckCircle2,
  Copy,
  Gift,
  Loader2,
  Share2,
  Users,
  MousePointerClick,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type ReferralStatus =
  | "pending"
  | "contacted"
  | "booked"
  | "installation_completed"
  | "reward_issued"
  | "cancelled";

type ReferralLink = {
  code: string;
  clicks: number;
  firstClickedAt: string | null;
  lastClickedAt: string | null;
};

type ReferralLead = {
  id: string;
  referrer_customer_id: string;

  referred_user_id: string | null;
  referred_name: string | null;
  referred_email: string | null;

  referral_code: string;

  status: ReferralStatus;

  discount_amount: number;
  discount_currency: string;
  discount_applied: boolean;
  discount_applied_at: string | null;

  installation_id: string | null;

  contacted_at: string | null;
  booked_at: string | null;
  installation_completed_at: string | null;

  reward_issued: boolean;
  reward_issued_at: string | null;

  notes: string | null;

  created_at: string;
  updated_at: string;
};

type ReferralReward = {
  id: string;
  referral_id: string;
  customer_id: string;

  reward_type: string;
  status:
    | "pending"
    | "available"
    | "redeemed"
    | "expired"
    | "cancelled";

  issued_at: string | null;
  redeemed_at: string | null;
  expires_at: string | null;

  maintenance_session_id: string | null;

  notes: string | null;

  created_at: string;
  updated_at: string;
};

const statusLabels: Record<ReferralStatus, string> = {
  pending: "Awaiting installation",
  contacted: "Contacted",
  booked: "Installation booked",
  installation_completed: "Installation completed",
  reward_issued: "Reward issued",
  cancelled: "Cancelled",
};

function getStatusStep(status: ReferralStatus) {
  switch (status) {
    case "pending":
      return 1;
    case "contacted":
      return 2;
    case "booked":
      return 3;
    case "installation_completed":
      return 4;
    case "reward_issued":
      return 5;
    case "cancelled":
      return 0;
    default:
      return 1;
  }
}

export default function MyReferralsPage() {
  const [link, setLink] = useState<ReferralLink | null>(null);
  const [referrals, setReferrals] = useState<ReferralLead[]>([]);
  const [rewards, setRewards] = useState<ReferralReward[]>([]);

  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [copied, setCopied] = useState(false);
  const [sharing, setSharing] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/referral/mine`, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to load your referrals.");
      }

      setLink((result.link ?? null) as ReferralLink | null);
      setReferrals((result.referrals ?? []) as ReferralLead[]);
      setRewards((result.rewards ?? []) as ReferralReward[]);
    } catch (err) {
      console.error("Referral dashboard load error:", err);

      setError(
        err instanceof Error ? err.message : "Unable to load your referrals."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function generateLink() {
    setGenerating(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/referral`, { method: "POST" });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to create your referral link.");
      }

      if (typeof result.referralCode === "string") {
        setLink({
          code: result.referralCode,
          clicks: 0,
          firstClickedAt: null,
          lastClickedAt: null,
        });
      }

      await loadData();
    } catch (err) {
      console.error("Generate referral link error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to create your referral link."
      );
    } finally {
      setGenerating(false);
    }
  }

  function getReferralUrl(code: string) {
    if (typeof window === "undefined") return "";
    return `${window.location.origin}/ref/${code}`;
  }

  async function copyLink() {
    if (!link) return;

    const url = getReferralUrl(link.code);
    if (!url) return;

    try {
      await globalThis.navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy referral link failed:", err);
      setError("We couldn't copy the referral link.");
    }
  }

  async function shareLink() {
    if (!link) return;

    const url = getReferralUrl(link.code);
    if (!url) return;

    setSharing(true);

    try {
      if (typeof navigator !== "undefined" && "share" in navigator) {
        await navigator.share({
          title: "BrightGrid solar referral",
          text: "Get £300 off an eligible BrightGrid solar installation.",
          url,
        });
        return;
      }

      await globalThis.navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        return;
      }

      console.error("Share referral failed:", err);
      setError("We couldn't share the referral link.");
    } finally {
      setSharing(false);
    }
  }

  const availableRewards = rewards.filter(
    (reward) => reward.status === "available"
  );

  const completedReferrals = referrals.filter(
    (referral) =>
      referral.status === "installation_completed" ||
      referral.status === "reward_issued"
  ).length;

  const referralUrl = link ? getReferralUrl(link.code) : "";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-medium">My referrals</h1>

        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Share your link with as many friends and family as you like.
          Everyone who signs up through it can receive £300 off an eligible
          solar installation, and you earn a free maintenance session for
          each one whose installation is completed.
        </p>
      </div>

      {/* Error */}
      {error && (
        <Card className="border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </Card>
      )}

      {/* Your link */}
      <Card className="p-6">
        {loading ? (
          <div className="flex items-center justify-center py-6">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : link ? (
          <>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-lg font-medium">
                  Your referral link
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  The same link works for everyone you send it to.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button type="button" variant="outline" onClick={copyLink}>
                  {copied ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  {copied ? "Copied" : "Copy link"}
                </Button>

                <Button
                  type="button"
                  variant="accent"
                  onClick={shareLink}
                  disabled={sharing}
                >
                  {sharing ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Share2 className="h-4 w-4" />
                  )}
                  Share
                </Button>
              </div>
            </div>

            <div className="mt-4 rounded-md bg-muted p-3">
              <p className="break-all font-mono text-xs">{referralUrl}</p>
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <MousePointerClick className="h-4 w-4" />
              <span>
                {link.clicks} click{link.clicks === 1 ? "" : "s"} so far
              </span>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center py-6 text-center">
            <Gift className="h-8 w-8 text-muted-foreground" />

            <h2 className="mt-3 font-display text-lg font-medium">
              Get your referral link
            </h2>

            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Generate your personal link once, then share it with as many
              people as you like.
            </p>

            <Button
              type="button"
              variant="accent"
              className="mt-5"
              onClick={generateLink}
              disabled={generating}
            >
              {generating && <Loader2 className="h-4 w-4 animate-spin" />}
              {generating ? "Creating..." : "Get my referral link"}
            </Button>
          </div>
        )}
      </Card>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-medium">{referrals.length}</p>
              <p className="text-xs text-muted-foreground">People referred</p>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-medium">{completedReferrals}</p>
              <p className="text-xs text-muted-foreground">
                Installations completed
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
              <Gift className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-medium">{availableRewards.length}</p>
              <p className="text-xs text-muted-foreground">
                Maintenance rewards
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Reward information */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
            <Gift className="h-5 w-5" />
          </div>
          <h2 className="mt-4 font-display text-lg font-medium">
            Your reward
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            For each referred customer whose BrightGrid installation is
            completed, you receive{" "}
            <span className="font-medium text-foreground">
              one free solar maintenance session
            </span>
            . Refer more people, earn more rewards.
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <h2 className="mt-4 font-display text-lg font-medium">
            Their benefit
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Everyone who signs up through your link receives{" "}
            <span className="font-medium text-foreground">£300 off</span> an
            eligible BrightGrid solar installation.
          </p>
        </Card>
      </div>

      {/* Available rewards banner */}
      {availableRewards.length > 0 && (
        <Card className="border-green-200 bg-green-50 p-6">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-700" />
            <div>
              <h2 className="font-medium text-green-900">
                You have{" "}
                {availableRewards.length === 1
                  ? "a free maintenance reward"
                  : `${availableRewards.length} free maintenance rewards`}
              </h2>
              <p className="mt-1 text-sm text-green-800">
                {availableRewards.length === 1
                  ? "One of your referrals completed their installation and your reward is available."
                  : "These are available whenever you're ready to book a maintenance visit."}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Leads */}
      <Card className="p-6">
        <div>
          <h2 className="font-display text-lg font-medium">
            People you've referred
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Everyone who's signed up through your link, and where they're at.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : referrals.length === 0 ? (
          <div className="mt-6 rounded-lg border border-dashed p-8 text-center">
            <Users className="mx-auto h-8 w-8 text-muted-foreground" />
            <h3 className="mt-3 font-medium">No referrals yet</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Share your link above with someone who may be interested in
              solar — they'll show up here as soon as they sign up.
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-5">
            {referrals.map((referral) => {
              const progress = getStatusStep(referral.status);

              return (
                <div key={referral.id} className="rounded-lg border p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium">
                      {referral.referred_name ||
                        referral.referred_email ||
                        "New referral"}
                    </span>

                    <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
                      {statusLabels[referral.status]}
                    </span>
                  </div>

                  {referral.referred_email && referral.referred_name && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {referral.referred_email}
                    </p>
                  )}

                  {/* Stats */}
                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Their discount
                      </p>
                      <p className="mt-1 font-medium">
                        £{referral.discount_amount}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">
                        Discount status
                      </p>
                      <p className="mt-1 font-medium">
                        {referral.discount_applied ? "Applied" : "Reserved"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">
                        Your reward
                      </p>
                      <p className="mt-1 font-medium">
                        {referral.reward_issued ? "Issued" : "Pending"}
                      </p>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mt-6">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((step) => (
                        <div
                          key={step}
                          className={`h-1.5 flex-1 rounded-full ${
                            step <= progress ? "bg-foreground" : "bg-muted"
                          }`}
                        />
                      ))}
                    </div>

                    <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
                      <span>Signed up</span>
                      <span>Contacted</span>
                      <span>Booked</span>
                      <span>Installed</span>
                      <span>Reward</span>
                    </div>
                  </div>

                  {referral.reward_issued && (
                    <div className="mt-5 flex items-center gap-2 rounded-md bg-green-50 p-3 text-sm text-green-700">
                      <Gift className="h-4 w-4 flex-shrink-0" />
                      <span>
                        Your free maintenance reward for this referral has
                        been issued.
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}