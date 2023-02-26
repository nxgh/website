import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  extract: {
    include: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    exclude: ['node_modules', '.git', '.next'],
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
  },
})
