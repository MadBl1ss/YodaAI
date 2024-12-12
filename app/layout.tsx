import './globals.css'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';

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
      <body className={`${inter.className} relative min-h-screen text-white bg-black`}>
      <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        >
          <source src="/bg.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 min-h-screen flex flex-col backdrop-blur-none overflow-auto">
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
