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
        variant="underlined"
        classNames={{
          base: "w-full overflow-x-auto",
          tabList: "gap-4 sm:gap-6 flex-nowrap min-w-full border-b border-neutral-200",
          tab: "py-3 px-1 whitespace-nowrap data-[selected=true]:font-semibold transition-all duration-200 text-sm",
          cursor: "bg-neutral-900 h-0.5",
        }}
      >
        <Tab
          key="all"
          title={
            <div className="flex items-center gap-2">
              <File className="h-4 w-4" />
              <span>All Files</span>
              <Badge
                variant="flat"
                size="sm"
                className="bg-neutral-100 text-neutral-700 text-xs"
              >
                {files.filter((file) => !file.isTrash).length}
              </Badge>
            </div>
          }
        />
        <Tab
          key="starred"
          title={
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              <span>Starred</span>
              <Badge
                variant="flat"
                size="sm"
                className="bg-yellow-50 text-yellow-700 text-xs"
              >
                {starredCount}
              </Badge>
            </div>
          }
        />
        <Tab
          key="trash"
          title={
            <div className="flex items-center gap-2">
              <Trash className="h-4 w-4" />
              <span>Trash</span>
              <Badge
                variant="flat"
                size="sm"
                className="bg-red-50 text-red-700 text-xs"
              >
                {trashCount}
              </Badge>
            </div>
          }
        />
      </Tabs>
    </motion.div>
  );
}