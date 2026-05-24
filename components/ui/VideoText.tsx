"use client"
import React, { ElementType, ReactNode, useEffect, useState } from "react"

export interface VideoTextProps {
  src: string
  className?: string
  style?: React.CSSProperties
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  preload?: "auto" | "metadata" | "none"
  children: ReactNode
  fontSize?: string | number
  fontWeight?: string | number
  fontFamily?: string
  as?: ElementType
}

export function VideoText({
  src,
  children,
  className = "",
  style,
  autoPlay = true,
  muted = true,
  loop = true,
  preload = "auto",
  fontSize = 20,
  fontWeight = "bold",
  fontFamily = "sans-serif",
  as: Component = "div",
}: VideoTextProps) {
  const [svgMask, setSvgMask] = useState("")
  const content = React.Children.toArray(children).join("")

  useEffect(() => {
    const update = () => {
      const fs = typeof fontSize === "number" ? `${fontSize}vw` : fontSize
      const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'><text x='0' y='50%' font-size='${fs}' font-weight='${fontWeight}' text-anchor='start' dominant-baseline='middle' font-family='${fontFamily}'>${content}</text></svg>`
      setSvgMask(svg)
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [content, fontSize, fontWeight, fontFamily])

  const mask = `url("data:image/svg+xml,${encodeURIComponent(svgMask)}")`

  return (
    <Component className={`relative inline-block ${className}`} style={style}>
      <div
        style={{
          maskImage: mask,
          WebkitMaskImage: mask,
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
        }}
        className="absolute inset-0"
      >
        <video
          className="h-full w-full object-cover"
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          preload={preload}
          playsInline
        >
          <source src={src} type="video/webm" />
          <source src={src.replace(".webm", ".mp4")} type="video/mp4" />
        </video>
      </div>
      <span className="invisible">{children}</span>
      <span className="sr-only">{content}</span>
    </Component>
  )
}
