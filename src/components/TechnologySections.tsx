import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Cpu, Flame, ScanLine } from 'lucide-react'
import { technologies, timelineSteps } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

const iconMap = {
  scan: ScanLine,
  cpu: Cpu,
  flame: Flame,
}

export function Technology() {
  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (!sectionRef.current) return
    const cards = sectionRef.current.querySelectorAll('.tech-card')
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      },
    )
  }, [])

  return (
    <section id="technologie" ref={sectionRef} className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-electric-bright">
            Technologie
          </p>
          <h2 className="font-display mt-4 text-4xl font-bold text-white md:text-5xl">
            Précision industrielle
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Installation mobile automatisée CNC + vision laser 2D/3D + torche CMT — le futur
            de la maintenance ferroviaire, disponible aujourd&apos;hui.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {technologies.map((tech, i) => {
            const Icon = iconMap[tech.icon as keyof typeof iconMap]
            return (
              <button
                key={tech.id}
                type="button"
                className={`tech-card glass-panel rounded-lg p-8 text-left transition-all ${
                  active === i ? 'border-electric/40 glow-blue' : 'hover:border-white/10'
                }`}
                onMouseEnter={() => setActive(i)}
              >
                <div
                  className={`mb-6 inline-flex rounded-lg p-3 transition-colors ${
                    active === i ? 'bg-electric/20 text-electric-bright' : 'bg-white/5 text-slate-400'
                  }`}
                >
                  <Icon size={28} />
                </div>
                <h3 className="font-display text-xl font-semibold text-white">{tech.title}</h3>
                <p className="mt-1 text-sm font-medium text-electric-bright">{tech.subtitle}</p>
                <p className="mt-4 text-sm leading-relaxed text-slate-400">{tech.description}</p>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function Timeline() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    if (!sectionRef.current) return
    gsap.fromTo(
      sectionRef.current.querySelector('.timeline-track'),
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      },
    )
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % timelineSteps.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-electric-bright">
            Processus
          </p>
          <h2 className="font-display mt-4 text-4xl font-bold text-white md:text-5xl">
            De la détection au contrôle
          </h2>
        </div>

        <div className="relative">
          <div className="timeline-track absolute left-0 right-0 top-8 hidden h-0.5 origin-left bg-gradient-to-r from-electric via-weld to-green-400 md:block" />

          <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-6">
            {timelineSteps.map((step, i) => (
              <div
                key={step.step}
                className={`relative text-center transition-all duration-500 ${
                  activeStep === i ? 'scale-105' : 'opacity-60'
                }`}
              >
                <div
                  className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 font-display text-lg font-bold transition-all ${
                    activeStep === i
                      ? 'border-electric bg-electric/20 text-electric-bright glow-blue'
                      : 'border-white/10 bg-carbon-light text-slate-500'
                  }`}
                >
                  {step.step}
                </div>
                <h3 className="font-display text-sm font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-xs text-slate-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function Equipment() {
  const items = [
    { name: 'Unité mobile CNC', spec: 'Usinage automatisé terrain' },
    { name: 'Système vision laser', spec: 'Scan 2D/3D haute précision' },
    { name: 'Torche CMT automatisée', spec: 'Rechargement contrôlé' },
    { name: 'Meuleuses rail', spec: 'Profilage gorge correctif' },
    { name: 'Contrôle thermique', spec: 'Préchauffage régulé' },
  ]

  return (
    <section id="equipements" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-electric-bright">
            Équipements
          </p>
          <h2 className="font-display mt-4 text-4xl font-bold text-white md:text-5xl">
            Parc technique mobile
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <div
              key={item.name}
              className="glass-panel group flex items-center gap-4 rounded-lg p-5 transition-all hover:border-electric/20"
            >
              <span className="font-display text-2xl font-bold text-white/10 transition-colors group-hover:text-electric/30">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-display font-semibold text-white">{item.name}</h3>
                <p className="text-sm text-slate-400">{item.spec}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Safety() {
  return (
    <section id="qualite" className="relative py-24 photo-band">
      <div className="mx-auto max-w-7xl px-6">
        <div className="glass-panel glow-blue rounded-xl p-8 md:p-12">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-electric-bright">
                Sécurité & Qualité
              </p>
              <h2 className="font-display mt-4 text-3xl font-bold text-white md:text-4xl">
                Confiance industrielle
              </h2>
              <p className="mt-4 text-slate-400">
                Chaque intervention respecte les normes ferroviaires en vigueur. Contrôle
                qualité systématique et garantie 24 mois sur nos rechargements.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '24', label: 'Mois garantie' },
                { value: '100%', label: 'Contrôle qualité' },
                { value: 'CMT', label: 'Soudage certifié' },
                { value: '24/7', label: 'Urgence terrain' },
              ].map((stat) => (
                <div key={stat.label} className="rounded-lg border border-white/5 bg-white/[0.02] p-4 text-center">
                  <p className="font-display text-2xl font-bold text-electric-bright">{stat.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
