import { db } from "@/lib/db";
import { categorySchema } from "@/lib/validations/category";
import { handleApiError } from "@/lib/api-utils";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const category = await db.category.findUnique({
      where: { id },
    });

    if (!category) {
      return Response.json(
        { success: false, error: "Category not found" },
        { status: 404 },
      );
    }

    return Response.json({ success: true, data: category });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const json = await req.json();
    const body = categorySchema.parse(json);

    // Check if slug is taken by another category
    const existingSlug = await db.category.findFirst({
      where: {
        slug: body.slug,
        NOT: {
          id,
        },
      },
    });

    if (existingSlug) {
      return Response.json(
        { success: false, error: "Slug already exists" },
        { status: 409 },
      );
    }

    const category = await db.category.update({
      where: { id },
      data: body,
    });

    return Response.json({ success: true, data: category });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await db.category.delete({
      where: { id },
    });

    return Response.json({ success: true, data: null });
  } catch (error) {
    return handleApiError(error);
  }
}
