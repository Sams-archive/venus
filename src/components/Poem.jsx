import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

// REPLACE: Replace the poem below with your own heartfelt words
const POEM = `To the girl who makes ordinary moments magical,

Your laughter feels like sunshine,
your smile carries peace,
and your presence has quietly become
one of my favourite places.

Every conversation,
every memory,
every little moment with you
reminds me that some people are simply gifts.

Today isn't just another birthday.

It's a celebration of the wonderful woman
you continue to become.

May this new year bring you joy,
peace, success,
and every beautiful thing
your heart desires.

Happy Birthday.

❤️`

export default function Poem() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section
      ref={ref}
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #fdf6f0 0%, #FAF9F6 50%, #fdf0f5 100%)' }}
      aria-label="Poem"
    >
      {/* Decorative background text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.025]"
        aria-hidden="true"
      >
        <span className="font-parisienne text-[20rem] text-[#D4AF37]">❤</span>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Section header */}
        <motion.p
          className="font-montserrat text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          From the heart
        </motion.p>
        <motion.h2
          className="font-playfair text-3xl md:text-4xl text-[#333333] mb-12 font-medium italic"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          A Little Something From My Heart
        </motion.h2>

        {/* Glass card */}
        <motion.div
          className="relative rounded-sm p-10 md:p-14"
          style={{
            background: 'rgba(255,255,255,0.7)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(212,175,55,0.2)',
            boxShadow: '0 20px 80px rgba(212,175,55,0.08), 0 4px 20px rgba(0,0,0,0.04)',
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Corner ornaments */}
          <span className="absolute top-4 left-4 text-[#D4AF37] opacity-40 text-xl" aria-hidden="true">✦</span>
          <span className="absolute top-4 right-4 text-[#D4AF37] opacity-40 text-xl" aria-hidden="true">✦</span>
          <span className="absolute bottom-4 left-4 text-[#D4AF37] opacity-40 text-xl" aria-hidden="true">✦</span>
          <span className="absolute bottom-4 right-4 text-[#D4AF37] opacity-40 text-xl" aria-hidden="true">✦</span>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.6 }}
          >
            {POEM.split('\n').map((line, i) => (
              <p
                key={i}
                className={`font-playfair italic leading-loose text-[#444] ${
                  line === '' ? 'mb-3' : 'text-base md:text-lg'
                } ${line === '❤️' ? 'text-2xl not-italic mt-4' : ''}`}
              >
                {line || <span>&nbsp;</span>}
              </p>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
