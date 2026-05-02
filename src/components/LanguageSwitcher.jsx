import { useTranslation } from 'react-i18next'
import { Button } from '@heroui/react'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const current = i18n.language?.startsWith('en') ? 'en' : 'es'

  const toggle = () => i18n.changeLanguage(current === 'es' ? 'en' : 'es')

  return (
    <Button
      size="sm"
      variant="bordered"
      onPress={toggle}
      style={{ borderColor: '#C9A84C', color: '#C9A84C', minWidth: 48 }}
      className="font-semibold text-xs"
    >
      {current === 'es' ? 'EN' : 'ES'}
    </Button>
  )
}
