import { useState, useEffect } from 'react'
import appLogo              from '../applogo.png'
import heroPhoneCutout      from '../screens/hero-phone-cutout.png'
import mock01 from '../screens/onboarding/01_mock_phone.png'
import mock02 from '../screens/onboarding/02_mock_phone.png'
import mock03 from '../screens/onboarding/03_mock_phone.png'
import mock04 from '../screens/onboarding/04_mock_phone.png'
import mock05 from '../screens/onboarding/05_mock_phone.png'
import mock06 from '../screens/onboarding/06_mock_phone.png'
import mock07 from '../screens/onboarding/07_mock_phone.png'
import mock08 from '../screens/onboarding/08_mock_phone.png'
import mock09 from '../screens/onboarding/09_mock_phone.png'
import mock10 from '../screens/onboarding/10_mock_phone.png'
import mock11 from '../screens/onboarding/11_mock_phone.png'
import mock12 from '../screens/onboarding/12_mock_phone.png'
import mock13 from '../screens/onboarding/13_mock_phone.png'

const chips = [
  { icon: '💉', label: 'Injection Doses'    },
  { icon: '📅', label: 'Dose Schedule'      },
  { icon: '🗺️', label: 'Injection Sites'    },
  { icon: '📋', label: 'Injection History'  },
  { icon: '📉', label: 'Drug Level'         },
  { icon: '⚖️', label: 'Weight Progress'    },
  { icon: '🎯', label: 'Daily Targets'      },
  { icon: '💧', label: 'Water Tracking'     },
  { icon: '🥗', label: 'Protein / Fiber'    },
  { icon: '📷', label: 'AI Meal Scan'       },
  { icon: '🔍', label: 'Barcode Scanner'    },
  { icon: '🩸', label: 'Blood Markers'      },
  { icon: '🔬', label: 'OCR Lab Upload'     },
  { icon: '🤖', label: 'AI Advisor'         },
  { icon: '💡', label: 'AI Insights'        },
  { icon: '🔔', label: 'Reminders'          },
  { icon: '❤️', label: 'Health Sync'        },
  { icon: '🍎', label: 'Apple Health'       },
  { icon: '🏃', label: 'Health Connect'     },
]

const floatingCards = [
  { id: 'coach', label: 'AI COACH',    sub: '3 insights ready'                         },
  { id: 'hba1c', label: 'HbA1c 5.4%', sub: 'Improving'                                },
  { id: 'meal',  label: 'MEAL SCAN',   sub: 'Photo in.\nCalories out.'                 },
  { id: 'kcal',  label: '480 kcal',    sub: 'Lunch scanned'                            },
  { id: 'sync',  label: 'HEALTH SYNC', sub: 'Your data.\nYour control.\nYour privacy.' },
]

const onboardingScreens = [
  { img: mock01, label: 'Welcome'        },
  { img: mock02, label: 'Onboarding'     },
  { img: mock03, label: 'Dashboard'      },
  { img: mock04, label: 'Daily Targets'  },
  { img: mock05, label: 'Reminders'      },
  { img: mock06, label: 'Progress'       },
  { img: mock07, label: 'Meal Log'       },
  { img: mock08, label: 'Blood Tests'    },
  { img: mock09, label: 'Scan Meal'      },
  { img: mock10, label: 'AI Coach'       },
  { img: mock11, label: 'Health Sync'    },
  { img: mock12, label: 'Body Metrics'   },
  { img: mock13, label: 'Settings'       },
]

