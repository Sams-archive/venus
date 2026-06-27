import { motion } from 'framer-motion'
import { useMemo } from 'react'

const HEARTS = ['❤️', '✨', '💛', '🌸', '⭐']

export default function FloatingHearts() {
  const particles = useMemo(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      symbol: HEARTS[i % HEARTS.length],
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 8,
      duration: 10 + Math.random() * 10,
      size: 10 + Math.random() * 14,
      opacity: 0.15 + Math.random() * 0.2,
    })), [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute select-none"
          style={{ left: p.left, bottom: '-5%', fontSize: p.size, opacity: p.opacity }}
          animate={{ y: [0, -window.innerHeight * 1.1], opacity: [p.opacity, 0] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {p.symbol}
        </motion.span>
      ))}
    </div>
  )
}
