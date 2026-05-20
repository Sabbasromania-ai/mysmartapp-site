import { useState } from 'react'
import PlatformBadge from './PlatformBadge'

/* ── Individual badge ─────────────────────────────────────────── */
interface BadgeProps {
  disabled?: boolean
  url?: string
  store: 'appstore' | 'googleplay'
}

function StoreBadge({ disabled = false, url, store }: BadgeProps) {
  const [hov, setHov] = useState(false)

  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '9px',
    background: hov && !disabled
      ? 'linear-gradient(135deg, #252525 0%, #181818 100%)'
      : 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)',
    border: `1px solid rgba(255,255,255,${hov && !disabled ? '0.28' : '0.16'})`,
    borderRadius: '9px',
    padding: '7px 14px',
    cursor: disabled ? 'default' : 'pointer',
    opacity: disabled ? 0.72 : 1,
    boxShadow: hov && !disabled
      ? '0 0 14px rgba(255,255,255,0.08)'
      : 'none',
    transition: 'all 0.2s ease',
    textDecoration: 'none',
    color: 'inherit',
    userSelect: 'none',
    flexShrink: 0,
  }

  const content = (
    <>
      {store === 'appstore' ? <AppleIcon /> : <GooglePlayIcon />}
      <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
        <span style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.68)', letterSpacing: '0.02em' }}>
          {store === 'appstore' ? 'Download on the' : 'GET IT ON'}
        </span>
        <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.01em' }}>
          {store === 'appstore' ? 'App Store' : 'Google Play'}
        </span>
      </span>
    </>
  )

  if (disabled || !url) {
    return (
      <span style={base} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
        {content}
      </span>
    )
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={base}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {content}
    </a>
  )
}

/* ── Apple logo SVG ───────────────────────────────────────────── */
function AppleIcon() {
  return (
    <svg width="18" height="22" viewBox="0 0 814 1000" fill="white" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.5-155.5-127.4C46 790.7 0 663 0 541.8c0-207.8 135.4-317.7 269-317.7 70.5 0 129.2 46.4 173.5 46.4 42.8 0 109.8-49.1 190.5-49.1 30.8 0 108.2 2.6 168.1 61.6zm-234.8-68.7c-25.1 29.9-67.2 52.7-108.2 52.7-1.9 0-3.9-.1-5.8-.3.5-26.6 11-54.1 28.3-73.7 25.1-29.9 68.7-52.7 106.3-54.6 1.3 27.3-7.9 54.3-20.6 75.9z"/>
    </svg>
  )
}

/* ── Google Play icon SVG ─────────────────────────────────────── */
function GooglePlayIcon() {
  return (
    <svg width="20" height="22" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <path d="M48 432c0 17.7 19.4 28.4 34.5 19.1l352-208c14.8-8.7 14.8-30.5 0-39.2l-352-208C67.4 -4.4 48 6.3 48 24v408z" fill="white"/>
      <path d="M48 432c0 17.7 19.4 28.4 34.5 19.1L280 320 80 120 48 137.8V432z" fill="#00d8ff" opacity="0.85"/>
      <path d="M280 320l154.5 91.1c15.1 8.9 33.5-1.4 33.5-19.1V120c0-17.7-18.4-28-33.5-19.1L280 192v128z" fill="#ffbc00" opacity="0.9"/>
      <path d="M48 24v113.8l232 182.2V192L67.4 4.9C53.3-3.5 48 6.3 48 24z" fill="#34a853" opacity="0.9"/>
    </svg>
  )
}

/* ── Public StoreBadges ───────────────────────────────────────── */
interface StoreBadgesProps {
  platforms: string[]
  disabled?: boolean
  appStoreUrl?: string
  googlePlayUrl?: string
}

export default function StoreBadges({
  platforms,
  disabled = false,
  appStoreUrl,
  googlePlayUrl,
}: StoreBadgesProps) {
  const hasIOS     = platforms.includes('iOS')
  const hasAndroid = platforms.includes('Android')
  const hasWeb     = platforms.includes('Web')

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
      {hasIOS && (
        <StoreBadge store="appstore" disabled={disabled} url={appStoreUrl} />
      )}
      {hasAndroid && (
        <StoreBadge store="googleplay" disabled={disabled} url={googlePlayUrl} />
      )}
      {hasWeb && (
        <PlatformBadge platform="Web" />
      )}
    </div>
  )
}
