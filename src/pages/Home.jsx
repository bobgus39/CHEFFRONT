import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button, Card, CardContent } from '@heroui/react'
import { motion } from 'framer-motion'
import icon from '../../public/favicon.svg'
const GOLD = '#C9A84C'
const GREEN = '#4A7C59'

const fadeUp = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } }
const fadeIn  = { hidden: { opacity: 0 }, show: { opacity: 1 } }
const stagger = { show: { transition: { staggerChildren: 0.12 } } }

const terpeneHighlights = [
  { key: 'limonene', color: '#F5C842', emoji: '🍋' },
  { key: 'myrcene', color: '#7CB87A', emoji: '🌿' },
  { key: 'linalool', color: '#B39DDB', emoji: '💜' },
  { key: 'caryophyllene', color: '#A1887F', emoji: '🌶️' },
]

const serviceHighlights = [
  { icon: '🕯️', key: 'private_dinner' },
  { icon: '🎉', key: 'events' },
  { icon: '🍽️', key: 'catering' },
  { icon: '👨‍🍳', key: 'classes' },
]

export default function Home() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div>
      {/* Hero */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0A0A0A 0%, #0D1A0F 50%, #0A0A0A 100%)' }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 40%, ${GOLD} 0%, transparent 50%), radial-gradient(circle at 70% 60%, ${GREEN} 0%, transparent 50%)`,
          }}
        />
        <img className="absolute h-[185%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5" src={icon} alt="icon" />
        <motion.div
          className="relative z-10 max-w-4xl"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.p variants={fadeUp} transition={{ duration: 0.6 }} className="text-xs tracking-[0.4em] mb-4 opacity-60" style={{ color: GREEN }}>
            BISTROCALI × CALITERPENES
          </motion.p>
          <motion.h1 variants={fadeUp} transition={{ duration: 0.7 }} className="text-5xl md:text-7xl font-bold mb-6 leading-tight" style={{ color: '#F5F5F0' }}>
            {t('home.hero_title').split(' ').map((word, i) =>
              i % 2 === 0
                ? <span key={i}>{word} </span>
                : <span key={i} style={{ color: GOLD }}>{word} </span>
            )}
          </motion.h1>
          <motion.p variants={fadeUp} transition={{ duration: 0.7 }} className="text-lg md:text-xl mb-10 opacity-70 max-w-2xl mx-auto leading-relaxed">
            {t('home.hero_subtitle')}
          </motion.p>
          <motion.div variants={fadeUp} transition={{ duration: 0.6 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onPress={() => navigate('/booking')} style={{ backgroundColor: GOLD, color: '#0A0A0A', fontWeight: 700, paddingInline: 32 }}>
              {t('home.hero_cta')}
            </Button>
            <Button size="lg" variant="bordered" onPress={() => navigate('/about')} style={{ borderColor: GREEN, color: GREEN }}>
              {t('home.hero_cta_secondary')}
            </Button>
          </motion.div>
        </motion.div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-40 animate-bounce">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* Terpenes section */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs tracking-[0.3em] mb-3 opacity-50" style={{ color: GREEN }}>CALITERPENES</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#F5F5F0' }}>
            {t('home.terpenes_title')}
          </h2>
          <p className="opacity-60 max-w-xl mx-auto">{t('home.terpenes_subtitle')}</p>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {terpeneHighlights.map(({ key, color, emoji }) => (
            <motion.div key={key} variants={fadeUp} transition={{ duration: 0.5 }}>
              <Link to="/terpenes">
                <Card
                  className="border transition-transform hover:-translate-y-1 cursor-pointer h-full"
                  style={{ backgroundColor: '#111', borderColor: `${color}33` }}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{emoji}</div>
                    <h3 className="font-bold text-lg mb-1" style={{ color }}>
                      {t(`terpenes.${key}_name`)}
                    </h3>
                    <p className="text-xs opacity-60 leading-relaxed">
                      {t(`terpenes.${key}_aroma`)}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          className="text-center mt-8"
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button variant="bordered" onPress={() => navigate('/terpenes')} style={{ borderColor: GOLD, color: GOLD }}>
            {t('nav.terpenes')} →
          </Button>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-px opacity-20" style={{ backgroundColor: GREEN }} />
      </div>

      {/* Services teaser */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#F5F5F0' }}>
            {t('home.services_teaser_title')}
          </h2>
          <p className="opacity-60 max-w-xl mx-auto">{t('home.services_teaser_subtitle')}</p>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {serviceHighlights.map(({ icon, key }) => (
            <motion.div key={key} variants={fadeUp} transition={{ duration: 0.5 }}>
              <Card className="border h-full" style={{ backgroundColor: '#0D1A0F', borderColor: `${GREEN}33` }}>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-3">{icon}</div>
                  <h3 className="font-semibold mb-2" style={{ color: GOLD }}>
                    {t(`services.${key}`)}
                  </h3>
                  <p className="text-xs opacity-60 leading-relaxed">
                    {t(`services.${key}_desc`)}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          className="text-center mt-8"
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button variant="bordered" onPress={() => navigate('/services')} style={{ borderColor: GREEN, color: GREEN }}>
            {t('nav.services')} →
          </Button>
        </motion.div>
      </section>

      {/* CTA Banner */}
      <motion.section
        className="py-20 px-4 text-center"
        style={{ background: `linear-gradient(135deg, ${GREEN}22, ${GOLD}11)` }}
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
      >
        <motion.h2 variants={fadeUp} transition={{ duration: 0.6 }} className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#F5F5F0' }}>
          ¿Listo para una experiencia única?
        </motion.h2>
        <motion.p variants={fadeUp} transition={{ duration: 0.6 }} className="opacity-60 mb-8 max-w-xl mx-auto">
          Cada evento es irrepetible. Diseñamos una experiencia culinaria personalizada para ti.
        </motion.p>
        <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
          <Button size="lg" onPress={() => navigate('/booking')} style={{ backgroundColor: GOLD, color: '#0A0A0A', fontWeight: 700, paddingInline: 40 }}>
            {t('nav.booking')}
          </Button>
        </motion.div>
      </motion.section>
    </div>
  )
}
