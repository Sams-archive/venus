import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { timeline } from '../data/timeline'

function TimelineCard({ item, index }) {
  const isEven = index % 2 === 0
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <div ref={ref} className="relative flex items-center">
      {/* Line dot */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 z-10 w-4 h-4 rounded-full bg-[#D4AF37] hidden md:flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="w-2 h-2 rounded-full bg-white" />
      </motion.div>

      {/* Card */}
      <div className={`w-full md:w-5/12 ${isEven ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'}`}>
        <motion.article
          className="bg-white rounded-sm overflow-hidden shadow-sm"
          style={{ border: '1px solid rgba(212,175,55,0.15)' }}
          initial={{ opacity: 0, x: isEven ? -60 : 60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -4, boxShadow: '0 16px 50px rgba(212,175,55,0.1)' }}
        >
          <div className="relative overflow-hidden h-60">
            <motion.img
              src={item.image}
              alt={item.caption}
              className="w-full h-full object-cover object-top"
              loading="lazy"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            {/* Date badge */}
            <div
              className="absolute bottom-4 left-4 font-montserrat text-xs tracking-widest uppercase text-white/90 px-3 py-1"
              style={{ background: 'rgba(212,175,55,0.8)', backdropFilter: 'blur(10px)' }}
            >
              {item.date}
            </div>
          </div>
          <div className="p-6">
            <p className="font-playfair italic text-[#555] text-base leading-relaxed">{item.caption}</p>
          </div>
        </motion.article>
      </div>
    </div>
  )
}

export default function Timeline() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section className="relative py-28 px-6 bg-[#FAF9F6]" aria-label="Our journey">
      {/* Section header */}
      <div ref={ref} className="text-center mb-20">
        <motion.p
          className="font-montserrat text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Us, through time
        </motion.p>
        <motion.h2
          className="font-playfair text-4xl md:text-5xl text-[#333333] font-medium"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Our Journey
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

      {/* Timeline */}
      <div className="max-w-4xl mx-auto relative">
        {/* Center line */}
        <div
          className="absolute left-1/2 top-0 bottom-0 w-px hidden md:block"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.3), transparent)' }}
        />

        <div className="flex flex-col gap-16">
          {timeline.map((item, i) => (
            <TimelineCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
