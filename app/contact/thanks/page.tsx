import Link from "next/link";

export const metadata = {
  title: "Thanks — Tuteo",
};

export default function ThanksPage() {
  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
        style={{
          background: "#FFFFFF",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        }}
      >
        <div className="mx-auto max-w-6xl flex items-center justify-between px-5 py-4">
          <Link
            href="/"
            className="text-2xl font-bold"
            style={{ color: "var(--color-primary)" }}
          >
            Tuteo
          </Link>
          <Link
            href="/"
            className="text-sm font-medium hover:opacity-70 transition-opacity"
            style={{ color: "var(--color-text)" }}
          >
            &larr; Back to home
          </Link>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center px-5 pt-32 pb-20 text-center">
        <h1
          className="text-3xl sm:text-4xl font-bold mb-4"
          style={{ color: "var(--color-text)" }}
        >
          Message sent!
        </h1>
        <p
          className="text-base sm:text-lg leading-relaxed mb-8 max-w-md"
          style={{ color: "var(--color-text-muted)" }}
        >
          Thanks for reaching out. I&apos;ll get back to you soon.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-3 rounded-xl text-base font-semibold text-white transition-transform hover:scale-[1.03] active:scale-[0.97]"
          style={{ background: "var(--color-primary)" }}
        >
          Back to home
        </Link>
      </main>
    </>
  );
}
