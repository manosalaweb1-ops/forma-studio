import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, staggerItem } from '../lib/animations';
import { TEAM } from '../constants/content';

function parseTitle(fullName) {
  const m = fullName.match(/^(Dr[a]?\.|Lic\.)\s*(.*)/);
  return m ? { title: m[1], name: m[2] } : { title: '', name: fullName };
}

// Solo decos DERECHAS (rot 0deg), color oscuro sobre blanco
const DECO_TEAM = [
  { t: 'pH',          top: '10%',   left: '2%',   size: '132px', op: 0.040 },
  { t: '°C',          bottom: '24%',right: '4%',  size: '112px', op: 0.035 },
  { t: '+',           top: '44%',   left: '49%',  size: '90px',  op: 0.028 },
  { t: 'HIALURÓNICO', top: '2%',    left: '36%',  size: '42px',  op: 0.026 },
];

export default function Team() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = TEAM.members[activeIndex];

  return (
    <section
      id="team"
      className="section-full section-padding"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(20,0,255,0.22) 1.5px, transparent 1.5px)',
        backgroundSize: '28px 28px',
        backgroundColor: '#FFFFFF',
        position: 'relative',
        paddingBottom: 'clamp(48px, 5vw, 68px)',
        overflow: 'hidden',
      }}
    >

      {/* ── Blobs de gradiente animados ── */}
      <style>{`
        @keyframes blob-drift-1 {
          0%,100% { transform: translate(0px, 0px) scale(1); }
          33%      { transform: translate(40px, -30px) scale(1.08); }
          66%      { transform: translate(-20px, 20px) scale(0.95); }
        }
        @keyframes blob-drift-2 {
          0%,100% { transform: translate(0px, 0px) scale(1); }
          33%      { transform: translate(-50px, 25px) scale(1.05); }
          66%      { transform: translate(30px, -20px) scale(1.10); }
        }
        @keyframes blob-drift-3 {
          0%,100% { transform: translate(0px, 0px) scale(1); }
          50%      { transform: translate(20px, 40px) scale(1.06); }
        }
      `}</style>

      {/* ── Decorativos de fondo (solo derechos) ── */}
      <div style={{
        position:     'absolute',
        inset:        0,
        pointerEvents:'none',
        overflow:     'hidden',
        userSelect:   'none',
        zIndex:       0,
      }}>
        {DECO_TEAM.map((d, i) => (
          <span
            key={i}
            style={{
              position:  'absolute',
              top:       d.top,
              bottom:    d.bottom,
              left:      d.left,
              right:     d.right,
              fontSize:  d.size,
              fontWeight:200,
              color:     `rgba(37,32,37,${d.op})`,
              lineHeight:1,
              fontFamily:'var(--font)',
            }}
          >
            {d.t}
          </span>
        ))}
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display:             'grid',
          gridTemplateColumns: '5fr 7fr',
          gap:                 'clamp(48px, 6vw, 80px)',
          alignItems:          'stretch',
          minHeight:           '68vh',
        }}>

          {/* ── LEFT ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
          >
            <motion.p variants={staggerItem} style={{
              fontSize:      'var(--text-label)',
              letterSpacing: 'var(--ls-label)',
              textTransform: 'uppercase',
              color:         'var(--color-muted)',
              fontWeight:    500,
              marginBottom:  '16px',
            }}>
              {TEAM.label}
            </motion.p>

            <motion.h2 variants={staggerItem} style={{
              fontSize:      'var(--text-h2)',
              fontWeight:    300,
              lineHeight:    'var(--lh-heading)',
              letterSpacing: 'var(--ls-heading)',
              color:         'var(--color-text)',
              marginBottom:  '48px',
            }}>
              Nuestro equipo<br />
              de{' '}
              <em style={{ fontStyle: 'italic', color: '#7B8FFF' }}>
                profesionales
              </em>
            </motion.h2>

            {/* Lista */}
            <div style={{ borderTop: '0.5px solid rgba(37,32,37,0.08)' }}>
              {TEAM.members.map((member, i) => {
                const { title, name } = parseTitle(member.name);
                const isActive = activeIndex === i;

                return (
                  <motion.div
                    key={i}
                    variants={staggerItem}
                    animate={{
                      backgroundColor: isActive
                        ? 'rgba(123,143,255,0.10)'
                        : 'rgba(255,255,255,0)',
                    }}
                    transition={{ duration: 0.22 }}
                    onMouseEnter={() => setActiveIndex(i)}
                    style={{
                      borderBottom: '0.5px solid rgba(37,32,37,0.08)',
                      padding:      '20px 14px',
                      margin:       '0 -14px',
                      cursor:       'default',
                      borderRadius: '6px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', position: 'relative' }}>
                      {/* Borde izquierdo celeste — igual que las barras de NUESTRO MÉTODO */}
                      <motion.div
                        animate={{ opacity: isActive ? 1 : 0, scaleY: isActive ? 1 : 0.4 }}
                        transition={{ duration: 0.22 }}
                        style={{
                          position:        'absolute',
                          left:            '-14px',
                          top:             0,
                          bottom:          0,
                          width:           '3px',
                          background:      '#7B8FFF',
                          borderRadius:    '0 2px 2px 0',
                          transformOrigin: 'center',
                          pointerEvents:   'none',
                        }}
                      />

                      <motion.span
                        animate={{ color: isActive ? '#7B8FFF' : 'rgba(37,32,37,0.22)' }}
                        transition={{ duration: 0.22 }}
                        style={{
                          fontSize:           '10px',
                          fontWeight:         500,
                          letterSpacing:      '0.10em',
                          flexShrink:         0,
                          paddingTop:         '5px',
                          fontVariantNumeric: 'tabular-nums',
                        }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </motion.span>

                      <div style={{ flex: 1 }}>
                        {title && (
                          <motion.p
                            animate={{ color: isActive ? 'rgba(123,143,255,0.75)' : 'rgba(37,32,37,0.30)' }}
                            transition={{ duration: 0.22 }}
                            style={{
                              fontSize:      '9px',
                              fontWeight:    600,
                              letterSpacing: '0.10em',
                              textTransform: 'uppercase',
                              marginBottom:  '3px',
                            }}
                          >
                            {title}
                          </motion.p>
                        )}

                        <motion.p
                          animate={{
                            color: isActive ? 'var(--color-text)' : 'rgba(37,32,37,0.38)',
                            x:     isActive ? 6 : 0,
                          }}
                          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                          style={{
                            fontSize:      'clamp(17px, 2vw, 24px)',
                            fontWeight:    300,
                            letterSpacing: '-0.02em',
                            lineHeight:    1.15,
                          }}
                        >
                          {name}
                        </motion.p>

                        <AnimatePresence initial={false}>
                          {isActive && (
                            <motion.p
                              key="role"
                              initial={{ opacity: 0, height: 0, marginTop: 0 }}
                              animate={{ opacity: 1, height: 'auto', marginTop: '5px' }}
                              exit={{ opacity: 0, height: 0, marginTop: 0 }}
                              transition={{ duration: 0.24 }}
                              style={{
                                fontSize:   '12px',
                                color:      'var(--color-muted)',
                                lineHeight: 1.4,
                                overflow:   'hidden',
                              }}
                            >
                              {member.role}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.span
                            key="arrow"
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -6 }}
                            transition={{ duration: 0.2 }}
                            style={{
                              fontSize:   '16px',
                              color:      'rgba(123,143,255,0.65)',
                              alignSelf:  'center',
                              flexShrink: 0,
                            }}
                          >
                            →
                          </motion.span>
                        )}
                      </AnimatePresence>

                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* ── RIGHT — foto grande con crossfade ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.70, ease: 'easeOut' }}
            style={{
              position:     'relative',
              borderRadius: 'var(--radius-md)',
              overflow:     'hidden',
              minHeight:    '500px',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={activeIndex}
                src={active.photo}
                alt={active.name}
                draggable={false}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.48, ease: 'easeOut' }}
                style={{
                  position:       'absolute',
                  inset:          0,
                  width:          '100%',
                  height:         '100%',
                  objectFit:      'cover',
                  objectPosition: 'center top',
                  pointerEvents:  'none',
                  userSelect:     'none',
                }}
              />
            </AnimatePresence>

            <div style={{
              position:      'absolute',
              inset:         0,
              background:    'linear-gradient(to top, rgba(7,7,18,0.88) 0%, transparent 55%)',
              pointerEvents: 'none',
            }} />

            <div style={{ position: 'absolute', bottom: '26px', left: '26px', right: '26px' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.32 }}
                >
                  <p style={{ fontSize: '15px', fontWeight: 500, color: '#FFFFFF', marginBottom: '4px' }}>
                    {active.name}
                  </p>
                  <p style={{ fontSize: '11px', color: 'rgba(196,199,255,0.65)' }}>
                    {active.experience}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
