import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@heroui/react'
import { motion } from 'framer-motion'
import { sendContact } from '../services/api'

const GOLD = '#C9A84C'
const GREEN = '#4A7C59'
const fadeUp  = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } }
const slideL  = { hidden: { opacity: 0, x: -50 }, show: { opacity: 1, x: 0 } }
const slideR  = { hidden: { opacity: 0, x: 50 },  show: { opacity: 1, x: 0 } }
const stagger = { show: { transition: { staggerChildren: 0.14 } } }

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
      <motion.div className="text-center mb-12" variants={stagger} initial="hidden" animate="show">
        <motion.p variants={fadeUp} transition={{ duration: 0.5 }} className="text-xs tracking-[0.3em] mb-3 opacity-50" style={{ color: GREEN }}>BISTROCALI</motion.p>
        <motion.h1 variants={fadeUp} transition={{ duration: 0.6 }} className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#F5F5F0' }}>
          {t('contact.title')}
        </motion.h1>
        <motion.p variants={fadeUp} transition={{ duration: 0.6 }} className="opacity-60 text-lg">{t('contact.subtitle')}</motion.p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          className="rounded-2xl p-8 border"
          style={{ backgroundColor: '#0D1A0F', borderColor: `${GREEN}33` }}
          variants={slideL}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.65, delay: 0.2 }}
        >
          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-xl p-4 mb-6 text-center text-sm font-medium"
              style={{ backgroundColor: `${GREEN}20`, border: `1px solid ${GREEN}44`, color: GREEN }}
            >
              ✓ {t('contact.success')}
            </motion.div>
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
            <Button type="submit" size="lg" isLoading={loading} className="w-full font-bold" style={{ backgroundColor: GOLD, color: '#0A0A0A' }}>
              {t('contact.submit')}
            </Button>
          </form>
        </motion.div>

        <motion.div
          className="flex flex-col gap-6 justify-center"
          variants={slideR}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.65, delay: 0.3 }}
        >
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.5 }}>
            <h3 className="font-semibold mb-2" style={{ color: GOLD }}>Email</h3>
            <p className="opacity-70 text-sm">inaneproduct@proton.me</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.5 }}>
            <h3 className="font-semibold mb-2" style={{ color: GOLD }}>{t('contact.follow')}</h3>
            <div className="flex flex-col gap-2">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-sm transition-opacity hover:opacity-100 opacity-70" style={{ color: '#F5F5F0' }}>
                📸 @bistrocali
              </a>
              <a href="https://caliterpenes.com" target="_blank" rel="noreferrer" className="text-sm transition-opacity hover:opacity-100 opacity-70" style={{ color: GREEN }}>
                🌿 Caliterpenes.com
              </a>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.5 }}
            className="rounded-xl p-5"
            style={{ backgroundColor: `${GOLD}10`, border: `1px solid ${GOLD}33` }}
          >
            <p className="text-xs opacity-70 leading-relaxed italic">
              "Cada experiencia empieza con una conversación. Cuéntanos tu historia y crearemos algo único para ti."
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
