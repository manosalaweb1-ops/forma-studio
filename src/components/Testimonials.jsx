import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '../lib/animations';
import { TESTIMONIALS } from '../constants/content';

// ── Imágenes antes / después ──
const PAIRS = [
  {
    before: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=700&fit=crop&q=80',
    after:  'https://images.unsplash.com/photo-1544717305-2782549b5136?w=700&fit=crop&q=80',
  },
  {
    before: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=700&fit=crop&q=80',
    after:  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=700&fit=crop&q=80',
  },
  {
    before: 'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=700&fit=crop&q=80',
    after:  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=700&fit=crop&q=80',
  },
];

// Decos de fondo — solo derechas, oscuras sobre blanco
const DECO_TESTI = [
  { t: 'RESULTADOS', bottom: '28%', left: '18%', size: '72px', op: 0.030 },
  { t: '+',          top:    '70%', right:'18%', size: '80px', op: 0.028 },
];

// ── Reseñas de Google ──
const REVIEWS = [
  { initials: 'MG', name: 'María G.',     color: '#E74C3C', text: 'Resultados increíbles. Quedé muy conforme con el bótox.'     },
  { initials: 'LP', name: 'Laura P.',     color: '#3498DB', text: 'Atención personalizada y resultados súper naturales.'         },
  { initials: 'CR', name: 'Carolina R.',  color: '#27AE60', text: 'La Dra. Rojas es increíble. Totalmente recomendado.'          },
  { initials: 'VS', name: 'Valeria S.',   color: '#9B59B6', text: 'Fui por rinomodelación y quedé enamorada del resultado.'      },
  { initials: 'MA', name: 'Marcela A.',   color: '#F39C12', text: 'Lugar premium y equipo muy profesional. 10 de 10.'            },
  { initials: 'JM', name: 'Julia M.',     color: '#1ABC9C', text: 'Superé mis expectativas. El tratamiento fue impecable.'       },
  { initials: 'PE', name: 'Paula E.',     color: '#E67E22', text: 'Excelente servicio desde el primer momento. Vuelvo seguro.'   },
  { initials: 'RD', name: 'Romina D.',    color: '#2980B9', text: 'El ácido hialurónico quedó perfecto. Sin exageraciones.'      },
];

function ReviewItem({ r }) {
  return (
    <div style={{
      width:        '272px',
      flexShrink:   0,
      background:   '#EBF2F9',   /* celeste grisáceo del sistema de diseño */
      border:       '1px solid rgba(20,0,255,0.07)',
      borderRadius: '14px',
      padding:      '16px 18px 18px',
      marginRight:  '8px',
      boxShadow:    '0 6px 28px rgba(20,0,255,0.12), 0 2px 8px rgba(0,0,0,0.06)',
    }}>
      {/* Header: avatar + nombre + Google */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
        <div style={{
          width:          '36px',
          height:         '36px',
          borderRadius:   '50%',
          background:     r.color,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          fontSize:       '11px',
          fontWeight:     700,
          color:          '#FFFFFF',
          flexShrink:     0,
          letterSpacing:  '0.02em',
        }}>
          {r.initials}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text)', lineHeight: 1.2, marginBottom: '3px' }}>
            {r.name}
          </p>
          <span style={{ color: '#F59E0B', fontSize: '11px', letterSpacing: '1px', lineHeight: 1 }}>★★★★★</span>
        </div>
        <span style={{
          fontSize:      '8px',
          fontWeight:    600,
          letterSpacing: '0.08em',
          color:         'rgba(37,32,37,0.30)',
          textTransform: 'uppercase',
          flexShrink:    0,
          alignSelf:     'flex-start',
          marginTop:     '1px',
        }}>
          Google
        </span>
      </div>
      {/* Texto */}
      <p style={{
        fontSize:   '12px',
        color:      'rgba(37,32,37,0.60)',
        lineHeight: 1.55,
        fontWeight: 300,
      }}>
        "{r.text}"
      </p>
    </div>
  );
}

