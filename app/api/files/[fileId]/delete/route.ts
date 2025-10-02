import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { NextRequest , NextResponse } from "next/server";
import {eq , and} from "drizzle-orm";
import ImageKit from "imagekit";

// Initialize ImageKit with your credentials
const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "",
});

export async function DELETE (
    request : NextRequest ,
    props : {params : Promise<{fileId : string}>}
) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { fileId } = await props.params;

        if(!fileId) {
            return NextResponse.json({ message: "File ID is required" }, { status: 400 });
        }

        // Let's find the file in the database
        const [file] = await db
            .select()
            .from(files)
            .where(
                and(
                    eq(files.id , fileId),
                    eq(files.userId , userId)
                )
            )

            if(!file || file.size === 0) {
                return NextResponse.json({ message: "File not found" }, { status: 404 });
            }

            // Delete the file from ImageKit
            if(!file.isFolder) {
                try {
                    let imageKitFileId = null;

                    if(file.fileUrl){
                        const urlWithoutQuery = file.fileUrl.split('?')[0];
                        imageKitFileId = urlWithoutQuery.split('/').pop();
                    }

                    if(!imageKitFileId  && file.path) {
                        imageKitFileId = file.path.split('/').pop();
                    }

                    if(imageKitFileId) {
                        try {
                            const searchResults = await imagekit.listFiles({
                                name: imageKitFileId,
                                limit: 1,
                            });

                            if (searchResults && searchResults.length > 0) {
                                if('fileId' in searchResults[0]){
                                await imagekit.deleteFile(searchResults[0].fileId)
                                }
                            }
                            else{
                                await imagekit.deleteFile(imageKitFileId);
                            }

                        } catch (searchError) {
                            console.error(`Error for searching the file in ImageKit : `, searchError)
                        }
                    }
                } catch (error) {
                    console.error(`Error deleting file ${fileId} from ImageKit:`, error);
                }
            }
            // Delete file from database
            const deleteFileFromDB = await db
            .delete(files)
            .where(
                and(
                    eq(files.id , fileId),
                    eq(files.userId , userId)
                )
            ).returning()

            return NextResponse.json({
                success : true ,
                message : "File has been deleted from the database successfully",
                deleteFileFromDB,
            },{status: 201});

    } catch (error) {
        console.error("Error deleting file:", error);
    return NextResponse.json(
      { error: "Failed to delete file" },
      { status: 500 }
    );
    }
}