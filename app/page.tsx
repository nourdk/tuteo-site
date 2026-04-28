import Link from "next/link";
import DemoCarousel from "./components/DemoCarousel";
import ComparisonTable from "./components/ComparisonTable";
import ExpandableText from "./components/ExpandableText";
import FeatureShowcase from "./components/FeatureShowcase";


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
          A voice-first AI companion for <span style={{ color: "var(--color-primary)", fontWeight: 700 }}>practicing Spanish</span>, with a real curriculum underneath.
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
      <FeatureShowcase
        id="features"
        sectionTitle="Real conversations. Learning woven in."
        slides={[
          { type: "video", src: "/videos/camera_edited.mp4", poster: "/posters/camera_edited.jpg", hasSound: true, title: "Use what's around you", description: "Snap a photo of something you're curious about and talk about it in Spanish." },
          { type: "video", src: "/videos/conversation_edited2.mp4", poster: "/posters/conversation_edited2.jpg", hasSound: true, title: "Talk about what matters to you", description: "Debate the latest news, geek out about CRISPR technology, or even go on a rant, in Spanish and English, based on your proficiency." },
          { type: "video", src: "/videos/lesson_walkthrough_sound.mp4", poster: "/posters/lesson_walkthrough_sound.jpg", hasSound: true, title: "Lessons woven in", description: <>Catch up with grammar reminders or <span style={{ color: "var(--color-primary)", fontWeight: 700 }}>cheat sheets</span> along the way.</> },
          { type: "video", src: "/videos/exercise_edited.mp4", poster: "/posters/exercise_edited.jpg", hasSound: true, title: "Hone in on your weak spots", description: <>Practice with customized short drills that show up <span style={{ color: "var(--color-primary)", fontWeight: 700 }}>organically</span>.</> },
        ]}
      />

      {/* ── 3. Games, not quizzes ── */}
      <FeatureShowcase
        id="games"
        sectionTitle={<>Interactive games that aren&apos;t drills.</>}
        background="#F5E8DE"
        slides={[
          { type: "video", src: "/videos/detective_edited.mp4", poster: "/posters/detective_edited.jpg", hasSound: true, title: "Solve a mystery in Spanish", description: <>Play detective, investigate clues, interrogate suspects. <span style={{ color: "var(--color-primary)", fontWeight: 700 }}>You&apos;re practicing past tense and it&apos;s fun.</span></> },
          { type: "video", src: "/videos/hangman_edit.mp4", poster: "/posters/hangman_edit.jpg", title: "Classic games, new language", description: "Word games that build vocabulary naturally. Simple, fun, and surprisingly effective." },
        ]}
      />

      {/* ── 4 & 5. Curriculum + Insights ── */}
      <FeatureShowcase
        id="curriculum"
        sectionTitle="A real learning system, not just vibes."
        slides={[
          { type: "video", src: "/videos/journey_edited.mp4", poster: "/posters/journey_edited.jpg", title: "Your learning journey", description: <>See your progress across 100s of grammar topics, organized by difficulty and adapting to what you get wrong. <span style={{ color: "var(--color-primary)", fontWeight: 700 }}>The best curriculum is the one that disappears.</span></> },
          { type: "video", src: "/videos/silent_curriculum.mp4", poster: "/posters/silent_curriculum.jpg", title: "Structured, not rigid", description: <>No fixed roadmap. You just talk, and the curriculum adjusts. <span style={{ color: "var(--color-primary)", fontWeight: 700 }}>Every conversation moves you forward.</span></> },
          { type: "video", src: "/videos/insights_edited.mp4", poster: "/posters/insights_edited.jpg", title: "Insights that actually stick", description: <>Mixing up ser and estar? Tuteo catches the mistakes you don&apos;t even know you&apos;re making, gently, without interrupting the conversation. <span style={{ color: "var(--color-primary)", fontWeight: 700 }}>The kind of insight that never lets you get it wrong again.</span></> },
          { type: "video", src: "/videos/correction_silent_edited.mp4", poster: "/posters/correction_silent_edited.jpg", title: "Insights that actually stick", description: <>Mixing up ser and estar? Tuteo catches the mistakes you don&apos;t even know you&apos;re making, gently, without interrupting the conversation. <span style={{ color: "var(--color-primary)", fontWeight: 700 }}>The kind of insight that never lets you get it wrong again.</span></> },
        ]}
      />

      {/* ── 6. Language Pulse (climax) ── */}
      <FeatureShowcase
        id="pulse"
        sectionTitle="Your Spanish has a pulse. Watch it get stronger."
        background="#F5E8DE"
        slides={[
          { type: "image", src: "/images/language-pulse.png", title: "Real metrics, not streaks", description: "Speaking speed, grammar accuracy, and vocabulary depth will tell you how you're actually improving." },
        ]}
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
                body: "Take a quick placement test or select your level. Complete beginner? Tuteo will mix in English. Already conversational? Tuteo will push you further.",
              },
              {
                step: "2",
                title: "Press call",
                body: "Your AI friend picks up. No scheduling, no awkward intros. Just say hola.",
              },
              {
                step: "3",
                title: "Start talking",
                body: "Talk about your day, debate the news, solve a murder mystery,she adapts in real time, weaves in exercises, and meets you exactly where you are.",
              },
              {
                step: "4",
                title: "Check your vitals",
                body: "See what you nailed, what tripped you up, and why,then check your Language Pulse: speaking speed, accuracy, vocabulary depth.",
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
      <section className="px-5 py-16 sm:py-24" style={{ background: "#F5E8DE" }}>
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
            preview={<>I designed and built Tuteo to explore how AI can transform language learning, from product strategy and user research to design systems and technical implementation.</>}
            full={<><br /><br /> </>}
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
