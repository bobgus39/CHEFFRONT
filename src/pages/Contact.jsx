import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@heroui/react'
import { sendContact } from '../services/api'

const GOLD = '#C9A84C'
const GREEN = '#4A7C59'

export default function Contact() {
  const { t } = useTranslation()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await sendContact(form)
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "w-full rounded-xl px-4 py-3 text-sm text-[#F5F5F0] outline-none focus:ring-1 transition-all"
  const inputStyle = { borderColor: `${GREEN}44`, border: `1px solid ${GREEN}44`, backgroundColor: '#111', color: '#F5F5F0' }

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <p className="text-xs tracking-[0.3em] mb-3 opacity-50" style={{ color: GREEN }}>BISTROCALI</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#F5F5F0' }}>
          {t('contact.title')}
        </h1>
        <p className="opacity-60 text-lg">{t('contact.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div
          className="rounded-2xl p-8 border"
          style={{ backgroundColor: '#0D1A0F', borderColor: `${GREEN}33` }}
        >
          {status === 'success' && (
            <div className="rounded-xl p-4 mb-6 text-center text-sm font-medium" style={{ backgroundColor: `${GREEN}20`, border: `1px solid ${GREEN}44`, color: GREEN }}>
              ✓ {t('contact.success')}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label className="text-xs opacity-60">{t('contact.name')}</label>
              <input className={inputClass} style={inputStyle} value={form.name} onChange={set('name')} required />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs opacity-60">{t('contact.email')}</label>
              <input type="email" className={inputClass} style={inputStyle} value={form.email} onChange={set('email')} required />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs opacity-60">{t('contact.message')}</label>
              <textarea rows={4} className={inputClass} style={inputStyle} value={form.message} onChange={set('message')} required />
            </div>
            <Button
              type="submit"
              size="lg"
              isLoading={loading}
              className="w-full font-bold"
              style={{ backgroundColor: GOLD, color: '#0A0A0A' }}
            >
              {t('contact.submit')}
            </Button>
          </form>
        </div>

        <div className="flex flex-col gap-6 justify-center">
          <div>
            <h3 className="font-semibold mb-2" style={{ color: GOLD }}>Email</h3>
            <p className="opacity-70 text-sm">hola@bistrocali.com</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2" style={{ color: GOLD }}>{t('contact.follow')}</h3>
            <div className="flex flex-col gap-2">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-sm transition-opacity hover:opacity-100 opacity-70" style={{ color: '#F5F5F0' }}>
                📸 @bistrocali
              </a>
              <a href="https://caliterpenes.com" target="_blank" rel="noreferrer" className="text-sm transition-opacity hover:opacity-100 opacity-70" style={{ color: GREEN }}>
                🌿 Caliterpenes.com
              </a>
            </div>
          </div>
          <div className="rounded-xl p-5" style={{ backgroundColor: `${GOLD}10`, border: `1px solid ${GOLD}33` }}>
            <p className="text-xs opacity-70 leading-relaxed italic">
              "Cada experiencia empieza con una conversación. Cuéntanos tu historia y crearemos algo único para ti."
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
