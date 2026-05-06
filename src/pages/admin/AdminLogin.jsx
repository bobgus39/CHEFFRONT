import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input, Button } from '@heroui/react'
import { motion } from 'framer-motion'
import { adminLogin } from '../../services/api'

const GOLD = '#C9A84C'
const GREEN = '#4A7C59'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const { data } = await adminLogin(form)
      localStorage.setItem('bistrocali_token', data.token)
      navigate('/admin/dashboard')
    } catch {
      setError('Credenciales incorrectas')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#0A0A0A' }}>
      <motion.div
        className="w-full max-w-sm rounded-2xl p-8 border"
        style={{ backgroundColor: '#0D1A0F', borderColor: `${GREEN}33` }}
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55 }}
      >
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-xl font-bold tracking-widest" style={{ color: GOLD }}>BISTROCALI</h1>
          <p className="text-xs opacity-50 mt-1">Panel de Administración</p>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-xl p-3 mb-5 text-center text-sm bg-red-900/20 border border-red-500/30 text-red-400"
          >
            {error}
          </motion.div>
        )}

        <motion.form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={set('email')}
            required
            classNames={{ inputWrapper: 'bg-[#111] border-[#4A7C5944]' }}
          />
          <Input
            label="Contraseña"
            type="password"
            value={form.password}
            onChange={set('password')}
            required
            classNames={{ inputWrapper: 'bg-[#111] border-[#4A7C5944]' }}
          />
          <Button
            type="submit"
            size="lg"
            isLoading={loading}
            className="w-full font-bold mt-2"
            style={{ backgroundColor: GOLD, color: '#0A0A0A' }}
          >
            Entrar
          </Button>
        </motion.form>
      </motion.div>
    </div>
  )
}
