// ================================================
// CONTENT — FORMA STUDIO
// Todos los textos del sitio viven aquí.
// Nunca hardcodear texto en los componentes.
// ================================================

export const SITE = {
  name:      'Forma Studio',
  tagline:   'Medicina estética premium',
  whatsapp:  'https://wa.me/5491100000000?text=Hola!%20Vi%20su%20web%20y%20me%20gustar%C3%ADa%20consultar%20sobre%20sus%20servicios',
  instagram: '#',
  location:  '3 sedes en CABA',
  hasLocation: false, // sin dirección específica → sin Maps embed
};

export const NAV = {
  links: [
    { label: 'Nosotros',    id: 'process' },
    { label: 'Servicios',   id: 'services' },
    { label: 'Equipo',      id: 'team' },
    { label: 'Resultados',  id: 'testimonials' },
    { label: 'Contacto',    id: 'contact' },
  ],
  cta: 'Consultá ahora',
};

export const HERO = {
  label:    'MEDICINA ESTÉTICA PREMIUM',
  line1:    'Creamos',
  line2:    'tu primera',
  line3:    'impresión',
  body:     'Tratamientos de alta precisión diseñados para quienes buscan resultados auténticos — sin exageraciones, sin riesgos.',
  cta:      'VER TRATAMIENTOS',
  photo:    '/src/assets/hero.jpg',
  photoAlt: 'Paciente sonriendo — Forma Studio',
};

export const PROCESS = {
  label:   'NUESTRO MÉTODO',
  heading: ['Así es como', 'hacemos las', 'cosas *diferente*'],
  italic:  'diferente',
  body:    'Cada tratamiento comienza con una evaluación profunda. Trabajamos con precisión clínica y atención humana.',
  items: [
    {
      number: '01',
      title:  'Consulta inicial gratuita',
      description: 'Evaluamos tu caso en profundidad sin costo. Sin compromiso, con toda la información.',
    },
    {
      number: '02',
      title:  'Diagnóstico personalizado',
      description: 'Diseñamos un plan único para tu morfología y objetivos. Nada genérico.',
    },
    {
      number: '03',
      title:  'Procedimiento de precisión',
      description: 'Aplicamos cada tratamiento con técnica certificada y productos de primera línea.',
    },
    {
      number: '04',
      title:  'Seguimiento post-tratamiento',
      description: 'Acompañamos tu evolución para garantizar resultados duraderos y naturales.',
    },
    {
      number: '05',
      title:  'Resultados verificados',
      description: 'Documentamos el antes y después. Tu satisfacción es nuestra métrica principal.',
    },
    {
      number: '06',
      title:  'Plan de mantenimiento',
      description: 'Te asesoramos en la frecuencia óptima para mantener tu resultado en el tiempo.',
    },
  ],
};

export const SERVICES = {
  label:   'TRATAMIENTOS',
  heading: ['Todo', '*en un lugar*'],
  italic:  'en un lugar',
  body:    'Desde bioestimulación hasta perfilado de labios — todos los tratamientos que necesitás bajo el mismo techo.',
  cta:     'Consultá un turno →',
  items: [
    {
      name:  'Bótox',
      desc:  'Relajación muscular de precisión para resultados naturales.',
      image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&fit=crop&q=80',
    },
    {
      name:  'Ácido Hialurónico',
      desc:  'Volumen y definición en la zona que necesitás.',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&fit=crop&q=80',
    },
    {
      name:  'Rinomodelación',
      desc:  'Corrección sin cirugía. Resultados inmediatos.',
      image: 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=600&fit=crop&q=80',
    },
    {
      name:  'Bioestimulación',
      desc:  'Regeneración celular profunda para piel radiante.',
      image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&fit=crop&q=80',
    },
    {
      name:  'Perfilado de Labios',
      desc:  'Definición y volumen natural. Sin sobreexagerar.',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&fit=crop&q=80',
    },
    {
      name:  'Lifting sin Cirugía',
      desc:  'Tensado y rejuvenecimiento facial no invasivo.',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&fit=crop&q=80',
    },
    {
      name:  'Mesoterapia',
      desc:  'Nutrición intensiva en la capa donde más importa.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&fit=crop&q=80',
    },
    {
      name:  'Dermapen',
      desc:  'Microagujas para estimular colágeno y renovar la piel.',
      image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&fit=crop&q=80',
    },
  ],
};

export const METRICS = {
  label:   'CONFIANZA',
  heading: ['Confianza,', 'medida en', '*resultados*'],
  italic:  'resultados',
  items: [
    { value: 1500, suffix: '+', label: 'pacientes atendidos' },
    { value: 97,   suffix: '%', label: 'satisfacción verificada' },
    { value: 12,   suffix: '',  label: 'años de experiencia' },
    { value: 100,  suffix: '%', label: 'resultados naturales' },
    { value: 8,    suffix: '+', label: 'especialistas certificados' },
    { value: 3,    suffix: '',  label: 'sedes en CABA' },
  ],
};

