import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, Button } from '@heroui/react'

const GOLD = '#C9A84C'
const GREEN = '#4A7C59'

const services = [
  { key: 'private_dinner', icon: '🕯️', color: GOLD },
  { key: 'events', icon: '🎉', color: '#E57373' },
  { key: 'catering', icon: '🍽️', color: GREEN },
  { key: 'classes', icon: '👨‍🍳', color: '#B39DDB' },
]

export default function Services() {
  const { t } = useTranslation()

  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <p className="text-xs tracking-[0.3em] mb-3 opacity-50" style={{ color: GREEN }}>BISTROCALI</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#F5F5F0' }}>
          {t('services.title')}
        </h1>
        <p className="opacity-60 text-lg max-w-xl mx-auto">{t('services.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {services.map(({ key, icon, color }) => (
          <Card
            key={key}
            className="border transition-all hover:-translate-y-1 hover:shadow-lg"
            style={{ backgroundColor: '#0D1A0F', borderColor: `${color}33` }}
          >
            <CardContent className="p-8">
              <div className="flex items-start gap-5">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ backgroundColor: `${color}15`, border: `1px solid ${color}44` }}
                >
                  {icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3" style={{ color }}>
                    {t(`services.${key}`)}
                  </h3>
                  <p className="opacity-70 leading-relaxed text-sm">
                    {t(`services.${key}_desc`)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Process */}
      <div
        className="rounded-2xl p-8 md:p-12 text-center"
        style={{ background: `linear-gradient(135deg, #0D1A0F, ${GOLD}11)`, border: `1px solid ${GOLD}33` }}
      >
        <h2 className="text-2xl font-bold mb-3" style={{ color: GOLD }}>
          ¿Cómo funciona?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {[
            { n: '01', title: 'Reserva', text: 'Envíanos tu solicitud con los detalles de tu evento.' },
            { n: '02', title: 'Diseño', text: 'Creamos un menú personalizado con perfil terpénico único.' },
            { n: '03', title: 'Experiencia', text: 'El chef llega a tu espacio y ejecuta el menú para ti.' },
          ].map(({ n, title, text }) => (
            <div key={n}>
              <div className="text-3xl font-bold mb-2" style={{ color: GOLD, opacity: 0.4 }}>{n}</div>
              <h4 className="font-semibold mb-2" style={{ color: '#F5F5F0' }}>{title}</h4>
              <p className="text-sm opacity-60">{text}</p>
            </div>
          ))}
        </div>
        <Button
          as={Link}
          to="/booking"
          size="lg"
          className="mt-10"
          style={{ backgroundColor: GOLD, color: '#0A0A0A', fontWeight: 700 }}
        >
          {t('services.cta')}
        </Button>
      </div>
    </div>
  )
}
