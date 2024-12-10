'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function VantaBackground() {
  const vantaRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let effect: any
    (async () => {
      const VANTA = await import('@/public/vanta.halo.min') // путь к vanta.halo.min.js, убедитесь, что файл доступен
      effect = VANTA.default({
        el: vantaRef.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        backgroundColor: 0x131a43,
        baseColor: 0x1a59,
        xOffset: 0.20,
        yOffset: -0.07
        // Дополнительные настройки, если нужно
      })
    })()
    
    return () => {
      if (effect) effect.destroy()
    }
  }, [])

  return <div ref={vantaRef} className="absolute top-0 left-0 w-full h-full" />
}
