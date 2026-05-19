import React, { useState } from 'react'

const ICONS: Record<string, React.ReactNode> = {
  iOS: (
    <svg width="10" height="12" viewBox="0 0 814 1000" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.5-155.5-127.4C46 790.7 0 663 0 541.8c0-207.8 135.4-317.7 269-317.7 70.5 0 129.2 46.4 173.5 46.4 42.8 0 109.8-49.1 190.5-49.1 30.8 0 108.2 2.6 168.1 61.6zm-234.8-68.7c-25.1 29.9-67.2 52.7-108.2 52.7-1.9 0-3.9-.1-5.8-.3.5-26.6 11-54.1 28.3-73.7 25.1-29.9 68.7-52.7 106.3-54.6 1.3 27.3-7.9 54.3-20.6 75.9z"/>
    </svg>
  ),
  Android: (
    <svg width="12" height="13" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <path d="M1.5 9.5a1 1 0 0 1 1-1 1 1 0 0 1 1 1v5a1 1 0 0 1-1 1 1 1 0 0 1-1-1v-5zm19 0a1 1 0 0 1 1-1 1 1 0 0 1 1 1v5a1 1 0 0 1-1 1 1 1 0 0 1-1-1v-5zM5 8.5h14v8a2 2 0 0 1-2 2h-1v2.5a1 1 0 0 1-1 1 1 1 0 0 1-1-1V18.5h-2v2.5a1 1 0 0 1-1 1 1 1 0 0 1-1-1V18.5H9a2 2 0 0 1-2-2v-8zM8.5 6A.5.5 0 0 1 9 5.5h.5V4a.5.5 0 0 1 1 0v1.5h4V4a.5.5 0 0 1 1 0v1.5H16a.5.5 0 0 1 0 1H8.5A.5.5 0 0 1 8 6a.5.5 0 0 1 .5-.5zM16.5 3.8l.9-1.6a.25.25 0 0 0-.09-.34.25.25 0 0 0-.34.09L16.05 3.6A6.5 6.5 0 0 0 12 2.5a6.5 6.5 0 0 0-4.05 1.1L7.03 1.95a.25.25 0 0 0-.34-.09.25.25 0 0 0-.09.34l.9 1.6A6.5 6.5 0 0 0 5 8.5h14a6.5 6.5 0 0 0-2.5-4.7zM10 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm5 0a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
    </svg>
  ),
  Web: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
}

interface PlatformBadgeProps {
  platform: string
}

export default function PlatformBadge({ platform }: PlatformBadgeProps) {
  const [hovered, setHovered] = useState(false)
  const icon = ICONS[platform] ?? null

  const style: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '0.7rem',
    fontWeight: 500,
    color: hovered ? 'rgba(0,212,255,1)' : 'rgba(0,212,255,0.88)',
    background: hovered ? 'rgba(0,212,255,0.14)' : 'rgba(0,212,255,0.07)',
    border: `1px solid rgba(0,220,255,${hovered ? '0.5' : '0.24'})`,
    borderRadius: '20px',
    padding: '3px 10px 3px 8px',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',
    boxShadow: hovered ? '0 0 10px rgba(0,212,255,0.18)' : 'none',
    transition: 'all 0.2s ease',
    cursor: 'default',
    userSelect: 'none',
    letterSpacing: '0.02em',
    whiteSpace: 'nowrap',
  }

  return (
    <span
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {icon}
      {platform}
    </span>
  )
}
