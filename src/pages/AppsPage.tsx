import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import StoreBadges from '../components/StoreBadges'
import appLogo from '../applogo.png'
import iReceptionLogo from '../ireception-logo.png'
import iCalorieLogo from '../icalorie-logo.png'
import heroPhoneApps from '../screens/hero-phone-apps.png'
import iReceptionMockup from '../iReception_mockup.png'
import iCalorieMockup from '../iCalorie_mockup.png'
import { useLang, setMeta, setOG, setCanonical } from '../LangContext'
import { config } from '../config'

const SLUG_MOUNJARO = 'mounjaro-tracker-ai-health'
const SLUG_WELLNESS = 'ireception'
const SLUG_NUTRITION = 'icalorie'

// ── Section header icons ──────────────────────────────────────
const PhoneSectionIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
    <line x1="12" y1="18" x2="12.01" y2="18"/>
  </svg>
)
const MonitorSectionIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
    <line x1="8" y1="21" x2="16" y2="21"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
)
const CartSectionIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
  </svg>
)
const CpuSectionIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2"/>
    <rect x="9" y="9" width="6" height="6"/>
    <line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/>
    <line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/>
    <line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/>
    <line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>
  </svg>
)

// ── AI tool icons ─────────────────────────────────────────────
const BotIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="10" rx="2"/>
    <circle cx="12" cy="5" r="2"/>
    <path d="M12 7v4"/>
    <line x1="8" y1="16" x2="8.01" y2="16"/>
    <line x1="16" y1="16" x2="16.01" y2="16"/>
  </svg>
)
const ScanDocIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="8" y1="13" x2="16" y2="13"/>
    <line x1="8" y1="17" x2="12" y2="17"/>
  </svg>
)
const CalendarAutoIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
    <path d="M9 16l2 2 4-4"/>
  </svg>
)
const CRMEmailIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="M22 7l-10 7L2 7"/>
  </svg>
)

// ── SVG browser previews ──────────────────────────────────────
const BizWebPreview = () => (
  <svg viewBox="0 0 200 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="128" rx="7" fill="#090c14" stroke="rgba(0,220,255,0.22)" strokeWidth="1"/>
    <rect width="200" height="24" rx="7" fill="#111520"/>
    <rect y="18" width="200" height="6" fill="#111520"/>
    <circle cx="13" cy="12" r="3" fill="#ff5f57" opacity="0.7"/>
    <circle cx="23" cy="12" r="3" fill="#febc2e" opacity="0.7"/>
    <circle cx="33" cy="12" r="3" fill="#28c840" opacity="0.7"/>
    <rect x="44" y="7" width="108" height="10" rx="3" fill="rgba(255,255,255,0.07)"/>
    <rect x="8" y="30" width="42" height="5" rx="2" fill="rgba(0,220,255,0.40)"/>
    <rect x="130" y="30" width="18" height="5" rx="2" fill="rgba(255,255,255,0.12)"/>
    <rect x="152" y="30" width="18" height="5" rx="2" fill="rgba(255,255,255,0.12)"/>
    <rect x="174" y="29" width="18" height="7" rx="3" fill="rgba(0,220,255,0.50)"/>
    <line x1="8" y1="42" x2="192" y2="42" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5"/>
    <rect x="8" y="48" width="95" height="8" rx="2" fill="rgba(255,255,255,0.65)"/>
    <rect x="8" y="60" width="78" height="4.5" rx="2" fill="rgba(255,255,255,0.22)"/>
    <rect x="8" y="68" width="88" height="4.5" rx="2" fill="rgba(255,255,255,0.14)"/>
    <rect x="8" y="80" width="78" height="26" rx="4" fill="rgba(0,220,255,0.06)" stroke="rgba(0,220,255,0.25)" strokeWidth="0.8"/>
    <rect x="14" y="86" width="56" height="4" rx="1.5" fill="rgba(255,255,255,0.12)"/>
    <rect x="14" y="94" width="46" height="4" rx="1.5" fill="rgba(255,255,255,0.10)"/>
    <rect x="108" y="44" width="84" height="62" rx="5" fill="rgba(0,220,255,0.05)" stroke="rgba(0,220,255,0.20)" strokeWidth="0.8"/>
    <rect x="116" y="52" width="68" height="8" rx="2" fill="rgba(0,220,255,0.28)"/>
    <rect x="116" y="64" width="52" height="3.5" rx="1.5" fill="rgba(255,255,255,0.15)"/>
    <rect x="116" y="71" width="40" height="3.5" rx="1.5" fill="rgba(255,255,255,0.10)"/>
    <rect x="116" y="80" width="32" height="10" rx="4" fill="rgba(0,220,255,0.45)"/>
  </svg>
)