function ReviewsBanner() {
  const ROW = [...REVIEWS, ...REVIEWS];

  return (
    <>
      <style>{`
        @keyframes scroll-l { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .rv-left  { animation: scroll-l 52s linear infinite; display: flex; width: max-content; }
        .rv-track:hover .rv-left { animation-play-state: paused; }
      `}</style>

      {/* Fondo blanco — sin gradiente oscuro */}
      <div style={{
        width:         '100%',
        paddingTop:    '60px',
        paddingBottom: '60px',
        background:    'var(--color-white)',
        overflow:      'hidden',
        position:      'relative',
        zIndex:        0,
      }}>
        <div className="rv-track" style={{ overflow: 'hidden' }}>
          <div className="rv-left">
            {ROW.map((r, i) => <ReviewItem key={i} r={r} />)}
          </div>
        </div>
      </div>
    </>
  );
}

// ── Slider antes / después ──
function Slider({ before, after }) {
  const [pos, setPos]       = useState(50);
  const [active, setActive] = useState(false);
  const ref                 = useRef(null);

  const updatePos = (clientX) => {
    if (!ref.current) return;
    const { left, width } = ref.current.getBoundingClientRect();
    setPos(Math.min(94, Math.max(6, ((clientX - left) / width) * 100)));
  };

  return (
    <div
      ref={ref}
      onMouseMove={(e)  => { if (active) updatePos(e.clientX); }}
      onMouseDown={(e)  => { setActive(true);  updatePos(e.clientX); }}
      onMouseUp={()     => setActive(false)}
      onMouseLeave={()  => setActive(false)}
      onTouchMove={(e)  => updatePos(e.touches[0].clientX)}
      style={{
        position:     'relative',
        height:       'clamp(280px, 32vw, 440px)',
        overflow:     'hidden',
        borderRadius: 'var(--radius-md)',
        cursor:       'ew-resize',
        userSelect:   'none',
      }}
    >
      <img src={after} alt="después" draggable={false} style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        objectFit: 'cover', objectPosition: 'center top',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'absolute', inset: 0, clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src={before} alt="antes" draggable={false} style={{
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center top',
          pointerEvents: 'none',
        }} />
      </div>

      <div style={{
        position: 'absolute', top: 0, bottom: 0,
        left: `${pos}%`, transform: 'translateX(-50%)',
        width: '2px', background: '#1400FF', pointerEvents: 'none',
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '38px', height: '38px', borderRadius: '50%',
          background: '#1400FF',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(20,0,255,0.45)',
          fontSize: '13px', color: '#FFFFFF', fontWeight: 400, letterSpacing: '-0.02em',
        }}>
          ⇔
        </div>
      </div>

      <span style={{
        position: 'absolute', top: '14px', left: '14px',
        background: 'rgba(0,0,0,0.50)', backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)', borderRadius: '999px',
        padding: '4px 10px', fontSize: '9px', fontWeight: 600,
        letterSpacing: '0.10em', textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.85)',
      }}>Antes</span>

      <span style={{
        position: 'absolute', top: '14px', right: '14px',
        background: 'rgba(20,0,255,0.55)', backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)', borderRadius: '999px',
        padding: '4px 10px', fontSize: '9px', fontWeight: 600,
        letterSpacing: '0.10em', textTransform: 'uppercase', color: '#FFFFFF',
      }}>Después</span>
    </div>
  );
}

