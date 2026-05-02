import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@heroui/react'
import { getReservations, updateReservation } from '../../services/api'

const GOLD = '#C9A84C'
const GREEN = '#4A7C59'

const STATUS_COLORS = {
  pending: { bg: '#F5C84220', border: '#F5C84244', color: '#F5C842', label: 'Pendiente' },
  confirmed: { bg: `${GREEN}20`, border: `${GREEN}44`, color: GREEN, label: 'Confirmado' },
  cancelled: { bg: '#EF535020', border: '#EF535044', color: '#EF5350', label: 'Cancelado' },
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)

  const load = () => {
    getReservations()
      .then((r) => setReservations(r.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  const logout = () => {
    localStorage.removeItem('bistrocali_token')
    navigate('/admin')
  }

  const changeStatus = async (id, status) => {
    try {
      await updateReservation(id, { status })
      setReservations((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)))
    } catch {}
  }

  const columns = ['Nombre', 'Email', 'Fecha', 'Hora', 'Comensales', 'Servicio', 'Estado', 'Acciones']

  return (
    <div className="min-h-screen px-4 py-8" style={{ backgroundColor: '#0A0A0A' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-widest" style={{ color: GOLD }}>BISTROCALI</h1>
            <p className="text-xs opacity-50">Panel de Administración</p>
          </div>
          <Button
            size="sm"
            variant="bordered"
            onPress={logout}
            style={{ borderColor: '#EF535044', color: '#EF5350' }}
          >
            Cerrar sesión
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {Object.entries(STATUS_COLORS).map(([status, cfg]) => {
            const count = reservations.filter((r) => r.status === status).length
            return (
              <div
                key={status}
                className="rounded-xl p-4 border"
                style={{ backgroundColor: cfg.bg, borderColor: cfg.border }}
              >
                <div className="text-2xl font-bold" style={{ color: cfg.color }}>{count}</div>
                <div className="text-xs opacity-60">{cfg.label}</div>
              </div>
            )
          })}
          <div className="rounded-xl p-4 border" style={{ backgroundColor: '#0D1A0F', borderColor: `${GREEN}33` }}>
            <div className="text-2xl font-bold" style={{ color: '#F5F5F0' }}>{reservations.length}</div>
            <div className="text-xs opacity-60">Total</div>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-2xl border overflow-hidden" style={{ borderColor: `${GREEN}33` }}>
          <div className="px-6 py-4 border-b" style={{ backgroundColor: '#0D1A0F', borderColor: `${GREEN}22` }}>
            <h2 className="font-semibold" style={{ color: GOLD }}>Reservaciones</h2>
          </div>
          {loading ? (
            <div className="text-center py-20 opacity-40" style={{ backgroundColor: '#0A0A0A' }}>Cargando...</div>
          ) : reservations.length === 0 ? (
            <div className="text-center py-20 opacity-40" style={{ backgroundColor: '#0A0A0A' }}>
              No hay reservaciones aún
            </div>
          ) : (
            <div className="overflow-x-auto" style={{ backgroundColor: '#0A0A0A' }}>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: `1px solid ${GREEN}22` }}>
                    {columns.map((col) => (
                      <th key={col} className="px-4 py-3 text-left text-xs font-medium opacity-50">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((r) => {
                    const sc = STATUS_COLORS[r.status] || STATUS_COLORS.pending
                    return (
                      <tr
                        key={r.id}
                        style={{ borderBottom: `1px solid ${GREEN}11` }}
                        className="hover:bg-white/5 transition-colors"
                      >
                        <td className="px-4 py-3 font-medium">{r.name}</td>
                        <td className="px-4 py-3 opacity-70 text-xs">{r.email}</td>
                        <td className="px-4 py-3 opacity-70">{r.date}</td>
                        <td className="px-4 py-3 opacity-70">{r.time}</td>
                        <td className="px-4 py-3 opacity-70 text-center">{r.guests}</td>
                        <td className="px-4 py-3 opacity-70 text-xs">{r.service_type || '—'}</td>
                        <td className="px-4 py-3">
                          <span
                            className="px-2 py-1 rounded-full text-xs font-medium"
                            style={{ backgroundColor: sc.bg, border: `1px solid ${sc.border}`, color: sc.color }}
                          >
                            {sc.label}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1">
                            {r.status !== 'confirmed' && (
                              <button
                                onClick={() => changeStatus(r.id, 'confirmed')}
                                className="px-2 py-1 rounded text-xs font-medium transition-opacity hover:opacity-80"
                                style={{ backgroundColor: `${GREEN}20`, color: GREEN, border: `1px solid ${GREEN}44` }}
                              >
                                ✓
                              </button>
                            )}
                            {r.status !== 'cancelled' && (
                              <button
                                onClick={() => changeStatus(r.id, 'cancelled')}
                                className="px-2 py-1 rounded text-xs font-medium transition-opacity hover:opacity-80"
                                style={{ backgroundColor: '#EF535020', color: '#EF5350', border: '1px solid #EF535044' }}
                              >
                                ✗
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
