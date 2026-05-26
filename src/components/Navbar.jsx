import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { NAV, SITE } from '../constants/content';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on('change', (v) => setScrolled(v > 40));
  }, [scrollY]);

  return (
    <motion.nav
      animate={{
        background: scrolled
          ? 'rgba(255,255,255,0.72)'
          : 'rgba(255,255,255,0.0)',
        borderBottomColor: scrolled
          ? 'rgba(20,0,255,0.08)'
          : 'rgba(20,0,255,0.0)',
        backdropFilter: scrolled ? 'blur(18px) saturate(1.8)' : 'blur(0px)',
        WebkitBackdropFilter: scrolled ? 'blur(18px) saturate(1.8)' : 'blur(0px)',
      }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      style={{
        position:     'fixed',
        top:          0,
        left:         0,
        right:        0,
        zIndex:       100,
        borderBottom: '0.5px solid transparent',
        height:       '64px',
        display:      'flex',
        alignItems:   'center',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <motion.span
          animate={{ color: scrolled ? 'var(--color-text)' : '#252025' }}
          transition={{ duration: 0.3 }}
          style={{ fontWeight: 400, fontSize: '15px', letterSpacing: '-0.01em' }}
        >
          {SITE.name}
        </motion.span>

        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          {NAV.links.map(link => (
            <motion.a
              key={link.id}
              href={`#${link.id}`}
              animate={{ color: scrolled ? 'var(--color-muted)' : 'rgba(37,32,37,0.72)' }}
              transition={{ duration: 0.3 }}
              style={{
                fontSize:       'var(--text-nav)',
                textDecoration: 'none',
                transition:     'color var(--transition-fast)',
              }}
            >
              {link.label}
            </motion.a>
          ))}
          <a href={SITE.whatsapp} target="_blank" rel="noreferrer" style={{
            background:     'var(--color-primary)',
            color:          '#fff',
            fontSize:       '12px',
            fontWeight:     500,
            padding:        '8px 20px',
            borderRadius:   'var(--radius-pill)',
            textDecoration: 'none',
          }}>
            {NAV.cta}
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
