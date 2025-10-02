"use client";

import { Spinner } from "@heroui/spinner";
import { motion } from "framer-motion";

export default function FileLoadingState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col justify-center items-center py-24"
    >
      <Spinner size="lg" color="primary" />
      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-6 text-default-600 font-medium text-lg"
      >
        Loading your files...
      </motion.p>
    </motion.div>
  );
}