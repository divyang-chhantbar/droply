"use client";

import { RefreshCw, Trash } from "lucide-react";
import { Button } from "@heroui/button";
import { motion } from "framer-motion";

interface FileActionButtonsProps {
  activeTab: string;
  trashCount: number;
  folderPath: Array<{ id: string; name: string }>;
  onRefresh: () => void;
  onEmptyTrash: () => void;
}

export default function FileActionButtons({
  activeTab,
  trashCount,
  folderPath,
  onRefresh,
  onEmptyTrash,
}: FileActionButtonsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-100"
    >
      <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
        {activeTab === "all" &&
          (folderPath.length > 0
            ? folderPath[folderPath.length - 1].name
            : "All Files")}
        {activeTab === "starred" && "Starred Files"}
        {activeTab === "trash" && "Trash"}
      </h2>
      <div className="flex gap-3 self-end sm:self-auto">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="flat"
            size="md"
            onClick={onRefresh}
            startContent={<RefreshCw className="h-4 w-4" />}
            className="bg-white/80 hover:bg-white shadow-sm"
          >
            Refresh
          </Button>
        </motion.div>
        {activeTab === "trash" && trashCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              color="danger"
              variant="flat"
              size="md"
              onClick={onEmptyTrash}
              startContent={<Trash className="h-4 w-4" />}
              className="shadow-sm"
            >
              Empty Trash
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
