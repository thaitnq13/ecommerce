import { db } from "@/lib/db";
import { productSchema } from "@/lib/validations/product";
import { handleApiError } from "@/lib/api-utils";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId");

    const where = categoryId ? { categoryId } : {};

    const products = await db.product.findMany({
      where,
      include: {
        category: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return Response.json({ success: true, data: products });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const body = productSchema.parse(json);

    const existingSlug = await db.product.findUnique({
      where: { slug: body.slug },
    });

    if (existingSlug) {
      return Response.json(
        { success: false, error: "Slug already exists" },
        { status: 409 },
      );
    }

    const product = await db.product.create({
      data: body,
    });

    return Response.json({ success: true, data: product }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
