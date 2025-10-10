"use client";

import { ArrowUpFromLine, Home as HomeIcon, ChevronRight } from "lucide-react";
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
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-wrap items-center gap-2 text-sm overflow-x-auto px-4 py-3 matte-card rounded-xl"
    >
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="bordered"
          size="sm"
          isIconOnly
          onClick={navigateUp}
          isDisabled={folderPath.length === 0}
          className="border-neutral-200 text-neutral-700 hover:bg-neutral-50 smooth-transition disabled:opacity-40"
        >
          <ArrowUpFromLine className="h-3.5 w-3.5" />
        </Button>
      </motion.div>
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          variant="flat"
          size="sm"
          onClick={() => navigateToPathFolder(-1)}
          className={`smooth-transition font-medium ${
            folderPath.length === 0
              ? "bg-neutral-900 text-white"
              : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
          }`}
          startContent={<HomeIcon className="h-3.5 w-3.5" />}
        >
          Home
        </Button>
      </motion.div>
      {folderPath.map((folder, index) => (
        <div key={folder.id} className="flex items-center gap-1">
          <ChevronRight className="text-neutral-400 h-3.5 w-3.5" />
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="flat"
              size="sm"
              onClick={() => navigateToPathFolder(index)}
              className={`smooth-transition font-medium ${
                index === folderPath.length - 1
                  ? "bg-neutral-900 text-white"
                  : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
              } text-ellipsis overflow-hidden max-w-[150px]`}
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