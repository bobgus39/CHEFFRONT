import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@heroui/react'
import { getReservations, updateReservation, getAdminGallery, uploadGalleryImage, deleteGalleryImage } from '../../services/api'

const GOLD = '#C9A84C'
const GREEN = '#4A7C59'

const STATUS_COLORS = {
  pending:   { bg: '#F5C84220', border: '#F5C84244', color: '#F5C842', label: 'Pendiente' },
  confirmed: { bg: `${GREEN}20`, border: `${GREEN}44`, color: GREEN,   label: 'Confirmado' },
  cancelled: { bg: '#EF535020', border: '#EF535044', color: '#EF5350', label: 'Cancelado' },
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('reservations')
  const [reservations, setReservations] = useState([])
  const [gallery, setGallery] = useState([])
  const [uploading, setUploading] = useState(false)
  const [uploadForm, setUploadForm] = useState({ title_es: '', title_en: '', category: 'dishes' })
  const [preview, setPreview] = useState(null)
  const fileRef = useRef()

  useEffect(() => {
    getReservations().then(r => setReservations(r.data)).catch(() => {})
    getAdminGallery().then(r => setGallery(r.data)).catch(() => {})
  }, [])

  const logout = () => { localStorage.removeItem('bistrocali_token'); navigate('/admin') }

  const changeStatus = async (id, status) => {
    await updateReservation(id, { status }).catch(() => {})
    setReservations(prev => prev.map(r => r.id === id ? { ...r, status } : r))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setPreview(URL.createObjectURL(file))
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    const file = fileRef.current?.files[0]
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('image', file)
      fd.append('title_es', uploadForm.title_es)
      fd.append('title_en', uploadForm.title_en)
      fd.append('category', uploadForm.category)
      const { data } = await uploadGalleryImage(fd)
      setGallery(prev => [data, ...prev])
      setPreview(null)
      setUploadForm({ title_es: '', title_en: '', category: 'dishes' })
      if (fileRef.current) fileRef.current.value = ''
    } catch { alert('Error al subir imagen') }
    finally { setUploading(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar imagen?')) return
    await deleteGalleryImage(id).catch(() => {})
    setGallery(prev => prev.filter(g => g.id !== id))
  }

  const inputStyle = { backgroundColor: '#111', border: `1px solid ${GREEN}44`, color: '#F5F5F0', borderRadius: 8, padding: '8px 12px', fontSize: 13, width: '100%' }

  return (
    <div className="min-h-screen px-4 py-8" style={{ backgroundColor: '#0A0A0A' }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-widest" style={{ color: GOLD }}>BISTROCALI</h1>
            <p className="text-xs opacity-50">Panel de Administración</p>
          </div>
          <Button size="sm" variant="bordered" onPress={logout} style={{ borderColor: '#EF535044', color: '#EF5350' }}>
            Cerrar sesión
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {[['reservations', '📋 Reservas'], ['gallery', '🖼️ Galería']].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className="px-5 py-2 rounded-xl text-sm font-semibold transition-all"
              style={tab === key
                ? { backgroundColor: GOLD, color: '#0A0A0A' }
                : { backgroundColor: '#111', color: '#F5F5F0', border: `1px solid ${GREEN}33` }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── RESERVATIONS TAB ── */}
        {tab === 'reservations' && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {Object.entries(STATUS_COLORS).map(([status, cfg]) => (
                <div key={status} className="rounded-xl p-4 border" style={{ backgroundColor: cfg.bg, borderColor: cfg.border }}>
                  <div className="text-2xl font-bold" style={{ color: cfg.color }}>
                    {reservations.filter(r => r.status === status).length}
                  </div>
                  <div className="text-xs opacity-60">{cfg.label}</div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border overflow-hidden" style={{ borderColor: `${GREEN}33` }}>
              <div className="px-6 py-4 border-b" style={{ backgroundColor: '#0D1A0F', borderColor: `${GREEN}22` }}>
                <h2 className="font-semibold" style={{ color: GOLD }}>Reservaciones ({reservations.length})</h2>
              </div>
              <div className="overflow-x-auto" style={{ backgroundColor: '#0A0A0A' }}>
                {reservations.length === 0
                  ? <div className="text-center py-20 opacity-40">No hay reservaciones aún</div>
                  : (
                    <table className="w-full text-sm">
                      <thead>
                        <tr style={{ borderBottom: `1px solid ${GREEN}22` }}>
                          {['Nombre','Email','Fecha','Hora','#','Servicio','Estado',''].map(col => (
                            <th key={col} className="px-4 py-3 text-left text-xs font-medium opacity-50">{col}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {reservations.map(r => {
                          const sc = STATUS_COLORS[r.status] || STATUS_COLORS.pending
                          return (
                            <tr key={r.id} style={{ borderBottom: `1px solid ${GREEN}11` }} className="hover:bg-white/5 transition-colors">
                              <td className="px-4 py-3 font-medium">{r.name}</td>
                              <td className="px-4 py-3 opacity-70 text-xs">{r.email}</td>
                              <td className="px-4 py-3 opacity-70">{r.date}</td>
                              <td className="px-4 py-3 opacity-70">{r.time}</td>
                              <td className="px-4 py-3 opacity-70 text-center">{r.guests}</td>
                              <td className="px-4 py-3 opacity-70 text-xs">{r.service_type || '—'}</td>
                              <td className="px-4 py-3">
                                <span className="px-2 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: sc.bg, border: `1px solid ${sc.border}`, color: sc.color }}>
                                  {sc.label}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex gap-1">
                                  {r.status !== 'confirmed' && (
                                    <button onClick={() => changeStatus(r.id, 'confirmed')} className="px-2 py-1 rounded text-xs font-medium" style={{ backgroundColor: `${GREEN}20`, color: GREEN, border: `1px solid ${GREEN}44` }}>✓</button>
                                  )}
                                  {r.status !== 'cancelled' && (
                                    <button onClick={() => changeStatus(r.id, 'cancelled')} className="px-2 py-1 rounded text-xs font-medium" style={{ backgroundColor: '#EF535020', color: '#EF5350', border: '1px solid #EF535044' }}>✗</button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  )}
              </div>
            </div>
          </>
        )}

        {/* ── GALLERY TAB ── */}
        {tab === 'gallery' && (
          <div>
            {/* Upload form */}
            <div className="rounded-2xl border p-6 mb-8" style={{ backgroundColor: '#0D1A0F', borderColor: `${GREEN}33` }}>
              <h2 className="font-semibold mb-5" style={{ color: GOLD }}>Subir imagen</h2>
              <form onSubmit={handleUpload} className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* File picker */}
                  <label
                    className="flex-shrink-0 w-full md:w-48 h-48 rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all hover:opacity-80"
                    style={{ borderColor: `${GREEN}44` }}
                  >
                    {preview
                      ? <img src={preview} alt="" className="w-full h-full object-cover rounded-xl" />
                      : <><span className="text-3xl mb-2">📷</span><span className="text-xs opacity-50">Seleccionar imagen</span></>
                    }
                    <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} required />
                  </label>

                  {/* Metadata */}
                  <div className="flex-1 flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs opacity-50">Título (español)</label>
                      <input style={inputStyle} value={uploadForm.title_es} onChange={e => setUploadForm(p => ({ ...p, title_es: e.target.value }))} placeholder="Ej: Ceviche de Corvina" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs opacity-50">Title (English)</label>
                      <input style={inputStyle} value={uploadForm.title_en} onChange={e => setUploadForm(p => ({ ...p, title_en: e.target.value }))} placeholder="e.g. Sea Bass Ceviche" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs opacity-50">Categoría</label>
                      <select style={inputStyle} value={uploadForm.category} onChange={e => setUploadForm(p => ({ ...p, category: e.target.value }))}>
                        <option value="dishes">Platos</option>
                        <option value="events">Eventos</option>
                        <option value="kitchen">Cocina</option>
                        <option value="products">Productos</option>
                      </select>
                    </div>
                    <Button type="submit" isLoading={uploading} style={{ backgroundColor: GOLD, color: '#0A0A0A', fontWeight: 700 }}>
                      {uploading ? 'Subiendo...' : 'Subir a Cloudinary'}
                    </Button>
                  </div>
                </div>
              </form>
            </div>

            {/* Gallery grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.length === 0
                ? <div className="col-span-full text-center py-20 opacity-40">No hay imágenes aún</div>
                : gallery.map(img => (
                  <div key={img.id} className="group relative rounded-xl overflow-hidden border" style={{ borderColor: `${GREEN}33` }}>
                    <img src={img.image_url} alt={img.title_es} className="w-full aspect-square object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-3">
                      <p className="text-xs text-center text-white font-medium">{img.title_es || '—'}</p>
                      <button
                        onClick={() => handleDelete(img.id)}
                        className="px-3 py-1 rounded-lg text-xs font-bold"
                        style={{ backgroundColor: '#EF535020', color: '#EF5350', border: '1px solid #EF535044' }}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
