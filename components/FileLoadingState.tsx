"use client";

import { Spinner } from "@heroui/spinner";
import { motion } from "framer-motion";

export default function FileLoadingState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col justify-center items-center py-20 px-4"
    >
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <Spinner size="lg" color="default" className="text-neutral-400" />
      </motion.div>
      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="mt-6 text-neutral-600 font-medium"
      >
        Loading your files...
      </motion.p>
    </motion.div>
  );
}