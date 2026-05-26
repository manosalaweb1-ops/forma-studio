import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { staggerContainer, staggerItem } from '../lib/animations';
import { HERO, SITE } from '../constants/content';

// ── CTA card — idéntico al de Contacto ──
function CTACard({ href, label, target }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      href={href}
      target={target}
      rel={target === '_blank' ? 'noreferrer' : undefined}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={()   => setHovered(false)}
      whileHover={{ scale: 1.018 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.22 }}
      style={{
        display:        'inline-flex',
        alignItems:     'center',
        justifyContent: 'space-between',
        height:         '60px',
        minWidth:       '220px',
        borderRadius:   'var(--radius-md)',
        background:     'linear-gradient(135deg, #1400FF 0%, #0B0B5A 100%)',
        padding:        '0 22px',
        textDecoration: 'none',
        position:       'relative',
        overflow:       'hidden',
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
          position:      'absolute',
          top: 0, left: 0,
          width:         '38%',
          height:        '100%',
          background:    'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.14) 50%, transparent 100%)',
          transform:     'skewX(-12deg)',
          pointerEvents: 'none',
        }}
      />
      <span style={{ fontSize: '13px', fontWeight: 500, color: '#FFFFFF', letterSpacing: '-0.01em' }}>
        {label}
      </span>
      <motion.span
        animate={{ x: hovered ? 7 : 0, opacity: hovered ? 1 : 0.6 }}
        transition={{ duration: 0.22 }}
        style={{ fontSize: '18px', color: '#FFFFFF', flexShrink: 0 }}
      >
        →
      </motion.span>
    </motion.a>
  );
}

