import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(async ({ command }) => {
  const plugins = [react()]

  // The join API only runs on the dev server and on `vite preview`.
  // Importing it lazily keeps `vite build` independent of Node's SQLite
  // module, so static hosts can build the site with any supported Node.
  if (command === 'serve') {
    const { joinApiPlugin } = await import('./server/join-api.js')
    plugins.push(joinApiPlugin())
  }

  return { plugins }
})
