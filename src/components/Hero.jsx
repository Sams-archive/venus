import { motion } from 'framer-motion'
// REPLACE: Swap hero.jpg with your preferred hero image
import heroImg from '../assets/images/hero.jpg'

export default function Hero() {
  const scrollToTraits = () => {
    document.getElementById('traits')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Birthday hero"
          className="w-full h-full object-cover object-top"
          loading="eager"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />
        {/* Gold vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.55) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        {/* Small label */}
        <motion.p
          className="font-montserrat text-xs md:text-sm tracking-[0.35em] uppercase text-white/70 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Happy 24th Birthday
        </motion.p>

        {/* Decorative line */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-6"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <span className="text-[#D4AF37] text-lg">✦</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </motion.div>

        {/* REPLACE: Change "Venus" to her real name */}
        <motion.h1
          className="font-parisienne text-6xl md:text-8xl lg:text-9xl text-white mb-6 leading-none"
          style={{ textShadow: '0 2px 40px rgba(212,175,55,0.3)' }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Venus
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="font-playfair italic text-base md:text-lg text-white/80 mb-12 max-w-xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          Celebrating the most incredible woman — today and always.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          onClick={scrollToTraits}
          className="group relative font-montserrat text-sm tracking-widest uppercase px-10 py-4 text-[#1a1a1a] font-semibold overflow-hidden rounded-none cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, #D4AF37 0%, #F0D060 50%, #D4AF37 100%)',
            boxShadow: '0 0 40px rgba(212,175,55,0.4)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          whileHover={{ scale: 1.03, boxShadow: '0 0 60px rgba(212,175,55,0.6)' }}
          whileTap={{ scale: 0.97 }}
          aria-label="Scroll down for a surprise"
        >
          <span className="relative z-10">Scroll for a Surprise ↓</span>
        </motion.button>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <div className="w-5 h-8 border border-white/30 rounded-full mx-auto flex items-start justify-center pt-1">
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