// ── Dot pulsante verde ──
function PulseDot({ color = '#34D399' }) {
  return (
    <span style={{ position: 'relative', display: 'inline-block', width: '8px', height: '8px', flexShrink: 0 }}>
      <motion.span
        animate={{ scale: [1, 2.2, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: color }}
      />
      <span style={{ position: 'absolute', inset: '1.5px', borderRadius: '50%', background: color }} />
    </span>
  );
}

export default function Hero() {
  const { scrollY } = useScroll();
  // Parallax suave: el video sube más lento que el scroll
  const videoY = useTransform(scrollY, [0, 600], [0, 60]);

  return (
    <section
      id="hero"
      className="section-full"
      style={{ background: 'var(--color-bg)', paddingTop: 0, overflow: 'hidden' }}
    >
      {/* Grain texture — sensación de material premium */}
      <style>{`
        @keyframes grain { 0%,100%{transform:translate(0,0)} 10%{transform:translate(-2%,-3%)} 20%{transform:translate(3%,1%)} 30%{transform:translate(-1%,4%)} 40%{transform:translate(4%,-2%)} 50%{transform:translate(-3%,2%)} 60%{transform:translate(1%,-4%)} 70%{transform:translate(-4%,3%)} 80%{transform:translate(2%,-1%)} 90%{transform:translate(-2%,4%)} }
        .hero-grain::after {
          content:''; position:absolute; inset:-50%; width:200%; height:200%;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
          opacity:0.028; animation:grain 8s steps(10) infinite; pointer-events:none; z-index:5;
        }
      `}</style>

      <div style={{
        display:             'grid',
        gridTemplateColumns: '1fr 1fr',
        minHeight:           '100vh',
        overflow:            'hidden',
        position:            'relative',
      }}>

        {/* ── LEFT COLUMN ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          style={{
            display:        'flex',
            flexDirection:  'column',
            justifyContent: 'center',
            paddingTop:     '80px',
            paddingBottom:  'clamp(48px, 6vw, 80px)',
            paddingRight:   '56px',
            paddingLeft:    'max(calc((100vw - 1280px) / 2 + clamp(16px, 3vw, 40px)), clamp(16px, 3vw, 40px))',
            position:       'relative',
            zIndex:         2,
          }}
        >
          {/* Label */}
          <motion.p variants={staggerItem} style={{
            fontSize:      'var(--text-label)',
            letterSpacing: 'var(--ls-label)',
            textTransform: 'uppercase',
            color:         'var(--color-muted)',
            marginBottom:  '28px',
            fontWeight:    500,
          }}>
            {HERO.label}
          </motion.p>

          {/* H1 */}
          <motion.h1 variants={staggerItem} style={{
            fontSize:      'clamp(48px, 6.5vw, 92px)',
            fontWeight:    300,
            lineHeight:    1.05,
            letterSpacing: '-0.03em',
            color:         'var(--color-text)',
            marginBottom:  '36px',
            whiteSpace:    'nowrap',
          }}>
            {HERO.line1}<br />
            {HERO.line2}<br />
            <em style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>
              {HERO.line3}
            </em>
          </motion.h1>

          {/* Body — formato bracket con keywords en azul */}
          <motion.div variants={staggerItem} style={{ marginBottom: '44px', maxWidth: '420px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <span style={{
                fontSize:   '26px',
                fontWeight: 200,
                color:      'var(--color-primary)',
                opacity:    0.42,
                lineHeight: 1,
                flexShrink: 0,
                paddingTop: '4px',
              }}>
                [
              </span>
              <p style={{
                fontSize:   'var(--text-body-lg)',
                color:      'var(--color-muted)',
                lineHeight: 'var(--lh-body)',
                margin:     0,
              }}>
                Tratamientos de{' '}
                <em style={{ color: 'var(--color-primary)', fontStyle: 'normal', fontWeight: 500 }}>
                  alta precisión
                </em>
                {' '}diseñados para quienes buscan{' '}
                <em style={{ color: 'var(--color-primary)', fontStyle: 'normal', fontWeight: 500 }}>
                  resultados auténticos
                </em>
                {' '}— sin exageraciones, sin riesgos.
              </p>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={staggerItem} style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
            <CTACard href={SITE.whatsapp} label="Consultá por WhatsApp" target="_blank" />
            <motion.a
              href="#services"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
              style={{
                display:        'inline-flex',
                alignItems:     'center',
                gap:            '8px',
                color:          '#7B8FFF',
                fontSize:       '13px',
                fontWeight:     500,
                textDecoration: 'none',
                letterSpacing:  '-0.01em',
              }}
            >
              Ver tratamientos
              <span style={{ fontSize: '16px' }}>→</span>
            </motion.a>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            variants={staggerItem}
            style={{
              marginTop:  '52px',
              paddingTop: '22px',
              borderTop:  '0.5px solid rgba(37,32,37,0.08)',
              display:    'flex',
              alignItems: 'center',
              gap:        '8px',
            }}
          >
            <PulseDot />
            <span style={{ fontSize: '12px', color: 'var(--color-muted)' }}>
              Turnos disponibles hoy —{' '}
              <em style={{ color: 'var(--color-primary)', fontStyle: 'normal', fontWeight: 500 }}>
                atención inmediata por WhatsApp
              </em>
            </span>
          </motion.div>
        </motion.div>

        {/* ── RIGHT COLUMN — video ── */}
        <div className="hero-grain" style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>

          {/* Video con parallax */}
          <motion.div
            style={{ y: videoY, position: 'absolute', inset: '-6%', zIndex: 0 }}
          >
            <motion.video
              autoPlay
              muted
              loop
              playsInline
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.4, ease: 'easeOut', delay: 0.15 }}
              style={{
                width:          '100%',
                height:         '112%',
                objectFit:      'cover',
                objectPosition: 'center top',
                display:        'block',
                pointerEvents:  'none',
              }}
            >
              <source src="/hero-final.mp4" type="video/mp4" />
            </motion.video>
          </motion.div>

          {/* Overlay izquierda — fusión suave con col izquierda */}
          <div style={{
            position:      'absolute', inset: 0, zIndex: 1,
            background:    'linear-gradient(to right, rgba(235,242,249,0.35) 0%, transparent 38%)',
            pointerEvents: 'none',
          }} />

          {/* Overlay bottom — profundidad para badges */}
          <div style={{
            position:      'absolute', inset: 0, zIndex: 1,
            background:    'linear-gradient(to top, rgba(7,7,26,0.62) 0%, transparent 52%)',
            pointerEvents: 'none',
          }} />

          {/* Badge — 1500+ pacientes */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0, duration: 0.55, ease: 'easeOut' }}
            style={{
              position:     'absolute',
              bottom:       '18%',
              left:         '-28px',
              background:   'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              borderRadius: 'var(--radius-md)',
              padding:      '14px 20px',
              boxShadow:    '0 8px 32px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.06)',
              display:      'flex',
              alignItems:   'center',
              gap:          '12px',
              minWidth:     '220px',
              zIndex:       3,
            }}
          >
            <div style={{
              width:          '36px',
              height:         '36px',
              borderRadius:   '50%',
              background:     'var(--color-light-fill)',
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              flexShrink:     0,
              fontSize:       '16px',
              color:          'var(--color-primary)',
            }}>
              ✦
            </div>
            <div>
              <p style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-text)', lineHeight: 1.2 }}>
                1500+ pacientes
              </p>
              <p style={{ fontSize: '11px', color: 'var(--color-muted)', marginTop: '3px' }}>
                97% satisfacción verificada
              </p>
            </div>
          </motion.div>

          {/* Badge — 12 años */}
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.55, ease: 'easeOut' }}
            style={{
              position:     'absolute',
              top:          '22%',
              right:        '32px',
              background:   'var(--color-primary)',
              color:        '#fff',
              borderRadius: 'var(--radius-md)',
              padding:      '14px 20px',
              textAlign:    'center',
              boxShadow:    '0 8px 32px rgba(20,0,255,0.38)',
              zIndex:       3,
            }}
          >
            <p style={{ fontSize: '36px', fontWeight: 300, lineHeight: 1, letterSpacing: '-0.03em' }}>
              12
            </p>
            <p style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '5px', opacity: 0.85, lineHeight: 1.4 }}>
              años de<br />experiencia
            </p>
          </motion.div>

          {/* Badge — rating Google */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.5, ease: 'easeOut' }}
            style={{
              position:     'absolute',
              bottom:       '8%',
              right:        '28px',
              background:   'rgba(255,255,255,0.12)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              border:       '0.5px solid rgba(255,255,255,0.22)',
              borderRadius: '999px',
              padding:      '8px 16px 8px 10px',
              display:      'flex',
              alignItems:   'center',
              gap:          '8px',
              zIndex:       3,
            }}
          >
            <span style={{ color: '#FACC15', fontSize: '13px', letterSpacing: '1px' }}>★★★★★</span>
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>
              4.9 en Google
            </span>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
