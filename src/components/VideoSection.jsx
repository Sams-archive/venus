import { motion } from "framer-motion";
import birthdayVideo from "../assets/videos/birthdayvideo.mp4";

export default function VideoSection() {
  return (
    <section className="py-24 bg-[#FAF9F6] px-6">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="font-playfair text-4xl md:text-5xl mb-4 text-[#333]"
        >
          One More Surprise...
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: .3 }}
          viewport={{ once: true }}
          className="text-gray-600 mb-10 max-w-2xl mx-auto"
        >
          Some moments deserve more than pictures.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: .95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: .8 }}
          viewport={{ once: true }}
          className="rounded-3xl overflow-hidden shadow-2xl"
        >
          <video
            controls
            playsInline
            preload="metadata"
            className="w-full"
            poster="/images/video-poster.jpg"
          >
            <source src={birthdayVideo} type="video/mp4" />
            Your browser doesn't support video.
          </video>
        </motion.div>
      </div>
    </section>
  );
}