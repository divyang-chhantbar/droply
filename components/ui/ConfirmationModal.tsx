import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { LucideIcon, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

interface ConfirmationModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  title: string;
  description: string;
  icon?: LucideIcon;
  iconColor?: string;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: "primary" | "danger" | "warning" | "success" | "default";
  onConfirm: () => void;
  isDangerous?: boolean;
  warningMessage?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onOpenChange,
  title,
  description,
  icon: Icon,
  iconColor = "text-red-600",
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "danger",
  onConfirm,
  isDangerous = false,
  warningMessage,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      backdrop="blur"
      classNames={{
        base: "matte-card rounded-2xl",
        header: "border-b border-neutral-200 px-6 py-4",
        body: "px-6 py-5",
        footer: "border-t border-neutral-200 px-6 py-4",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex gap-3 items-center">
              {Icon && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-red-50"
                >
                  <Icon className={`h-5 w-5 ${iconColor}`} />
                </motion.div>
              )}
              <span className="font-semibold text-lg tracking-tight text-neutral-900">
                {title}
              </span>
            </ModalHeader>
            <ModalBody>
              {isDangerous && warningMessage && (
                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-4"
                >
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0 text-red-600" />
                    <div className="flex-1">
                      <p className="font-semibold text-sm">
                        This action cannot be undone
                      </p>
                      <p className="text-sm mt-1 text-red-600">
                        {warningMessage}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
              <p className="text-neutral-600 leading-relaxed">{description}</p>
            </ModalBody>
            <ModalFooter className="gap-2">
              <Button
                variant="bordered"
                onClick={() => onOpenChange(false)}
                className="border-neutral-200 text-neutral-700 hover:bg-neutral-50 smooth-transition font-medium"
              >
                {cancelText}
              </Button>
              <Button
                color={confirmColor}
                onClick={() => {
                  onConfirm();
                  onOpenChange(false);
                }}
                startContent={Icon && <Icon className="h-4 w-4" />}
                className="font-medium"
              >
                {confirmText}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;