const ServiceLandingPreview = () => (
  <svg viewBox="0 0 200 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="128" rx="7" fill="#090c14" stroke="rgba(156,95,247,0.22)" strokeWidth="1"/>
    <rect width="200" height="24" rx="7" fill="#111520"/>
    <rect y="18" width="200" height="6" fill="#111520"/>
    <circle cx="13" cy="12" r="3" fill="#ff5f57" opacity="0.7"/>
    <circle cx="23" cy="12" r="3" fill="#febc2e" opacity="0.7"/>
    <circle cx="33" cy="12" r="3" fill="#28c840" opacity="0.7"/>
    <rect x="44" y="7" width="108" height="10" rx="3" fill="rgba(255,255,255,0.07)"/>
    <rect x="50" y="34" width="100" height="8" rx="2" fill="rgba(255,255,255,0.65)"/>
    <rect x="60" y="46" width="80" height="4.5" rx="2" fill="rgba(255,255,255,0.20)"/>
    <rect x="65" y="54" width="70" height="4.5" rx="2" fill="rgba(255,255,255,0.13)"/>
    <rect x="70" y="65" width="60" height="14" rx="5" fill="rgba(156,95,247,0.60)" stroke="rgba(156,95,247,0.85)" strokeWidth="0.8"/>
    <rect x="86" y="71" width="28" height="3" rx="1" fill="white" opacity="0.9"/>
    <circle cx="40" cy="96" r="9" fill="rgba(156,95,247,0.14)" stroke="rgba(156,95,247,0.38)" strokeWidth="0.8"/>
    <circle cx="40" cy="96" r="3.5" fill="rgba(156,95,247,0.75)"/>
    <rect x="53" y="93" width="28" height="3" rx="1" fill="rgba(255,255,255,0.20)"/>
    <rect x="53" y="99" width="20" height="2.5" rx="1" fill="rgba(255,255,255,0.10)"/>
    <circle cx="106" cy="96" r="9" fill="rgba(156,95,247,0.14)" stroke="rgba(156,95,247,0.38)" strokeWidth="0.8"/>
    <circle cx="106" cy="96" r="3.5" fill="rgba(156,95,247,0.75)"/>
    <rect x="119" y="93" width="28" height="3" rx="1" fill="rgba(255,255,255,0.20)"/>
    <rect x="119" y="99" width="20" height="2.5" rx="1" fill="rgba(255,255,255,0.10)"/>
    <circle cx="168" cy="96" r="9" fill="rgba(156,95,247,0.14)" stroke="rgba(156,95,247,0.38)" strokeWidth="0.8"/>
    <circle cx="168" cy="96" r="3.5" fill="rgba(156,95,247,0.75)"/>
  </svg>
)

const AgencyWebPreview = () => (
  <svg viewBox="0 0 200 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="128" rx="7" fill="#090c14" stroke="rgba(52,211,153,0.22)" strokeWidth="1"/>
    <rect width="200" height="24" rx="7" fill="#111520"/>
    <rect y="18" width="200" height="6" fill="#111520"/>
    <circle cx="13" cy="12" r="3" fill="#ff5f57" opacity="0.7"/>
    <circle cx="23" cy="12" r="3" fill="#febc2e" opacity="0.7"/>
    <circle cx="33" cy="12" r="3" fill="#28c840" opacity="0.7"/>
    <rect x="44" y="7" width="108" height="10" rx="3" fill="rgba(255,255,255,0.07)"/>
    <rect x="8" y="30" width="36" height="5" rx="2" fill="rgba(52,211,153,0.45)"/>
    <rect x="136" y="30" width="20" height="5" rx="2" fill="rgba(255,255,255,0.12)"/>
    <rect x="160" y="30" width="20" height="5" rx="2" fill="rgba(255,255,255,0.12)"/>
    <rect x="8" y="42" width="80" height="8" rx="2" fill="rgba(255,255,255,0.68)"/>
    <rect x="8" y="54" width="70" height="4" rx="1.5" fill="rgba(255,255,255,0.20)"/>
    <rect x="8" y="62" width="60" height="4" rx="1.5" fill="rgba(255,255,255,0.13)"/>
    <rect x="8" y="70" width="36" height="10" rx="4" fill="rgba(52,211,153,0.45)"/>
    <rect x="8" y="86" width="58" height="32" rx="4" fill="rgba(52,211,153,0.06)" stroke="rgba(52,211,153,0.22)" strokeWidth="0.8"/>
    <circle cx="20" cy="97" r="5" fill="rgba(52,211,153,0.38)"/>
    <rect x="10" y="105" width="42" height="3" rx="1" fill="rgba(255,255,255,0.18)"/>
    <rect x="10" y="111" width="30" height="2.5" rx="1" fill="rgba(255,255,255,0.10)"/>
    <rect x="72" y="86" width="58" height="32" rx="4" fill="rgba(52,211,153,0.06)" stroke="rgba(52,211,153,0.22)" strokeWidth="0.8"/>
    <circle cx="84" cy="97" r="5" fill="rgba(52,211,153,0.38)"/>
    <rect x="74" y="105" width="42" height="3" rx="1" fill="rgba(255,255,255,0.18)"/>
    <rect x="74" y="111" width="30" height="2.5" rx="1" fill="rgba(255,255,255,0.10)"/>
    <rect x="136" y="86" width="56" height="32" rx="4" fill="rgba(52,211,153,0.14)" stroke="rgba(52,211,153,0.38)" strokeWidth="0.8"/>
    <rect x="143" y="93" width="42" height="5" rx="1.5" fill="rgba(52,211,153,0.55)"/>
    <rect x="143" y="102" width="36" height="3" rx="1" fill="rgba(255,255,255,0.18)"/>
    <rect x="143" y="109" width="28" height="2.5" rx="1" fill="rgba(255,255,255,0.10)"/>
  </svg>
)

