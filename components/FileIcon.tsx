"use client";

import { Folder, FileText } from "lucide-react";
import { IKImage } from "imagekitio-next";
import { motion } from "framer-motion";
import type { File as FileType } from "@/lib/db/schema";

interface FileIconProps {
  file: FileType;
}

export default function FileIcon({ file }: FileIconProps) {
  if (file.isFolder) {
    return (
      <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: "spring", stiffness: 300 }}>
        <Folder className="h-6 w-6 text-blue-500" />
      </motion.div>
    );
  }

  const fileType = file.type.split("/")[0];
  switch (fileType) {
    case "image":
      return (
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="h-14 w-14 relative overflow-hidden rounded-lg shadow-md"
        >
          <IKImage
            path={file.path}
            transformation={[
              {
                height: 56,
                width: 56,
                focus: "auto",
                quality: 80,
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
          <motion.div whileHover={{ scale: 1.1, rotate: -5 }}>
            <FileText className="h-6 w-6 text-red-500" />
          </motion.div>
        );
      }
      return (
        <motion.div whileHover={{ scale: 1.1, rotate: -5 }}>
          <FileText className="h-6 w-6 text-orange-500" />
        </motion.div>
      );
    default:
      return (
        <motion.div whileHover={{ scale: 1.1 }}>
          <FileText className="h-6 w-6 text-gray-500" />
        </motion.div>
      );
  }
}