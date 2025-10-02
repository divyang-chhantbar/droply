"use client";

import { ArrowUpFromLine, Home, ChevronRight } from "lucide-react";
import { Button } from "@heroui/button";
import { motion } from "framer-motion";

interface FolderNavigationProps {
  folderPath: Array<{ id: string; name: string }>;
  navigateUp: () => void;
  navigateToPathFolder: (index: number) => void;
}

export default function FolderNavigation({
  folderPath,
  navigateUp,
  navigateToPathFolder,
}: FolderNavigationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-wrap items-center gap-2 text-sm overflow-x-auto pb-3 px-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-100"
    >
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button
          variant="flat"
          size="sm"
          isIconOnly
          onClick={navigateUp}
          isDisabled={folderPath.length === 0}
          className="bg-white/80 hover:bg-white shadow-sm"
        >
          <ArrowUpFromLine className="h-4 w-4" />
        </Button>
      </motion.div>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="flat"
          size="sm"
          onClick={() => navigateToPathFolder(-1)}
          className={`bg-white/80 hover:bg-white shadow-sm ${folderPath.length === 0 ? "font-bold text-blue-600" : ""}`}
          startContent={<Home className="h-4 w-4" />}
        >
          Home
        </Button>
      </motion.div>
      {folderPath.map((folder, index) => (
        <div key={folder.id} className="flex items-center">
          <ChevronRight className="mx-1 text-default-400 h-4 w-4" />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="flat"
              size="sm"
              onClick={() => navigateToPathFolder(index)}
              className={`${
                index === folderPath.length - 1
                  ? "font-bold text-blue-600 bg-white"
                  : "bg-white/80 hover:bg-white"
              } text-ellipsis overflow-hidden max-w-[150px] shadow-sm`}
              title={folder.name}
            >
              {folder.name}
            </Button>
          </motion.div>
        </div>
      ))}
    </motion.div>
  );
}