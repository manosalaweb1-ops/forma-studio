import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { staggerContainer, staggerItem } from '../lib/animations';
import { ECOSYSTEM, SITE } from '../constants/content';

// ── Feature card glassmorphism ──
function FeatureCard({ text, index, active }) {
  const num = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.09, ease: 'easeOut' }}
      whileHover={{
        y:           -10,
        background:  'rgba(255,255,255,0.13)',
        borderColor: 'rgba(255,255,255,0.28)',
        boxShadow:   '0 16px 48px rgba(20,0,255,0.28), 0 2px 8px rgba(0,0,0,0.2)',
        transition:  { duration: 0.22 },
      }}
      style={{
        background:   'rgba(255,255,255,0.07)',
        border:       '1px solid rgba(255,255,255,0.13)',
        borderRadius: 'var(--radius-md)',
        padding:      '28px 24px',
        cursor:       'default',
        boxShadow:    '0 4px 16px rgba(0,0,0,0.12)',
      }}
    >
      {/* Badge numérico */}
      <motion.div
        whileHover={{ scale: 1.15, background: 'rgba(20,0,255,0.55)', borderColor: 'rgba(20,0,255,0.8)' }}
        transition={{ duration: 0.18 }}
        style={{
          display:        'inline-flex',
          alignItems:     'center',
          justifyContent: 'center',
          width:          '36px',
          height:         '36px',
          borderRadius:   '50%',
          background:     'rgba(255,255,255,0.10)',
          border:         '1px solid rgba(255,255,255,0.20)',
          fontSize:       '11px',
          fontWeight:     500,
          letterSpacing:  '0.02em',
          color:          'rgba(255,255,255,0.85)',
          marginBottom:   '16px',
        }}
      >
        {num}
      </motion.div>

      {/* Texto */}
      <p style={{
        fontSize:   '15px',
        fontWeight: 400,
        color:      'rgba(255,255,255,0.88)',
        lineHeight: 1.55,
      }}>
        {text}
      </p>
    </motion.div>
  );
}

// ── Sección ──
export default function Ecosystem() {
  const gridRef = useRef(null);
  const isInView = useInView(gridRef, { once: true, amount: 0.15 });

  return (
    <section
      id="ecosystem"
      className="section-full section-padding"
      style={{ position: 'relative', overflow: 'hidden' }}
    >

      {/* ── Fondo: foto sonrisa ── */}
      <img
        src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=1400&fit=crop&q=80"
        alt=""
        aria-hidden="true"
        style={{
          position:       'absolute',
          inset:          0,
          width:          '100%',
          height:         '100%',
          objectFit:      'cover',
          objectPosition: 'center 30%',
          pointerEvents:  'none',
        }}
      />

      {/* ── Filtro azul-navy sobre la imagen ── */}
      <div style={{
        position:   'absolute',
        inset:      0,
        background: 'linear-gradient(160deg, rgba(11,11,90,0.92) 0%, rgba(20,0,255,0.78) 45%, rgba(11,11,90,0.94) 100%)',
        pointerEvents: 'none',
      }} />

      {/* ── Contenido ── */}
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── HEADING — centrado, diferente al resto del sitio ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 56px' }}
        >
          <motion.p variants={staggerItem} style={{
            fontSize:      'var(--text-label)',
            letterSpacing: 'var(--ls-label)',
            textTransform: 'uppercase',
            color:         'rgba(255,255,255,0.40)',
            fontWeight:    500,
            marginBottom:  '16px',
          }}>
            {ECOSYSTEM.label}
          </motion.p>

          <motion.h2 variants={staggerItem} style={{
            fontSize:      'var(--text-h2)',
            fontWeight:    300,
            lineHeight:    'var(--lh-heading)',
            letterSpacing: 'var(--ls-heading)',
            color:         '#FFFFFF',
          }}>
            Todo lo que{' '}
            <em style={{ fontStyle: 'italic', color: '#7B8FFF' }}>
              necesitás
            </em>,<br />
            {ECOSYSTEM.subheading}
          </motion.h2>
        </motion.div>

        {/* ── FEATURES GRID — 3 columnas, más grande ── */}
        <div
          ref={gridRef}
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap:                 '14px',
            marginBottom:        '48px',
          }}
        >
          {ECOSYSTEM.features.map((feat, i) => (
            <FeatureCard key={i} text={feat} index={i} active={isInView} />
          ))}
        </div>

        {/* ── FOOTER ROW — body izquierda, CTA derecha ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'space-between',
            gap:            '40px',
            borderTop:      '0.5px solid rgba(255,255,255,0.10)',
            paddingTop:     '32px',
          }}
        >
          <p style={{
            fontSize:  'var(--text-body-lg)',
            color:     'rgba(255,255,255,0.52)',
            lineHeight: 'var(--lh-body)',
            maxWidth:  '480px',
          }}>
            {ECOSYSTEM.body}
          </p>

          <motion.a
            href={SITE.whatsapp}
            target="_blank"
            rel="noreferrer"
            whileHover={{ x: 6 }}
            transition={{ duration: 0.18 }}
            style={{
              display:        'inline-flex',
              alignItems:     'center',
              gap:            '8px',
              color:          '#FFFFFF',
              fontSize:       '14px',
              fontWeight:     500,
              textDecoration: 'none',
              letterSpacing:  '0.01em',
              borderBottom:   '1px solid rgba(255,255,255,0.28)',
              paddingBottom:  '3px',
              whiteSpace:     'nowrap',
              flexShrink:     0,
            }}
          >
            {ECOSYSTEM.cta}
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}
