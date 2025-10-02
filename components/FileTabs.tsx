"use client";

import { File, Star, Trash } from "lucide-react";
import { Tabs, Tab } from "@heroui/tabs";
import { motion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import type { File as FileType } from "@/lib/db/schema";

interface FileTabsProps {
  activeTab: string;
  onTabChange: (key: string) => void;
  files: FileType[];
  starredCount: number;
  trashCount: number;
}

export default function FileTabs({
  activeTab,
  onTabChange,
  files,
  starredCount,
  trashCount,
}: FileTabsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Tabs
        selectedKey={activeTab}
        onSelectionChange={(key) => onTabChange(key as string)}
        color="primary"
        variant="underlined"
        classNames={{
          base: "w-full overflow-x-auto",
          tabList: "gap-4 sm:gap-6 md:gap-8 flex-nowrap min-w-full border-b-2 border-default-200/50",
          tab: "py-4 whitespace-nowrap data-[selected=true]:font-bold transition-all duration-300",
          cursor: "bg-gradient-to-r from-blue-600 to-cyan-600 h-1 rounded-full",
        }}
      >
        <Tab
          key="all"
          title={
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3"
            >
              <File className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="font-semibold">All Files</span>
              <Badge
                variant="flat"
                color="default"
                size="sm"
                className="bg-blue-100 text-blue-700"
              >
                {files.filter((file) => !file.isTrash).length}
              </Badge>
            </motion.div>
          }
        />
        <Tab
          key="starred"
          title={
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3"
            >
              <Star className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="font-semibold">Starred</span>
              <Badge
                variant="flat"
                color="warning"
                size="sm"
                className="bg-yellow-100 text-yellow-700"
              >
                {starredCount}
              </Badge>
            </motion.div>
          }
        />
        <Tab
          key="trash"
          title={
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3"
            >
              <Trash className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="font-semibold">Trash</span>
              <Badge
                variant="solid"
                color="danger"
                size="sm"
              >
                {trashCount}
              </Badge>
            </motion.div>
          }
        />
      </Tabs>
    </motion.div>
  );
}