const CSS = `
.aht-page {
  min-height: 100vh;
  background: #020608;
  color: white;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 88px 24px 24px;
  overflow-x: hidden;
  box-sizing: border-box;
}
.aht-card {
  width: min(1240px, 100%);
  border-radius: 32px;
  overflow: visible;
  position: relative;
  background:
    radial-gradient(circle at 70% 35%, rgba(20, 241, 149, 0.07), transparent 40%),
    linear-gradient(135deg, #041014 0%, #041018 45%, #020608 100%);
  border: 1px solid rgba(20, 241, 149, 0.18);
  padding: 52px 60px 60px;
  box-sizing: border-box;
}
.aht-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 88px;
  align-items: center;
}
.aht-copy {
  z-index: 2;
}
.aht-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid rgba(255,255,255,.14);
  border-radius: 100px;
  padding: 7px 16px;
  font-size: 12px;
  color: rgba(255,255,255,.8);
  font-weight: 500;
  background: rgba(255,255,255,.04);
}
.aht-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #14f195;
  box-shadow: 0 0 8px #14f195;
  flex-shrink: 0;
}
.aht-identity {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 24px;
}
.aht-appicon {
  width: 62px;
  height: 62px;
  border-radius: 16px;
  background: #fff;
  overflow: hidden;
  flex-shrink: 0;
  box-shadow: 0 4px 20px rgba(0,0,0,.5);
}
.aht-appicon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.aht-applabel {
  color: #14f195;
  font-weight: 700;
  font-size: 13px;
  letter-spacing: .07em;
}
.aht-appsub {
  color: rgba(255,255,255,.48);
  font-size: 13px;
  margin-top: 4px;
}
.aht-headline {
  font-size: clamp(38px, 3.5vw, 58px);
  line-height: 1.02;
  font-weight: 900;
  letter-spacing: -0.04em;
  margin: 30px 0 22px;
  color: #fff;
}
.aht-headline .green {
  color: #14f195;
}
.aht-text {
  font-size: 16px;
  line-height: 1.7;
  color: rgba(255,255,255,.72);
  max-width: 460px;
}
.aht-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 24px;
  max-width: 640px;
}
.aht-chip {
  border: 1px solid rgba(255,255,255,.14);
  background: rgba(255,255,255,.045);
  border-radius: 8px;
  padding: 7px 11px;
  font-size: 12px;
  color: rgba(255,255,255,.78);
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  white-space: nowrap;
  line-height: 1;
}
@media (max-width: 768px) {
  .aht-chip {
    font-size: 11px;
    padding: 6px 9px;
    gap: 4px;
  }
  .aht-chips {
    gap: 7px;
  }
}
.aht-stores {
  display: flex;
  gap: 14px;
  margin-top: 36px;
  flex-wrap: wrap;
}
.aht-inforow {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 22px;
  flex-wrap: nowrap;
}
.aht-infoitem {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: rgba(255,255,255,.55);
  font-weight: 500;
  white-space: nowrap;
}
.aht-infoitem svg {
  flex-shrink: 0;
  color: #14f195;
  opacity: 0.8;
}
.aht-infoitem .aht-stars {
  color: #f5c518;
  font-size: 12px;
  letter-spacing: 1px;
}
.aht-infodivider {
  width: 1px;
  height: 14px;
  background: rgba(255,255,255,.15);
  flex-shrink: 0;
}
.aht-storebtn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: #050505;
  border: 1px solid rgba(255,255,255,0.24);
  color: #fff;
  border-radius: 11px;
  padding: 10px 20px 10px 14px;
  text-decoration: none;
  min-width: 155px;
  white-space: nowrap;
}
.aht-storebtn svg {
  flex-shrink: 0;
}
.aht-storebtn-text {
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.aht-storebtn .ssub {
  font-size: 10px;
  font-weight: 400;
  opacity: .62;
  line-height: 1;
  display: block;
  letter-spacing: .03em;
}
.aht-storebtn .smain {
  font-size: 16px;
  font-weight: 700;
  line-height: 1.2;
  display: block;
  letter-spacing: .005em;
}
.aht-visual {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 24px;
  min-height: 660px;
  overflow: visible;
}
.heroVisual,
.phoneVisual {
  overflow: visible;
  background: transparent;
}
.phoneVisual {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.heroPhoneImage {
  width: 348px;
  max-width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
  background: transparent;
  margin-left: 20px;
  filter:
    drop-shadow(0 40px 80px rgba(0,0,0,0.65))
    drop-shadow(0 0 55px rgba(20,241,149,0.18));
}
.aht-fcards {
  display: flex;
  flex-direction: column;
  gap: 11px;
  width: 172px;
  flex-shrink: 0;
  z-index: 4;
  position: relative;
  transform: translateX(-20px);
}
.aht-fcard {
  position: relative;
  border: 1px solid rgba(20,241,149,0.55);
  background: rgba(2,8,8,0.97);
  border-radius: 12px;
  padding: 12px 14px 12px 12px;
  display: flex;
  align-items: center;
  gap: 11px;
  box-shadow:
    0 0 22px rgba(20,241,149,0.14),
    0 0 8px rgba(20,241,149,0.06),
    0 4px 18px rgba(0,0,0,0.75);
}
.aht-fcard::before {
  content: '';
  position: absolute;
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  width: 22px;
  border-top: 1.5px dashed rgba(20,241,149,0.45);
}
.aht-fcard-icon-box {
  width: 38px;
  height: 38px;
  border-radius: 9px;
  background: rgba(20,241,149,0.08);
  border: 1px solid rgba(20,241,149,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #14f195;
}
.aht-fcard-text {
  flex: 1;
  min-width: 0;
}
.aht-fcard-label {
  font-size: 12.5px;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: .04em;
  line-height: 1.2;
  margin-bottom: 3px;
}
.aht-fcard-sub {
  font-size: 10.5px;
  color: rgba(255,255,255,.46);
  line-height: 1.45;
  white-space: pre-line;
}

/* ── INSIDE THE APP SECTION ── */
.aht-ita-section {
  background: #020608;
  padding: 0 24px 60px;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
}
.aht-ita-card {
  width: min(1240px, 100%);
  border-radius: 32px;
  border: 1px solid rgba(20,241,149,0.16);
  background:
    radial-gradient(circle at 50% 20%, rgba(20,241,149,0.05), transparent 55%),
    linear-gradient(160deg, #041014 0%, #041018 50%, #020608 100%);
  padding: 56px 48px 52px;
  box-sizing: border-box;
}
.aht-ita-header {
  text-align: center;
  margin-bottom: 28px;
}
.aht-ita-eyebrow {
  font-size: 11.5px;
  font-weight: 700;
  color: #14f195;
  letter-spacing: .14em;
  text-transform: uppercase;
  margin-bottom: 14px;
}
.aht-ita-title {
  font-size: clamp(26px, 2.8vw, 44px);
  font-weight: 900;
  color: #fff;
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin-bottom: 14px;
}
.aht-ita-sub {
  font-size: 15px;
  color: rgba(255,255,255,.5);
  max-width: 540px;
  margin: 0 auto;
  line-height: 1.65;
}
.aht-ita-carousel {
  display: flex;
  align-items: center;
  gap: 12px;
}
.aht-ita-arrow {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid rgba(20,241,149,0.28);
  background: rgba(20,241,149,0.06);
  color: #14f195;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.2s, border-color 0.2s;
  outline: none;
}
.aht-ita-arrow:hover {
  background: rgba(20,241,149,0.14);
  border-color: rgba(20,241,149,0.55);
}
.aht-ita-arrow:disabled {
  opacity: 0.3;
  cursor: default;
}
.aht-ita-track-wrap {
  flex: 1;
  overflow: hidden;
}
.aht-ita-track {
  display: flex;
  gap: 24px;
  transition: transform 0.38s cubic-bezier(.4,0,.2,1);
}
.aht-ita-screen {
  flex: 0 0 150px;
  width: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.onboardingPhoneCard {
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.onboardingPhoneImage {
  width: 150px;
  height: auto;
  object-fit: contain;
  display: block;
}
.aht-ita-screen-label {
  font-size: 13px;
  color: rgba(255,255,255,.55);
  font-weight: 500;
  text-align: center;
}
.aht-ita-inforow {
  display: flex;
  margin-top: 28px;
  border: 1px solid rgba(20,241,149,0.14);
  border-radius: 14px;
  overflow: hidden;
  background: rgba(20,241,149,0.025);
}
.aht-ita-infoitem {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 22px;
  border-right: 1px solid rgba(20,241,149,0.1);
}
.aht-ita-infoitem:last-child {
  border-right: none;
}
.aht-ita-info-icon {
  color: #14f195;
  flex-shrink: 0;
  opacity: 0.8;
}
.aht-ita-info-num {
  font-size: 24px;
  font-weight: 900;
  color: #fff;
  line-height: 1;
}
.aht-ita-info-label {
  font-size: 12px;
  color: rgba(255,255,255,.55);
  font-weight: 500;
  margin-top: 2px;
}
.aht-ita-info-sub {
  font-size: 10.5px;
  color: rgba(255,255,255,.28);
  margin-top: 2px;
}
.aht-ita-stars {
  color: #14f195;
  font-size: 13px;
  letter-spacing: 2px;
  line-height: 1;
  margin-top: 3px;
}

/* ── MOBILE RESPONSIVE ── */
@media (max-width: 768px) {
  html, body { overflow-x: hidden; }

  .aht-page {
    padding: 72px 12px 20px;
  }
  .aht-card {
    padding: 28px 18px 32px;
    border-radius: 20px;
    width: 100%;
    box-sizing: border-box;
  }
  .aht-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .aht-visual {
    display: none;
  }
  .aht-copy {
    min-width: 0;
    width: 100%;
  }
  .aht-badge {
    font-size: 11px;
    padding: 6px 12px;
  }
  .aht-identity {
    gap: 12px;
    margin-top: 18px;
    flex-wrap: wrap;
  }
  .aht-appicon {
    width: 48px;
    height: 48px;
    flex-shrink: 0;
  }
  .aht-applabel {
    font-size: 11px;
    letter-spacing: .05em;
    word-break: break-word;
    white-space: normal;
    line-height: 1.3;
  }
  .aht-appsub {
    font-size: 11px;
  }
  .aht-headline {
    font-size: clamp(26px, 7vw, 38px);
    margin: 20px 0 16px;
    letter-spacing: -0.03em;
    word-break: break-word;
  }
  .aht-text {
    font-size: 14px;
    max-width: 100%;
  }
  .aht-chips {
    max-width: 100%;
    gap: 7px;
    margin-top: 18px;
  }
  .aht-chip {
    font-size: 11px;
    padding: 6px 9px;
    gap: 4px;
  }
  .aht-stores {
    flex-direction: column;
    gap: 10px;
    margin-top: 24px;
  }
  .aht-storebtn {
    width: 100%;
    max-width: 260px;
    justify-content: center;
    min-width: unset;
  }
  .aht-inforow {
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 16px;
  }
  .aht-infoitem {
    font-size: 11px;
    white-space: normal;
  }
  /* Inside the App section */
  .aht-ita-card {
    padding: 28px 14px 28px;
    border-radius: 18px;
  }
  .aht-ita-title {
    font-size: clamp(20px, 5.5vw, 30px);
  }
  .aht-ita-sub {
    font-size: 13px;
  }
  .aht-ita-screen {
    flex: 0 0 110px;
    width: 110px;
  }
  .onboardingPhoneCard {
    width: 110px;
  }
  .onboardingPhoneImage {
    width: 110px;
  }
  .aht-ita-arrow {
    width: 34px;
    height: 34px;
  }
  .aht-ita-inforow {
    flex-direction: column;
  }
  .aht-ita-infoitem {
    border-right: none;
    border-bottom: 1px solid rgba(20,241,149,0.1);
    padding: 14px 16px;
  }
  .aht-ita-infoitem:last-child {
    border-bottom: none;
  }
}

/* ── LIGHTBOX MODAL ── */
.lb-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.82);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}
.lb-content {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 18px;
}
.lb-img {
  max-height: 85vh;
  max-width: 90vw;
  object-fit: contain;
  border-radius: 28px;
  display: block;
  background: transparent;
}
.lb-close {
  position: absolute;
  top: -18px;
  right: -18px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.3);
  background: rgba(0,0,0,0.75);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: #fff;
  font-size: 22px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 99999;
  transition: background 0.2s;
  flex-shrink: 0;
}
.lb-close:hover { background: rgba(80,80,80,0.9); }
.lb-arrow {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid rgba(20,241,149,0.35);
  background: rgba(20,241,149,0.08);
  color: #14f195;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.2s;
}
.lb-arrow:hover { background: rgba(20,241,149,0.18); }
.lb-arrow:disabled { opacity: 0.25; cursor: default; }
.aht-ita-screen-frame { cursor: pointer; }
`