export const ECOSYSTEM = {
  label:   'FORMA STUDIO',
  heading: ['Todo lo que', '*necesitás*,'],
  subheading: 'en un solo lugar.',
  italic:  'necesitás',
  body:    'Consulta, diagnóstico, tratamiento y seguimiento en un solo espacio diseñado para tu comodidad.',
  cta:     'Conocé nuestras sedes →',
  features: [
    'Consultas iniciales gratuitas',
    'Equipamiento de última generación',
    'Médicos certificados con experiencia',
    'Productos importados de primera línea',
    'Seguimiento post-tratamiento incluido',
    'Atención personalizada sin tiempos de espera',
  ],
};

export const TEAM = {
  label:   'PROFESIONALES',
  heading: ['Nuestro equipo', 'de *profesionales*'],
  italic:  'profesionales',
  members: [
    {
      name:       'Dra. Valentina Rojas',
      role:       'Directora Médica · Medicina Estética',
      experience: '14 años de experiencia',
      highlight:  true,
      photo:      'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&fit=crop&q=80',
    },
    {
      name:       'Dr. Matías Ferreyra',
      role:       'Especialista en Rellenos y Toxina Botulínica',
      experience: '9 años de experiencia',
      highlight:  false,
      photo:      'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&fit=crop&q=80',
    },
    {
      name:       'Dra. Camila Soto',
      role:       'Dermatóloga · Skin Care Avanzado',
      experience: '7 años de experiencia',
      highlight:  false,
      photo:      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&fit=crop&q=80',
    },
    {
      name:       'Lic. Florencia Méndez',
      role:       'Coordinadora de Turnos · Atención al Paciente',
      experience: 'Contacto principal',
      highlight:  false,
      photo:      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&fit=crop&q=80',
    },
  ],
  cta:        'Reservar turno',
  ctaSecond:  'Ver especialidad',
};

export const TESTIMONIALS = {
  label:   'RESULTADOS',
  heading: ['Cada *historia*', 'habla por sí sola'],
  italic:  'historia',
  items: [
    {
      quote:     'Llegué con miedo a que me notaran "retocada". Me fui con una versión más fresca de mí misma. Nadie notó nada — pero todos me preguntaron qué había cambiado.',
      name:      'Luciana M.',
      treatment: 'Bótox + Ácido Hialurónico',
      age:       '38 años',
    },
    {
      quote:     'La Dra. Rojas me explicó cada paso antes de empezar. Esa transparencia fue lo que me convenció. El resultado superó todas mis expectativas.',
      name:      'Sofía P.',
      treatment: 'Rinomodelación',
      age:       '31 años',
    },
    {
      quote:     'Probé otras clínicas antes y siempre quedé con un resultado artificial. En Forma Studio finalmente encontré el equilibrio que buscaba.',
      name:      'Carolina R.',
      treatment: 'Bioestimulación + Dermapen',
      age:       '44 años',
    },
  ],
};

export const CONTACT = {
  label:      'CONTACTO',
  heading:    ['¿Querés empezar', 'tu *transformación*?'],
  italic:     'transformación',
  body:       'Escribinos por WhatsApp y te respondemos en minutos. La consulta inicial es completamente gratuita.',
  cta:        'Escribinos por WhatsApp',
  trust: {
    name:   'Lic. Florencia Méndez',
    role:   'Coordinadora de Turnos',
    detail: 'Te responde en menos de 1 hora',
  },
};

export const FAQ = {
  label:   'FAQ',
  heading: ['¿Alguna', '*pregunta*?'],
  italic:  'pregunta',
  items: [
    {
      question: '¿Los tratamientos duelen?',
      answer:   'La mayoría de nuestros tratamientos son mínimamente invasivos y se realizan con anestesia tópica. La incomodidad es muy baja y dura apenas durante el procedimiento.',
    },
    {
      question: '¿Cuánto dura el resultado?',
      answer:   'Depende del tratamiento. El bótox dura entre 4 y 6 meses. El ácido hialurónico entre 12 y 18 meses. En la consulta inicial te damos un pronóstico específico para tu caso.',
    },
    {
      question: '¿Necesito tiempo de recuperación?',
      answer:   'La mayoría de los procedimientos no requieren recuperación. Podés retomar tus actividades normales el mismo día. En algunos casos puede haber leve enrojecimiento que desaparece en horas.',
    },
    {
      question: '¿Cómo sé qué tratamiento necesito?',
      answer:   'En la consulta inicial (gratuita) evaluamos tu caso en profundidad y te recomendamos el plan más adecuado. Nunca indicamos tratamientos innecesarios.',
    },
    {
      question: '¿Los resultados se ven naturales?',
      answer:   'Es nuestra principal prioridad. Trabajamos con la filosofía "less is more" — el objetivo es una versión mejorada y natural de vos, no una versión artificial.',
    },
    {
      question: '¿Tienen financiación disponible?',
      answer:   'Sí. Aceptamos tarjetas de crédito con cuotas sin interés y tenemos planes de pago para tratamientos combinados. Consultanos por WhatsApp para más detalles.',
    },
  ],
};

export const FOOTER = {
  wordmark: 'Forma Studio',
  tagline:  'Medicina estética premium · Buenos Aires',
  nav: [
    'Servicios', 'Tratamientos', 'Equipo', 'Resultados', 'FAQ',
  ],
  contact: {
    whatsapp: '+54 9 11 0000-0000',
    email:    'hola@formastudio.com.ar',
    location: '3 sedes en CABA',
  },
};
