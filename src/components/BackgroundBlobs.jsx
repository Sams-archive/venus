import { motion } from 'framer-motion'

export default function BackgroundBlobs() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 600,
          height: 600,
          top: '-10%',
          right: '-15%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{ scale: [1, 1.15, 1], x: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 500,
          height: 500,
          bottom: '20%',
          left: '-10%',
          background: 'radial-gradient(circle, rgba(158,118,118,0.07) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
        animate={{ scale: [1, 1.2, 1], y: [0, -40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 400,
          height: 400,
          top: '50%',
          left: '40%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
        animate={{ scale: [1, 1.1, 1], x: [0, -20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
      />
    </div>
  )
}
