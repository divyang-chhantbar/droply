"use client";

import { Star, Trash, X, ArrowUpFromLine, Download } from "lucide-react";
import { Button } from "@heroui/button";
import { motion } from "framer-motion";
import type { File as FileType } from "@/lib/db/schema";

interface FileActionsProps {
  file: FileType;
  onStar: (id: string) => void;
  onTrash: (id: string) => void;
  onDelete: (file: FileType) => void;
  onDownload: (file: FileType) => void;
}

export default function FileActions({
  file,
  onStar,
  onTrash,
  onDelete,
  onDownload,
}: FileActionsProps) {
  return (
    <div className="flex flex-wrap gap-1.5 justify-end">
      {!file.isTrash && !file.isFolder && (
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="flat"
            size="sm"
            onClick={() => onDownload(file)}
            className="min-w-0 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 smooth-transition font-medium"
            startContent={<Download className="h-3.5 w-3.5" />}
          >
            <span className="hidden sm:inline">Download</span>
          </Button>
        </motion.div>
      )}

      {!file.isTrash && (
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="flat"
            size="sm"
            onClick={() => onStar(file.id)}
            className="min-w-0 px-3 bg-amber-50 hover:bg-amber-100 text-amber-700 smooth-transition font-medium"
            startContent={
              <Star
                className="h-3.5 w-3.5"
                fill={file.isStarred ? "currentColor" : "none"}
              />
            }
          >
            <span className="hidden sm:inline">
              {file.isStarred ? "Unstar" : "Star"}
            </span>
          </Button>
        </motion.div>
      )}

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="flat"
          size="sm"
          onClick={() => onTrash(file.id)}
          className={`min-w-0 px-3 smooth-transition font-medium ${
            file.isTrash
              ? "bg-blue-50 hover:bg-blue-100 text-blue-700"
              : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
          }`}
          startContent={
            file.isTrash ? (
              <ArrowUpFromLine className="h-3.5 w-3.5" />
            ) : (
              <Trash className="h-3.5 w-3.5" />
            )
          }
        >
          <span className="hidden sm:inline">
            {file.isTrash ? "Restore" : "Delete"}
          </span>
        </Button>
      </motion.div>

      {file.isTrash && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="flat"
            size="sm"
            color="danger"
            onClick={() => onDelete(file)}
            className="min-w-0 px-3 font-medium"
            startContent={<X className="h-3.5 w-3.5" />}
          >
            <span className="hidden sm:inline">Remove</span>
          </Button>
        </motion.div>
      )}
    </div>
  );
}
