"use client";

import { Folder, FileText, File } from "lucide-react";
import { IKImage } from "imagekitio-next";
import { motion } from "framer-motion";
import type { File as FileType } from "@/lib/db/schema";

interface FileIconProps {
  file: FileType;
}

export default function FileIcon({ file }: FileIconProps) {
  if (file.isFolder) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center justify-center w-10 h-10 rounded-lg bg-neutral-100"
      >
        <Folder className="h-5 w-5 text-neutral-600" />
      </motion.div>
    );
  }

  const fileType = file.type.split("/")[0];
  switch (fileType) {
    case "image":
      return (
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="h-12 w-12 relative overflow-hidden rounded-lg ring-1 ring-neutral-200"
        >
          <IKImage
            path={file.path}
            transformation={[
              {
                height: 48,
                width: 48,
                focus: "auto",
                quality: 85,
                dpr: 2,
              },
            ]}
            loading="lazy"
            lqip={{ active: true }}
            alt={file.name}
            style={{ objectFit: "cover", height: "100%", width: "100%" }}
          />
        </motion.div>
      );
    case "application":
      if (file.type.includes("pdf")) {
        return (
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-50"
          >
            <FileText className="h-5 w-5 text-red-600" />
          </motion.div>
        );
      }
      return (
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center w-10 h-10 rounded-lg bg-orange-50"
        >
          <File className="h-5 w-5 text-orange-600" />
        </motion.div>
      );
    default:
      return (
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center w-10 h-10 rounded-lg bg-neutral-100"
        >
          <FileText className="h-5 w-5 text-neutral-600" />
        </motion.div>
      );
  }
}