export default function AIHealthTrackerPage() {
  const [slide, setSlide] = useState(0)
  const visible = 5
  const maxSlide = Math.max(0, onboardingScreens.length - visible)
  const [lightbox, setLightbox] = useState<number | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight' && lightbox !== null)
        setLightbox(i => i !== null && i < onboardingScreens.length - 1 ? i + 1 : i)
      if (e.key === 'ArrowLeft' && lightbox !== null)
        setLightbox(i => i !== null && i > 0 ? i - 1 : i)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox])

  return (
    <>
      <style>{CSS}</style>

      <main className="aht-page">
        <section className="aht-card">
          <div className="aht-grid">

            {/* ── LEFT: copy ── */}
            <div className="aht-copy">
              <span className="aht-badge">
                <span className="aht-dot" />
                Live on App Store &amp; Google Play
              </span>

              <div className="aht-identity">
                <div className="aht-appicon">
                  <img src={appLogo} alt="AI Health Tracker icon" />
                </div>
                <div>
                  <div className="aht-applabel">MOUNJARO TRACKER : AI HEALTH</div>
                  <div className="aht-appsub">AI-Powered Health Companion</div>
                </div>
              </div>

              <h1 className="aht-headline">
                Your AI-Powered<br />
                <span className="green">Health Journey</span><br />
                Starts Here
              </h1>

              <p className="aht-text">
                Track your dose, monitor your progress, get AI coaching and
                build healthy habits — the smart companion built for
                Mounjaro, Ozempic, and Wegovy users.
              </p>

              <div className="aht-chips">
                {chips.map(c => (
                  <span key={c.label} className="aht-chip">
                    <span>{c.icon}</span>{c.label}
                  </span>
                ))}
              </div>

              <div className="aht-stores">
                {/* Apple App Store badge */}
                <a href="https://apps.apple.com/ro/app/mounjaro-tracker-ai-health/id6761938987" target="_blank" rel="noopener noreferrer" className="aht-storebtn">
                  <svg width="22" height="27" viewBox="0 0 814 1000" fill="white">
                    <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.5-150.3-93.5c-52.6-63.2-95.1-161.2-95.1-254.2 0-156.7 100.9-239.2 200.1-239.2 61.2 0 109.2 40.2 146.4 40.2 35.3 0 91.1-43.2 159.5-43.2h.5c66.4 0 109.6 21.2 158.1 63.2zm-104.5-130.4c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/>
                  </svg>
                  <div className="aht-storebtn-text">
                    <span className="ssub">Download on the</span>
                    <span className="smain">App Store</span>
                  </div>
                </a>
                {/* Google Play badge */}
                <a href="#" className="aht-storebtn">
                  <svg width="22" height="24" viewBox="0 0 512 512">
                    <path d="M48 432L256 256 48 80v352z" fill="#32BBFF"/>
                    <path d="M48 80l208 176 80-80L96 48C78 38 57 45 48 80z" fill="#32BBFF"/>
                    <path d="M48 432c9 35 30 42 48 32l240-128-80-80L48 432z" fill="#00E676"/>
                    <path d="M336 176l-80 80 80 80 96-51c27-15 27-39 0-54L336 176z" fill="#FFD600"/>
                    <path d="M256 256 96 48c-18-10-39-3-48 32l208 176z" fill="#00E676"/>
                    <path d="M256 256l208 176c27-15 27-39 0-54l-96-51-112 112z" fill="#FF3D00"/>
                  </svg>
                  <div className="aht-storebtn-text">
                    <span className="ssub">GET IT ON</span>
                    <span className="smain">Google Play</span>
                  </div>
                </a>
              </div>

              {/* ── bottom info row ── */}
              <div className="aht-inforow">
                <div className="aht-infoitem">
                  <span className="aht-stars">★★★★★</span>
                  <span>4.9K Ratings</span>
                </div>
                <div className="aht-infodivider" />
                <div className="aht-infoitem">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                    <line x1="12" y1="18" x2="12" y2="18"/>
                  </svg>
                  <span>13 Onboarding screens</span>
                </div>
                <div className="aht-infodivider" />
                <div className="aht-infoitem">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z"/>
                    <path d="M8 12h8M12 8v8"/>
                  </svg>
                  <span>ChatGPT AI Powered</span>
                </div>
              </div>
            </div>

            {/* ── RIGHT: phone + floating cards ── */}
            <div className="aht-visual">
              <div className="phoneVisual">
                <img
                  src={heroPhoneCutout}
                  alt="App Mockup"
                  className="heroPhoneImage"
                />
              </div>

              <div className="aht-fcards">
                {floatingCards.map((c, i) => (
                  <div key={i} className="aht-fcard">
                    <div className="aht-fcard-icon-box">
                      {c.id === 'coach' && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
                          <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>
                          <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/>
                          <path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/>
                          <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/>
                        </svg>
                      )}
                      {c.id === 'hba1c' && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2 C12 2 5 10 5 15 a7 7 0 0 0 14 0 C19 10 12 2 12 2 Z"/>
                          <path d="M9 17 a3 3 0 0 0 4 1"/>
                        </svg>
                      )}
                      {c.id === 'meal' && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                          <circle cx="12" cy="13" r="4"/>
                        </svg>
                      )}
                      {c.id === 'kcal' && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="23 4 23 10 17 10"/>
                          <polyline points="1 20 1 14 7 14"/>
                          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
                        </svg>
                      )}
                      {c.id === 'sync' && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                      )}
                    </div>
                    <div className="aht-fcard-text">
                      <div className="aht-fcard-label">{c.label}</div>
                      <div className="aht-fcard-sub">{c.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>
      </main>

      {/* ── INSIDE THE APP SECTION ── */}
      <section className="aht-ita-section">
        <div className="aht-ita-card">

          {/* Header */}
          <div className="aht-ita-header">
            <div className="aht-ita-eyebrow">Inside the App</div>
            <h2 className="aht-ita-title">See the app before you install</h2>
            <p className="aht-ita-sub">
              Real onboarding screens, exactly as users see them when they open the app.
            </p>
          </div>

          {/* Carousel */}
          <div className="aht-ita-carousel">
            <button
              className="aht-ita-arrow"
              onClick={() => setSlide(s => Math.max(0, s - 1))}
              disabled={slide === 0}
              aria-label="Previous"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>

            <div className="aht-ita-track-wrap">
              <div
                className="aht-ita-track"
                style={{ transform: `translateX(calc(-${slide * 174}px))` }}
              >
                {onboardingScreens.map((s, i) => (
                  <div key={i} className="aht-ita-screen" onClick={() => setLightbox(i)} style={{ cursor: 'pointer' }}>
                    <div className="onboardingPhoneCard">
                      <img src={s.img} alt={s.label} className="onboardingPhoneImage" />
                    </div>
                    <span className="aht-ita-screen-label">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              className="aht-ita-arrow"
              onClick={() => setSlide(s => Math.min(maxSlide, s + 1))}
              disabled={slide >= maxSlide}
              aria-label="Next"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </div>

          {/* Info row */}
          <div className="aht-ita-inforow">
            <div className="aht-ita-infoitem">
              <div className="aht-ita-info-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </div>
              <div>
                <div className="aht-ita-info-num">4.9K</div>
                <div className="aht-ita-info-label">Ratings</div>
                <div className="aht-ita-stars">★★★★★</div>
              </div>
            </div>
            <div className="aht-ita-infoitem">
              <div className="aht-ita-info-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                  <line x1="12" y1="18" x2="12.01" y2="18"/>
                </svg>
              </div>
              <div>
                <div className="aht-ita-info-num">13</div>
                <div className="aht-ita-info-label">Onboarding Screens</div>
                <div className="aht-ita-info-sub">Step-by-step experience</div>
              </div>
            </div>
            <div className="aht-ita-infoitem">
              <div className="aht-ita-info-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
                  <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>
                  <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/>
                </svg>
              </div>
              <div>
                <div className="aht-ita-info-num">ChatGPT</div>
                <div className="aht-ita-info-label">AI Powered</div>
                <div className="aht-ita-info-sub">Smarter insights, just for you</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      {lightbox !== null && (
        <div className="lb-overlay" onClick={() => setLightbox(null)}>
          <div className="lb-content" onClick={e => e.stopPropagation()}>
          <button className="lb-close" onClick={() => setLightbox(null)}>✕</button>
            <button
              className="lb-arrow"
              disabled={lightbox === 0}
              onClick={() => setLightbox(i => i !== null ? Math.max(0, i - 1) : null)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            <img
              src={onboardingScreens[lightbox].img}
              alt={onboardingScreens[lightbox].label}
              className="lb-img"
            />
            <button
              className="lb-arrow"
              disabled={lightbox === onboardingScreens.length - 1}
              onClick={() => setLightbox(i => i !== null ? Math.min(onboardingScreens.length - 1, i + 1) : null)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
