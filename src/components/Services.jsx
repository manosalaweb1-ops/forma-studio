import { useState } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '../lib/animations';
import { SERVICES, SITE } from '../constants/content';

const CARD_H   = 108;
const EXPAND_H = CARD_H * 2 + 10;
const EASE     = [0.25, 0.46, 0.45, 0.94];

// ── Card de tratamiento — imagen siempre visible con blur en reposo ──
function ServiceCard({ item, index, active, onEnter, onLeave, onClick }) {
  return (
    <motion.div
      animate={{ height: active ? EXPAND_H : CARD_H }}
      transition={{ duration: 0.42, ease: EASE }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{
        position:     'relative',
        overflow:     'hidden',
        borderRadius: 'var(--radius-md)',
        cursor:       'pointer',
        flexShrink:   0,
        boxShadow:    active
          ? '0 16px 48px rgba(0,0,0,0.28)'
          : '0 2px 8px rgba(0,0,0,0.10)',
        transition:   'box-shadow 0.35s ease',
      }}
    >
      {/* Imagen — siempre visible, blur en reposo */}
      <motion.img
        src={item.image}
        alt={item.name}
        loading="lazy"
        animate={{
          filter: active ? 'blur(0px)' : 'blur(5px)',
          scale:  active ? 1           : 1.10,
        }}
        transition={{
          filter: { duration: 0.38, ease: 'easeOut' },
          scale:  { duration: 0.45, ease: 'easeOut' },
        }}
        style={{
          position:       'absolute',
          inset:          0,
          width:          '100%',
          height:         '100%',
          objectFit:      'cover',
          objectPosition: 'center',
          pointerEvents:  'none',
        }}
      />

      {/* Overlay oscuro — se disuelve al expandir */}
      <motion.div
        animate={{ opacity: active ? 0 : 1 }}
        transition={{ duration: 0.38 }}
        style={{
          position:      'absolute',
          inset:         0,
          background:    'rgba(0,0,0,0.52)',
          pointerEvents: 'none',
        }}
      />

      {/* Gradiente bottom — sólo activo */}
      <motion.div
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.28, delay: active ? 0.18 : 0 }}
        style={{
          position:      'absolute',
          inset:         0,
          background:    'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.10) 55%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Número watermark */}
      <motion.span
        animate={{ opacity: active ? 0 : 0.55 }}
        transition={{ duration: 0.18 }}
        style={{
          position:      'absolute',
          bottom:        '-6px',
          right:         '10px',
          fontSize:      '48px',
          fontWeight:    300,
          lineHeight:    1,
          letterSpacing: '-0.04em',
          color:         'rgba(255,255,255,0.30)',
          userSelect:    'none',
          pointerEvents: 'none',
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </motion.span>

      {/* Texto compacto — siempre blanco sobre overlay */}
      <motion.div
        animate={{ opacity: active ? 0 : 1, y: active ? -6 : 0 }}
        transition={{ duration: 0.18 }}
        style={{ position: 'absolute', top: '14px', left: '16px', right: '12px' }}
      >
        <p style={{
          fontSize:      '13px', fontWeight: 500,
          letterSpacing: '-0.01em', lineHeight: 1.2,
          color:         '#FFFFFF', marginBottom: '4px',
          textShadow:    '0 1px 4px rgba(0,0,0,0.25)',
        }}>
          {item.name}
        </p>
        <p style={{
          fontSize:   '11px',
          color:      'rgba(255,255,255,0.68)',
          lineHeight: 1.45,
          textShadow: '0 1px 3px rgba(0,0,0,0.2)',
        }}>
          {item.desc}
        </p>
      </motion.div>

      {/* Texto expandido */}
      <motion.div
        animate={{ opacity: active ? 1 : 0, y: active ? 0 : 10 }}
        transition={{ duration: 0.28, delay: active ? 0.22 : 0 }}
        style={{ position: 'absolute', bottom: '18px', left: '18px', right: '14px' }}
      >
        <p style={{
          fontSize: '15px', fontWeight: 400,
          letterSpacing: '-0.01em', lineHeight: 1.2,
          color: '#fff', marginBottom: '5px',
        }}>
          {item.name}
        </p>
        <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.45 }}>
          {item.desc}
        </p>
      </motion.div>
    </motion.div>
  );
}

