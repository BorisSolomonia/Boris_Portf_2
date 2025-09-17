import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { readdirSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = dirname(fileURLToPath(import.meta.url))
const financeSourceDir = resolve(rootDir, 'public', 'projects', 'finance', 'protected')
const generatedDir = resolve(rootDir, 'src', 'generated')
const manifestFile = resolve(generatedDir, 'financeManifest.json')

const toTitleCase = (fileName: string) => {
  const withoutExt = fileName.replace(/\.pdf$/i, '')
  const spaced = withoutExt.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim()
  return spaced.replace(/\b\w/g, (char) => char.toUpperCase())
}

const generateFinanceManifest = () => {
  if (!existsSync(financeSourceDir)) {
    mkdirSync(financeSourceDir, { recursive: true })
  }

  const pdfFiles = readdirSync(financeSourceDir).filter((file) => file.toLowerCase().endsWith('.pdf')).sort()
  const manifest = pdfFiles.map((file) => ({
    filename: file,
    title: toTitleCase(file),
    pdfPath: `/projects/finance/protected/${file}`
  }))

  mkdirSync(generatedDir, { recursive: true })
  writeFileSync(manifestFile, JSON.stringify(manifest, null, 2))
  return manifest
}

generateFinanceManifest()

const financeManifestPlugin = (): Plugin => {
  return {
    name: 'finance-manifest-plugin',
    apply: 'serve',
    configureServer(server) {
      const regenerate = () => generateFinanceManifest()
      const { watcher } = server

      watcher.add(financeSourceDir)
      const handleChange = (filePath: string) => {
        if (filePath.toLowerCase().endsWith('.pdf')) {
          regenerate()
        }
      }

      watcher.on('add', handleChange)
      watcher.on('unlink', handleChange)
      watcher.on('change', handleChange)
    }
  }
}

const financeManifestBuildPlugin = (): Plugin => {
  return {
    name: 'finance-manifest-build-plugin',
    apply: 'build',
    buildStart() {
      generateFinanceManifest()
    }
  }
}

export default defineConfig({
  plugins: [financeManifestPlugin(), financeManifestBuildPlugin(), react()],
  build: {
    outDir: process.env.BUILD_PATH || 'dist',
    assetsDir: 'assets'
  },
  base: process.env.VITE_BASE_URL || './'
})