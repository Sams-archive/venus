import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import heroImg from '../assets/images/hero.jpg'

// ── Utilities ────────────────────────────────────────────────────────────────
const rand = (min, max) => Math.random() * (max - min) + min
const randInt = (min, max) => Math.floor(rand(min, max))

// ── Confetti piece ────────────────────────────────────────────────────────────
function ConfettiPiece({ x, delay }) {
  const colors = [
    '#D4AF37', '#F0D060', '#FFD700', '#FFEAA0',
    '#FFFFFF', '#FFF8DC',
    '#FFB6C1', '#FFC0CB', '#FFAABB',
  ]
  const color  = colors[randInt(0, colors.length)]
  const size   = rand(6, 14)
  const rotate = rand(0, 360)
  const isRect = Math.random() > 0.4

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left:            `${x}%`,
        top:             '42%',
        width:           isRect ? size : size * 0.6,
        height:          isRect ? size * 0.4 : size * 0.6,
        borderRadius:    isRect ? '1px' : '50%',
        backgroundColor: color,
        rotate,
      }}
      initial={{ opacity: 1, y: 0, x: 0, rotate }}
      animate={{
        opacity:  [1, 1, 0],
        y:        [0, rand(-220, -80), rand(80, 300)],
        x:        [0, rand(-160, 160)],
        rotate:   rotate + rand(180, 540),
        scale:    [1, rand(0.8, 1.4), 0.2],
      }}
      transition={{
        duration: rand(1.4, 2.2),
        delay,
        ease:     'easeOut',
      }}
    />
  )
}

// ── Floating particle ─────────────────────────────────────────────────────────
function Particle({ style: s }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left:            `${s.x}%`,
        top:             `${s.startY}%`,
        width:           s.size,
        height:          s.size,
        backgroundColor: s.color,
        opacity:         0,
        filter:          'blur(0.5px)',
      }}
      animate={{
        y:       [0, -s.travel],
        opacity: [0, s.opacity, s.opacity * 0.6, 0],
        x:       [0, s.drift],
        scale:   [0.8, 1.2, 0.8],
      }}
      transition={{
        duration: s.duration,
        delay:    s.delay,
        repeat:   Infinity,
        ease:     'easeInOut',
      }}
    />
  )
}

