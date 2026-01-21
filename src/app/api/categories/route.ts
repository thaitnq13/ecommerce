import { db } from "@/lib/db";
import { categorySchema } from "@/lib/validations/category";
import { handleApiError } from "@/lib/api-utils";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    const categories = await db.category.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return Response.json({ success: true, data: categories });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const body = categorySchema.parse(json);

    const existingslug = await db.category.findUnique({
      where: { slug: body.slug },
    });

    if (existingslug) {
      return Response.json(
        { success: false, error: "Slug already exists" },
        { status: 409 },
      );
    }

    const category = await db.category.create({
      data: body,
    });

    return Response.json({ success: true, data: category }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
