import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ChevronDown } from 'lucide-react'
import RailScene from './RailScene'

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current) return
    const els = contentRef.current.children
    gsap.fromTo(
      els,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.5 },
    )
  }, [])

  return (
    <section id="accueil" className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <RailScene />

      <div ref={contentRef} className="relative z-10 mx-auto max-w-5xl px-6 pt-24 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-electric/30 bg-electric/5 px-4 py-1.5">
          <span className="status-online h-2 w-2 rounded-full bg-green-400" />
          <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-electric-bright">
            Rail Intelligence — System Online
          </span>
        </div>

        <h1 className="font-display text-5xl font-bold leading-tight tracking-tight md:text-7xl lg:text-8xl">
          <span className="text-gradient">Rénover.</span>
          <br />
          <span className="text-white">Renforcer.</span>
          <br />
          <span className="text-slate-400">Prolonger.</span>
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-lg text-slate-400 md:text-xl">
          Nous redonnons une seconde vie aux infrastructures ferroviaires grâce à une
          technologie de réparation de précision.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#solutions"
            className="font-display group relative overflow-hidden rounded bg-electric px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:glow-blue"
          >
            <span className="relative z-10">Découvrir nos solutions</span>
          </a>
          <a
            href="#assistant"
            className="font-display rounded border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-slate-200 transition-all hover:border-electric/40 hover:bg-electric/10"
          >
            Demander une expertise
          </a>
        </div>
      </div>

      <a
        href="#controle"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce text-slate-500 transition-colors hover:text-electric-bright"
        aria-label="Défiler"
      >
        <ChevronDown size={28} />
      </a>
    </section>
  )
}