// ── Card CTA — misma altura, gradiente azul, shimmer + flecha en hover ──
function CTACard() {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={SITE.whatsapp}
      target="_blank"
      rel="noreferrer"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={()   => setHovered(false)}
      whileHover={{ scale: 1.018 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.22 }}
      style={{
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'space-between',
        height:         `${CARD_H}px`,
        borderRadius:   'var(--radius-md)',
        background:     'linear-gradient(135deg, #1400FF 0%, #0B0B5A 100%)',
        padding:        '0 22px',
        textDecoration: 'none',
        position:       'relative',
        overflow:       'hidden',
        flexShrink:     0,
        boxShadow:      hovered
          ? '0 12px 40px rgba(20,0,255,0.50), 0 2px 8px rgba(20,0,255,0.25)'
          : '0 4px 20px rgba(20,0,255,0.28), 0 1px 4px rgba(0,0,0,0.08)',
        transition:     'box-shadow 0.3s ease',
        cursor:         'pointer',
      }}
    >
      {/* Shimmer scan */}
      <motion.div
        animate={{ x: hovered ? '320%' : '-80%' }}
        transition={{ duration: 0.58, ease: [0.4, 0, 0.2, 1] }}
        style={{
          position:   'absolute',
          top:        0,
          left:       0,
          width:      '38%',
          height:     '100%',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.14) 50%, transparent 100%)',
          transform:  'skewX(-12deg)',
          pointerEvents: 'none',
        }}
      />

      {/* Texto */}
      <div>
        <p style={{
          fontSize:      '10px',
          fontWeight:    500,
          letterSpacing: '0.10em',
          textTransform: 'uppercase',
          color:         'rgba(255,255,255,0.52)',
          marginBottom:  '5px',
        }}>
          Turno gratuito
        </p>
        <p style={{
          fontSize:      '14px',
          fontWeight:    400,
          color:         '#FFFFFF',
          letterSpacing: '-0.01em',
          lineHeight:    1.2,
        }}>
          {SERVICES.cta}
        </p>
      </div>

      {/* Flecha animada */}
      <motion.span
        animate={{ x: hovered ? 7 : 0, opacity: hovered ? 1 : 0.6 }}
        transition={{ duration: 0.22 }}
        style={{ fontSize: '20px', color: '#FFFFFF', flexShrink: 0 }}
      >
        →
      </motion.span>
    </motion.a>
  );
}

// ── Sección principal ──
export default function Services() {
  const [hovered,       setHovered]       = useState(null);
  // Una card expandida por columna — default: card 3 (índice 2) y card 8 (índice 7)
  const [expandedLeft,  setExpandedLeft]  = useState(2);
  const [expandedRight, setExpandedRight] = useState(7);

  const colLeft  = [0, 2, 4, 6];
  const colRight = [1, 3, 5, 7];

  const isActive = (i) => hovered === i || expandedLeft === i || expandedRight === i;

  // Clic: si la card es de la misma columna que la activa, la reemplaza; distinta columna la suma
  const handleClick = (i) => {
    if (colLeft.includes(i)) {
      setExpandedLeft(expandedLeft === i ? null : i);
    } else {
      setExpandedRight(expandedRight === i ? null : i);
    }
  };

  const renderCol = (indices, withCTA = false) => (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.15 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
    >
      {indices.map((i) => (
        <motion.div key={i} variants={staggerItem}>
          <ServiceCard
            item={SERVICES.items[i]}
            index={i}
            active={isActive(i)}
            onEnter={() => setHovered(i)}
            onLeave={() => setHovered(null)}
            onClick={() => handleClick(i)}
          />
        </motion.div>
      ))}
      {withCTA && (
        <motion.div variants={staggerItem}>
          <CTACard />
        </motion.div>
      )}
    </motion.div>
  );

  return (
    <section
      id="services"
      className="section-full"
      style={{
        background:    'var(--color-bg)',
        paddingTop:    'var(--section-padding)',
        paddingBottom: '24px',
      }}
    >
      <div
        className="container"
        style={{
          display:             'grid',
          gridTemplateColumns: '4fr 8fr',
          gap:                 '64px',
          alignItems:          'flex-start',
        }}
      >
        {/* ── LEFT ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <motion.p variants={staggerItem} style={{
            fontSize: 'var(--text-label)', letterSpacing: 'var(--ls-label)',
            textTransform: 'uppercase', color: 'var(--color-muted)',
            fontWeight: 500, marginBottom: '16px',
          }}>
            {SERVICES.label}
          </motion.p>

          <motion.h2 variants={staggerItem} style={{
            fontSize: 'var(--text-h2)', fontWeight: 300,
            lineHeight: 'var(--lh-heading)', letterSpacing: 'var(--ls-heading)',
            color: 'var(--color-text)', marginBottom: '24px',
          }}>
            Todo en<br />
            <span style={{ color: 'var(--color-primary)' }}>un </span>
            <em style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>lugar</em>
          </motion.h2>

          <motion.p variants={staggerItem} style={{
            fontSize: 'var(--text-body-lg)', color: 'var(--color-muted)',
            lineHeight: 'var(--lh-body)', marginBottom: '20px',
          }}>
            {SERVICES.body}
          </motion.p>

        </motion.div>

        {/* ── RIGHT — dos columnas de cards ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {renderCol(colLeft)}
          {renderCol(colRight)}
        </div>
      </div>
    </section>
  );
}