// ── Sparkle ───────────────────────────────────────────────────────────────────
function Sparkle({ s }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${s.x}%`, top: `${s.y}%` }}
      animate={{
        opacity: [0, 1, 0],
        scale:   [0, 1.4, 0],
        rotate:  [0, 90, 180],
      }}
      transition={{
        duration: s.duration,
        delay:    s.delay,
        repeat:   Infinity,
        ease:     'easeInOut',
      }}
    >
      <svg
        width={s.size}
        height={s.size}
        viewBox="0 0 24 24"
        fill={s.color}
      >
        <path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z" />
      </svg>
    </motion.div>
  )
}

// ── Heart ─────────────────────────────────────────────────────────────────────
function Heart({ h }) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{
        left:     `${h.x}%`,
        top:      `${h.startY}%`,
        fontSize: h.size,
        opacity:  0,
        color:    h.color,
      }}
      animate={{
        y:       [0, -h.travel],
        opacity: [0, 0.7, 0],
        x:       [0, h.drift],
        rotate:  [0, h.spin],
      }}
      transition={{
        duration: h.duration,
        delay:    h.delay,
        repeat:   Infinity,
        ease:     'easeInOut',
      }}
    >
      ♥
    </motion.div>
  )
}

// ── Gold shimmer overlay for Venus name ───────────────────────────────────────
function ShimmerText({ children, className, style, show }) {
  return (
    <div className="relative inline-block">
      <span className={className} style={style}>{children}</span>
      {show && (
        <motion.span
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(105deg, transparent 30%, rgba(255,230,80,0.75) 50%, transparent 70%)',
            backgroundSize: '200% 100%',
          }}
          animate={{ backgroundPosition: ['-200% 0', '300% 0'] }}
          transition={{
            duration: 1.4,
            delay:    3.2,
            repeat:   Infinity,
            repeatDelay: 5,
            ease: 'easeInOut',
          }}
        />
      )}
    </div>
  )
}

// ── Main Hero ─────────────────────────────────────────────────────────────────
export default function Hero() {
  const [phase, setPhase]           = useState('black')
  const [showConfetti, setShowConfetti] = useState(false)
  const [confettiPieces, setConfettiPieces] = useState([])
  const [particles]  = useState(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id:      i,
      x:       rand(0, 100),
      startY:  rand(10, 90),
      size:    rand(2, 5),
      opacity: rand(0.3, 0.8),
      travel:  rand(80, 240),
      drift:   rand(-40, 40),
      duration:rand(4, 10),
      delay:   rand(0, 8),
      color:   ['#D4AF37','#F0D060','#FFD700','#FFFFFF','#FFF8DC','#FFEAA0'][randInt(0,6)],
    }))
  )
  const [sparkles] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id:       i,
      x:        rand(5, 95),
      y:        rand(5, 85),
      size:     rand(8, 20),
      color:    ['#D4AF37','#FFD700','#FFFFFF','#FFF8DC'][randInt(0,4)],
      duration: rand(2, 5),
      delay:    rand(0, 7),
    }))
  )
  const [hearts] = useState(() =>
    Array.from({ length: 10 }, (_, i) => ({
      id:      i,
      x:       rand(5, 90),
      startY:  rand(40, 90),
      size:    rand(14, 28),
      travel:  rand(120, 300),
      drift:   rand(-50, 50),
      spin:    rand(-30, 30),
      duration:rand(6, 14),
      delay:   rand(0, 10),
      color:   ['#FFB6C1','#FF9AAF','#FFD700','#FFF0A0'][randInt(0,4)],
    }))
  )

  // ── Cinematic intro sequence ─────────────────────────────────────────────
  useEffect(() => {
    // Phase 1: black → sparkle appears (0ms)
    const t1 = setTimeout(() => setPhase('sparkle'),  300)
    // Phase 2: light expands  (800ms)
    const t2 = setTimeout(() => setPhase('light'),    800)
    // Phase 3: hero image fades in  (1400ms)
    const t3 = setTimeout(() => setPhase('image'),   1400)
    // Phase 4: content starts revealing (2600ms)
    const t4 = setTimeout(() => setPhase('content'), 2600)
    // Phase 5: confetti burst after name appears (3800ms)
    const t5 = setTimeout(() => {
      setShowConfetti(true)
      setConfettiPieces(
        Array.from({ length: 80 }, (_, i) => ({
          id:    i,
          x:     rand(28, 72),
          delay: rand(0, 0.4),
        }))
      )
    }, 3800)
    // Phase 6: remove confetti (6000ms)
    const t6 = setTimeout(() => {
      setShowConfetti(false)
      setConfettiPieces([])
    }, 6000)

    return () => [t1,t2,t3,t4,t5,t6].forEach(clearTimeout)
  }, [])

  const scrollToTraits = () => {
    document.getElementById('traits')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* ── Black curtain ── */}
      <motion.div
        className="absolute inset-0 z-50 bg-black pointer-events-none"
        animate={{ opacity: phase === 'black' || phase === 'sparkle' ? 1 : 0 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      />

      {/* ── Single intro sparkle ── */}
      <AnimatePresence>
        {phase === 'sparkle' && (
          <motion.div
            key="intro-sparkle"
            className="absolute z-[60] pointer-events-none"
            style={{ left: '50%', top: '50%', translateX: '-50%', translateY: '-50%' }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0, 1, 2.5, 8] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="#D4AF37">
              <path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Gold light expansion ── */}
      <motion.div
        className="absolute inset-0 z-40 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(212,175,55,0.35) 0%, transparent 70%)',
        }}
        initial={{ opacity: 0, scale: 0.2 }}
        animate={{
          opacity: phase === 'light' || phase === 'image' ? 1 : 0,
          scale:   phase === 'light' || phase === 'image' ? 1 : 0.2,
        }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />

      {/* ── Background image — cinematic zoom ── */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{
          opacity: phase === 'image' || phase === 'content' ? 1 : 0,
          scale:   phase === 'image' || phase === 'content' ? 1.0 : 1.2,
        }}
        transition={{ duration: 2.2, ease: 'easeOut' }}
      >
        <img
          src={heroImg}
          alt="Birthday hero"
          className="w-full h-full object-cover object-top"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.55) 100%)',
          }}
        />
        {/* Persistent gold center glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 40% at center, rgba(212,175,55,0.08) 0%, transparent 70%)',
          }}
        />
      </motion.div>

      {/* ── Floating particles (always present after content phase) ── */}
      {phase === 'content' && particles.map(p => (
        <Particle key={p.id} style={p} />
      ))}

      {/* ── Sparkles ── */}
      {phase === 'content' && sparkles.map(s => (
        <Sparkle key={s.id} s={s} />
      ))}

      {/* ── Hearts ── */}
      {phase === 'content' && hearts.map(h => (
        <Heart key={h.id} h={h} />
      ))}

      {/* ── Confetti burst ── */}
      {showConfetti && confettiPieces.map(p => (
        <ConfettiPiece key={p.id} x={p.x} delay={p.delay} />
      ))}

      {/* ── Main content ── */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">

        {/* Happy Birthday label */}
        <motion.p
          className="font-montserrat text-xs md:text-sm tracking-[0.35em] uppercase text-white/70 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={
            phase === 'content'
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Happy 24th Birthday
        </motion.p>

        {/* Decorative line — draws from center */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-6"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={
            phase === 'content'
              ? { opacity: 1, scaleX: 1 }
              : { opacity: 0, scaleX: 0 }
          }
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <motion.span
            className="text-[#D4AF37] text-lg"
            animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.3, 1] }}
            transition={{ duration: 3, repeat: Infinity, delay: 2 }}
          >
            ✦
          </motion.span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </motion.div>

        {/* ── VENUS — star of the show ── */}
        <motion.div
          className="relative inline-block mb-6"
          initial={{ opacity: 0, scale: 0.6, rotate: -2, filter: 'blur(12px)' }}
          animate={
            phase === 'content'
              ? { opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px)' }
              : { opacity: 0, scale: 0.6, rotate: -2, filter: 'blur(12px)' }
          }
          transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Glow pulse behind name */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              filter: 'blur(30px)',
              background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.5) 0%, transparent 70%)',
            }}
            animate={{ opacity: [0.4, 0.9, 0.4], scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />

          <ShimmerText
            show={phase === 'content'}
            className="font-parisienne text-6xl md:text-8xl lg:text-9xl text-white leading-none block"
            style={{ textShadow: '0 2px 60px rgba(212,175,55,0.6), 0 0 120px rgba(212,175,55,0.3)' }}
          >
            Mi Diosa
          </ShimmerText>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="font-playfair italic text-base md:text-lg text-white/80 mb-12 max-w-xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={
            phase === 'content'
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 30 }
          }
          transition={{ duration: 0.9, delay: 1.2 }}
        >
          Celebrating the most incredible woman <br/> today and always.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={
            phase === 'content'
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <motion.button
            onClick={scrollToTraits}
            className="group relative font-montserrat text-sm tracking-widest uppercase px-10 py-4 text-[#1a1a1a] font-semibold overflow-hidden rounded-none cursor-pointer"
            style={{
              background:
                'linear-gradient(135deg, #D4AF37 0%, #F0D060 50%, #D4AF37 100%)',
              boxShadow: '0 0 40px rgba(212,175,55,0.4)',
            }}
            whileHover={{
              scale:     1.04,
              boxShadow: '0 0 70px rgba(212,175,55,0.7)',
              y:         -3,
            }}
            whileTap={{ scale: 0.97 }}
            aria-label="Scroll down for a surprise"
          >
            {/* Repeating gold shine */}
            <motion.span
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%)',
                backgroundSize: '200% 100%',
              }}
              animate={{ backgroundPosition: ['-200% 0', '300% 0'] }}
              transition={{
                duration:    1.2,
                delay:       2,
                repeat:      Infinity,
                repeatDelay: 3,
                ease:        'easeInOut',
              }}
            />
            <span className="relative z-10">Scroll for a Surprise ↓</span>
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
  className="absolute bottom-10 left-1/2 -translate-x-1/2"
  initial={{ opacity: 0 }}
  animate={
    phase === "content"
      ? {
          opacity: 1,
          y: [0, 10, 0],
        }
      : {
          opacity: 0,
        }
  }
  transition={{
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  }}
>
          <div className="w-5 h-8 border border-white/30 rounded-full mx-auto flex items-start justify-center pt-1">
            <motion.div
              className="w-1 h-2 bg-white/50 rounded-full"
              animate={{ y: [0, 6, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}