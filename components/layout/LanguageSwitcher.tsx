"use client"

import { useLanguage } from "@/lib/i18n/LanguageContext"
import { cn } from "@/lib/utils"

export function LanguageSwitcher({ className }: { className?: string }) {
  const { lang, setLang } = useLanguage()

  return (
    <div className={cn("flex items-center gap-2 text-sm font-medium", className)}>
      <button
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
        className={cn(
          "transition-colors hover:text-accent",
          lang === 'en' ? "text-foreground" : "text-muted"
        )}
      >
        EN
      </button>
      <span className="text-border/50">|</span>
      <button
        onClick={() => setLang('id')}
        aria-pressed={lang === 'id'}
        className={cn(
          "transition-colors hover:text-accent",
          lang === 'id' ? "text-foreground" : "text-muted"
        )}
      >
        ID
      </button>
    </div>
  )
}
