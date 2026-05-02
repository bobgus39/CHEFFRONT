import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const GOLD = '#C9A84C'
const GREEN = '#4A7C59'

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer
      className="w-full mt-20 pt-10 pb-6"
      style={{ borderTop: `1px solid ${GREEN}44`, backgroundColor: '#060606' }}
    >
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-bold tracking-widest mb-2" style={{ color: GOLD }}>
            BISTROCALI
          </h3>
          <p className="text-sm opacity-70">{t('footer.tagline')}</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3" style={{ color: GOLD }}>Links</h4>
          <div className="flex flex-col gap-1">
            {['/', '/about', '/services', '/menu', '/terpenes', '/gallery'].map((href) => {
              const key = href === '/' ? 'nav.home' : `nav.${href.slice(1)}`
              return (
                <Link
                  key={href}
                  to={href}
                  className="text-sm opacity-70 hover:opacity-100 transition-opacity"
                  style={{ color: '#F5F5F0' }}
                >
                  {t(key)}
                </Link>
              )
            })}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3" style={{ color: GOLD }}>
            {t('contact.follow')}
          </h4>
          <div className="flex gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-sm opacity-70 hover:opacity-100 transition-opacity"
              style={{ color: '#F5F5F0' }}
            >
              Instagram
            </a>
            <a
              href="https://caliterpenes.com"
              target="_blank"
              rel="noreferrer"
              className="text-sm opacity-70 hover:opacity-100 transition-opacity"
              style={{ color: GREEN }}
            >
              Caliterpenes
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8 pt-4" style={{ borderTop: `1px solid ${GREEN}22` }}>
        <p className="text-xs opacity-40 text-center">
          © {year} BISTROCALI — {t('footer.rights')}
        </p>
      </div>
    </footer>
  )
}
