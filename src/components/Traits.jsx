import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { traits } from '../data/traits'

function TraitCard({ trait, index }) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <motion.article
      ref={ref}
      className="bg-white rounded-sm overflow-hidden shadow-sm group cursor-default"
      style={{ border: '1px solid rgba(212,175,55,0.15)' }}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(212,175,55,0.12)' }}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-72 md:h-80">
        <motion.img
          src={trait.image}
          alt={trait.title}
          className="w-full h-full object-cover object-top"
          loading="lazy"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Text */}
      <div className="p-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px w-8 bg-[#D4AF37]" />
          <span className="text-[#D4AF37] text-xs">✦</span>
        </div>
        <h3 className="font-playfair text-xl text-[#333333] mb-3 font-medium">{trait.title}</h3>
        <p className="font-montserrat text-sm text-[#666] leading-relaxed font-light">
          {trait.description}
        </p>
      </div>
    </motion.article>
  )
}

export default function Traits() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="traits" className="relative py-28 px-6" aria-label="Why you're amazing">
      {/* Section header */}
      <div ref={ref} className="text-center mb-20">
        <motion.p
          className="font-montserrat text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          A few reasons
        </motion.p>
        <motion.h2
          className="font-playfair text-4xl md:text-5xl text-[#333333] font-medium"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Why You're Amazing
        </motion.h2>
        <motion.div
          className="flex items-center justify-center gap-4 mt-6"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <span className="text-[#D4AF37]">✦</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </motion.div>
      </div>

      {/* Cards grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {traits.map((trait, i) => (
          <TraitCard key={trait.id} trait={trait} index={i} />
        ))}
      </div>
    </section>
  )
}
