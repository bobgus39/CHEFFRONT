import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '@heroui/react'
import LanguageSwitcher from './LanguageSwitcher'

const GOLD = '#C9A84C'
const GREEN = '#4A7C59'

export default function Navbar() {
  const { t } = useTranslation()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { href: '/', label: t('nav.home') },
    { href: '/about', label: t('nav.about') },
    { href: '/services', label: t('nav.services') },
    { href: '/menu', label: t('nav.menu') },
    { href: '/terpenes', label: t('nav.terpenes') },
    { href: '/gallery', label: t('nav.gallery') },
    { href: '/contact', label: t('nav.contact') },
  ]

  const navigate = useNavigate()
  const isActive = (href) => location.pathname === href

  return (
    <nav
      className="sticky top-0 z-50 w-full"
      style={{ backgroundColor: 'rgba(10,10,10,0.95)', borderBottom: `1px solid ${GREEN}33`, backdropFilter: 'blur(8px)' }}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="font-bold text-xl tracking-widest" style={{ color: GOLD }}>
          BISTROCALI
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className="px-3 py-2 text-sm transition-colors"
              style={{ color: isActive(l.href) ? GOLD : '#F5F5F0', fontWeight: isActive(l.href) ? 600 : 400 }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />
          <Button size="sm" onPress={() => navigate('/booking')} style={{ backgroundColor: GOLD, color: '#0A0A0A', fontWeight: 700 }}>
            {t('nav.booking')}
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="menu"
        >
          <span className="block w-6 h-0.5" style={{ backgroundColor: GOLD }} />
          <span className="block w-6 h-0.5" style={{ backgroundColor: GOLD }} />
          <span className="block w-6 h-0.5" style={{ backgroundColor: GOLD }} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-2" style={{ borderTop: `1px solid ${GREEN}33` }}>
          {links.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              onClick={() => setMenuOpen(false)}
              className="py-2 text-sm"
              style={{ color: isActive(l.href) ? GOLD : '#F5F5F0' }}
            >
              {l.label}
            </Link>
          ))}
          <div className="flex gap-3 mt-2">
            <LanguageSwitcher />
            <Button size="sm" onPress={() => { navigate('/booking'); setMenuOpen(false) }} style={{ backgroundColor: GOLD, color: '#0A0A0A', fontWeight: 700 }}>
              {t('nav.booking')}
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
