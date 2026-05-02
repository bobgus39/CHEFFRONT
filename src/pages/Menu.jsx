import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, Button, Chip } from '@heroui/react'
import { getMenu } from '../services/api'

const GOLD = '#C9A84C'
const GREEN = '#4A7C59'

const TERPENE_COLORS = {
  Limoneno: '#F5C842', Limonene: '#F5C842',
  Mirceno: '#7CB87A', Myrcene: '#7CB87A',
  Linalool: '#B39DDB',
  'Beta-Cariofileno': '#A1887F', 'Beta-Caryophyllene': '#A1887F',
  Pineno: '#43A047', Pine: '#43A047',
  Terpinoleno: '#80CBC4', Terpinolene: '#80CBC4',
}

const FALLBACK_ITEMS = [
  { id: 1, name_es: 'Ceviche de Corvina con Limoneno', name_en: 'Sea Bass Ceviche with Limonene', description_es: 'Corvina fresca marinada en leche de tigre con microgotas de limoneno puro de Caliterpenes.', description_en: 'Fresh sea bass marinated in tiger\'s milk with micro-drops of pure Caliterpenes limonene.', terpene_profile: 'Limoneno', category: 'starters', price: 28 },
  { id: 2, name_es: 'Burrata con Terpinoleno', name_en: 'Burrata with Terpinolene', description_es: 'Burrata cremosa con aceite de oliva aromatizado con terpinoleno y trufa negra.', description_en: 'Creamy burrata with terpinolene-infused olive oil and black truffle.', terpene_profile: 'Terpinoleno', category: 'starters', price: 24 },
  { id: 3, name_es: 'Costillas Ibéricas al Mirceno', name_en: 'Iberian Ribs with Myrcene', description_es: 'Costillas de cerdo ibérico confitadas 12h con mirceno, tomillo y comino.', description_en: '12-hour slow-cooked Iberian pork ribs with myrcene, thyme and cumin.', terpene_profile: 'Mirceno', category: 'mains', price: 42 },
  { id: 4, name_es: 'Lubina con Emulsión de Pineno', name_en: 'Sea Bass with Pine Emulsion', description_es: 'Lubina salvaje a la brasa con emulsión de mantequilla con pineno.', description_en: 'Wild sea bass on the grill with pine-infused butter emulsion.', terpene_profile: 'Pineno', category: 'mains', price: 46 },
  { id: 5, name_es: 'Coulant de Chocolate y Linalool', name_en: 'Chocolate Coulant with Linalool', description_es: 'Coulant de chocolate 72% con corazón de linalool y lavanda.', description_en: '72% chocolate coulant with linalool and lavender molten heart.', terpene_profile: 'Linalool', category: 'desserts', price: 18 },
  { id: 6, name_es: 'Sorbete Cítrico con Limoneno', name_en: 'Citrus Sorbet with Limonene', description_es: 'Trío de sorbetes cítricos potenciados con limoneno de Caliterpenes.', description_en: 'Trio of citrus sorbets enhanced with Caliterpenes limonene.', terpene_profile: 'Limoneno', category: 'desserts', price: 16 },
]

export default function Menu() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language?.startsWith('en') ? 'en' : 'es'
  const [items, setItems] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMenu()
      .then((r) => setItems(r.data.length ? r.data : FALLBACK_ITEMS))
      .catch(() => setItems(FALLBACK_ITEMS))
      .finally(() => setLoading(false))
  }, [])

  const categories = ['all', 'starters', 'mains', 'desserts']
  const filtered = filter === 'all' ? items : items.filter((i) => i.category === filter)

  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <p className="text-xs tracking-[0.3em] mb-3 opacity-50" style={{ color: GREEN }}>BISTROCALI</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#F5F5F0' }}>
          {t('menu.title')}
        </h1>
        <p className="opacity-60 text-lg">{t('menu.subtitle')}</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 justify-center mb-10">
        {categories.map((cat) => (
          <Button
            key={cat}
            size="sm"
            variant={filter === cat ? 'solid' : 'bordered'}
            onPress={() => setFilter(cat)}
            style={
              filter === cat
                ? { backgroundColor: GOLD, color: '#0A0A0A', fontWeight: 700 }
                : { borderColor: `${GOLD}55`, color: '#F5F5F0' }
            }
          >
            {t(`menu.filter_${cat}`)}
          </Button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-20 opacity-40">Cargando menú...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => {
            const tColor = TERPENE_COLORS[item.terpene_profile] || GREEN
            return (
              <Card
                key={item.id}
                className="border transition-all hover:-translate-y-1"
                style={{ backgroundColor: '#0D1A0F', borderColor: `${tColor}33` }}
              >
                <div
                  className="h-2 rounded-t-xl"
                  style={{ backgroundColor: tColor }}
                />
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-base" style={{ color: '#F5F5F0' }}>
                      {lang === 'en' ? item.name_en : item.name_es}
                    </h3>
                    {item.price && (
                      <span className="font-bold text-sm ml-2 flex-shrink-0" style={{ color: GOLD }}>
                        {item.price}€
                      </span>
                    )}
                  </div>
                  <p className="text-xs opacity-60 leading-relaxed mb-4">
                    {lang === 'en' ? item.description_en : item.description_es}
                  </p>
                  <Chip
                    size="sm"
                    variant="flat"
                    style={{ backgroundColor: `${tColor}15`, color: tColor, border: `1px solid ${tColor}44` }}
                  >
                    🌿 {item.terpene_profile}
                  </Chip>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
