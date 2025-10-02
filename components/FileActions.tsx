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
    <div className="flex flex-wrap gap-2 justify-end">
      {!file.isTrash && !file.isFolder && (
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            variant="flat"
            size="sm"
            onClick={() => onDownload(file)}
            className="min-w-0 px-3 bg-green-50 hover:bg-green-100 text-green-700"
            startContent={<Download className="h-4 w-4" />}
          >
            <span className="hidden sm:inline">Download</span>
          </Button>
        </motion.div>
      )}

      {!file.isTrash && (
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            variant="flat"
            size="sm"
            onClick={() => onStar(file.id)}
            className="min-w-0 px-3"
            startContent={
              <Star
                className="h-4 w-4"
              />
            }
          >
            <span className="hidden sm:inline">
              Star
            </span>
          </Button>
        </motion.div>
      )}

      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button
          variant="flat"
          size="sm"
          onClick={() => onTrash(file.id)}
          className="min-w-0 px-3"
          color={file.isTrash ? "success" : "default"}
          startContent={
            file.isTrash ? (
              <ArrowUpFromLine className="h-4 w-4" />
            ) : (
              <Trash className="h-4 w-4" />
            )
          }
        >
          <span className="hidden sm:inline">
            Delete
          </span>
        </Button>
      </motion.div>

      {file.isTrash && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            variant="flat"
            size="sm"
            color="danger"
            onClick={() => onDelete(file)}
            className="min-w-0 px-3"
            startContent={<X className="h-4 w-4" />}
          >
            <span className="hidden sm:inline">Remove</span>
          </Button>
        </motion.div>
      )}
    </div>
  );
}
