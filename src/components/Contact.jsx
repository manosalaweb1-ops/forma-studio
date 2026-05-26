import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, staggerItem } from '../lib/animations';
import { CONTACT, FAQ, SITE } from '../constants/content';

// ── CTA card idéntico al de Servicios (shimmer + flecha) ──
function WhatsAppCTACard() {
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
        height:         '108px',
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
      {/* Shimmer */}
      <motion.div
        animate={{ x: hovered ? '320%' : '-80%' }}
        transition={{ duration: 0.58, ease: [0.4, 0, 0.2, 1] }}
        style={{
          position:      'absolute',
          top:           0,
          left:          0,
          width:         '38%',
          height:        '100%',
          background:    'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.14) 50%, transparent 100%)',
          transform:     'skewX(-12deg)',
          pointerEvents: 'none',
        }}
      />

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
          {CONTACT.cta}
        </p>
      </div>

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

// ── Dot online pulsante ──
function PulseDot() {
  return (
    <span style={{ position: 'relative', display: 'inline-block', width: '9px', height: '9px', flexShrink: 0 }}>
      <motion.span
        animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#34D399' }}
      />
      <span style={{ position: 'absolute', inset: '1.5px', borderRadius: '50%', background: '#34D399' }} />
    </span>
  );
}

// ── Acordeón (fondo oscuro) ──
function AccordionItem({ item, index, isOpen, onToggle }) {
  return (
    <div style={{ borderBottom: '0.5px solid rgba(255,255,255,0.09)' }}>
      <button
        onClick={onToggle}
        style={{
          width:          '100%',
          display:        'flex',
          alignItems:     'flex-start',
          justifyContent: 'space-between',
          gap:            '20px',
          padding:        '20px 0',
          background:     'none',
          border:         'none',
          cursor:         'pointer',
          textAlign:      'left',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', flex: 1 }}>
          <span style={{
            fontSize:           '10px',
            fontWeight:         500,
            letterSpacing:      '0.10em',
            color:              isOpen ? 'rgba(123,143,255,0.85)' : 'rgba(255,255,255,0.22)',
            flexShrink:         0,
            transition:         'color 0.22s ease',
            fontVariantNumeric: 'tabular-nums',
          }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span style={{
            fontSize:   'clamp(13px, 1.2vw, 15px)',
            fontWeight: isOpen ? 400 : 300,
            color:      isOpen ? '#FFFFFF' : 'rgba(255,255,255,0.68)',
            lineHeight: 1.35,
          }}>
            {item.question}
          </span>
        </div>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            fontSize:   '20px',
            fontWeight: 200,
            lineHeight: 1,
            color:      isOpen ? 'rgba(123,143,255,0.85)' : 'rgba(255,255,255,0.28)',
            flexShrink: 0,
            display:    'inline-block',
            transition: 'color 0.22s ease',
            marginTop:  '1px',
          }}
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{
              fontSize:      '13px',
              color:         'rgba(255,255,255,0.46)',
              lineHeight:    1.72,
              paddingLeft:   '42px',
              paddingBottom: '22px',
              paddingRight:  '24px',
            }}>
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Sección principal ──
export default function Contact() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section
      id="contact"
      className="section-full section-padding"
      style={{
        background: '#07071A',
        position:   'relative',
        overflow:   'hidden',
      }}
    >
      {/* ── Imagen de fondo — cubre Contact + FAQ + Mapa ── */}
      <div style={{
        position:      'absolute',
        inset:         0,
        zIndex:        0,
        pointerEvents: 'none',
      }}>
        <img
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1800&fit=crop&q=80"
          alt=""
          draggable={false}
          style={{
            width:          '100%',
            height:         '100%',
            objectFit:      'cover',
            objectPosition: 'center top',
            display:        'block',
          }}
        />
      </div>

      {/* ── Filtro azul primary encima de la imagen ── */}
      <div style={{
        position:      'absolute',
        inset:         0,
        zIndex:        1,
        background:    'linear-gradient(to bottom, rgba(20,0,255,0.82) 0%, rgba(11,11,90,0.88) 40%, rgba(7,7,26,0.97) 100%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>

        {/* ── Grid: Contact izquierda / FAQ derecha ── */}
        <div style={{
          display:             'grid',
          gridTemplateColumns: '1fr 1fr',
          alignItems:          'stretch',
          marginBottom:        '64px',
        }}>

          {/* LEFT — Contacto */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            style={{
              display:        'flex',
              flexDirection:  'column',
              justifyContent: 'center',
              paddingRight:   'clamp(32px, 5vw, 64px)',
              borderRight:    '0.5px solid rgba(255,255,255,0.08)',
            }}
          >
            <motion.p variants={staggerItem} style={{
              fontSize:      'var(--text-label)',
              letterSpacing: 'var(--ls-label)',
              textTransform: 'uppercase',
              color:         'rgba(255,255,255,0.32)',
              fontWeight:    500,
              marginBottom:  '20px',
            }}>
              {CONTACT.label}
            </motion.p>

            <motion.h2 variants={staggerItem} style={{
              fontSize:      'var(--text-h2)',
              fontWeight:    300,
              lineHeight:    'var(--lh-heading)',
              letterSpacing: 'var(--ls-heading)',
              color:         '#FFFFFF',
              marginBottom:  '24px',
            }}>
              ¿Querés empezar<br />
              tu{' '}
              <em style={{ fontStyle: 'italic', color: '#7B8FFF' }}>
                transformación
              </em>?
            </motion.h2>

            <motion.p variants={staggerItem} style={{
              fontSize:     'var(--text-body-lg)',
              color:        'rgba(255,255,255,0.46)',
              lineHeight:   'var(--lh-body)',
              marginBottom: '28px',
              maxWidth:     '400px',
            }}>
              {CONTACT.body}
            </motion.p>

            {/* CTA card — idéntico al de Servicios */}
            <motion.div variants={staggerItem} style={{ marginBottom: '28px' }}>
              <WhatsAppCTACard />
            </motion.div>

            {/* Trust */}
            <motion.div
              variants={staggerItem}
              style={{
                borderTop:  '0.5px solid rgba(255,255,255,0.09)',
                paddingTop: '22px',
                display:    'flex',
                gap:        '14px',
                alignItems: 'flex-start',
              }}
            >
              <div style={{
                width:          '40px',
                height:         '40px',
                borderRadius:   '50%',
                background:     'linear-gradient(135deg, rgba(20,0,255,0.70) 0%, rgba(123,143,255,0.50) 100%)',
                border:         '1px solid rgba(123,143,255,0.25)',
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                flexShrink:     0,
                fontSize:       '12px',
                fontWeight:     400,
                letterSpacing:  '0.03em',
                color:          '#FFFFFF',
              }}>
                FL
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '13px', fontWeight: 500, color: '#FFFFFF', marginBottom: '3px' }}>
                  {CONTACT.trust.name}
                </p>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.36)', marginBottom: '8px' }}>
                  {CONTACT.trust.role}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                  <PulseDot />
                  <p style={{ fontSize: '11px', color: 'rgba(123,143,255,0.78)' }}>
                    {CONTACT.trust.detail}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT — FAQ */}
          <motion.div
            id="faq"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            style={{
              display:       'flex',
              flexDirection: 'column',
              justifyContent:'center',
              paddingLeft:   'clamp(32px, 5vw, 64px)',
            }}
          >
            <p style={{
              fontSize:      'var(--text-label)',
              letterSpacing: 'var(--ls-label)',
              textTransform: 'uppercase',
              color:         'rgba(255,255,255,0.32)',
              fontWeight:    500,
              marginBottom:  '16px',
            }}>
              {FAQ.label}
            </p>

            <h2 style={{
              fontSize:      'clamp(28px, 3.5vw, 48px)',
              fontWeight:    300,
              lineHeight:    'var(--lh-heading)',
              letterSpacing: 'var(--ls-heading)',
              color:         '#FFFFFF',
              marginBottom:  '32px',
            }}>
              ¿Alguna{' '}
              <em style={{ fontStyle: 'italic', color: '#7B8FFF' }}>
                pregunta
              </em>?
            </h2>

            <div style={{ borderTop: '0.5px solid rgba(255,255,255,0.09)' }}>
              {FAQ.items.map((item, i) => (
                <AccordionItem
                  key={i}
                  item={item}
                  index={i}
                  isOpen={openIndex === i}
                  onToggle={() => toggle(i)}
                />
              ))}
            </div>
          </motion.div>

        </div>

        {/* ── Google Maps ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ borderTop: '0.5px solid rgba(255,255,255,0.09)', paddingTop: '48px' }}
        >
          {/* Info de ubicación */}
          <div style={{
            display:        'flex',
            justifyContent: 'space-between',
            alignItems:     'flex-end',
            marginBottom:   '20px',
            gap:            '16px',
          }}>
            <div>
              <p style={{
                fontSize:      'var(--text-label)',
                letterSpacing: 'var(--ls-label)',
                textTransform: 'uppercase',
                color:         'rgba(255,255,255,0.30)',
                fontWeight:    500,
                marginBottom:  '6px',
              }}>
                Sede Principal
              </p>
              <p style={{
                fontSize:   'clamp(18px, 2vw, 26px)',
                fontWeight: 300,
                color:      '#FFFFFF',
                letterSpacing: '-0.02em',
              }}>
                Av. Santa Fe 2450,{' '}
                <span style={{ color: 'rgba(255,255,255,0.45)' }}>Recoleta · Buenos Aires</span>
              </p>
            </div>
            <p style={{
              fontSize:   '12px',
              color:      'rgba(255,255,255,0.30)',
              textAlign:  'right',
              flexShrink: 0,
            }}>
              Lun–Vie 9–20h<br />Sáb 9–14h
            </p>
          </div>

          {/* Iframe — filtro oscuro para que armonice con el fondo navy */}
          <div style={{
            borderRadius: 'var(--radius-md)',
            overflow:     'hidden',
            height:       '320px',
            position:     'relative',
          }}>
            <iframe
              title="Forma Studio — Sede Recoleta"
              src="https://maps.google.com/maps?q=Av.+Santa+Fe+2450,+Buenos+Aires,+Argentina&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="320"
              style={{
                border:      0,
                display:     'block',
                filter:      'grayscale(0.15) brightness(1.04) contrast(0.95)',
                pointerEvents: 'auto',
              }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
