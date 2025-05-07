import { NextRequest, NextResponse } from "next/server";
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

export async function DELETE(
  request: NextRequest,
  props: { params: Promise<{ fileId: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized 👮" }, { status: 401 });
    }

    const { fileId } = await props.params;

    if (!fileId) {
      return NextResponse.json(
        { error: "File ID is required 🆔" },
        { status: 400 }
      );
    }

    const [file] = await db
      .select()
      .from(files)
      .where(and(eq(files.id, fileId), eq(files.userId, userId)));

    if (!file) {
      return NextResponse.json({ error: "File not found 🔍" }, { status: 404 });
    }

    if (!file.isFolder && file.fileId) {
      try {
        await imagekit.deleteFile(file.fileId);
      } catch (error) {
        console.error(`Error deleting file ${fileId} from ImageKit:`, error);
      }
    }

    const [deletedFile] = await db
      .delete(files)
      .where(and(eq(files.id, fileId), eq(files.userId, userId)))
      .returning();

    return NextResponse.json({
      success: true,
      message: "😊 File deleted successfully ✅",
      deletedFile,
    }, { status: 200 });
  } catch (error) {
    console.error("Error deleting file:", error);
    return NextResponse.json(
      { error: "Failed to delete file 😞" },
      { status: 500 }
    );
  }
}