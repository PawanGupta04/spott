import React from "react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function LandingPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden pb-16">
        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center px-6">
          {/* Left content */}
          <div className="text-center sm:text-left">
            <div className="mb-6">
              <span className="text-sm font-light tracking-widest text-gray-500 uppercase">
                spott<span className="text-purple-400">*</span>
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-[0.95] tracking-tight">
              Discover &<br />
              create amazing
              <br />
              <span className="bg-linear-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                events.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-400 mb-10 max-w-lg font-light mx-auto sm:mx-0">
              Whether you&apos;re hosting or attending, Spott makes every
              event memorable. Join our community today.
            </p>

            <Link
              href="/explore"
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-full px-8"
              )}
            >
              Get Started
            </Link>
          </div>

          {/* Right - Hero image */}
          <div className="relative">
            <Image
              src="/hero.png"
              alt="Spott event preview"
              width={700}
              height={700}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </section>
    </div>
  );
}