import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import Unocss from 'unocss/vite'
import { presetAttributify, presetUno } from 'unocss'
import presetWind from '@unocss/preset-wind'
import vitePluginImp from 'vite-plugin-imp'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'docs',
  },
  plugins: [
    react(),
    mdx(/* jsxImportSource: …, otherOptions… */),
    Unocss({
      presets: [
        presetAttributify({
          /* preset options */
        }),
        presetUno(),
        presetWind(),
      ],

      shortcuts: {
        btn: 'py-2 px-4 rounded-sm shadow-md bg-white border-1px',
      },
    }),
    visualizer(),
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          style: (name) => `antd/lib/${name}/style`,
        },
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
      },
    },
  },
})
