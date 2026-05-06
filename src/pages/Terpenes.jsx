import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent } from '@heroui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { getTerpenes } from '../services/api'

const GREEN = '#4A7C59'
const GOLD  = '#C9A84C'

const STATIC_TERPENES = [
  { id: 1, name: 'Limoneno',         color_hex: '#F5C842', emoji: '🍋',  name_key: 'limonene' },
  { id: 2, name: 'Mirceno',          color_hex: '#7CB87A', emoji: '🌿',  name_key: 'myrcene' },
  { id: 3, name: 'Linalool',         color_hex: '#B39DDB', emoji: '💜',  name_key: 'linalool' },
  { id: 4, name: 'Beta-Cariofileno', color_hex: '#A1887F', emoji: '🌶️', name_key: 'caryophyllene' },
]

const fadeUp  = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }
const slideL  = { hidden: { opacity: 0, x: -30 }, show: { opacity: 1, x: 0 } }
const stagger = { show: { transition: { staggerChildren: 0.1 } } }

export default function Terpenes() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language?.startsWith('en') ? 'en' : 'es'
  const [terpenes, setTerpenes] = useState([])
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTerpenes()
      .then((r) => {
        const data = r.data.length ? r.data : STATIC_TERPENES
        setTerpenes(data)
        setSelected(data[0])
      })
      .catch(() => {
        setTerpenes(STATIC_TERPENES)
        setSelected(STATIC_TERPENES[0])
      })
      .finally(() => setLoading(false))
  }, [])

  const getName = (item) => lang === 'en' ? (item.name_en || item.name) : (item.name_es || item.name)
  const getDesc = (item) => item.name_key ? t(`terpenes.${item.name_key}_desc`) : (lang === 'en' ? item.description_en : item.description_es)
  const getAroma = (item) => item.aroma || ''
  const getBenefits = (item) => item.name_key ? t(`terpenes.${item.name_key}_benefits`) : (lang === 'en' ? item.benefits_en : item.benefits_es)

  if (loading) return <div className="text-center py-40 opacity-40">Cargando...</div>

  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <motion.div
        className="text-center mb-16"
        variants={{ show: { transition: { staggerChildren: 0.14 } } }}
        initial="hidden"
        animate="show"
      >
        <motion.p variants={fadeUp} transition={{ duration: 0.5 }} className="text-xs tracking-[0.3em] mb-3 opacity-50" style={{ color: GREEN }}>CALITERPENES</motion.p>
        <motion.h1 variants={fadeUp} transition={{ duration: 0.6 }} className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#F5F5F0' }}>
          {t('terpenes.title')}
        </motion.h1>
        <motion.p variants={fadeUp} transition={{ duration: 0.6 }} className="opacity-60 text-lg max-w-2xl mx-auto">{t('terpenes.subtitle')}</motion.p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          className="flex flex-col gap-3"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          {terpenes.map((item) => {
            const color = item.color_hex || GREEN
            const isActive = selected?.id === item.id
            return (
              <motion.button
                key={item.id}
                variants={slideL}
                transition={{ duration: 0.4 }}
                onClick={() => setSelected(item)}
                whileHover={{ x: 4 }}
                className="w-full text-left rounded-xl p-4 transition-all border"
                style={{
                  backgroundColor: isActive ? `${color}15` : '#111',
                  borderColor: isActive ? color : `${color}33`,
                  boxShadow: isActive ? `0 0 16px ${color}22` : 'none',
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                  <span className="font-semibold text-sm" style={{ color: isActive ? color : '#F5F5F0' }}>
                    {getName(item)}
                  </span>
                </div>
                {getAroma(item) && (
                  <p className="text-xs opacity-50 mt-1 ml-6">{getAroma(item)}</p>
                )}
              </motion.button>
            )
          })}
        </motion.div>

        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {selected && (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
              >
                <Card
                  className="h-full border"
                  style={{
                    backgroundColor: '#0D1A0F',
                    borderColor: `${selected.color_hex || GREEN}44`,
                    boxShadow: `0 0 40px ${selected.color_hex || GREEN}11`,
                  }}
                >
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                        style={{ backgroundColor: `${selected.color_hex || GREEN}20`, border: `1px solid ${selected.color_hex || GREEN}44` }}
                      >
                        {selected.emoji || '🌿'}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold" style={{ color: selected.color_hex || GOLD }}>
                          {getName(selected)}
                        </h2>
                        {getAroma(selected) && (
                          <p className="text-sm opacity-60 mt-1">
                            <span style={{ color: selected.color_hex || GREEN }}>●</span> {getAroma(selected)}
                          </p>
                        )}
                      </div>
                    </div>
                    <p className="opacity-80 leading-relaxed mb-6">{getDesc(selected)}</p>
                    <div
                      className="rounded-xl p-5"
                      style={{ backgroundColor: `${selected.color_hex || GREEN}10`, border: `1px solid ${selected.color_hex || GREEN}22` }}
                    >
                      <h4 className="text-sm font-semibold mb-2" style={{ color: selected.color_hex || GOLD }}>
                        🍴 {t('terpenes.benefits')}
                      </h4>
                      <p className="text-sm opacity-70 leading-relaxed">{getBenefits(selected)}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
