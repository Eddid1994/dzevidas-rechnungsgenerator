"use client";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.jpg"
      alt="Dzevida's Catering Logo"
      className={className}
    />
  );
}
