import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ModalRoot, ModalBackdrop, ModalContainer, ModalDialog, ModalBody, ModalCloseTrigger } from '@heroui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { getGallery } from '../services/api'

const GREEN = '#4A7C59'
const GOLD  = '#C9A84C'

const PLACEHOLDER_ITEMS = [
  { id: 1, title_es: 'Ceviche de Corvina',    title_en: 'Sea Bass Ceviche',    emoji: '🐟' },
  { id: 2, title_es: 'Costillas al Mirceno',  title_en: 'Myrcene Ribs',        emoji: '🥩' },
  { id: 3, title_es: 'Coulant de Linalool',   title_en: 'Linalool Coulant',    emoji: '🍫' },
  { id: 4, title_es: 'Mise en place',         title_en: 'Mise en place',        emoji: '🔪' },
  { id: 5, title_es: 'Terpenos Caliterpenes', title_en: 'Caliterpenes Terpenes', emoji: '🌿' },
  { id: 6, title_es: 'Cena Privada',          title_en: 'Private Dinner',       emoji: '🕯️' },
  { id: 7, title_es: 'Sorbete Cítrico',       title_en: 'Citrus Sorbet',        emoji: '🍋' },
  { id: 8, title_es: 'Emplatado Lubina',      title_en: 'Sea Bass Plating',     emoji: '🐠' },
  { id: 9, title_es: 'Evento Corporativo',    title_en: 'Corporate Event',      emoji: '🥂' },
]

const COLORS = ['#F5C842','#7CB87A','#B39DDB','#A1887F','#43A047','#80CBC4','#E57373','#64B5F6','#FFB74D']

const fadeUp  = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }
const stagger = { show: { transition: { staggerChildren: 0.07 } } }

export default function Gallery() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language?.startsWith('en') ? 'en' : 'es'
  const [items, setItems] = useState([])
  const [selected, setSelected] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    getGallery()
      .then((r) => setItems(r.data.length ? r.data : PLACEHOLDER_ITEMS))
      .catch(() => setItems(PLACEHOLDER_ITEMS))
  }, [])

  const openItem = (item, color) => {
    setSelected({ ...item, color })
    setIsOpen(true)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <motion.div
        className="text-center mb-12"
        variants={{ show: { transition: { staggerChildren: 0.14 } } }}
        initial="hidden"
        animate="show"
      >
        <motion.p variants={fadeUp} transition={{ duration: 0.5 }} className="text-xs tracking-[0.3em] mb-3 opacity-50" style={{ color: GREEN }}>BISTROCALI</motion.p>
        <motion.h1 variants={fadeUp} transition={{ duration: 0.6 }} className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#F5F5F0' }}>
          {t('gallery.title')}
        </motion.h1>
        <motion.p variants={fadeUp} transition={{ duration: 0.6 }} className="opacity-60 text-lg">{t('gallery.subtitle')}</motion.p>
      </motion.div>

      <motion.div
        className="columns-2 md:columns-3 gap-4 space-y-4"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        {items.map((item, idx) => {
          const color = COLORS[idx % COLORS.length]
          const title = lang === 'en' ? (item.title_en || '') : (item.title_es || '')
          return (
            <motion.div
              key={item.id}
              variants={fadeUp}
              transition={{ duration: 0.45 }}
              onClick={() => openItem(item, color)}
              whileHover={{ scale: 1.02 }}
              className="cursor-pointer rounded-xl overflow-hidden break-inside-avoid shadow-md"
              style={{ border: `1px solid ${color}33` }}
            >
              {item.image_url ? (
                <img src={item.image_url} alt={title} className="w-full h-full object-cover" />
              ) : (
                <div
                  className="flex flex-col items-center justify-center gap-2 p-8"
                  style={{
                    background: `linear-gradient(135deg, ${color}10, ${color}25)`,
                    minHeight: idx % 3 === 0 ? 240 : 180,
                  }}
                >
                  <span className="text-5xl">{item.emoji || '📷'}</span>
                  <p className="text-xs opacity-60 text-center">{title}</p>
                </div>
              )}
            </motion.div>
          )
        })}
      </motion.div>

      <ModalRoot open={isOpen} onOpenChange={setIsOpen}>
        <ModalBackdrop />
        <ModalContainer>
          <ModalDialog
            className="rounded-2xl p-0 overflow-hidden max-w-lg w-full"
            style={{ backgroundColor: '#111', border: `1px solid ${selected?.color || GOLD}44` }}
          >
            <ModalCloseTrigger
              className="absolute top-3 right-3 text-white/50 hover:text-white z-10"
              style={{ cursor: 'pointer', fontSize: 20 }}
            >
              ✕
            </ModalCloseTrigger>
            <ModalBody className="p-8 text-center">
              {selected?.image_url ? (
                <img src={selected.image_url} alt="" className="w-full rounded-xl mb-4" />
              ) : (
                <div className="text-8xl mb-4">{selected?.emoji || '📷'}</div>
              )}
              <h3 className="text-lg font-bold" style={{ color: selected?.color || GOLD }}>
                {lang === 'en' ? selected?.title_en : selected?.title_es}
              </h3>
            </ModalBody>
          </ModalDialog>
        </ModalContainer>
      </ModalRoot>
    </div>
  )
}
