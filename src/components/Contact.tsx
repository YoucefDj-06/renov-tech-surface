import { useState } from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'
import { supabase } from '../lib/supabaseClient'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')

    const form = e.currentTarget
    const formData = new FormData(form)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const message = formData.get('message') as string

    const { error } = await supabase
      .from('contact_messages')
      .insert({ name, email, message })

    if (error) {
      console.error('Erreur Supabase (contact_messages) :', error)
      setStatus('error')
      return
    }

    setStatus('success')
    form.reset()
  }

  return (
    <section id="contact" className="relative py-24 grid-bg">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-electric-bright">
              Contact
            </p>
            <h2 className="font-display mt-4 text-4xl font-bold text-white md:text-5xl">
              Parlons de votre infrastructure
            </h2>
            <p className="mt-6 text-slate-400">
              Besoin d&apos;une intervention terrain, d&apos;un devis ou d&apos;une expertise
              technique ? Contactez-nous directement.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-electric/10">
                  <Mail size={20} className="text-electric-bright" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500">Email</p>
                  <a href="mailto:contact@renov-tech-surface.fr" className="text-slate-200 hover:text-electric-bright">
                    contact@renov-tech-surface.fr
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-electric/10">
                  <Phone size={20} className="text-electric-bright" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500">Téléphone</p>
                  <a href="tel:+33000000000" className="text-slate-200 hover:text-electric-bright">
                    +33 (0)X XX XX XX XX
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-electric/10">
                  <MapPin size={20} className="text-electric-bright" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500">Zone d&apos;intervention</p>
                  <p className="text-slate-200">France — Ferroviaire & Tramway</p>
                </div>
              </div>
            </div>
          </div>

          <form className="glass-panel rounded-xl p-8" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-1 block text-xs uppercase tracking-wider text-slate-500">
                  Nom / Société
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  disabled={status === 'loading'}
                  className="w-full rounded-lg border border-white/10 bg-carbon px-4 py-3 text-sm text-white focus:border-electric/40 focus:outline-none disabled:opacity-50"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1 block text-xs uppercase tracking-wider text-slate-500">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  disabled={status === 'loading'}
                  className="w-full rounded-lg border border-white/10 bg-carbon px-4 py-3 text-sm text-white focus:border-electric/40 focus:outline-none disabled:opacity-50"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-1 block text-xs uppercase tracking-wider text-slate-500">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  disabled={status === 'loading'}
                  className="w-full rounded-lg border border-white/10 bg-carbon px-4 py-3 text-sm text-white focus:border-electric/40 focus:outline-none disabled:opacity-50"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="font-display w-full rounded bg-electric py-4 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:glow-blue disabled:opacity-60"
              >
                {status === 'loading' ? 'Envoi en cours...' : 'Envoyer'}
              </button>

              {status === 'success' && (
                <p className="text-center text-sm text-green-400">
                  Message envoyé — nous vous recontacterons sous 24h.
                </p>
              )}
              {status === 'error' && (
                <p className="text-center text-sm text-red-400">
                  Une erreur est survenue. Merci de réessayer ou de nous contacter par email.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-carbon py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <img src="/assets/logo.png" alt="RENOV-TECH SURFACE" className="h-8 w-auto opacity-80" />
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} EURL RENOV-TECH SURFACE — Tous droits réservés
        </p>
        <p className="font-display text-xs uppercase tracking-widest text-slate-600">
          Rail Intelligence
        </p>
      </div>
    </footer>
  )
}
