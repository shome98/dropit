import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import ImageKit from "imagekit";


const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "",
});

export async function DELETE() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized 👮" }, { status: 401 });
    }

    const trashedFiles = await db
      .select()
      .from(files)
      .where(and(eq(files.userId, userId), eq(files.isTrash, true)));

    if (trashedFiles.length === 0) {
      return NextResponse.json(
        { message: "No files in trash 🧺" },
        { status: 200 }
      );
    }

    const deletePromises = trashedFiles
      .filter((file) => !file.isFolder && file.fileId) 
      .map(async (file) => {
        try {
          await imagekit.deleteFile(file.fileId as string);
        } catch (error) {
          console.error(`😖 Error deleting file ${file.id} from ImageKit:`, error);
        }
      });

   
    await Promise.allSettled(deletePromises);

    const deletedFiles = await db
      .delete(files)
      .where(and(eq(files.userId, userId), eq(files.isTrash, true)))
      .returning();

    return NextResponse.json({
      success: true,
      message: `😊 Successfully deleted ${deletedFiles.length} files from trash ✅🗑️`,
    }, { status: 200 });
  } catch (error) {
    console.error("😖 Error emptying trash:", error);
    return NextResponse.json(
      { error: "😖 Failed to empty trash 😞" },
      { status: 500 }
    );
  }
}