const ProductCatalogPreview = () => (
  <svg viewBox="0 0 200 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="128" rx="7" fill="#090c14" stroke="rgba(255,179,0,0.22)" strokeWidth="1"/>
    <rect width="200" height="24" rx="7" fill="#111520"/>
    <rect y="18" width="200" height="6" fill="#111520"/>
    <circle cx="13" cy="12" r="3" fill="#ff5f57" opacity="0.7"/>
    <circle cx="23" cy="12" r="3" fill="#febc2e" opacity="0.7"/>
    <circle cx="33" cy="12" r="3" fill="#28c840" opacity="0.7"/>
    <rect x="44" y="7" width="108" height="10" rx="3" fill="rgba(255,255,255,0.07)"/>
    <rect x="8" y="30" width="58" height="5" rx="2" fill="rgba(255,255,255,0.45)"/>
    <rect x="148" y="29" width="44" height="7" rx="3" fill="rgba(255,179,0,0.22)" stroke="rgba(255,179,0,0.48)" strokeWidth="0.8"/>
    <rect x="8" y="42" width="56" height="42" rx="4" fill="rgba(255,179,0,0.06)" stroke="rgba(255,179,0,0.20)" strokeWidth="0.8"/>
    <rect x="15" y="48" width="42" height="20" rx="2" fill="rgba(255,179,0,0.14)"/>
    <rect x="15" y="72" width="30" height="3" rx="1" fill="rgba(255,255,255,0.25)"/>
    <rect x="15" y="77" width="22" height="3" rx="1" fill="rgba(255,179,0,0.60)"/>
    <rect x="70" y="42" width="56" height="42" rx="4" fill="rgba(255,179,0,0.06)" stroke="rgba(255,179,0,0.20)" strokeWidth="0.8"/>
    <rect x="77" y="48" width="42" height="20" rx="2" fill="rgba(255,179,0,0.14)"/>
    <rect x="77" y="72" width="30" height="3" rx="1" fill="rgba(255,255,255,0.25)"/>
    <rect x="77" y="77" width="22" height="3" rx="1" fill="rgba(255,179,0,0.60)"/>
    <rect x="132" y="42" width="60" height="42" rx="4" fill="rgba(255,179,0,0.06)" stroke="rgba(255,179,0,0.20)" strokeWidth="0.8"/>
    <rect x="139" y="48" width="46" height="20" rx="2" fill="rgba(255,179,0,0.14)"/>
    <rect x="139" y="72" width="32" height="3" rx="1" fill="rgba(255,255,255,0.25)"/>
    <rect x="139" y="77" width="24" height="3" rx="1" fill="rgba(255,179,0,0.60)"/>
    <rect x="8" y="91" width="36" height="28" rx="3" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5"/>
    <rect x="12" y="96" width="26" height="2.5" rx="1" fill="rgba(255,255,255,0.18)"/>
    <rect x="12" y="102" width="18" height="2" rx="1" fill="rgba(255,255,255,0.09)"/>
    <rect x="12" y="107" width="22" height="2" rx="1" fill="rgba(255,255,255,0.09)"/>
    <rect x="12" y="112" width="14" height="2" rx="1" fill="rgba(255,255,255,0.09)"/>
    <rect x="50" y="92" width="30" height="7" rx="3" fill="rgba(255,179,0,0.16)" stroke="rgba(255,179,0,0.35)" strokeWidth="0.5"/>
    <rect x="84" y="92" width="28" height="7" rx="3" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5"/>
    <rect x="116" y="92" width="34" height="7" rx="3" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5"/>
  </svg>
)

