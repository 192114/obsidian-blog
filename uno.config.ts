import { defineConfig, presetUno, presetIcons, presetAttributify } from 'unocss'

export default defineConfig({
  shortcuts: {
    'flex-center': 'flex justify-center items-center',
    'flex-x-center': 'flex justify-center',
    'flex-y-center': 'flex items-center',
  },
  theme: {
    colors: {
      background: 'hsl(var(--background))',
      cardBackground: 'hsl(var(--card-background))',
      primary: 'hsl(var(--primary))',
      secondary: 'hsl(var(--secondary))',
      text: 'hsl(var(--text))',
      textAccent: 'hsl(var(--text-accent))',
      textWeak: 'hsl(var(--text-weak))',
      border: 'hsl(var(--border))',
      active: 'hsl(var(--active))',
    }
  },
  presets: [
    presetUno({
      dark: 'class',
    }),
    presetAttributify(),
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
      collections: {
        'lucide': () => import('@iconify-json/lucide/icons.json').then(i => i.default),
      }
    }),
  ],
})