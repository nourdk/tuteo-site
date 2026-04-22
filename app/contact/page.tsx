import Link from "next/link";

export const metadata = {
  title: "Contact — Tuteo",
  description: "Get in touch to discuss product, AI, or language learning.",
};

export default function ContactPage() {
  return (
    <>
      {/* Navbar */}
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

      <main className="flex-1 flex flex-col items-center justify-center px-5 pt-32 pb-20">
        <div className="w-full max-w-lg">
          <h1
            className="text-3xl sm:text-4xl font-bold mb-3 text-center"
            style={{ color: "var(--color-text)" }}
          >
            Let&apos;s connect
          </h1>

          <form
            action="https://formspree.io/f/mbdqzkpa"
            method="POST"
            className="flex flex-col gap-5"
          >
            <input type="hidden" name="_next" value="https://tuteo-site.netlify.app/contact/thanks" />
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-1.5"
                style={{ color: "var(--color-text)" }}
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Your name"
                className="tuteo-input w-full px-4 py-3 rounded-xl text-base outline-none transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-1.5"
                style={{ color: "var(--color-text)" }}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="you@example.com"
                className="tuteo-input w-full px-4 py-3 rounded-xl text-base outline-none transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-1.5"
                style={{ color: "var(--color-text)" }}
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="What's on your mind?"
                className="tuteo-input w-full px-4 py-3 rounded-xl text-base outline-none transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full px-8 py-3 rounded-xl text-base font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              style={{ background: "var(--color-primary)" }}
            >
              Send message
            </button>
          </form>

          <p
            className="text-xs text-center mt-6"
            style={{ color: "var(--color-text-muted)" }}
          >
            Or reach me directly at{" "}
            <a
              href="mailto:tuteoai@gmail.com"
              className="underline"
              style={{ color: "var(--color-primary)" }}
            >
              tuteoai@gmail.com
            </a>
          </p>
        </div>
      </main>
    </>
  );
}
