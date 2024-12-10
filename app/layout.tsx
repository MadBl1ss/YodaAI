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
      <VantaBackground />
      <div className="relative z-10 bg-black/50 backdrop-blur-sm">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  )
}
