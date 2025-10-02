import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { NextResponse , NextRequest} from "next/server";
import {eq , and} from "drizzle-orm";

export async function PATCH(
    request : NextRequest,
    props : {params : Promise<{fileId : string}>}
) {
    try {
        const {userId} = await auth();

        if(!userId) {
            return NextResponse.json({error : "Unauthorized"}, {status : 401});
        }

        const {fileId} = await props.params;

        if(!fileId) {
            return NextResponse.json({error : "File ID is required"}, {status : 400});
        }

        const [fileObj] = await db
            .select()
            .from(files)
            .where(
                and(
                    eq(files.id , fileId),
                    eq(files.userId , userId)
                )
            );

        if(!fileObj) {
            return NextResponse.json({error : "File not found"}, {status : 404});
        }

        // toggle isTrashed property
        const updatedFiles = await db
            .update(files)
            .set({isTrash : !fileObj.isTrash})
            .where(
                and(
                    eq(files.id , fileId),
                    eq(files.userId , userId)
                )
            )
            .returning();

            const updatedFile = updatedFiles[0].isTrash ? "File moved to trash" : "File restored from trash";

        return NextResponse.json({message : `File ${updatedFile} successfully`}, {status : 200});
    } catch (error) {
        return NextResponse.json({error : "Failed to toggle trash status"}, {status : 500});
    }
}