const CheckoutEshopPreview = () => (
  <svg viewBox="0 0 200 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="128" rx="7" fill="#090c14" stroke="rgba(56,189,248,0.22)" strokeWidth="1"/>
    <rect width="200" height="24" rx="7" fill="#111520"/>
    <rect y="18" width="200" height="6" fill="#111520"/>
    <circle cx="13" cy="12" r="3" fill="#ff5f57" opacity="0.7"/>
    <circle cx="23" cy="12" r="3" fill="#febc2e" opacity="0.7"/>
    <circle cx="33" cy="12" r="3" fill="#28c840" opacity="0.7"/>
    <rect x="44" y="7" width="108" height="10" rx="3" fill="rgba(255,255,255,0.07)"/>
    <rect x="8" y="30" width="48" height="6" rx="2" fill="rgba(255,255,255,0.48)"/>
    <rect x="8" y="42" width="116" height="20" rx="3" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5"/>
    <rect x="12" y="47" width="18" height="10" rx="2" fill="rgba(56,189,248,0.22)"/>
    <rect x="35" y="46" width="52" height="3.5" rx="1" fill="rgba(255,255,255,0.30)"/>
    <rect x="35" y="53" width="34" height="3" rx="1" fill="rgba(255,255,255,0.15)"/>
    <rect x="106" y="47" width="14" height="5" rx="1" fill="rgba(56,189,248,0.55)"/>
    <rect x="8" y="66" width="116" height="20" rx="3" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5"/>
    <rect x="12" y="71" width="18" height="10" rx="2" fill="rgba(56,189,248,0.22)"/>
    <rect x="35" y="70" width="44" height="3.5" rx="1" fill="rgba(255,255,255,0.30)"/>
    <rect x="35" y="77" width="28" height="3" rx="1" fill="rgba(255,255,255,0.15)"/>
    <rect x="106" y="71" width="14" height="5" rx="1" fill="rgba(56,189,248,0.55)"/>
    <rect x="130" y="42" width="62" height="62" rx="5" fill="rgba(56,189,248,0.05)" stroke="rgba(56,189,248,0.25)" strokeWidth="0.8"/>
    <rect x="136" y="49" width="50" height="3.5" rx="1" fill="rgba(255,255,255,0.30)"/>
    <line x1="136" y1="57" x2="186" y2="57" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5"/>
    <rect x="136" y="61" width="28" height="3" rx="1" fill="rgba(255,255,255,0.18)"/>
    <rect x="162" y="61" width="22" height="3" rx="1" fill="rgba(255,255,255,0.30)"/>
    <rect x="136" y="68" width="28" height="3" rx="1" fill="rgba(255,255,255,0.18)"/>
    <rect x="162" y="68" width="22" height="3" rx="1" fill="rgba(255,255,255,0.30)"/>
    <line x1="136" y1="75" x2="186" y2="75" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5"/>
    <rect x="136" y="78" width="34" height="3" rx="1" fill="rgba(56,189,248,0.55)"/>
    <rect x="136" y="88" width="50" height="11" rx="4" fill="rgba(56,189,248,0.55)" stroke="rgba(56,189,248,0.8)" strokeWidth="0.8"/>
    <rect x="150" y="92" width="22" height="2.5" rx="1" fill="white" opacity="0.9"/>
    <rect x="8" y="92" width="116" height="10" rx="4" fill="rgba(56,189,248,0.16)" stroke="rgba(56,189,248,0.40)" strokeWidth="0.8"/>
    <rect x="30" y="96" width="72" height="2.5" rx="1" fill="rgba(56,189,248,0.85)"/>
  </svg>
)

