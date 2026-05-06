import { useTranslation } from 'react-i18next'
import { Card, CardContent, Separator } from '@heroui/react'
import { motion } from 'framer-motion'
import chefImage from '../assets/ZI_00008_.png'

const GOLD = '#C9A84C'
const GREEN = '#4A7C59'
const fadeUp  = { hidden: { opacity: 0, y: 40 },  show: { opacity: 1, y: 0 } }
const slideL  = { hidden: { opacity: 0, x: -50 }, show: { opacity: 1, x: 0 } }
const slideR  = { hidden: { opacity: 0, x: 50 },  show: { opacity: 1, x: 0 } }
const stagger = { show: { transition: { staggerChildren: 0.15 } } }

export default function About() {
  const { t } = useTranslation()

  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <motion.div className="text-center mb-16" variants={stagger} initial="hidden" animate="show">
        <motion.p variants={fadeUp} transition={{ duration: 0.5 }} className="text-xs tracking-[0.3em] mb-3 opacity-50" style={{ color: GREEN }}>BISTROCALI</motion.p>
        <motion.h1 variants={fadeUp} transition={{ duration: 0.6 }} className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#F5F5F0' }}>
          {t('about.title')}
        </motion.h1>
        <motion.p variants={fadeUp} transition={{ duration: 0.6 }} className="opacity-60 text-lg">{t('about.subtitle')}</motion.p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <motion.div
          variants={slideL}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="aspect-[3/4] rounded-2xl"
          style={{ background: `linear-gradient(135deg, #0D1A0F, ${GREEN}22)`, border: `1px solid ${GREEN}33` }}
        >
          <img src={chefImage} alt="Chef" className="w-full h-full object-cover rounded-2xl" />
        </motion.div>

        <motion.div
          variants={slideR}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-base opacity-80 leading-relaxed mb-6">{t('about.bio_p1')}</p>
          <p className="text-base opacity-80 leading-relaxed">{t('about.bio_p2')}</p>
        </motion.div>
      </div>

      <Separator style={{ backgroundColor: `${GREEN}33` }} className="mb-16" />

      <motion.div
        className="mb-16"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold mb-6" style={{ color: GOLD }}>{t('about.philosophy_title')}</h2>
        <Card style={{ backgroundColor: '#0D1A0F', border: `1px solid ${GREEN}33` }}>
          <CardContent className="p-8">
            <p className="text-base opacity-80 leading-relaxed italic text-center text-lg">
              "{t('about.philosophy_text')}"
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold mb-6" style={{ color: GOLD }}>{t('about.caliterpenes_title')}</h2>
        <Card style={{ backgroundColor: '#111', border: `1px solid ${GOLD}33` }}>
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-xl flex-shrink-0"
                style={{ backgroundColor: `${GREEN}22`, border: `1px solid ${GREEN}44` }}
              >
                🌿
              </div>
              <div>
                <p className="font-semibold mb-2" style={{ color: GOLD }}>Caliterpenes Premium</p>
                <p className="text-sm opacity-70 leading-relaxed">{t('about.caliterpenes_text')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
