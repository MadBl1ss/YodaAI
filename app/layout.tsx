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
      <body className={`${inter.className} bg-dgreen`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
