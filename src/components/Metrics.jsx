import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { staggerContainer, staggerItem } from '../lib/animations';
import { METRICS } from '../constants/content';

// ── Ease out expo ──
const easeOutExpo = (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

// ── Counter animado ──
function CountUp({ end, suffix = '', duration = 1600, active }) {
  const [count, setCount] = useState(0);
  const startedRef        = useRef(false);
  const rafRef            = useRef(null);

  useEffect(() => {
    if (!active || startedRef.current) return;
    startedRef.current = true;
    const t0 = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - t0) / duration, 1);
      setCount(Math.round(easeOutExpo(progress) * end));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, end, duration]);

  return <>{count.toLocaleString('es-AR')}{suffix}</>;
}

// ── Paleta bento ──
// Fila 1: [0 span-2 navy] [1 span-1 blue]
// Fila 2: [2 span-1 white] [3 span-2 lavanda]
// Fila 3: [4 span-1 navy] [5 span-2 light]
const STYLES = [
  { bg: '#0B0B5A', text: '#FFFFFF', muted: 'rgba(255,255,255,0.50)', span: 2, glow: '0 8px 32px rgba(11,11,90,0.38), 0 2px 8px rgba(11,11,90,0.2)'   },
  { bg: '#1400FF', text: '#FFFFFF', muted: 'rgba(255,255,255,0.60)', span: 1, glow: '0 8px 32px rgba(20,0,255,0.38), 0 2px 8px rgba(20,0,255,0.2)'  },
  { bg: '#FFFFFF', text: '#252025', muted: '#6B7280',                span: 1, glow: '0 8px 28px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06)'       },
  { bg: '#EEF0FF', text: '#0B0B5A', muted: 'rgba(11,11,90,0.55)',   span: 2, glow: '0 8px 28px rgba(20,0,255,0.12), 0 2px 6px rgba(0,0,0,0.06)'     },
  { bg: '#0B0B5A', text: '#FFFFFF', muted: 'rgba(255,255,255,0.50)', span: 1, glow: '0 8px 32px rgba(11,11,90,0.38), 0 2px 8px rgba(11,11,90,0.2)'   },
  { bg: '#F0F3F8', text: '#252025', muted: '#6B7280',                span: 2, glow: '0 8px 28px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.05)'        },
];

// ── Card individual con tilt 3D ──
const SPRING = { stiffness: 120, damping: 18, mass: 0.9 };

