import './globals.css'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';
import VantaBackground from './components/VantaBackground'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: "Yoda AI",
  description:
    "Yoda is an AI bot that speaks in the wise and cryptic style of Master Yoda, from Star Wars",
  openGraph: {
    title: 'Yoda AI',
    description: 'Yoda is an AI bot that speaks in the wise and cryptic style of Master Yoda, from Star Wars',
    image: '/app/opengraph-image.png'
  },
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} relative min-h-screen overflow-hidden text-white`}>
        {/* Фон Vanta */}
        <VantaBackground />

        {/* Полупрозрачный слой с контентом поверх фона */}
        <div className="relative z-10 bg-black/50 backdrop-blur-sm min-h-screen flex flex-col">
          {children}
          <Analytics />
        </div>

        {/* Скрипты для three.js и vanta (если необходимо) */}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.halo.min.js"></script>
      </body>
    </html>
  )
}
