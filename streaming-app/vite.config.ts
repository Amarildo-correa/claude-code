import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// Caminho absoluto porque o app agora usa a History/Navigation API para
// rotas reais (/buscar, /titulo/:id, ...) — com um base relativo, recarregar
// numa rota aninhada resolveria os assets no caminho errado.
export default defineConfig({
  base: '/claude-code/',
  plugins: [react(), tailwindcss()],
})
