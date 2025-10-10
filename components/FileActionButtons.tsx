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
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 sm:p-5 matte-card rounded-xl"
    >
      <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 tracking-tight">
        {activeTab === "all" &&
          (folderPath.length > 0
            ? folderPath[folderPath.length - 1].name
            : "All Files")}
        {activeTab === "starred" && "Starred Files"}
        {activeTab === "trash" && "Trash"}
      </h2>
      <div className="flex gap-2 self-end sm:self-auto">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="bordered"
            size="md"
            onClick={onRefresh}
            startContent={<RefreshCw className="h-4 w-4" />}
            className="border-neutral-200 text-neutral-700 hover:bg-neutral-50 smooth-transition font-medium"
          >
            Refresh
          </Button>
        </motion.div>
        {activeTab === "trash" && trashCount > 0 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              color="danger"
              variant="flat"
              size="md"
              onClick={onEmptyTrash}
              startContent={<Trash className="h-4 w-4" />}
              className="font-medium"
            >
              Empty Trash
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
