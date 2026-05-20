import { useLang } from '../LangContext'
import iconCutlery    from '../assets/icons/who-we-build-for/neon_cutlery_icon_illustration.png'
import iconMedical    from '../assets/icons/who-we-build-for/neon_blue_medical_cross_icon.png'
import iconShopping   from '../assets/icons/who-we-build-for/neon_shopping_bag_icon.png'
import iconBriefcase  from '../assets/icons/who-we-build-for/neon_briefcase_icon_on_transparency.png'
import iconScissors   from '../assets/icons/who-we-build-for/neon_scissors_icon_in_purple_glow.png'
import iconDumbbell   from '../assets/icons/who-we-build-for/neon_dumbbell_icon_with_glowing_aura.png'
import iconAvatar     from '../assets/icons/who-we-build-for/neon_purple_avatar_icon_on_checkerboard.png'
import iconRocket     from '../assets/icons/who-we-build-for/neon_rocket_icon_with_glowing_outline.png'

// Order matches ind_0 … ind_7 in translations
const IND_ICONS = [
  iconCutlery,   // ind_0: Restaurants & Food
  iconMedical,   // ind_1: Healthcare & Wellness
  iconShopping,  // ind_2: Retail & E-commerce
  iconBriefcase, // ind_3: Real Estate
  iconScissors,  // ind_4: Beauty & Salons
  iconDumbbell,  // ind_5: Fitness & Sport
  iconAvatar,    // ind_6: Professional Services
  iconRocket,    // ind_7: Tourism & Hospitality
]

const IND_KEYS = [
  'ind_0', 'ind_1', 'ind_2', 'ind_3',
  'ind_4', 'ind_5', 'ind_6', 'ind_7',
] as const

export default function Support() {
  const { t } = useLang()

  return (
    <section className="industries-section" id="industries">
      <div className="container">
        <div className="col-section-header reveal">
          <div className="section-label">
            <span className="section-label-dot" />
            {t('ind_label')}
          </div>
          <h2 className="col-section-title">
            {t('ind_title1')}<br />
            <span className="dim">{t('ind_title2')}</span>
          </h2>
        </div>

        <div className="industries-grid">
          {IND_KEYS.map((key, i) => (
            <div key={i} className="ind-card reveal">
              <span className="ind-icon">
                <img
                  src={IND_ICONS[i]}
                  alt={t(key)}
                  style={{ width: 56, height: 'auto', objectFit: 'contain', display: 'block', margin: '0 auto' }}
                />
              </span>
              <span className="ind-label">{t(key)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
