import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
// REPLACE: Swap footer.jpg with your preferred closing image
import footerImg from '../assets/images/footer.jpg'

export default function Footer() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <footer className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden" aria-label="Footer">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={footerImg}
          alt="Closing footer"
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.1) 0%, transparent 70%)' }}
        />
      </div>

      {/* Content */}
      <div ref={ref} className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        <motion.div
          className="flex items-center justify-center gap-4 mb-8"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <span className="text-[#D4AF37] text-xl">✦</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </motion.div>

        {/* REPLACE: Customize this message */}
        <motion.p
          className="font-playfair italic text-xl md:text-2xl text-white/90 leading-relaxed mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          I can't wait to celebrate with you tonight.
        </motion.p>

        <motion.p
          className="font-parisienne text-5xl md:text-6xl text-[#D4AF37] mb-10"
          style={{ textShadow: '0 0 40px rgba(212,175,55,0.4)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          I love you ❤️
        </motion.p>

        <motion.div
          className="w-16 h-px bg-[#D4AF37] mx-auto mb-8 opacity-40"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
        />

        <motion.p
          className="font-montserrat text-xs tracking-widest uppercase text-white/30"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          Made with love ❤️
        </motion.p>
      </div>
    </footer>
  )
}
