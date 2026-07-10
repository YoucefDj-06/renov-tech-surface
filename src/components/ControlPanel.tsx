import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CheckCircle2 } from 'lucide-react'
import { systemStatus } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function ControlPanel() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const items = sectionRef.current.querySelectorAll('.status-item')
    gsap.fromTo(
      items,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      },
    )
  }, [])

  return (
    <section id="controle" ref={sectionRef} className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-electric-bright">
              Centre de contrôle
            </p>
            <h2 className="font-display mt-4 text-4xl font-bold text-white md:text-5xl">
              RENOV-TECH SURFACE
            </h2>
            <p className="mt-6 text-lg text-slate-400">
              Une approche industrielle où chaque intervention est pilotée, contrôlée et
              garantie — comme un système ferroviaire de nouvelle génération.
            </p>
          </div>

          <div className="glass-panel glow-blue rounded-lg p-6 md:p-8">
            <div className="mb-6 flex items-center justify-between border-b border-white/5 pb-4">
              <span className="font-display text-xs uppercase tracking-widest text-slate-500">
                System Monitor
              </span>
              <div className="flex items-center gap-2">
                <span className="status-online h-2 w-2 rounded-full bg-green-400" />
                <span className="font-display text-sm font-semibold uppercase tracking-wider text-green-400">
                  System Online
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {systemStatus.map((item) => (
                <div
                  key={item.label}
                  className="status-item flex items-center justify-between rounded border border-white/5 bg-white/[0.02] px-4 py-3 transition-colors hover:border-electric/20 hover:bg-electric/5"
                >
                  <span className="font-display text-sm font-medium tracking-wide text-slate-300">
                    {item.label}
                  </span>
                  <CheckCircle2 size={18} className="text-green-400" />
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-4 text-xs text-slate-500">
              <span>Last sync: {new Date().toLocaleTimeString('fr-FR')}</span>
              <span className="h-1 w-1 rounded-full bg-slate-600" />
              <span>Uptime: 99.97%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
