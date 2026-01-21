import { db } from "@/lib/db";
import { productSchema } from "@/lib/validations/product";
import { handleApiError } from "@/lib/api-utils";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const product = await db.product.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!product) {
      return Response.json(
        { success: false, error: "Product not found" },
        { status: 404 },
      );
    }

    return Response.json({ success: true, data: product });
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
    const body = productSchema.parse(json);

    const existingSlug = await db.product.findFirst({
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

    const product = await db.product.update({
      where: { id },
      data: body,
    });

    return Response.json({ success: true, data: product });
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
    await db.product.delete({
      where: { id },
    });

    return Response.json({ success: true, data: null });
  } catch (error) {
    return handleApiError(error);
  }
}
