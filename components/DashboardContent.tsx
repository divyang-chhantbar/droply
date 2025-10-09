"use client";

import { useState, useCallback, useEffect } from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Tabs, Tab } from "@heroui/tabs";
import { FileUp, FileText, User } from "lucide-react";
import { motion } from "framer-motion";
import FileUploadForm from "@/components/FileUploadForm";
import FileList from "@/components/FileList";
import UserProfile from "@/components/UserProfile";
import { useSearchParams } from "next/navigation";

interface DashboardContentProps {
  userId: string;
  userName: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function DashboardContent({
  userId,
  userName,
}: DashboardContentProps) {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState<string>("files");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);

  useEffect(() => {
    if (tabParam === "profile") {
      setActiveTab("profile");
    } else {
      setActiveTab("files");
    }
  }, [tabParam]);

  const handleFileUploadSuccess = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  const handleFolderChange = useCallback((folderId: string | null) => {
    setCurrentFolder(folderId);
  }, []);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={itemVariants} className="mb-8">
        <div className="relative">
          <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 tracking-tight">
            Welcome back, {userName?.length > 10
              ? `${userName?.substring(0, 10)}...`
              : userName?.split(" ")[0] || "there"}
          </h2>
          <p className="text-neutral-500 mt-2 text-sm">
            Manage and organize your images
          </p>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Tabs
          aria-label="Dashboard Tabs"
          variant="underlined"
          selectedKey={activeTab}
          onSelectionChange={(key) => setActiveTab(key as string)}
          classNames={{
            tabList: "gap-6 border-b border-neutral-200",
            tab: "py-3 px-1 data-[selected=true]:font-semibold transition-all duration-200 text-sm",
            cursor: "bg-neutral-900 h-0.5",
          }}
        >
          <Tab
            key="files"
            title={
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>My Files</span>
              </div>
            }
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              <motion.div
                className="lg:col-span-1"
              >
                <Card className="border border-neutral-200 bg-white shadow-sm hover:shadow-md transition-all duration-200">
                  <CardHeader className="flex gap-2.5 pb-4 pt-5">
                    <div className="p-1.5 bg-neutral-100 rounded-lg">
                      <FileUp className="h-4 w-4 text-neutral-700" />
                    </div>
                    <h2 className="text-base font-semibold text-neutral-900">
                      Upload
                    </h2>
                  </CardHeader>
                  <CardBody className="pt-0">
                    <FileUploadForm
                      userId={userId}
                      onUploadSuccess={handleFileUploadSuccess}
                      currentFolder={currentFolder}
                    />
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div
                className="lg:col-span-2"
              >
                <Card className="border border-neutral-200 bg-white shadow-sm hover:shadow-md transition-all duration-200">
                  <CardHeader className="flex gap-2.5 pb-4 pt-5">
                    <div className="p-1.5 bg-neutral-100 rounded-lg">
                      <FileText className="h-4 w-4 text-neutral-700" />
                    </div>
                    <h2 className="text-base font-semibold text-neutral-900">
                      Your Files
                    </h2>
                  </CardHeader>
                  <CardBody className="pt-0">
                    <FileList
                      userId={userId}
                      refreshTrigger={refreshTrigger}
                      onFolderChange={handleFolderChange}
                    />
                  </CardBody>
                </Card>
              </motion.div>
            </motion.div>
          </Tab>

          <Tab
            key="profile"
            title={
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </div>
            }
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6"
            >
              <UserProfile />
            </motion.div>
          </Tab>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}