const LocalStorePreview = () => (
  <svg viewBox="0 0 200 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="128" rx="7" fill="#090c14" stroke="rgba(52,211,153,0.22)" strokeWidth="1"/>
    <rect width="200" height="24" rx="7" fill="#111520"/>
    <rect y="18" width="200" height="6" fill="#111520"/>
    <circle cx="13" cy="12" r="3" fill="#ff5f57" opacity="0.7"/>
    <circle cx="23" cy="12" r="3" fill="#febc2e" opacity="0.7"/>
    <circle cx="33" cy="12" r="3" fill="#28c840" opacity="0.7"/>
    <rect x="44" y="7" width="108" height="10" rx="3" fill="rgba(255,255,255,0.07)"/>
    <rect x="8" y="30" width="46" height="5" rx="2" fill="rgba(52,211,153,0.45)"/>
    <rect x="162" y="29" width="30" height="7" rx="3" fill="rgba(52,211,153,0.55)"/>
    <rect x="8" y="40" width="30" height="8" rx="3" fill="rgba(52,211,153,0.25)" stroke="rgba(52,211,153,0.50)" strokeWidth="0.6"/>
    <rect x="42" y="40" width="26" height="8" rx="3" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.10)" strokeWidth="0.6"/>
    <rect x="72" y="40" width="22" height="8" rx="3" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.10)" strokeWidth="0.6"/>
    <rect x="8" y="54" width="184" height="19" rx="3" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5"/>
    <rect x="13" y="59" width="12" height="9" rx="2" fill="rgba(52,211,153,0.20)"/>
    <rect x="30" y="58" width="52" height="3" rx="1" fill="rgba(255,255,255,0.28)"/>
    <rect x="30" y="64" width="36" height="2.5" rx="1" fill="rgba(255,255,255,0.13)"/>
    <rect x="158" y="58" width="28" height="6" rx="2" fill="rgba(52,211,153,0.45)"/>
    <rect x="8" y="77" width="184" height="19" rx="3" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5"/>
    <rect x="13" y="82" width="12" height="9" rx="2" fill="rgba(52,211,153,0.20)"/>
    <rect x="30" y="81" width="44" height="3" rx="1" fill="rgba(255,255,255,0.28)"/>
    <rect x="30" y="87" width="30" height="2.5" rx="1" fill="rgba(255,255,255,0.13)"/>
    <rect x="158" y="81" width="28" height="6" rx="2" fill="rgba(52,211,153,0.45)"/>
    <rect x="8" y="100" width="184" height="19" rx="3" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5"/>
    <rect x="13" y="105" width="12" height="9" rx="2" fill="rgba(52,211,153,0.20)"/>
    <rect x="30" y="104" width="48" height="3" rx="1" fill="rgba(255,255,255,0.28)"/>
    <rect x="30" y="110" width="32" height="2.5" rx="1" fill="rgba(255,255,255,0.13)"/>
    <rect x="158" y="104" width="28" height="6" rx="2" fill="rgba(52,211,153,0.45)"/>
  </svg>
)

// ── Data ──────────────────────────────────────────────────────

const mouChips   = ['Dose Logs', 'Reminders', 'Health Sync', 'Meal Scan', 'AI Advisor', 'Reports']
const iRecChips  = ['AI Receptionist', 'Bookings', 'Messages', 'CRM', 'Reminders', 'Follow-ups']
const iCalChips  = ['Meal Scan', 'Calorie Tracking', 'Macros', 'Nutrition', 'Goals', 'Reports']

const websiteCards = [
  {
    preview: <BizWebPreview />,
    title: 'Business Website',
    desc: 'Professional company website for presenting services, generating leads, and building trust.',
    category: 'Website',
    chips: ['Business website', 'Lead forms', 'SEO-ready', 'Mobile responsive'],
    color: '#00dcff',
  },
  {
    preview: <ServiceLandingPreview />,
    title: 'Service Landing Page',
    desc: 'Conversion-focused landing page for promoting one service, offer, or campaign.',
    category: 'Landing page',
    chips: ['Landing page', 'CTA', 'Contact form', 'Fast loading'],
    color: '#9c5ff7',
  },
  {
    preview: <AgencyWebPreview />,
    title: 'Agency Website',
    desc: 'Modern multi-section website with services, portfolio, process, industries, and contact pages.',
    category: 'Website',
    chips: ['Services', 'Portfolio', 'Contact', 'Brand design'],
    color: '#34d399',
  },
]

const eshopCards = [
  {
    preview: <ProductCatalogPreview />,
    title: 'Product Catalog Store',
    desc: 'Online catalog structure for presenting products, categories, pricing, and product details.',
    category: 'E-shop',
    chips: ['Catalog', 'Product pages', 'Categories', 'Search'],
    color: '#ffb300',
  },
  {
    preview: <CheckoutEshopPreview />,
    title: 'Checkout-ready E-shop',
    desc: 'E-commerce structure with cart, checkout, online payments, order flow, and customer emails.',
    category: 'E-shop',
    chips: ['Cart', 'Checkout', 'Payments', 'Orders'],
    color: '#38bdf8',
  },
  {
    preview: <LocalStorePreview />,
    title: 'Local Business Online Store',
    desc: 'Online store for local businesses that want to sell products or services directly from their website.',
    category: 'E-shop',
    chips: ['Local business', 'Online sales', 'Inventory', 'Customer emails'],
    color: '#34d399',
  },
]

