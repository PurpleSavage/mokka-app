import { motion } from "framer-motion";

export function WaveLayer({
  d,
  color,
  duration,
  delay,
}: {
  d: string;
  color: string;
  duration: number;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute inset-0 w-[200%] h-full"
      animate={{
        x: ["0%", "-50%"],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
        delay,
      }}
    >
      <svg
        viewBox="0 0 960 160"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <path d={d} fill={color} />
        <path
          d={d}
          fill="none"
          stroke="url(#wave-gradient)"
          strokeWidth="0.5"
          opacity="0.5"
        />
        <defs>
          <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#f6339a" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}
