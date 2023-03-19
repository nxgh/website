import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  extract: {
    include: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/**/*.{js,ts,jsx,tsx}'],
    exclude: ['node_modules', '.git', '.next'],
  },
  shortcuts: {
    full: 'w-full h-full',
    'flex-center': 'flex justify-center items-center',
    'vertical-center': 'flex items-center',
    'horizontal-center': 'flex justify-center',
  },
  theme: {
    fontFamily: {
      aliceinwonderland: ['AliceInWonderland', 'fangsong'],
      loveisfree: ['LoveIsfree', 'fangsong'],
      lovequeen: ['LOVEQueen', 'fangsong'],
      missaluncialebricks: ['MissalUncialeBricks', 'fangsong'],
      missaluncialemaster: ['MissalUncialeMaster', 'fangsong'],
      potra: ['Potra', 'fangsong'],
      travelertypeface: ['TravelerTypeface', 'fangsong'],
    },
    extends: {},
    textColor: {
      primary: 'var(--text-color)',
    },
  },
})
