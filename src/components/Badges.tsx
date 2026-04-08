export function AppStoreBadge() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 135 40" height="36">
      <rect width="135" height="40" rx="7" fill="#000"/>
      <rect x="0.5" y="0.5" width="134" height="39" rx="6.5" fill="none" stroke="#A6A6A6"/>
      <path d="M24.77 20.14c-.03-3.26 2.66-4.84 2.78-4.91-1.52-2.22-3.88-2.52-4.71-2.55-1.99-.2-3.9 1.18-4.91 1.18-1.02 0-2.58-1.16-4.25-1.13-2.17.03-4.18 1.28-5.29 3.23-2.27 3.94-.58 9.75 1.62 12.94 1.08 1.56 2.35 3.31 4.02 3.25 1.62-.07 2.23-1.04 4.19-1.04 1.94 0 2.51 1.04 4.21 1.01 1.74-.03 2.84-1.58 3.9-3.15 1.24-1.8 1.74-3.56 1.77-3.65-.04-.02-3.39-1.3-3.33-5.18z" fill="#fff"/>
      <path d="M21.54 10.9c.89-1.09 1.49-2.59 1.33-4.1-1.28.05-2.86.86-3.78 1.93-.82.96-1.55 2.51-1.36 3.98 1.43.11 2.89-.73 3.81-1.81z" fill="#fff"/>
      <text x="42" y="14" fill="#fff" fontFamily="-apple-system,Helvetica,sans-serif" fontSize="8" letterSpacing="0.1">Download on the</text>
      <text x="42" y="27" fill="#fff" fontFamily="-apple-system,Helvetica,sans-serif" fontSize="15" fontWeight="600" letterSpacing="-0.3">App Store</text>
    </svg>
  )
}

export function PlayStoreBadge({ id = 'a' }: { id?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 135 40" height="36">
      <rect width="135" height="40" rx="7" fill="#000"/>
      <rect x="0.5" y="0.5" width="134" height="39" rx="6.5" fill="none" stroke="#A6A6A6"/>
      <path d="M9.5 7.6c-.3.3-.5.8-.5 1.5v21.8c0 .7.2 1.2.5 1.5l.1.1 12.2-12.2v-.3L9.6 7.5l-.1.1z" fill={`url(#g1${id})`}/>
      <path d="M25.9 24.1l-4.1-4.1v-.3l4.1-4.1.1.1 4.9 2.8c1.4.8 1.4 2.1 0 2.9l-4.9 2.8-.1-.1z" fill={`url(#g2${id})`}/>
      <path d="M26 24l-4.2-4.2-12.2 12.2c.5.5 1.2.5 2.1.1L26 24z" fill={`url(#g3${id})`}/>
      <path d="M26 16l-14.3-8.1c-.9-.5-1.6-.4-2.1.1l12.2 12.2L26 16z" fill={`url(#g4${id})`}/>
      <defs>
        <linearGradient id={`g1${id}`} x1="17.8" y1="8.7" x2="5.4" y2="21.1" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00A0FF"/><stop offset="1" stopColor="#00A1FF" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id={`g2${id}`} x1="31.8" y1="20" x2="9.4" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFD900"/><stop offset="1" stopColor="#FFBD00"/>
        </linearGradient>
        <linearGradient id={`g3${id}`} x1="23.4" y1="22.3" x2="5.1" y2="40.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF3A44"/><stop offset="1" stopColor="#C31162"/>
        </linearGradient>
        <linearGradient id={`g4${id}`} x1="7.3" y1="0.2" x2="17.5" y2="10.3" gradientUnits="userSpaceOnUse">
          <stop stopColor="#32A071"/><stop offset="1" stopColor="#2DA771"/>
        </linearGradient>
      </defs>
      <text x="42" y="14" fill="#fff" fontFamily="Arial,sans-serif" fontSize="8" letterSpacing="0.1">GET IT ON</text>
      <text x="42" y="27" fill="#fff" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="bold" letterSpacing="-0.3">Google Play</text>
    </svg>
  )
}
