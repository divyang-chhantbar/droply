"use client";

import { File } from "lucide-react";
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
      <Card className="border border-dashed border-neutral-200 bg-white">
        <CardBody className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-neutral-100 flex items-center justify-center">
            <File className="h-8 w-8 text-neutral-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-neutral-900">
            {activeTab === "all" && "No files available"}
            {activeTab === "starred" && "No starred files"}
            {activeTab === "trash" && "Trash is empty"}
          </h3>
          <p className="text-neutral-500 text-sm mt-2 max-w-md mx-auto leading-relaxed">
            {activeTab === "all" &&
              "Upload your first file to get started with your personal cloud storage"}
            {activeTab === "starred" &&
              "Mark important files with a star to find them quickly when you need them"}
            {activeTab === "trash" &&
              "Files you delete will appear here for 30 days before being permanently removed"}
          </p>
        </CardBody>
      </Card>
    </motion.div>
  );
}