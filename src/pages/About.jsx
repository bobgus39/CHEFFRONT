import { useTranslation } from 'react-i18next'
import { Card, CardContent, Separator } from '@heroui/react'
import chefImage from '../assets/ZI_00008_.png' 
const GOLD = '#C9A84C'
const GREEN = '#4A7C59'

export default function About() {
  const { t } = useTranslation()

  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <p className="text-xs tracking-[0.3em] mb-3 opacity-50" style={{ color: GREEN }}>BISTROCALI</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#F5F5F0' }}>
          {t('about.title')}
        </h1>
        <p className="opacity-60 text-lg">{t('about.subtitle')}</p>
      </div>

      {/* Chef profile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        
        <div
          className="aspect-[3/4] rounded-2xl flex items-center justify-center text-8xl"
          style={{ background: `linear-gradient(135deg, #0D1A0F, ${GREEN}22)`, border: `1px solid ${GREEN}33` }}
        >
          <img src={chefImage} alt="Chef" className="relative w-full h-full object-cover rounded-2xl" />
        </div>
        
        <div>
          <p className="text-base opacity-80 leading-relaxed mb-6">{t('about.bio_p1')}</p>
          <p className="text-base opacity-80 leading-relaxed">{t('about.bio_p2')}</p>
        </div>
      </div>

      <Separator style={{ backgroundColor: `${GREEN}33` }} className="mb-16" />

      {/* Philosophy */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6" style={{ color: GOLD }}>
          {t('about.philosophy_title')}
        </h2>
        <Card style={{ backgroundColor: '#0D1A0F', border: `1px solid ${GREEN}33` }}>
          <CardContent className="p-8">
            <p className="text-base opacity-80 leading-relaxed italic text-center text-lg">
              "{t('about.philosophy_text')}"
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Caliterpenes partnership */}
      <div>
        <h2 className="text-2xl font-bold mb-6" style={{ color: GOLD }}>
          {t('about.caliterpenes_title')}
        </h2>
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
      </div>
    </div>
  )
}
