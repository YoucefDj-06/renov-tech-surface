import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Minus, Plus } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Expertise() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    gsap.fromTo(
      sectionRef.current.querySelector('.expertise-content'),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      },
    )
  }, [])

  return (
    <section id="expertise" ref={sectionRef} className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="expertise-content grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-electric-bright">
              Notre expertise
            </p>
            <h2 className="font-display mt-4 text-4xl font-bold text-white md:text-5xl">
              Prolonger. Pas remplacer.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-400">
              EURL RENOV-TECH SURFACE intervient sur les infrastructures ferroviaires et
              tramway avec une mission claire : restaurer, renforcer et prolonger la durée de
              vie des rails et appareils de voie — en évitant le remplacement complet et en
              réduisant les coûts de maintenance.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                'Maintenance infrastructures ferroviaires & tramway',
                'Réparation et rénovation des rails',
                'Meulage correctif et préventif rails à gorge',
                'Rechargement par soudage MIG-MAG / CMT',
                'Maintenance appareils de voie (ADV)',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-300">
                  <ArrowRight size={18} className="mt-0.5 shrink-0 text-electric-bright" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <img
              src="/assets/hero-rail.png"
              alt="Infrastructure ferroviaire"
              className="rounded-lg border border-white/5 opacity-90"
            />
            <div className="absolute -bottom-4 -right-4 rounded border border-electric/30 bg-carbon-light p-4 glow-blue">
              <p className="font-display text-3xl font-bold text-electric-bright">+24</p>
              <p className="text-xs uppercase tracking-wider text-slate-400">Mois de garantie</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Solutions() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const cards = sectionRef.current.querySelectorAll('.solution-card')
    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      },
    )
  }, [])

  const solutions = [
    {
      title: 'Rechargement des rails',
      desc: 'Soudage CMT haute précision avec contrôle thermique et rechargement dur (hardfacing).',
    },
    {
      title: 'Meulage de précision',
      desc: 'Meulage correctif et préventif des rails à gorge pour un profil optimal roue/rail.',
    },
    {
      title: 'Appareils de voie',
      desc: 'Rénovation des lames d\'aiguilles, cœurs de croisement et zones critiques.',
    },
  ]

  return (
    <section id="solutions" ref={sectionRef} className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-electric-bright">
            Solutions
          </p>
          <h2 className="font-display mt-4 text-4xl font-bold text-white md:text-5xl">
            Interventions de précision
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {solutions.map((s, i) => (
            <div
              key={s.title}
              className="solution-card group glass-panel rounded-lg p-8 transition-all hover:border-electric/30 hover:glow-blue"
            >
              <span className="font-display text-5xl font-bold text-white/5 transition-colors group-hover:text-electric/20">
                0{i + 1}
              </span>
              <h3 className="font-display mt-4 text-xl font-semibold text-white">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Missions() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const cards = sectionRef.current.querySelectorAll('.mission-card')
    gsap.fromTo(
      cards,
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      },
    )
  }, [])

  const missions = [
    {
      id: '01',
      title: 'Réparation des rails',
      description:
        'Rechargement par soudage MIG-MAG / CMT et hardfacing pour restaurer la section usée.',
      before: ['Fissures', 'Usure gorge', 'Défauts surface'],
      after: ['Section restaurée', 'Durée de vie prolongée', 'Conformité roue/rail'],
    },
    {
      id: '02',
      title: 'Restauration des appareils de voie',
      description:
        'Intervention sur lames d\'aiguilles, cœurs de croisement et zones critiques ADV.',
      before: ['Usure lames', 'Zones critiques', 'Défauts géométrie'],
      after: ['ADV optimisés', 'Passage sécurisé', 'Maintenance différée'],
    },
    {
      id: '03',
      title: 'Maintenance préventive',
      description:
        'Meulage correctif et préventif, contrôle thermique et planification proactive.',
      before: ['Vibrations', 'Usure progressive', 'Risque rupture'],
      after: ['Profil optimisé', 'Vie rail +24 mois', 'Coûts maîtrisés'],
    },
  ]

  return (
    <section id="realisations" ref={sectionRef} className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-electric-bright">
            Nos interventions
          </p>
          <h2 className="font-display mt-4 text-4xl font-bold text-white md:text-5xl">
            Missions terrain
          </h2>
        </div>

        <div className="space-y-8">
          {missions.map((mission) => (
            <div
              key={mission.id}
              className="mission-card glass-panel overflow-hidden rounded-lg transition-all hover:border-electric/20"
            >
              <div className="grid lg:grid-cols-[auto_1fr_1fr_1fr]">
                <div className="flex items-center justify-center border-b border-white/5 bg-electric/5 px-8 py-6 lg:border-b-0 lg:border-r">
                  <span className="font-display text-4xl font-bold text-electric-bright">
                    {mission.id}
                  </span>
                </div>
                <div className="border-b border-white/5 p-6 lg:border-b-0 lg:border-r">
                  <h3 className="font-display text-xl font-semibold text-white">{mission.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{mission.description}</p>
                </div>
                <div className="border-b border-white/5 p-6 lg:border-b-0 lg:border-r">
                  <div className="mb-3 flex items-center gap-2 text-weld">
                    <Minus size={14} />
                    <span className="font-display text-xs uppercase tracking-wider">Avant</span>
                  </div>
                  <ul className="space-y-2">
                    {mission.before.map((b) => (
                      <li key={b} className="text-sm text-slate-400">
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6">
                  <div className="mb-3 flex items-center gap-2 text-green-400">
                    <Plus size={14} />
                    <span className="font-display text-xs uppercase tracking-wider">Après</span>
                  </div>
                  <ul className="space-y-2">
                    {mission.after.map((a) => (
                      <li key={a} className="text-sm text-slate-300">
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
