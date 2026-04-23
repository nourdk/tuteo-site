import Link from "next/link";
import DemoCarousel from "./components/DemoCarousel";
import ComparisonTable from "./components/ComparisonTable";
import ExpandableText from "./components/ExpandableText";


/* ───── Shared components ───── */

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md" style={{ background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
      <div className="mx-auto max-w-6xl flex items-center justify-between px-5 py-4">
        <Link href="/" className="text-2xl font-bold" style={{ color: "var(--color-primary)" }}>
          Tuteo
        </Link>
        <div className="hidden sm:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: "var(--color-text)" }}>Features</a>
          <a href="#how-it-works" className="text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: "var(--color-text)" }}>How It Works</a>
          <a href="#about" className="text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: "var(--color-text)" }}>About</a>
          <Link
            href="/contact"
            className="inline-flex items-center px-5 py-2 rounded-xl text-sm font-semibold text-white transition-transform hover:scale-[1.03] active:scale-[0.97]"
            style={{ background: "var(--color-primary)" }}
          >
            Get in Touch
          </Link>
        </div>
        <Link
          href="/contact"
          className="sm:hidden inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold text-white"
          style={{ background: "var(--color-primary)" }}
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}


/* ───── Feature section component ───── */

function FeatureSection({
  id,
  title,
  description,
  media,
  reverse = false,
  background,
}: {
  id: string;
  title: React.ReactNode;
  description: React.ReactNode;
  media: React.ReactNode;
  reverse?: boolean;
  background?: string;
}) {
  return (
    <section id={id} className="px-5 py-10 sm:py-20 md:py-28" style={background ? { background } : undefined}>
      <div className="mx-auto max-w-6xl">
        <div
          className={`flex flex-col items-center gap-5 sm:gap-10 md:gap-16 ${
            reverse ? "md:flex-row-reverse" : "md:flex-row"
          }`}
        >
          <div className="flex-shrink-0 flex justify-center">
            {media}
          </div>
          <div className="flex-1 text-left max-w-lg">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-medium mb-3 sm:mb-4"
              style={{ color: "var(--color-text)" }}
            >
              {title}
            </h2>
            <p
              className="text-sm sm:text-base md:text-lg leading-relaxed"
              style={{ color: "var(--color-text-muted)" }}
            >
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───── Page ───── */

export default function Home() {
  return (
    <>
      <Navbar />

      {/* ── 1. Hero ── */}
      <section className="relative flex flex-col items-center justify-center text-center px-5 pt-40 pb-24 sm:pt-52 sm:pb-36 min-h-[70vh] rounded-b-[3rem]" style={{ background: "linear-gradient(180deg, #F5E8ED 0%, #F9F0DA 100%)" }}>
        <div className="mb-8">
          <svg width="110" height="96" viewBox="0 0 110 96" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="28" width="10" height="40" rx="5" fill="#C47850" />
            <rect x="22" y="8" width="10" height="80" rx="5" fill="#C47850" />
            <rect x="44" y="18" width="10" height="60" rx="5" fill="#C47850" />
            <rect x="66" y="2" width="10" height="92" rx="5" fill="#C47850" />
            <rect x="88" y="30" width="10" height="36" rx="5" fill="#C47850" />
          </svg>
        </div>
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-medium leading-tight max-w-2xl"
          style={{ color: "var(--color-text)" }}
        >
          Just Press Call.
        </h1>
        <p
          className="mt-6 text-lg sm:text-xl max-w-xl leading-relaxed"
          style={{ color: "var(--color-text-muted)" }}
        >
          A voice-first AI companion for <span style={{ color: "var(--color-primary)", fontWeight: 700 }}>practicing Spanish</span> — with a real curriculum underneath.
        </p>
        <div className="mt-10">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-base font-semibold transition-transform hover:scale-[1.03] active:scale-[0.97]"
            style={{ background: "var(--color-primary)", color: "#FFFFFF" }}
          >
            Join the waitlist
          </Link>
        </div>
      </section>

      {/* ── 2. Real conversations ── */}
      <FeatureSection
        id="features"
        title={<>Real conversations.<br />Learning woven in.</>}
        description={<>Talk about your day, debate the news, geek out about CRISPR technology — <em>in Spanish and English based on your proficiency</em>. Grammar reminders and short drills appear organically.<br /><span style={{ color: "var(--color-primary)", fontWeight: 700, fontSize: "1.1em" }}>It&apos;s your life, in a new language.</span></>}
        media={<DemoCarousel screens={[
          { type: "video", src: "/videos/conversation_edited2.mp4", poster: "/posters/conversation_edited2.jpg", label: "Conversation demo", hasSound: true },
          { type: "video", src: "/videos/camera_edited.mp4", poster: "/posters/camera_edited.jpg", label: "Camera demo", hasSound: true },
          { type: "video", src: "/videos/lesson_walkthrough_sound.mp4", poster: "/posters/lesson_walkthrough_sound.jpg", label: "Lesson walkthrough", hasSound: true },
          { type: "video", src: "/videos/exercise_edited.mp4", poster: "/posters/exercise_edited.jpg", label: "Exercise demo", hasSound: true },
        ]} delay={3000} />}
      />

      {/* ── 3. Games, not quizzes ── */}
      <FeatureSection
        id="games"
        title={<>Interactive games<br className="hidden md:block" /> that aren&apos;t drills.</>}
        description={<>Solve a murder mystery. Go on a mission at a Mexican market. Build a story together — in Spanish. <span style={{ color: "var(--color-primary)", fontWeight: 700, fontSize: "1.1em" }}>You&apos;re practicing past tense and you don&apos;t even notice.</span></>}
        media={<DemoCarousel screens={[
          { type: "video", src: "/videos/detective_edited.mp4", poster: "/posters/detective_edited.jpg", label: "Detective game demo", hasSound: true },
          { type: "video", src: "/videos/hangman_edit.mp4", poster: "/posters/hangman_edit.jpg", label: "Hangman game demo" },
        ]} />}
        reverse
        background="#FFF8F3"
      />

      {/* ── 4 & 5. Curriculum + Insights (shared demo) ── */}
      <section id="curriculum" className="relative px-5 py-10 sm:py-20 md:py-28 overflow-hidden">
        {/* Carousel centered absolutely on desktop */}
        <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <DemoCarousel screens={[
            { type: "video", src: "/videos/journey_edited.mp4", poster: "/posters/journey_edited.jpg", label: "Insights review" },
            { type: "video", src: "/videos/silent_curriculum.mp4", poster: "/posters/silent_curriculum.jpg", label: "Curriculum tracking" },
            { type: "video", src: "/videos/correction_silent_edited.mp4", poster: "/posters/correction_silent_edited.jpg", label: "Correction details" },
          ]} />
        </div>

        <div className="mx-auto max-w-6xl relative">
          {/* Section 4 — left half */}
          <div className="md:w-[33%] text-left mb-8 sm:mb-16 md:mb-24">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-medium mb-3 sm:mb-4"
              style={{ color: "var(--color-text)" }}
            >
              A real learning system,<br className="hidden md:block" /> not just vibes.
            </h2>
            <p
              className="text-sm sm:text-base md:text-lg leading-relaxed"
              style={{ color: "var(--color-text-muted)" }}
            >
              100s of grammar topics, organized by difficulty, adapting to what you get wrong. Without a fixed roadmap. You just talk, and it adjusts. <span style={{ color: "var(--color-primary)", fontWeight: 700, fontSize: "1.1em" }}>The best curriculum is the one that disappears.</span>
            </p>
          </div>

          {/* Carousel for mobile */}
          <div className="flex md:hidden justify-center mb-8 sm:mb-16">
            <DemoCarousel screens={[
            { type: "video", src: "/videos/journey_edited.mp4", poster: "/posters/journey_edited.jpg", label: "Insights review" },
            { type: "video", src: "/videos/silent_curriculum.mp4", poster: "/posters/silent_curriculum.jpg", label: "Curriculum tracking" },
            { type: "video", src: "/videos/correction_silent_edited.mp4", poster: "/posters/correction_silent_edited.jpg", label: "Correction details" },
          ]} />
          </div>

          {/* Section 5 — right half */}
          <div className="md:w-[33%] md:ml-auto text-left">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-medium mb-3 sm:mb-4"
              style={{ color: "var(--color-text)" }}
            >
              Insights that actually stick.
            </h2>
            <p
              className="text-sm sm:text-base md:text-lg leading-relaxed"
              style={{ color: "var(--color-text-muted)" }}
            >
              Mixing up <em>ser</em> and <em>estar</em>? Tuteo catches the mistakes you don&apos;t even know you&apos;re making — gently, without interrupting the conversation.<br /><span style={{ color: "var(--color-primary)", fontWeight: 700, fontSize: "1.1em" }}>The kind of insight that makes you never get it wrong again.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── 6. Language Pulse (climax) ── */}
      <FeatureSection
        id="pulse"
        title={<>Your Spanish has a pulse.<br className="hidden md:block" /> Watch it get stronger.</>}
        description={<><span style={{ color: "var(--color-primary)", fontWeight: 700, fontSize: "1.1em" }}>We measure your Spanish, not your streak.</span> Speaking speed. Grammar accuracy. Vocabulary depth. Real metrics that tell you if you&apos;re actually improving.</>}
        media={<DemoCarousel screens={[
          { type: "image", src: "/images/language-pulse.png", label: "Language Pulse dashboard" },
        ]} />}
        background="#FFF8F3"
      />

      {/* ── 7. How It Works ── */}
      <section id="how-it-works" className="px-5 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <h2
            className="text-3xl sm:text-4xl font-medium text-center mb-14"
            style={{ color: "var(--color-text)" }}
          >
            How it works
          </h2>

          <div className="flex flex-col gap-8">
            {[
              {
                step: "1",
                title: "Find your level",
                body: "Take a quick placement test or select your level. Complete beginner? She'll mix in English. Already conversational? She'll push you further.",
              },
              {
                step: "2",
                title: "Press call",
                body: "Your AI friend picks up. No scheduling, no awkward intros. Just say hola.",
              },
              {
                step: "3",
                title: "Start talking",
                body: "Talk about your day, debate the news, solve a murder mystery — she adapts in real time, weaves in exercises, and meets you exactly where you are.",
              },
              {
                step: "4",
                title: "Check your vitals",
                body: "See what you nailed, what tripped you up, and why — then check your Language Pulse: speaking speed, accuracy, vocabulary depth.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex gap-5 items-start py-5"
                style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
              >
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold"
                  style={{ border: "2px solid var(--color-primary-light)", color: "var(--color-primary)" }}
                >
                  {item.step}
                </div>
                <div>
                  <h3
                    className="text-lg font-medium mb-1"
                    style={{ color: "var(--color-text)" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Comparison ── */}
      <section className="px-5 py-16 sm:py-24" style={{ background: "#FFF8F3" }}>
        <div className="mx-auto max-w-4xl">
          <h2
            className="text-3xl sm:text-4xl font-medium text-center mb-12"
            style={{ color: "var(--color-text)" }}
          >
            Not another Duolingo.
          </h2>

          <ComparisonTable />
        </div>
      </section>

      {/* ── 9. About ── */}
      <section id="about" className="px-5 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl text-left">
          <p
            className="text-sm font-semibold tracking-wide uppercase mb-3"
            style={{ color: "var(--color-primary)" }}
          >
            About
          </p>
          <h2
            className="text-3xl sm:text-4xl font-medium mb-6"
            style={{ color: "var(--color-text)" }}
          >
            Hi, I&apos;m the person behind Tuteo
          </h2>
          <ExpandableText
            preview={<>I designed and built Tuteo to explore how AI can transform language learning — from product strategy and user research to design systems and technical implementation.</>}
            full={<><br /><br />I find that the best AI products find the moments and places where AI capabilities magnify outcomes, and align everything around them. While building Tuteo I was constantly looking for AI magical moments that enhance my product (and not clutter it). In the end I came to the conclusion that AI magic is not only big things — like getting AI to code on the fly and do everything under the sun for you. It&apos;s also making the little things your product solves for users so much better. And there is a lot of work that goes into aligning AI with the experience you want users to have, as well as your goals and metrics. Simply put, AI magic today is a feeling — a realization you were impacted by AI in a way you didn&apos;t expect, for the better. It could have made a normally difficult task feel surprisingly easy, or solved a problem exactly at its core, faster than ever.<br /><br />For language learning, it could be catching a common mistake you make and sharing the insight that finally sticks. It could be pulling you into a conversation only to realize after it&apos;s done that you actually enjoyed it, and spoke more Spanish than you expected. I&apos;m looking forward to iterating and seeing where these products will take us.</>}
          />
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3 rounded-xl text-base font-semibold text-white transition-transform hover:scale-[1.03] active:scale-[0.97]"
            style={{ background: "var(--color-primary)" }}
          >
            Let&apos;s talk
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="px-5 py-8 text-center">
        <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
          &copy; {new Date().getFullYear()} Tuteo
        </p>
      </footer>
    </>
  );
}
