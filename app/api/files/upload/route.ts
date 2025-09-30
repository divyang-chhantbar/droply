import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and ,eq } from "drizzle-orm";
import ImageKit from "imagekit";
import { v4 as uuidv4 } from "uuid";
import { NextResponse, NextRequest } from "next/server";

const imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY! || "",
    privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY! || "",
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT! || "",
});

export async function POST(request: NextRequest) {
    try {
        const {userId} = await auth();

        if(!userId) {
            return NextResponse.json({error : "Unauthorized"}, {status : 401});
        }

        // lets parse the formData
        const formData = await request.formData();
        const file = formData.get("file") as File;
        const formUserId = formData.get("userId") as string;
        const parentId = formData.get("parentId") as string | null;

        if(!formUserId || userId !== formUserId) {
            return NextResponse.json({error : "Unauthorized"}, {status : 401});
        }

        if(!file || file.size === 0) {
            return NextResponse.json({error : "File is required"}, {status : 400});
        }

        if(parentId) {
            const [parentFolder] = await db
                .select()
                .from(files)
                .where(
                    and(
                        eq(files.id , parentId),
                        eq(files.userId , userId),
                        eq(files.isFolder , true)
                    )
                )
        }
        else {
            return NextResponse.json({error : "Parent folder not found"}, {status : 404});
        }
        if(!file.type.startsWith("image/") && file.type !== "application/pdf") {
            return NextResponse.json({error : "Only images and PDF files are allowed"}, {status : 400});
        }

        // lets convert file into buffer

        const buffer = await file.arrayBuffer();
        const fileBuffer = Buffer.from(buffer);
        const folderPath = parentId ? `droply/${userId}/folder/${parentId}` : `droply/${userId}/`;

        const originalFileName = file.name;
        const fileExtension = originalFileName.split('.').pop() || '';

        // check for the empty file extension
        if(!fileExtension) {
            return NextResponse.json({error : "File extension is required"}, {status : 400});
        }

        // validation for not storing .exe or .php files
        if(['exe', 'php', 'js', 'sh', 'bat', 'cmd', 'com', 'cpl', 'msc', 'jar'].includes(fileExtension.toLowerCase())) {
            return NextResponse.json({error : "File type not allowed"}, {status : 400});
        }

        const uniqueFileName = `${uuidv4()}.${fileExtension}`;

        const uploadResult = await imagekit.upload({
            file : fileBuffer,
            fileName : uniqueFileName,
            folder : folderPath,
            useUniqueFileName : false,
        });
        if(!uploadResult) {
            return NextResponse.json({error : "File upload failed"}, {status : 500});
        }
        const fileData = {
            id : uuidv4(),
            name : originalFileName,
            path : uploadResult.filePath,
            size : file.size,
            type : file.type,
            fileUrl : uploadResult.url,
            thumbnailUrl : uploadResult.thumbnailUrl || null,
            userId,
            parentId,
            isFolder : false,
            isStarred : false,
            isTrash : false
        }
        const [newFile] = await db.insert(files).values(fileData).returning();
        return NextResponse.json({
            message : "File uploaded successfully",
            file : newFile
        }, {status : 201}); 
    } catch (error) {
        return NextResponse.json({error : "Failed to upload file"}, {status : 500});
    }
}