"use client";

import Image from "next/image";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/logo.jpg"
      alt="Dzevida's Catering Logo"
      width={150}
      height={150}
      className={className}
      priority
    />
  );
}
