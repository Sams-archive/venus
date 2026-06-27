import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

import g1 from '../assets/images/gallery1.jpg'
import g2 from '../assets/images/gallery2.jpg'
import g3 from '../assets/images/gallery3.jpg'
import g4 from '../assets/images/gallery4.jpg'
import g5 from '../assets/images/gallery5.jpg'
import g6 from '../assets/images/gallery6.jpg'
import g7 from '../assets/images/gallery7.jpg'
import g8 from '../assets/images/gallery8.jpg'
import g9 from '../assets/images/gallery9.jpg'
import g10 from '../assets/images/gallery10.jpg'

const GALLERY = [
  { id: 1,  src: g1,  alt: 'Glam night out', span: 'row-span-2' },
  { id: 2,  src: g2,  alt: 'Beautiful moment', span: 'row-span-1' },
  { id: 3,  src: g3,  alt: 'Her world', span: 'row-span-1' },
  { id: 4,  src: g4,  alt: 'Study vibes', span: 'row-span-2' },
  { id: 5,  src: g5,  alt: 'Artwork', span: 'row-span-1' },
  { id: 6,  src: g6,  alt: 'Paris dreams', span: 'row-span-1' },
  { id: 7,  src: g7,  alt: 'Candid joy', span: 'row-span-1' },
  { id: 8,  src: g8,  alt: 'Engineer mode', span: 'row-span-2' },
  { id: 9,  src: g9,  alt: 'Graduation', span: 'row-span-1' },
  { id: 10, src: g10, alt: 'Together', span: 'row-span-1' },
]

function Lightbox({ images, index, onClose, onPrev, onNext }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ background: 'rgba(0,0,0,0.96)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <button
          className="absolute top-5 right-5 text-white/60 hover:text-white transition-colors z-10 p-2"
          onClick={onClose}
          aria-label="Close lightbox"
        >
          <X size={26} />
        </button>
        <button
          className="absolute left-4 md:left-8 text-white/50 hover:text-white transition-colors z-10 p-2"
          onClick={(e) => { e.stopPropagation(); onPrev() }}
          aria-label="Previous image"
        >
          <ChevronLeft size={34} />
        </button>
        <motion.img
          key={index}
          src={images[index].src}
          alt={images[index].alt}
          className="max-h-[88vh] max-w-[88vw] object-contain"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
        />
        <button
          className="absolute right-4 md:right-8 text-white/50 hover:text-white transition-colors z-10 p-2"
          onClick={(e) => { e.stopPropagation(); onNext() }}
          aria-label="Next image"
        >
          <ChevronRight size={34} />
        </button>
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); }}
              className={`w-1.5 h-1.5 rounded-full transition-all ${i === index ? 'bg-[#D4AF37] scale-125' : 'bg-white/25'}`}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

function GalleryItem({ item, index, onClick }) {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })
  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden cursor-pointer group ${item.span}`}
      style={{ border: '1px solid rgba(212,175,55,0.1)', minHeight: '200px' }}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onClick(index)}
      whileHover={{ zIndex: 10 }}
    >
      <motion.img
        src={item.src}
        alt={item.alt}
        className="w-full h-full object-cover object-top absolute inset-0"
        loading="lazy"
        whileHover={{ scale: 1.07 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-300 flex items-center justify-center">
        <motion.div
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-10 h-10 rounded-full border border-white/50 flex items-center justify-center backdrop-blur-sm"
        >
          <span className="text-white text-xl font-light">+</span>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  const openLightbox = (i) => setLightboxIndex(i)
  const closeLightbox = () => setLightboxIndex(null)
  const prevImage = () => setLightboxIndex((p) => (p - 1 + GALLERY.length) % GALLERY.length)
  const nextImage = () => setLightboxIndex((p) => (p + 1) % GALLERY.length)

  return (
    <section className="relative py-28 px-6" style={{ background: '#f5f3ef' }} aria-label="Photo gallery">
      <div ref={ref} className="text-center mb-16">
        <motion.p
          className="font-montserrat text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-4"
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
        >
          Captured moments
        </motion.p>
        <motion.h2
          className="font-playfair text-4xl md:text-5xl text-[#333333] font-medium"
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}
        >
          A Gallery of Venus
        </motion.h2>
        <motion.div
          className="flex items-center justify-center gap-4 mt-6"
          initial={{ opacity: 0, scaleX: 0 }} animate={inView ? { opacity: 1, scaleX: 1 } : {}} transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <span className="text-[#D4AF37]">✦</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </motion.div>
      </div>

      {/* Masonry grid */}
      <div
        className="max-w-5xl mx-auto grid gap-2 md:gap-3"
        style={{ gridTemplateColumns: 'repeat(3, 1fr)', gridAutoRows: '180px' }}
      >
        {GALLERY.map((item, i) => (
          <GalleryItem key={item.id} item={item} index={i} onClick={openLightbox} />
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox images={GALLERY} index={lightboxIndex} onClose={closeLightbox} onPrev={prevImage} onNext={nextImage} />
      )}
    </section>
  )
}