function TiltCard({ item, index, isInView }) {
  const cs      = STYLES[index];
  const isLight = ['#FFFFFF', '#F0F3F8', '#EEF0FF'].includes(cs.bg);
  const isWide  = cs.span === 2;
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  // Mouse position normalizada [-1, 1]
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  // Transform inmediata → spring suaviza con "peso"
  const rotateY = useSpring(useTransform(mx, [-1, 1], [-7, 7]),  SPRING);
  const rotateX = useSpring(useTransform(my, [-1, 1], [7, -7]),  SPRING);

  // Sombra dinámica: se desplaza en la dirección del tilt
  const shadowX = useTransform(mx, [-1, 1], [-10, 10]);
  const shadowY = useTransform(my, [-1, 1], [-6, 6]);

  const handleMove = (e) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(((e.clientX - r.left) / r.width  - 0.5) * 2);
    my.set(((e.clientY - r.top)  / r.height - 0.5) * 2);
  };
  const handleLeave = () => { mx.set(0); my.set(0); setHovered(false); };
  const handleEnter = () => setHovered(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.48, delay: index * 0.07, ease: 'easeOut' }}
      style={{
        gridColumn:  `span ${cs.span}`,
        perspective: '900px',            // contexto 3D externo
      }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onMouseEnter={handleEnter}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          background:     cs.bg,
          borderRadius:   'var(--radius-md)',
          padding:        isWide ? '28px 28px' : '28px 22px',
          border:         isLight ? '0.5px solid rgba(20,0,255,0.07)' : 'none',
          display:        'flex',
          flexDirection:  isWide ? 'row' : 'column',
          alignItems:     isWide ? 'center' : 'flex-start',
          gap:            isWide ? '20px' : '6px',
          position:       'relative',
          overflow:       'hidden',
          cursor:         'default',
          willChange:     'transform',
          // Sombra: base siempre presente, se amplifica al hacer hover
          boxShadow:      hovered ? cs.glow : cs.glow.replace(/0 8px 32px|0 8px 28px/, '0 4px 16px'),
          transition:     'box-shadow 0.3s ease',
        }}
      >
        {/* Specular highlight — brillo que se mueve con el cursor */}
        <motion.div
          style={{
            position:      'absolute',
            inset:         0,
            borderRadius:  'inherit',
            opacity:       hovered ? (isLight ? 0.5 : 0.08) : 0,
            background:    'radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.25) 0%, transparent 65%)',
            pointerEvents: 'none',
            transition:    'opacity 0.25s ease',
          }}
        />

        {/* Número watermark — sólo en cards anchas */}
        {isWide && (
          <span style={{
            position:      'absolute',
            right:         '-8px',
            bottom:        '-12px',
            fontSize:      '88px',
            fontWeight:    300,
            lineHeight:    1,
            letterSpacing: '-0.05em',
            color:         cs.bg === '#0B0B5A'
                             ? 'rgba(255,255,255,0.04)'
                             : cs.bg === '#EEF0FF'
                               ? 'rgba(20,0,255,0.06)'
                               : 'rgba(0,0,0,0.04)',
            userSelect:    'none',
            pointerEvents: 'none',
          }}>
            {String(index + 1).padStart(2, '0')}
          </span>
        )}

        {/* Número principal */}
        <p style={{
          fontSize:      isWide ? 'clamp(52px, 5.5vw, 80px)' : 'clamp(44px, 4.5vw, 68px)',
          fontWeight:    300,
          lineHeight:    1,
          letterSpacing: '-0.04em',
          color:         cs.text,
          flexShrink:    0,
        }}>
          <CountUp end={item.value} suffix={item.suffix} active={isInView} />
        </p>

        {/* Label */}
        <p style={{
          fontSize:  '13px',
          color:     cs.muted,
          lineHeight: 1.45,
          fontWeight: 400,
          maxWidth:   isWide ? '180px' : 'none',
        }}>
          {item.label}
        </p>
      </motion.div>
    </motion.div>
  );
}

// ── Sección principal ──
export default function Metrics() {
  const bentoRef = useRef(null);
  const isInView = useInView(bentoRef, { once: true, amount: 0.25 });

  return (
    <section
      id="metrics"
      className="section-full"
      style={{
        background:    'var(--color-bg)',
        paddingTop:    '24px',                              // ← espejo exacto del bottom de Services
        paddingBottom: 'var(--section-padding)',
        borderTop:     '0.5px solid rgba(20,0,255,0.07)',
      }}
    >
      <div
        className="container"
        style={{
          display:             'grid',
          gridTemplateColumns: '8fr 4fr',   // bento izquierda, texto derecha
          gap:                 '64px',
          alignItems:          'flex-start',
        }}
      >

        {/* ── LEFT — bento grid ── */}
        <div
          ref={bentoRef}
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap:                 '10px',
          }}
        >
          {METRICS.items.map((item, i) => (
            <TiltCard key={i} item={item} index={i} isInView={isInView} />
          ))}
        </div>

        {/* ── RIGHT — texto — alineado al tope del bento ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          style={{ alignSelf: 'flex-start', paddingTop: '0' }}
        >
          <motion.p variants={staggerItem} style={{
            fontSize:      'var(--text-label)',
            letterSpacing: 'var(--ls-label)',
            textTransform: 'uppercase',
            color:         'var(--color-muted)',
            fontWeight:    500,
            marginBottom:  '16px',
          }}>
            {METRICS.label}
          </motion.p>

          <motion.h2 variants={staggerItem} style={{
            fontSize:      'var(--text-h2)',
            fontWeight:    300,
            lineHeight:    'var(--lh-heading)',
            letterSpacing: 'var(--ls-heading)',
            color:         'var(--color-text)',
          }}>
            Confianza,<br />
            medida en<br />
            <em style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>
              resultados
            </em>
          </motion.h2>
        </motion.div>

      </div>
    </section>
  );
}
