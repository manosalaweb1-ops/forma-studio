import { motion } from 'framer-motion';
import { FOOTER, SITE, NAV } from '../constants/content';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: '#07071A', position: 'relative', overflow: 'hidden' }}>

      {/* Aureola de fondo */}
      <div style={{
        position:     'absolute',
        top:          '-200px',
        left:         '50%',
        transform:    'translateX(-50%)',
        width:        '800px',
        height:       '500px',
        borderRadius: '50%',
        background:   'radial-gradient(ellipse, rgba(20,0,255,0.12) 0%, transparent 65%)',
        pointerEvents:'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── WORDMARK gigante ── */}
        <div style={{
          borderBottom: '0.5px solid rgba(255,255,255,0.07)',
          paddingBottom:'40px',
          paddingTop:   'clamp(64px, 8vw, 100px)',
          overflow:     'hidden',
        }}>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize:      'clamp(52px, 9vw, 130px)',
              fontWeight:    200,
              letterSpacing: '-0.04em',
              lineHeight:    0.92,
              color:         '#FFFFFF',
              userSelect:    'none',
            }}
          >
            {FOOTER.wordmark}
          </motion.p>
        </div>

        {/* ── FILA MEDIA ── */}
        <div style={{
          display:       'grid',
          gridTemplateColumns: '5fr 3fr 4fr',
          gap:           '48px',
          padding:       '52px 0',
          borderBottom:  '0.5px solid rgba(255,255,255,0.07)',
        }}>

          {/* Tagline + claim */}
          <div>
            <p style={{
              fontSize:     '13px',
              color:        'rgba(255,255,255,0.35)',
              lineHeight:   1.65,
              marginBottom: '20px',
              maxWidth:     '340px',
            }}>
              {FOOTER.tagline}
            </p>
            <motion.a
              href={SITE.whatsapp}
              target="_blank"
              rel="noreferrer"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.18 }}
              style={{
                display:        'inline-flex',
                alignItems:     'center',
                gap:            '8px',
                fontSize:       '13px',
                fontWeight:     500,
                color:          'rgba(123,143,255,0.85)',
                textDecoration: 'none',
                letterSpacing:  '-0.01em',
              }}
            >
              Escribinos ahora →
            </motion.a>
          </div>

          {/* Navegación */}
          <div>
            <p style={{
              fontSize:      '10px',
              fontWeight:    500,
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              color:         'rgba(255,255,255,0.25)',
              marginBottom:  '18px',
            }}>
              Navegación
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '11px' }}>
              {NAV.links.map(({ label, id }) => (
                <li key={id}>
                  <motion.a
                    href={`#${id}`}
                    whileHover={{ x: 4, color: '#FFFFFF' }}
                    transition={{ duration: 0.16 }}
                    style={{
                      fontSize:       '13px',
                      color:          'rgba(255,255,255,0.42)',
                      textDecoration: 'none',
                      display:        'inline-block',
                    }}
                  >
                    {label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <p style={{
              fontSize:      '10px',
              fontWeight:    500,
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              color:         'rgba(255,255,255,0.25)',
              marginBottom:  '18px',
            }}>
              Contacto
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a href={SITE.whatsapp} target="_blank" rel="noreferrer" style={{
                fontSize: '13px', color: 'rgba(255,255,255,0.42)', textDecoration: 'none',
              }}>
                {FOOTER.contact.whatsapp}
              </a>
              <a href={`mailto:${FOOTER.contact.email}`} style={{
                fontSize: '13px', color: 'rgba(255,255,255,0.42)', textDecoration: 'none',
              }}>
                {FOOTER.contact.email}
              </a>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.28)' }}>
                {FOOTER.contact.location}
              </p>
            </div>
          </div>

        </div>

        {/* ── FILA LEGAL ── */}
        <div style={{
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'center',
          padding:        '22px 0',
          gap:            '16px',
        }}>
          <p style={{
            fontSize:  '11px',
            color:     'rgba(255,255,255,0.18)',
            lineHeight: 1.4,
          }}>
            © {year} {FOOTER.wordmark}. Todos los derechos reservados.
          </p>
          <p style={{
            fontSize:  '11px',
            color:     'rgba(255,255,255,0.14)',
          }}>
            Buenos Aires, Argentina
          </p>
        </div>

      </div>
    </footer>
  );
}
