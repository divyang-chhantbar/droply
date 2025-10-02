"use client";

import { File, Sparkles } from "lucide-react";
import { Card, CardBody } from "@heroui/card";
import { motion } from "framer-motion";

interface FileEmptyStateProps {
  activeTab: string;
}

export default function FileEmptyState({ activeTab }: FileEmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="border-2 border-dashed border-default-300 bg-gradient-to-br from-default-50 to-default-100">
        <CardBody className="text-center py-20">
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <File className="h-20 w-20 mx-auto text-primary/40 mb-6" />
          </motion.div>
          <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            {activeTab === "all" && "No files available"}
            {activeTab === "starred" && "No starred files"}
            {activeTab === "trash" && "Trash is empty"}
          </h3>
          <p className="text-default-600 mt-3 max-w-md mx-auto leading-relaxed">
            {activeTab === "all" &&
              "Upload your first file to get started with your personal cloud storage"}
            {activeTab === "starred" &&
              "Mark important files with a star to find them quickly when you need them"}
            {activeTab === "trash" &&
              "Files you delete will appear here for 30 days before being permanently removed"}
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6"
          >
            <Sparkles className="h-6 w-6 mx-auto text-cyan-500" />
          </motion.div>
        </CardBody>
      </Card>
    </motion.div>
  );
}