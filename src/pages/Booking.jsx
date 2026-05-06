import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@heroui/react'
import { motion } from 'framer-motion'
import { createReservation } from '../services/api'

const GOLD = '#C9A84C'
const GREEN = '#4A7C59'
const SERVICE_TYPES = ['private_dinner', 'events', 'catering', 'classes']

const fadeUp  = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } }
const stagger = { show: { transition: { staggerChildren: 0.14 } } }

export default function Booking() {
  const { t } = useTranslation()
  const [form, setForm] = useState({
    name: '', email: '', phone: '', date: '', time: '20:00',
    guests: '2', service_type: 'private_dinner', message: '',
  })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await createReservation({ ...form, guests: parseInt(form.guests) })
      setStatus('success')
      setForm({ name: '', email: '', phone: '', date: '', time: '20:00', guests: '2', service_type: 'private_dinner', message: '' })
    } catch {
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "w-full bg-[#111] border rounded-xl px-4 py-3 text-sm text-[#F5F5F0] outline-none focus:ring-1 transition-all"
  const inputStyle = { borderColor: `${GREEN}44`, backgroundColor: '#111', color: '#F5F5F0' }

  return (
    <div className="max-w-2xl mx-auto px-4 py-20">
      <motion.div className="text-center mb-12" variants={stagger} initial="hidden" animate="show">
        <motion.p variants={fadeUp} transition={{ duration: 0.5 }} className="text-xs tracking-[0.3em] mb-3 opacity-50" style={{ color: GREEN }}>BISTROCALI</motion.p>
        <motion.h1 variants={fadeUp} transition={{ duration: 0.6 }} className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#F5F5F0' }}>
          {t('booking.title')}
        </motion.h1>
        <motion.p variants={fadeUp} transition={{ duration: 0.6 }} className="opacity-60 text-lg">{t('booking.subtitle')}</motion.p>
      </motion.div>

      <motion.div
        className="rounded-2xl p-8 border"
        style={{ backgroundColor: '#0D1A0F', borderColor: `${GREEN}33` }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.25 }}
      >
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-xl p-4 mb-6 text-center text-sm font-medium"
            style={{ backgroundColor: `${GREEN}20`, border: `1px solid ${GREEN}44`, color: GREEN }}
          >
            ✓ {t('booking.success')}
          </motion.div>
        )}
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-xl p-4 mb-6 text-center text-sm font-medium bg-red-900/20 border border-red-500/30 text-red-400"
          >
            ✗ {t('booking.error')}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1">
              <label className="text-xs opacity-60">{t('booking.name')} *</label>
              <input className={inputClass} style={inputStyle} value={form.name} onChange={set('name')} required />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs opacity-60">{t('booking.email')} *</label>
              <input type="email" className={inputClass} style={inputStyle} value={form.email} onChange={set('email')} required />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1">
              <label className="text-xs opacity-60">{t('booking.phone')}</label>
              <input type="tel" className={inputClass} style={inputStyle} value={form.phone} onChange={set('phone')} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs opacity-60">{t('booking.guests')} *</label>
              <input type="number" min="1" max="50" className={inputClass} style={inputStyle} value={form.guests} onChange={set('guests')} required />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1">
              <label className="text-xs opacity-60">{t('booking.date')} *</label>
              <input type="date" className={inputClass} style={{ ...inputStyle, colorScheme: 'dark' }} value={form.date} onChange={set('date')} required min={new Date().toISOString().split('T')[0]} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs opacity-60">{t('booking.time')} *</label>
              <input type="time" className={inputClass} style={{ ...inputStyle, colorScheme: 'dark' }} value={form.time} onChange={set('time')} required />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs opacity-60">{t('booking.service')}</label>
            <select className={inputClass} style={inputStyle} value={form.service_type} onChange={set('service_type')}>
              {SERVICE_TYPES.map((s) => (
                <option key={s} value={s} style={{ backgroundColor: '#111' }}>{t(`services.${s}`)}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs opacity-60">{t('booking.message')}</label>
            <textarea rows={4} className={inputClass} style={inputStyle} value={form.message} onChange={set('message')} />
          </div>
          <Button type="submit" size="lg" isLoading={loading} className="w-full font-bold" style={{ backgroundColor: GOLD, color: '#0A0A0A' }}>
            {t('booking.submit')}
          </Button>
        </form>
      </motion.div>
    </div>
  )
}