const toolCards = [
  {
    icon: <BotIcon />,
    title: 'AI Receptionist System',
    desc: 'AI-powered receptionist flow for bookings, calls, messages, reminders, and customer follow-ups.',
    chips: ['AI receptionist', 'Bookings', 'Calls', 'Follow-ups'],
    color: '#00dcff',
  },
  {
    icon: <ScanDocIcon />,
    title: 'OCR Document Parsing',
    desc: 'Upload documents, extract structured data, validate fields, and send results into dashboards or workflows.',
    chips: ['OCR', 'Data extraction', 'Validation', 'Dashboard'],
    color: '#9c5ff7',
  },
  {
    icon: <CalendarAutoIcon />,
    title: 'Booking Automation',
    desc: 'Automated booking workflows with reminders, customer messages, calendar sync, and admin tracking.',
    chips: ['Bookings', 'Reminders', 'Calendar', 'Admin'],
    color: '#34d399',
  },
  {
    icon: <CRMEmailIcon />,
    title: 'CRM & Email Workflow',
    desc: 'Automated lead capture, customer segmentation, email follow-ups, and internal task flows.',
    chips: ['CRM', 'Email', 'Leads', 'Automation'],
    color: '#ffb300',
  },
]

// ── Page ──────────────────────────────────────────────────────
export default function AppsPage() {
  const { t, lang } = useLang()
  const navigate = useNavigate()
  const isEl = lang === 'el'

  useEffect(() => {
    window.scrollTo(0, 0)
    const title = isEl
      ? 'Portfolio — Εφαρμογές, Websites, E-shops & AI | Mysmartsapp'
      : 'Portfolio — Apps, Websites, E-shops & AI Systems | Mysmartsapp'
    const desc = isEl
      ? 'Δείτε επιλεγμένες εφαρμογές, websites, e-shops και AI συστήματα από τη Mysmartsapp.'
      : 'Browse selected apps, websites, e-shops, and AI-powered systems built by Mysmartsapp.'
    document.title = title
    setMeta('description', desc)
    setOG('og:title', title)
    setOG('og:description', desc)
    setCanonical('https://mysmartsapp.com/apps')
    const reveals = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('on'), i * 60)
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.05 })
    reveals.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [lang])

  const comingSoonBadge = (
    <span style={{
      display: 'inline-block',
      fontSize: '0.60rem', fontWeight: 700, letterSpacing: '0.06em',
      textTransform: 'uppercase',
      background: 'rgba(0,220,255,0.10)',
      border: '1px solid rgba(0,220,255,0.40)',
      color: '#22e6ff',
      borderRadius: 100,
      padding: '2px 9px',
    }}>Coming Soon</span>
  )

  return (
    <div className="ap-page">

      {/* ── Hero ── */}
      <section className="ap-hero">
        <div className="container">
          <div className="ap-eyebrow reveal">
            <span className="ap-eyebrow-dot" />
            {t('apps_eyebrow')}
          </div>
          <h1 className="ap-h1 reveal">{t('apps_page_title')}</h1>
          <p className="ap-sub reveal">{t('apps_page_sub')}</p>
        </div>
      </section>

      {/* ── Section: Featured Apps ── */}
      <div className="pf-section reveal">
        <div className="pf-section-hdr">
          <div className="pf-section-hdr-left">
            <span className="pf-section-icon"><PhoneSectionIcon /></span>
            <span className="pf-section-name">{isEl ? 'Εφαρμογές' : 'Featured Apps'}</span>
          </div>
          <a href="#" className="pf-section-view-all">{isEl ? 'Όλες οι εφαρμογές →' : 'View all apps →'}</a>
        </div>

        <div className="pf-apps-grid">

          {/* Mounjaro Tracker */}
          <div className="pf-app-card" onClick={() => navigate(`/apps/${SLUG_MOUNJARO}`)}>
            <div className="pf-app-phone-wrap">
              <img src={heroPhoneApps} alt="Mounjaro Tracker" className="pf-app-phone-img" />
            </div>
            <div className="pf-app-body">
              <div className="pf-app-icon-row">
                <img src={appLogo} alt="iHealth" className="pf-app-logo" />
                <div>
                  <div className="pf-app-name">Mounjaro Tracker : iHealth</div>
                  <span className="pf-app-badge pf-app-badge--live">{isEl ? 'ΔΙΑΘΕΣΙΜΟ — iOS & Android' : 'LIVE ON iOS & ANDROID'}</span>
                </div>
              </div>
              <p className="pf-app-desc">
                {isEl
                  ? 'Εφαρμογή παρακολούθησης GLP-1 θεραπείας με καταγραφές δόσεων, blood markers, reminders, AI Advisor και meal scan.'
                  : 'GLP-1 therapy tracking app with dose logs, progress insights, blood markers, reminders, health sync, barcode scanner, meal scan, and AI Advisor.'}
              </p>
              <div className="pf-app-chips">
                {mouChips.map(c => <span key={c} className="pf-app-chip">{c}</span>)}
              </div>
              <div className="pf-app-btns">
                <button className="pf-app-btn-primary" onClick={e => { e.stopPropagation(); navigate(`/apps/${SLUG_MOUNJARO}`) }}>
                  {isEl ? 'Δες την εφαρμογή' : 'View App'}
                </button>
                {config.apps[0].appStore && (
                  <a href={config.apps[0].appStore} target="_blank" rel="noopener noreferrer"
                    className="pf-app-store-link" onClick={e => e.stopPropagation()}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    App Store
                  </a>
                )}
                <a href="#" className="pf-app-store-link pf-app-store-link--soon" onClick={e => e.stopPropagation()}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.18 23.76c.3.17.65.19.96.04l13.08-7.56-2.76-2.76-11.28 10.28zm16.7-9.64-2.82-2.82 2.82-2.82c.78.78.78 2.05 0 2.82l-2.82 2.82zm-16.7-7.88L14.46 16.52l2.76-2.76L4.14 6.2a.97.97 0 0 0-.96.04zm1.42-1.24 13.08 7.56-2.76 2.76L3.1 5.4c.3-.19.67-.21 1-.4z"/>
                  </svg>
                  Google Play <span className="pf-app-store-soon-label">Soon</span>
                </a>
              </div>
            </div>
          </div>

          {/* iReception */}
          <div className="pf-app-card" onClick={() => navigate(`/apps/${SLUG_WELLNESS}`)}>
            <div className="pf-app-phone-wrap pf-app-phone-wrap--purple">
              <img src={iReceptionMockup} alt="iReception" className="pf-app-phone-img" />
            </div>
            <div className="pf-app-body">
              <div className="pf-app-icon-row">
                <img src={iReceptionLogo} alt="iReception" className="pf-app-logo" />
                <div>
                  <div className="pf-app-name">iReception</div>
                  {comingSoonBadge}
                </div>
              </div>
              <p className="pf-app-desc">
                {isEl
                  ? 'AI receptionist, booking, και σύστημα επικοινωνίας πελατών για επιχειρήσεις. Αυτοματισμός κρατήσεων, μηνυμάτων και follow-ups.'
                  : 'AI receptionist, booking, and customer communication system for businesses. Automate bookings, calls, messages, reminders, and follow-ups.'}
              </p>
              <div className="pf-app-chips">
                {iRecChips.map(c => <span key={c} className="pf-app-chip">{c}</span>)}
              </div>
              <div className="pf-app-btns">
                <button className="pf-app-btn-primary" onClick={e => { e.stopPropagation(); navigate(`/apps/${SLUG_WELLNESS}`) }}>
                  {isEl ? 'Ενημέρωσέ με' : 'Notify Me'}
                </button>
                <StoreBadges platforms={['iOS', 'Android', 'Web']} disabled />
              </div>
            </div>
          </div>

          {/* iCalorie */}
          <div className="pf-app-card" onClick={() => navigate(`/apps/${SLUG_NUTRITION}`)}>
            <div className="pf-app-phone-wrap pf-app-phone-wrap--green">
              <img src={iCalorieMockup} alt="iCalorie" className="pf-app-phone-img" />
            </div>
            <div className="pf-app-body">
              <div className="pf-app-icon-row">
                <img src={iCalorieLogo} alt="iCalorie" className="pf-app-logo" />
                <div>
                  <div className="pf-app-name">iCalorie</div>
                  {comingSoonBadge}
                </div>
              </div>
              <p className="pf-app-desc">
                {isEl
                  ? 'AI εφαρμογή διατροφής και παρακολούθησης θερμίδων για meal scanning, macros και εξατομικευμένες διατροφικές συμβουλές.'
                  : 'AI nutrition and calorie tracking app for meal scanning, macros, and personalized nutrition insights.'}
              </p>
              <div className="pf-app-chips">
                {iCalChips.map(c => <span key={c} className="pf-app-chip">{c}</span>)}
              </div>
              <div className="pf-app-btns">
                <button className="pf-app-btn-primary" onClick={e => { e.stopPropagation(); navigate(`/apps/${SLUG_NUTRITION}`) }}>
                  {isEl ? 'Ενημέρωσέ με' : 'Notify Me'}
                </button>
                <StoreBadges platforms={['iOS', 'Android']} disabled />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Section: Websites & landing pages ── */}
      <div className="pf-section reveal">
        <div className="pf-section-hdr">
          <div className="pf-section-hdr-left">
            <span className="pf-section-icon"><MonitorSectionIcon /></span>
            <span className="pf-section-name">{isEl ? 'Websites & landing pages' : 'Websites & landing pages'}</span>
          </div>
          <a href="/contact" className="pf-section-view-all">{isEl ? 'Δες όλα τα websites →' : 'View all websites →'}</a>
        </div>
        <div className="pf-cards-grid">
          {websiteCards.map((card, i) => (
            <div
              key={i}
              className="pf-web-card"
              style={{ '--pf-card-color': card.color } as React.CSSProperties}
            >
              <div className="pf-web-preview">{card.preview}</div>
              <div className="pf-web-body">
                <span className="pf-web-category" style={{ color: card.color }}>{card.category}</span>
                <h3 className="pf-web-title">{card.title}</h3>
                <p className="pf-web-desc">{card.desc}</p>
                <div className="pf-web-chips">
                  {card.chips.map(c => <span key={c} className="pf-web-chip">{c}</span>)}
                </div>
                <button className="pf-web-cta" style={{ borderColor: `${card.color}45`, color: card.color }}
                  onClick={() => navigate('/contact')}>
                  {isEl ? 'Δες Παράδειγμα' : 'View Example'}
                </button>
              </div>
              <div className="pf-card-accent" style={{ background: card.color }} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Section: E-shops & online stores ── */}
      <div className="pf-section reveal">
        <div className="pf-section-hdr">
          <div className="pf-section-hdr-left">
            <span className="pf-section-icon"><CartSectionIcon /></span>
            <span className="pf-section-name">{isEl ? 'E-shops & online stores' : 'E-shops & online stores'}</span>
          </div>
          <a href="/contact" className="pf-section-view-all">{isEl ? 'Δες όλα τα e-shops →' : 'View all e-shops →'}</a>
        </div>
        <div className="pf-cards-grid">
          {eshopCards.map((card, i) => (
            <div
              key={i}
              className="pf-web-card"
              style={{ '--pf-card-color': card.color } as React.CSSProperties}
            >
              <div className="pf-web-preview">{card.preview}</div>
              <div className="pf-web-body">
                <span className="pf-web-category" style={{ color: card.color }}>{card.category}</span>
                <h3 className="pf-web-title">{card.title}</h3>
                <p className="pf-web-desc">{card.desc}</p>
                <div className="pf-web-chips">
                  {card.chips.map(c => <span key={c} className="pf-web-chip">{c}</span>)}
                </div>
                <button className="pf-web-cta" style={{ borderColor: `${card.color}45`, color: card.color }}
                  onClick={() => navigate('/contact')}>
                  {isEl ? 'Δες Παράδειγμα' : 'View Example'}
                </button>
              </div>
              <div className="pf-card-accent" style={{ background: card.color }} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Section: AI tools & business automation ── */}
      <div className="pf-section reveal">
        <div className="pf-section-hdr">
          <div className="pf-section-hdr-left">
            <span className="pf-section-icon"><CpuSectionIcon /></span>
            <span className="pf-section-name">{isEl ? 'AI εργαλεία & αυτοματισμοί' : 'AI tools & business automation'}</span>
          </div>
          <a href="/contact" className="pf-section-view-all">{isEl ? 'Δες όλες τις λύσεις →' : 'View all solutions →'}</a>
        </div>
        <div className="pf-tools-grid">
          {toolCards.map((card, i) => (
            <div
              key={i}
              className="pf-tool-card"
              style={{ '--pf-tool-color': card.color } as React.CSSProperties}
            >
              <div
                className="pf-tool-icon-box"
                style={{
                  background: `${card.color}14`,
                  border: `1px solid ${card.color}45`,
                  color: card.color,
                  boxShadow: `0 0 16px ${card.color}22`,
                }}
              >
                {card.icon}
              </div>
              <h3 className="pf-tool-title">{card.title}</h3>
              <p className="pf-tool-desc">{card.desc}</p>
              <div className="pf-tool-chips">
                {card.chips.map(c => <span key={c} className="pf-tool-chip">{c}</span>)}
              </div>
              <button className="pf-tool-cta" style={{ borderColor: `${card.color}35`, color: card.color }}
                onClick={() => navigate('/contact')}>
                {isEl ? 'Δες Λύση' : 'View Solution'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="pf-section">
        <div className="pf-cta-card reveal">
          <div className="pf-cta-left">
            <div className="pf-cta-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <div>
              <h2 className="pf-cta-title">{isEl ? 'Έχεις κάποιο project στο μυαλό σου;' : 'Have a project in mind?'}</h2>
              <p className="pf-cta-sub">
                {isEl
                  ? 'Πες μας τι θέλεις να φτιάξεις και θα σου προτείνουμε τη σωστή διαδικασία, τεχνολογία και πλάνο launch.'
                  : "Tell us what you want to build and we'll suggest the right process, technology, and launch plan."}
              </p>
              <p className="pf-cta-email">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/>
                </svg>
                info@mysmartsapp.com
              </p>
            </div>
          </div>
          <button className="pf-cta-btn" onClick={() => navigate('/contact')}>
            {isEl ? 'Ξεκίνα το Project σου →' : 'Start Your Project →'}
          </button>
        </div>
      </div>

    </div>
  )
}
