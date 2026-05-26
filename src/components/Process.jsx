import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { staggerContainer, staggerItem } from '../lib/animations';
import { PROCESS } from '../constants/content';

// ── Configuración por paso: imagen + posición + rotación ──
// offsetX/Y en px desde el centro de la fila; rotate en grados
const STEP_CONFIG = [
  { offsetX:  30, offsetY: -20, rotate:  2.0,
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&fit=crop&q=80' },
  // 02 — nuevo: análisis facial/diagnóstico dermatológico
  { offsetX: -24, offsetY:  16, rotate: -3.0,
    image: 'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?w=700&fit=crop&q=80' },
  // 03 — nuevo: procedimiento estético de precisión
  { offsetX:   4, offsetY:  -6, rotate:  0.0,
    image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=700&fit=crop&q=80' },
  { offsetX:  22, offsetY:  18, rotate:  2.5,
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=700&fit=crop&q=80' },
  { offsetX: -20, offsetY: -14, rotate: -2.0,
    image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=700&fit=crop&q=80' },
  { offsetX:  26, offsetY:  10, rotate:  3.0,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=700&fit=crop&q=80' },
];

export default function Process() {
  // Siempre hay una barra activa — inicia en 2 (barra nº3)
  const [activeIndex, setActiveIndex]   = useState(2);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const accordionRef = useRef(null);
  const isInView     = useInView(accordionRef, { once: true, amount: 0.15 });
  const [hasEntered, setHasEntered] = useState(false);
  useEffect(() => { if (isInView) setHasEntered(true); }, [isInView]);

  // Siempre activa una — no puede quedar en null
  const toggle = (i) => setActiveIndex(i);

  return (
    <section
      id="process"
      className="section-full"
      style={{ background: 'var(--color-white)' }}
    >
      {/* ── Heading ── */}
      <div className="container" style={{ paddingTop: 'var(--section-padding)' }}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          style={{
            display:             'grid',
            gridTemplateColumns: '5fr 5fr',
            gap:                 '40px',
            alignItems:          'stretch',
            marginBottom:        '56px',
          }}
        >
          {/* LEFT — heading grande con "diferente" empujado a la derecha */}
          <motion.div variants={staggerItem}>
            <p style={{
              fontSize:      'var(--text-label)',
              letterSpacing: 'var(--ls-label)',
              textTransform: 'uppercase',
              color:         'var(--color-muted)',
              fontWeight:    500,
              marginBottom:  '22px',
            }}>
              {PROCESS.label}
            </p>
            {/*
              width: max-content → el h2 se estrecha al ancho de "hacemos las cosas"
              "diferente" con textAlign:right queda justo bajo el fin de esa línea
            */}
            <h2 style={{
              fontSize:      'clamp(42px, 5.8vw, 84px)',
              fontWeight:    200,
              lineHeight:    1.02,
              letterSpacing: '-0.035em',
              color:         'var(--color-text)',
              width:         'max-content',
              maxWidth:      '100%',
            }}>
              Así es como<br />
              hacemos las cosas
              <em style={{
                fontStyle:   'italic',
                color:       'var(--color-primary)',
                fontSize:    '1.08em',
                fontWeight:  200,
                display:     'block',
                textAlign:   'right',
                marginTop:   '5px',
              }}>
                diferente
              </em>
            </h2>
          </motion.div>

          {/* RIGHT — composición en L escalonada (sin barritas, mismo tamaño)
              Bloque 1: arriba izquierda
              Bloque 2: a la altura del FIN  del bloque 1 → abajo derecha
              Bloque 3: a la altura de la MITAD del bloque 1 → centro
              Todos position:absolute sobre un contenedor con minHeight fijo */}
          <motion.div
            variants={staggerItem}
            style={{
              display:        'flex',
              flexDirection:  'column',
              justifyContent: 'space-between',
              minHeight:      '200px',
            }}
          >
            {/* ── Bloque 1 — arriba, ancla izquierda ── */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', alignSelf: 'flex-start', maxWidth: '78%' }}>
              <span style={{
                fontSize:   '28px',
                fontWeight: 200,
                color:      'var(--color-primary)',
                opacity:    0.40,
                lineHeight: 1,
                flexShrink: 0,
                paddingTop: '3px',
                letterSpacing: '-0.02em',
              }}>
                [
              </span>
              <p style={{
                fontSize:   '13px',
                fontWeight: 300,
                color:      'var(--color-muted)',
                lineHeight: 1.72,
                margin:     0,
                maxWidth:   '280px',
              }}>
                En Forma Studio, creemos que la estética es{' '}
                <em style={{ color: 'var(--color-primary)', fontStyle: 'normal', fontWeight: 400 }}>
                  mucho más que apariencia.
                </em>
              </p>
            </div>

            {/* ── Bloque medio — centro ── */}
            <div style={{ alignSelf: 'center' }}>
              <p style={{
                fontSize:   '13px',
                fontWeight: 300,
                color:      'var(--color-muted)',
                lineHeight: 1.72,
                margin:     0,
                whiteSpace: 'nowrap',
              }}>
                Cada procedimiento parte de un diagnóstico individualizado.<br />
                Sin protocolos genéricos, sin resultados predecibles.
              </p>
            </div>

            {/* ── Bloque 2 — abajo, ancla derecha ── */}
            <div style={{
              display:   'flex',
              alignItems:'flex-end',
              gap:       '14px',
              alignSelf: 'flex-end',
              maxWidth:  '78%',
            }}>
              <p style={{
                fontSize:   '13px',
                fontWeight: 300,
                color:      'var(--color-muted)',
                lineHeight: 1.72,
                margin:     0,
                textAlign:  'right',
              }}>
                Es sobre{' '}
                <em style={{ color: 'var(--color-primary)', fontStyle: 'normal', fontWeight: 400 }}>
                  confianza, precisión
                </em>
                {' '}y cómo te sentís en tu propia piel.
              </p>
              <span style={{
                fontSize:      '28px',
                fontWeight:    200,
                color:         'var(--color-primary)',
                opacity:       0.40,
                lineHeight:    1,
                flexShrink:    0,
                paddingBottom: '3px',
                letterSpacing: '-0.02em',
              }}>
                ]
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Filas — sin overflow:hidden para que la foto desborde ── */}
      <div
        ref={accordionRef}
        style={{
          borderTop: '0.5px solid rgba(20,0,255,0.08)',
          position:  'relative',
        }}
      >
        {PROCESS.items.map((item, i) => {
          const isActive   = activeIndex === i;
          const isInactive = !isActive;

          const entranceDelay = hasEntered ? 0 : i * 0.07;
          const targetOpacity = !hasEntered ? 0 : 1;
          const targetY       = hasEntered  ? 0 : 24;

          return (
            <motion.div
              key={i}
              animate={{
                opacity:         targetOpacity,
                y:               targetY,
                backgroundColor: isActive ? '#0B0B5A' : '#FFFFFF',
              }}
              transition={{
                opacity:         { duration: 0.5, delay: entranceDelay, ease: 'easeOut' },
                y:               { duration: 0.5, delay: entranceDelay, ease: 'easeOut' },
                backgroundColor: { duration: 0.22 },
              }}
              style={{
                borderBottom:    '0.5px solid rgba(20,0,255,0.08)',
                cursor:          'pointer',
                position:        'relative',         // contexto para imagen absoluta
                zIndex:          isActive ? 10 : 1,  // activa encima de vecinas
                transformOrigin: 'center',
                overflow:        'visible',          // imagen puede sobresalir
              }}
              onClick={() => toggle(i)}
              onHoverStart={() => setHoveredIndex(i)}
              onHoverEnd={()   => setHoveredIndex(null)}
            >

              {/* ── Foto superpuesta — posición y rotación variables por paso ── */}
              {(() => {
                const cfg = STEP_CONFIG[i];
                return (
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        key="img"
                        initial={{ opacity: 0, scale: 0.80, rotate: cfg.rotate * 0.4 }}
                        animate={{ opacity: 1, scale: 1,    rotate: cfg.rotate        }}
                        exit={{    opacity: 0, scale: 0.88, rotate: cfg.rotate * 0.6  }}
                        transition={{ duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] }}
                        style={{
                          position:      'absolute',
                          left:          `calc(50% - 130px + ${cfg.offsetX}px)`,
                          top:           `calc(50% - 130px + ${cfg.offsetY}px)`,
                          width:         '260px',
                          height:        '260px',
                          borderRadius:  '14px',
                          overflow:      'hidden',
                          boxShadow:     '0 24px 60px rgba(0,0,0,0.55)',
                          pointerEvents: 'none',
                          zIndex:        20,
                        }}
                      >
                        <img
                          src={cfg.image}
                          alt={item.title}
                          draggable={false}
                          style={{
                            width:          '100%',
                            height:         '100%',
                            objectFit:      'cover',
                            objectPosition: 'center',
                            display:        'block',
                          }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                );
              })()}

              {/* ── Contenido de la fila ── */}
              <div
                className="container"
                style={{
                  display:       'flex',
                  alignItems:    'center',
                  gap:           '24px',
                  paddingTop:    '22px',
                  paddingBottom: '22px',
                  minHeight:     '78px',
                  position:      'relative',
                  zIndex:        2,
                }}
              >
                {/* ① Bolita — azul rellena por defecto → blanca al activar */}
                <motion.div
                  animate={{
                    scale:      hoveredIndex === i && !isActive ? 1.10 : 1,
                    background: isActive ? '#FFFFFF' : '#1400FF',
                    color:      isActive ? '#1400FF' : '#FFFFFF',
                  }}
                  transition={{ duration: 0.18 }}
                  style={{
                    width:          '36px',
                    height:         '36px',
                    borderRadius:   '50%',
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                    fontSize:       '11px',
                    fontWeight:     600,
                    letterSpacing:  '0.02em',
                    flexShrink:     0,
                  }}
                >
                  {item.number}
                </motion.div>

                {/* ② Título */}
                <motion.p
                  animate={{
                    x:       hoveredIndex === i && !isActive ? 6 : 0,
                    color:   isActive ? '#FFFFFF' : '#252025',
                    opacity: isInactive ? 0.70 : 1,
                  }}
                  transition={{ duration: 0.18 }}
                  style={{
                    flex:          '1 1 0',
                    fontSize:      'clamp(15px, 1.6vw, 21px)',
                    fontWeight:    300,
                    letterSpacing: '-0.015em',
                    lineHeight:    1.2,
                    minWidth:      0,
                  }}
                >
                  {item.title}
                </motion.p>

                {/* ③ Espacio central para la foto (siempre reservado en active) */}
                <div style={{ width: '260px', flexShrink: 0 }} />

                {/* ④ Descripción — siempre visible */}
                <motion.p
                  animate={{
                    color:   isActive ? 'rgba(255,255,255,0.60)' : 'rgba(37,32,37,0.42)',
                    opacity: !hasEntered ? 0 : isInactive ? 0.72 : 1,
                  }}
                  transition={{ duration: 0.22 }}
                  style={{
                    flex:       '1 1 0',
                    fontSize:   '13px',
                    lineHeight: 1.58,
                    textAlign:  'right',
                    minWidth:   0,
                  }}
                >
                  {item.description}
                </motion.p>

                {/* + / × */}
                <motion.span
                  animate={{
                    rotate: isActive ? 45 : 0,
                    color:  isActive ? 'rgba(255,255,255,0.28)' : 'rgba(37,32,37,0.20)',
                  }}
                  transition={{ duration: 0.2 }}
                  style={{
                    fontSize:   '22px',
                    fontWeight: 200,
                    lineHeight: 1,
                    userSelect: 'none',
                    flexShrink: 0,
                  }}
                >
                  +
                </motion.span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div style={{ paddingBottom: 'var(--section-padding)' }} />
    </section>
  );
}
