import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'FPVFreq',
    short_name: 'FPVFreq',
    description: 'Калькулятор конфліктів частот для FPV',
    start_url: '/',
    display: 'standalone',
    background_color: '#1F2937',
    orientation: 'any',
    icons: [
        {
            src: "/images/web-app-manifest-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any"
        },
        {
            src: "/images/web-app-manifest-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable"
        },
        {
            src: "/images/web-app-manifest-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
        }
    ],
  }
}
