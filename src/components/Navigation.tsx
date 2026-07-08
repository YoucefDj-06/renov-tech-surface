import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navLinks } from '../data/content'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-panel py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a href="#" className="flex items-center gap-3">
          <img src="/assets/logo.png" alt="RENOV-TECH SURFACE" className="h-10 w-auto" />
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-display text-sm font-medium uppercase tracking-widest text-slate-400 transition-colors hover:text-electric-bright"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#assistant"
            className="font-display rounded border border-electric/40 bg-electric/10 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-electric-bright transition-all hover:bg-electric/20 hover:glow-blue"
          >
            Demander une expertise
          </a>
        </nav>

        <button
          type="button"
          className="text-slate-300 lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <nav className="glass-panel border-t border-white/5 px-6 py-4 lg:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-display text-sm uppercase tracking-widest text-slate-300"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#assistant"
              className="font-display text-sm uppercase tracking-widest text-electric-bright"
              onClick={() => setMobileOpen(false)}
            >
              Demander une expertise
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}
