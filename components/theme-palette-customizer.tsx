'use client'

import { useThemeCustom, THEME_PALETTES } from '@/lib/theme-custom'
import { Check } from 'lucide-react'

export function ThemePaletteCustomizer() {
  const { palette, setPalette, palettes } = useThemeCustom()

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">Palette de couleurs</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Sélectionnez une palette de couleurs pour personnaliser l'apparence du site
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {Object.entries(palettes).map(([key, p]) => (
          <button
            key={key}
            onClick={() => setPalette(p)}
            className={`relative p-4 rounded-xl border-2 transition-all ${
              palette.name === p.name
                ? 'border-primary ring-2 ring-primary/20'
                : 'border-border hover:border-primary/50'
            }`}
          >
            {palette.name === p.name && (
              <div className="absolute top-2 right-2">
                <Check className="w-5 h-5 text-primary" />
              </div>
            )}

            <div className="space-y-2">
              <p className="font-medium text-sm text-foreground truncate">{p.name}</p>
              <div className="flex gap-1.5">
                {[p.darkBg, p.primary, p.accent, p.secondary].map((color, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-md border border-border"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-8 p-4 bg-secondary rounded-lg border border-border">
        <p className="text-sm text-muted-foreground">
          Les modifications de palette sont appliquées immédiatement et sauvegardées automatiquement.
        </p>
      </div>
    </div>
  )
}
