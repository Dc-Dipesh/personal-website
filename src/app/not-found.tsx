import Link from "next/link";
import { profile } from "@/data/profile";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] flex-col justify-center">
      <div className="shell">
        <p className="label text-sand">Error 404</p>
        <h1 className="display mt-6 max-w-[16ch] text-[clamp(2.4rem,8vw,6rem)]">
          This page took a different path.
        </h1>
        <p className="mt-6 max-w-[46ch] text-paper-dim">
          Nothing lives at this address. The story starts at the beginning.
        </p>
        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
          <Link
            href="/"
            className="border-b border-line pb-1 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-paper transition-colors hover:border-sand hover:text-sand"
          >
            Back to the start ↗
          </Link>
          <a
            href={`mailto:${profile.email}`}
            className="border-b border-line pb-1 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-paper-dim transition-colors hover:border-sand hover:text-sand"
          >
            {profile.email}
          </a>
        </div>
      </div>
    </main>
  );
}
