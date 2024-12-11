"use client"

import React, { useEffect, useRef, useState } from "react";
// @ts-ignore
import GLOBE from "vanta/dist/vanta.halo.min";
import * as THREE from "three";

export default function VantaBackground() {
  const [vantaEffect, setVantaEffect] = useState<any>(null)
  const vantaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        GLOBE({
          THREE,
          el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            baseColor: 0x96b13,
            xOffset: 0.20,
            yOffset: -0.07
        })
      );
    }
    return () => {
      if (vantaEffect) (vantaEffect as any).destroy();
    };
  }, [vantaEffect]);

  return (
    <div 
      ref={vantaRef} 
      className="absolute top-0 left-0 w-full h-full -z-10 "
    />
  )
}
