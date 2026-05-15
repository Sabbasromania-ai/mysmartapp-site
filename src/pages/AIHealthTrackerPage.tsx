import appLogo         from '../applogo.png'
import heroPhoneCutout from '../screens/hero-phone-cutout.png'

const chips = [
  { icon: '✏️', label: 'Dose Log'    },
  { icon: '📈', label: 'Progress'    },
  { icon: '🩸', label: 'Blood Tests' },
  { icon: '🤖', label: 'AI Coach'    },
  { icon: '📷', label: 'Scan Meals'  },
  { icon: '🔔', label: 'Reminders'   },
  { icon: '❤️', label: 'Health Sync' },
]

const floatingCards = [
  { id: 'coach', label: 'AI COACH',    sub: '3 insights ready'                         },
  { id: 'hba1c', label: 'HbA1c 5.4%', sub: 'Improving'                                },
  { id: 'meal',  label: 'MEAL SCAN',   sub: 'Photo in.\nCalories out.'                 },
  { id: 'kcal',  label: '480 kcal',    sub: 'Lunch scanned'                            },
  { id: 'sync',  label: 'HEALTH SYNC', sub: 'Your data.\nYour control.\nYour privacy.' },
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
  gap: 10px;
  margin-top: 28px;
}
.aht-chip {
  border: 1px solid rgba(255,255,255,.14);
  background: rgba(255,255,255,.045);
  border-radius: 10px;
  padding: 9px 14px;
  font-size: 13px;
  color: rgba(255,255,255,.82);
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 6px;
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
`

export default function AIHealthTrackerPage() {
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
                  <div className="aht-applabel">AI HEALTH TRACKER</div>
                  <div className="aht-appsub">Personal Health Tracker</div>
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
                <a href="#" className="aht-storebtn">
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
    </>
  )
}
