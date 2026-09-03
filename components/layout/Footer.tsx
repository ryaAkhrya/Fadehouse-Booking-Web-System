import Link from "next/link"
import { FadeIn } from "@/components/motion/FadeIn"
import { getDictionary } from "@/lib/i18n"

export async function Footer() {
  const { t, lang } = await getDictionary()

  return (
    <footer className="border-t border-border bg-background pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
          <div>
            <Link href="/" className="font-display text-2xl font-bold tracking-tight text-foreground">
              FADEHOUSE
            </Link>
            <p className="mt-4 text-sm text-muted max-w-xs">
              {t.footer.desc}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 md:col-span-2">
            <div>
              <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">{t.footer.appointments}</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/booking" className="text-sm text-muted hover:text-accent transition-colors">{t.nav.book}</Link>
                </li>
                <li>
                  <Link href="/treatments" className="text-sm text-muted hover:text-accent transition-colors">{t.nav.treatments}</Link>
                </li>
                <li>
                  <Link href="/manage" className="text-sm text-muted hover:text-accent transition-colors">{t.nav.manage}</Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">{t.footer.location}</h3>
              <ul className="space-y-3">
                <li className="text-sm text-muted">
                  Jakarta, Indonesia<br />
                  {lang === 'id' ? 'Lokasi Demo' : 'Demo Location'}
                </li>
                <li>
                  <a href="tel:+6281200000088" className="text-sm text-muted hover:text-accent transition-colors">
                    +62 812-0000-0088
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com/fadehouse.demo" target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-accent transition-colors">
                    @fadehouse.demo
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </FadeIn>
        
        <FadeIn delay={0.2} className="mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} {t.footer.rights}
          </p>
          <p className="text-xs text-muted/70">
            {t.footer.demo}
          </p>
        </FadeIn>
      </div>
    </footer>
  )
}