// ── Sección ──
export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="section-full"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(20,0,255,0.22) 1.5px, transparent 1.5px)',
        backgroundSize: '28px 28px',
        backgroundColor: '#FFFFFF',
        position:      'relative',
        overflow:      'hidden',
        paddingTop:    'clamp(48px, 6vw, 72px)',
        paddingBottom: 0,
      }}
    >
      {/* ── Blobs de gradiente animados ── */}
      <style>{`
        @keyframes testi-blob-1 {
          0%,100% { transform: translate(0px, 0px) scale(1); }
          40%      { transform: translate(35px, -25px) scale(1.07); }
          70%      { transform: translate(-15px, 30px) scale(0.96); }
        }
        @keyframes testi-blob-2 {
          0%,100% { transform: translate(0px, 0px) scale(1); }
          35%      { transform: translate(-40px, 20px) scale(1.09); }
          65%      { transform: translate(25px, -35px) scale(1.04); }
        }
        @keyframes testi-blob-3 {
          0%,100% { transform: translate(0px, 0px) scale(1); }
          50%      { transform: translate(30px, 30px) scale(1.05); }
        }
      `}</style>

      {/* Comilla decorativa */}
      <span style={{
        position:      'absolute',
        top:           '-40px',
        right:         'clamp(20px, 6vw, 100px)',
        fontSize:      'clamp(240px, 28vw, 420px)',
        lineHeight:    1,
        color:         'rgba(37,32,37,0.040)',
        fontFamily:    'Georgia, "Times New Roman", serif',
        fontWeight:    700,
        userSelect:    'none',
        pointerEvents: 'none',
      }}>"</span>

      {/* Decos de fondo */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', userSelect: 'none', zIndex: 0 }}>
        {DECO_TESTI.map((d, i) => (
          <span key={i} style={{
            position: 'absolute', top: d.top, bottom: d.bottom, left: d.left, right: d.right,
            fontSize: d.size, fontWeight: 200, color: `rgba(37,32,37,${d.op})`,
            lineHeight: 1, fontFamily: 'var(--font)',
          }}>{d.t}</span>
        ))}
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* Heading */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          style={{ textAlign: 'center', marginBottom: '52px' }}
        >
          <motion.p variants={staggerItem} style={{
            fontSize: 'var(--text-label)', letterSpacing: 'var(--ls-label)',
            textTransform: 'uppercase', color: 'var(--color-muted)',
            fontWeight: 500, marginBottom: '16px',
          }}>
            {TESTIMONIALS.label}
          </motion.p>
          <motion.h2 variants={staggerItem} style={{
            fontSize: 'var(--text-h2)', fontWeight: 300,
            lineHeight: 'var(--lh-heading)', letterSpacing: 'var(--ls-heading)',
            color: 'var(--color-text)',
          }}>
            Cada{' '}
            <em style={{ fontStyle: 'italic', color: '#7B8FFF' }}>historia</em>
            <br />habla por sí sola
          </motion.h2>
        </motion.div>

        {/* Sliders */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '48px' }}>
          {TESTIMONIALS.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: 'easeOut' }}
            >
              <p style={{
                fontSize: '10px', fontWeight: 500, letterSpacing: '0.08em',
                textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: '10px',
              }}>
                {item.treatment}
              </p>
              <Slider before={PAIRS[i].before} after={PAIRS[i].after} />
            </motion.div>
          ))}
        </div>

        {/* Citas */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          borderTop: '0.5px solid rgba(37,32,37,0.09)', paddingTop: '36px',
        }}>
          {TESTIMONIALS.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.10 }}
              style={{
                padding:    '0 28px',
                borderLeft: i > 0 ? '0.5px solid rgba(37,32,37,0.09)' : 'none',
              }}
            >
              <p style={{
                fontSize: '14px', fontStyle: 'italic', fontWeight: 300,
                color: 'var(--color-muted)', lineHeight: 1.70, marginBottom: '16px',
              }}>
                "{item.quote}"
              </p>
              <p style={{ fontSize: '12px', fontWeight: 500, color: 'var(--color-text)' }}>{item.name}</p>
              <p style={{ fontSize: '11px', color: 'var(--color-muted)', marginTop: '2px' }}>{item.age}</p>
            </motion.div>
          ))}
        </div>

      </div>

      {/* ── Banner de reseñas — puente visual hacia Contacto ── */}
      <ReviewsBanner />

    </section>
  );
}
