import { useState } from 'react'
import { Bot, Send, CheckCircle2 } from 'lucide-react'
import { assistantSteps } from '../data/content'
import { supabase } from '../lib/supabaseClient'

type Answers = Record<string, string>
type Status = 'idle' | 'loading' | 'success' | 'error'

export default function Assistant() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [inputValue, setInputValue] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [status, setStatus] = useState<Status>('idle')

  const currentStep = assistantSteps[step]
  const isLastStep = step === assistantSteps.length - 1

  const submitRequest = async (finalAnswers: Answers) => {
    setStatus('loading')
    const { error } = await supabase.from('assistant_requests').insert({
      infrastructure: finalAnswers.infrastructure ?? null,
      problem: finalAnswers.problem ?? null,
      urgency: finalAnswers.urgency ?? null,
      location: finalAnswers.location ?? null,
      details: finalAnswers.details ?? null,
    })

    if (error) {
      console.error('Erreur Supabase (assistant_requests) :', error)
      setStatus('error')
      return
    }

    setStatus('success')
    setSubmitted(true)
  }

  const handleOption = (value: string) => {
    const newAnswers = { ...answers, [currentStep.id]: value }
    setAnswers(newAnswers)
    if (isLastStep) {
      submitRequest(newAnswers)
    } else {
      setStep(step + 1)
      setInputValue('')
    }
  }

  const handleTextSubmit = () => {
    if (!inputValue.trim()) return
    handleOption(inputValue.trim())
  }

  const reset = () => {
    setStep(0)
    setAnswers({})
    setInputValue('')
    setSubmitted(false)
    setStatus('idle')
  }

  return (
    <section id="assistant" className="relative py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-10 text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-electric-bright">
            Assistant RENOV-TECH
          </p>
          <h2 className="font-display mt-4 text-4xl font-bold text-white md:text-5xl">
            Demande d&apos;intervention
          </h2>
          <p className="mt-4 text-slate-400">
            Décrivez votre besoin — nous préparons votre demande d&apos;expertise terrain.
          </p>
        </div>

        <div className="glass-panel glow-blue overflow-hidden rounded-xl">
          <div className="flex items-center gap-3 border-b border-white/5 bg-electric/5 px-6 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-electric/20">
              <Bot size={20} className="text-electric-bright" />
            </div>
            <div>
              <p className="font-display font-semibold text-white">Assistant RENOV-TECH</p>
              <p className="text-xs text-slate-400">En ligne — réponse sous 24h</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span className="status-online h-2 w-2 rounded-full bg-green-400" />
              <span className="text-xs text-green-400">Actif</span>
            </div>
          </div>

          <div className="min-h-[320px] p-6">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle2 size={48} className="text-green-400" />
                <h3 className="font-display mt-4 text-xl font-semibold text-white">
                  Demande enregistrée
                </h3>
                <p className="mt-2 max-w-md text-sm text-slate-400">
                  Votre demande d&apos;intervention a été créée. Un expert RENOV-TECH vous
                  contactera sous 24 heures ouvrées.
                </p>
                <div className="mt-6 w-full max-w-md rounded-lg border border-white/5 bg-white/[0.02] p-4 text-left text-sm">
                  {Object.entries(answers).map(([key, value]) => (
                    <div key={key} className="flex justify-between border-b border-white/5 py-2 last:border-0">
                      <span className="text-slate-500">{key}</span>
                      <span className="text-slate-300">{value}</span>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={reset}
                  className="font-display mt-6 text-sm uppercase tracking-wider text-electric-bright hover:underline"
                >
                  Nouvelle demande
                </button>
              </div>
            ) : (
              <>
                <div className="mb-6 flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-electric/20">
                    <Bot size={14} className="text-electric-bright" />
                  </div>
                  <div className="rounded-lg rounded-tl-none border border-white/5 bg-white/[0.03] px-4 py-3">
                    <p className="text-sm text-slate-200">{currentStep.question}</p>
                  </div>
                </div>

                {'options' in currentStep && currentStep.options ? (
                  <div className="ml-11 flex flex-wrap gap-2">
                    {currentStep.options.map((option) => (
                      <button
                        key={option}
                        type="button"
                        disabled={status === 'loading'}
                        onClick={() => handleOption(option)}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-300 transition-all hover:border-electric/40 hover:bg-electric/10 hover:text-white disabled:opacity-50"
                      >
                        {option}
                      </button>
                    ))}
                    {status === 'error' && (
                      <p className="mt-2 w-full text-sm text-red-400">
                        Une erreur est survenue lors de l&apos;envoi. Réessayez.
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="ml-11">
                    {'type' in currentStep && currentStep.type === 'textarea' ? (
                      <textarea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={currentStep.placeholder}
                        rows={4}
                        className="w-full rounded-lg border border-white/10 bg-carbon px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-electric/40 focus:outline-none"
                      />
                    ) : (
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={currentStep.placeholder}
                        className="w-full rounded-lg border border-white/10 bg-carbon px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-electric/40 focus:outline-none"
                        onKeyDown={(e) => e.key === 'Enter' && handleTextSubmit()}
                      />
                    )}
                    <button
                      type="button"
                      disabled={status === 'loading'}
                      onClick={handleTextSubmit}
                      className="mt-3 flex items-center gap-2 rounded bg-electric px-4 py-2 text-sm font-medium text-white transition-all hover:glow-blue disabled:opacity-60"
                    >
                      <Send size={16} />
                      {status === 'loading'
                        ? 'Envoi en cours...'
                        : isLastStep
                          ? 'Envoyer la demande'
                          : 'Continuer'}
                    </button>
                    {status === 'error' && (
                      <p className="mt-2 text-sm text-red-400">
                        Une erreur est survenue lors de l&apos;envoi. Réessayez.
                      </p>
                    )}
                  </div>
                )}

                <div className="mt-8 flex gap-1">
                  {assistantSteps.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        i <= step ? 'bg-electric' : 'bg-white/10'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
