import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang, setMeta, setOG, setCanonical } from '../LangContext'
import iCalorieLogo from '../icalorie-logo.png'
import iCalorieMockup from '../iCalorie_mockup.png'
import StoreBadges from '../components/StoreBadges'

const chips = [
  { icon: '📷', label: 'AI Meal Scan'           },
  { icon: '🔥', label: 'Calorie Tracking'        },
  { icon: '📊', label: 'Macro Tracking'          },
  { icon: '🥩', label: 'Protein Goals'           },
  { icon: '💧', label: 'Water Tracking'          },
  { icon: '📋', label: 'Meal History'            },
  { icon: '🧠', label: 'Nutrition Insights'      },
  { icon: '🔍', label: 'Barcode Scanner'         },
  { icon: '🗄️', label: 'Food Database'           },
  { icon: '⚖️', label: 'Weight Progress'         },
  { icon: '🎯', label: 'Daily Targets'           },
  { icon: '✨', label: 'Smart Recommendations'   },
]

export default function ICaloriePage() {
  const { lang } = useLang()
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
    const title = lang === 'el'
      ? 'iCalorie — AI Διατροφή & Καταγραφή Θερμίδων | Mysmartsapp'
      : 'iCalorie — AI Nutrition & Calorie Tracking App | Mysmartsapp'
    const desc = lang === 'el'
      ? 'Σκανάρισμα γεύματος με AI, καταγραφή θερμίδων, μακροθρεπτικών, πρωτεΐνης, νερού και στόχων. Διαθέσιμο για iOS και Android.'
      : 'AI meal scanning, calorie tracking, macros, protein, water, and nutrition goals — all from one smart dashboard. Available for iOS and Android.'
    document.title = title
    setMeta('description', desc)
    setOG('og:title', title)
    setOG('og:description', desc)
    setCanonical('https://mysmartsapp.com/apps/icalorie')
  }, [lang])

  return (
    <div style={{ paddingBottom: 0, minHeight: '80vh' }}>

      {/* ── Hero featured card ── */}
      <section className="ap-featured-section" style={{ paddingTop: 96 }}>
        <div className="container">
          <div className="ap-feat-card">

            {/* Left: phone mockup */}
            <div className="ap-feat-phone">
              <img
                src={iCalorieMockup}
                alt="iCalorie App"
                className="ap-feat-phone-img"
              />
            </div>

            {/* Right: content */}
            <div className="ap-feat-content">

              <div className="ap-feat-icon-row">
                <img src={iCalorieLogo} alt="iCalorie" className="ap-feat-logo" />
                <div>
                  <div className="ap-feat-name">iCalorie</div>
                  <span style={{
                    display: 'inline-block',
                    fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    background: 'rgba(0,220,255,0.12)',
                    border: '1px solid rgba(0,220,255,0.45)',
                    color: '#22e6ff',
                    boxShadow: '0 0 12px rgba(0,220,255,0.18)',
                    borderRadius: 100,
                    padding: '3px 10px',
                  }}>Coming Soon</span>
                </div>
              </div>

              <p className="ap-feat-desc">
                AI nutrition and calorie tracking app for meal scanning, macros, and personalized nutrition insights.
              </p>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.42)', marginTop: -6, lineHeight: 1.6 }}>
                Scan meals, track calories, macros, protein, water, and nutrition goals from one smart dashboard.
              </p>

              <div className="ap-feat-chips">
                {chips.map(chip => (
                  <span key={chip.label} className="ap-feat-chip">
                    <span>{chip.icon}</span>{chip.label}
                  </span>
                ))}
              </div>

              <div className="ap-feat-actions">
                <button
                  className="ap-feat-btn-primary"
                  onClick={() => navigate('/apps')}
                >
                  Notify Me
                </button>
                <StoreBadges platforms={['iOS', 'Android']} disabled />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── Back link ── */}
      <div className="container" style={{ marginTop: 48, textAlign: 'center' }}>
        <button
          onClick={() => navigate('/apps')}
          style={{
            background: 'none',
            border: '1px solid rgba(0,220,255,0.22)',
            color: 'rgba(0,212,255,0.7)',
            borderRadius: 10,
            padding: '8px 22px',
            fontSize: '0.85rem',
            cursor: 'pointer',
            transition: 'border-color 0.2s, color 0.2s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,220,255,0.55)'
            ;(e.currentTarget as HTMLElement).style.color = '#00d4ff'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,220,255,0.22)'
            ;(e.currentTarget as HTMLElement).style.color = 'rgba(0,212,255,0.7)'
          }}
        >
          ← All Apps
        </button>
      </div>

    </div>
  )
}
