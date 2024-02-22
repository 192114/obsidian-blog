import { defineConfig, presetUno, presetIcons, presetAttributify } from 'unocss'

export default defineConfig({
  shortcuts: {
    'flex-center': 'flex justify-center items-center',
    'flex-x-center': 'flex justify-center',
    'flex-y-center': 'flex items-center',
    'button-reset': 'border-none bg-transparent text-text-weak cursor-pointer hover:text-primary',
    'hidden-in-mobile': '<sm:hidden',
    'tag-style': 'bg-card-background p-1 rounded-md mx-1 text-text-weak',
    'timeline': 'list-none p-0 m-0',
    'timeline-item': 'relative pb-14px',
    'timeline-tail': 'absolute top-10px w-2px bg-primary/20 left-4px h-[calc(100%-10px)]',
    'timeline-point': 'absolute w-10px h-10px bg-card-background rounded-full border-solid border-3px border-primary',
    'timeline-content': 'pl-24px relative top--6px',
  },
  rules: [
    [/^slide-enter-(\d+)$/, ([_, n]) => ({
      '--enter-stage': n,
    })],
  ],
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
      highLight: 'hsl(var(--high-light))',
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