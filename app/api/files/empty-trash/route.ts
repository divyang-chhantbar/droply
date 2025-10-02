import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import ImageKit from "imagekit";

// Initialize ImageKit with your credentials
const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "",
});

export async function DELETE() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const trashedFiles = await db
      .select()
      .from(files)
      .where(and(eq(files.userId, userId), eq(files.isTrash, true)));

    if (!trashedFiles) {
      return NextResponse.json(
        { message: "No files in trash" },
        { status: 200 }
      );
    }

    // Let's delete files from ImageKit
    const deleteFiles = trashedFiles
      .filter((file) => !file.isFolder)
      .map(async (file) => {
        try {
          let imageKitFileId = null;

          if (file.fileUrl) {
            const filewithoutQuery = file.fileUrl.split("?")[0];
            imageKitFileId = filewithoutQuery.split("/").pop();
          }

          if (imageKitFileId && !file.path) {
            try {
              const searchResults = await imagekit.listFiles({
                name: imageKitFileId,
                limit: 1,
              });

              if (searchResults && searchResults.length > 0) {
                if ("fileId" in searchResults[0]) {
                  await imagekit.deleteFile(searchResults[0].fileId);
                }
              } else {
                await imagekit.deleteFile(imageKitFileId);
              }
            } catch (searchError) {
              console.error(
                `Error searching for file in ImageKit:`,
                searchError
              );
              await imagekit.deleteFile(imageKitFileId);
            }
          }
        } catch (error) {
          console.error(`Error deleting file ${file.id} from ImageKit:`, error);
        }
      });

    // Wait for all ImageKit deletions to complete (or fail)
    await Promise.allSettled(deleteFiles);

    // let's delete it from the db
    const deleteFilesFromDb = await db
      .delete(files)
      .where(and(eq(files.userId, userId), eq(files.isTrash, true)))
      .returning(); // Return the deleted files

    return NextResponse.json({
      success: true,
      message: `Successfully deleted ${deleteFilesFromDb.length} files from trash`,
    });
  } catch (error) {
    console.error("Error deleting files:", error);
    return NextResponse.json(
      { message: "Error deleting files" },
      { status: 500 }
    );
  }
}
