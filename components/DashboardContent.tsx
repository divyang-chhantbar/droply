"use client";

import { useState, useCallback, useEffect } from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Tabs, Tab } from "@heroui/tabs";
import { FileUp, FileText, User, Sparkles } from "lucide-react";
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
      <motion.div variants={itemVariants} className="mb-10">
        <div className="relative">
          <h2 className="text-5xl font-extrabold text-default-900 flex items-center gap-3">
            <span>Hi,</span>
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              {userName?.length > 10
                ? `${userName?.substring(0, 10)}...`
                : userName?.split(" ")[0] || "there"}
            </span>
            <Sparkles className="h-8 w-8 text-cyan-500 animate-pulse" />
          </h2>
          <p className="text-default-600 mt-3 text-lg font-medium">
            Your images are waiting for you.
          </p>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Tabs
          aria-label="Dashboard Tabs"
          color="primary"
          variant="underlined"
          selectedKey={activeTab}
          onSelectionChange={(key) => setActiveTab(key as string)}
          classNames={{
            tabList: "gap-8 border-b-2 border-default-200/50",
            tab: "py-4 data-[selected=true]:font-bold transition-all duration-300",
            cursor: "bg-gradient-to-r from-blue-600 to-cyan-600 h-1 rounded-full",
          }}
        >
          <Tab
            key="files"
            title={
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 transition-transform duration-200 hover:scale-110" />
                <span className="font-semibold">My Files</span>
              </div>
            }
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              <motion.div
                className="lg:col-span-1"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="border-2 border-default-200 bg-gradient-to-br from-default-50 to-default-100 shadow-lg hover:shadow-2xl transition-all duration-300">
                  <CardHeader className="flex gap-3 pb-3">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                      <FileUp className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                      Upload
                    </h2>
                  </CardHeader>
                  <CardBody>
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
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="border-2 border-default-200 bg-gradient-to-br from-default-50 to-default-100 shadow-lg hover:shadow-2xl transition-all duration-300">
                  <CardHeader className="flex gap-3 pb-3">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                      <FileText className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                      Your Files
                    </h2>
                  </CardHeader>
                  <CardBody>
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
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 transition-transform duration-200 hover:scale-110" />
                <span className="font-semibold">Profile</span>
              </div>
            }
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-10"
            >
              <UserProfile />
            </motion.div>
          </Tab>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}
