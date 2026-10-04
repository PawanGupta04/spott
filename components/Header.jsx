"use client";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import React, { useState } from "react";
import Link from "next/link";
import { Building, Crown, Plus, Ticket } from "lucide-react";
import { SignInButton, useAuth, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import { BarLoader } from "react-spinners";
import { useStoreUser } from "@/hooks/use-store-user";
import { useOnboarding } from "@/hooks/use-onboarding";
import OnboardingModal from "./onboarding-modal";
import SearchLocationBar from "./search-location-bar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import UpgradeModal from "./upgrade-modal";
import { Badge } from "./ui/badge";

export default function Header() {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const { isLoading } = useStoreUser();
  const { showOnboarding, handleOnboardingComplete, handleOnboardingSkip } =
    useOnboarding();

  const { has } = useAuth();
  const hasPro = has?.({ plan: "pro" });

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-xl z-20 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          
          {/* Left: Logo & Badge */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/spott.png"
              alt="Spott logo"
              width={120}
              height={36}
              className="h-8 w-auto object-contain"
              priority
            />
            {hasPro && (
              <Badge className="bg-gradient-to-r from-pink-500 to-orange-500 gap-1 text-white text-xs px-2 py-0.5 font-medium">
                <Crown className="w-3 h-3" />
                Pro
              </Badge>
            )}
          </Link>

          {/* Center: Search Bar (Desktop Only) */}
          <div className="hidden md:flex flex-1 max-w-md lg:max-w-lg items-center justify-center">
            <SearchLocationBar />
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {!hasPro && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowUpgradeModal(true)}
                className="text-muted-foreground hover:text-foreground"
              >
                Pricing
              </Button>
            )}

            <Link
              href="/explore"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "text-muted-foreground hover:text-foreground"
              )}
            >
              Explore
            </Link>

            <Authenticated>
              {/* Create Event Button */}
              <Link
                href="/create-event"
                className={cn(
                  buttonVariants({ size: "sm" }),
                  "gap-1.5 px-3 font-medium bg-purple-600 hover:bg-purple-700 text-white transition-colors"
                )}
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Create Event</span>
              </Link>

              {/* User Button */}
              <div className="flex items-center justify-center pl-1">
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8 rounded-full ring-1 ring-border hover:ring-purple-500 transition-all",
                    },
                  }}
                >
                  <UserButton.MenuItems>
                    <UserButton.Link
                      label="My Tickets"
                      labelIcon={<Ticket size={16} />}
                      href="/my-tickets"
                    />
                    <UserButton.Link
                      label="My Events"
                      labelIcon={<Building size={16} />}
                      href="/my-events"
                    />
                    <UserButton.Action label="manageAccount" />
                  </UserButton.MenuItems>
                </UserButton>
              </div>
            </Authenticated>

            <Unauthenticated>
              <SignInButton mode="modal">
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white font-medium">
                  Sign In
                </Button>
              </SignInButton>
            </Unauthenticated>
          </div>
        </div>

        {/* Mobile Search & Location Bar */}
        <div className="md:hidden border-t px-4 py-2.5 bg-background/95">
          <SearchLocationBar />
        </div>

        {/* Global Loading Bar */}
        {isLoading && (
          <div className="absolute bottom-0 left-0 w-full">
            <BarLoader width={"100%"} color="#a855f7" />
          </div>
        )}
      </nav>

      {/* Onboarding & Upgrade Modals */}
      <OnboardingModal
        isOpen={showOnboarding}
        onClose={handleOnboardingSkip}
        onComplete={handleOnboardingComplete}
      />

      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        trigger="header"
      />
    </>
  );
}