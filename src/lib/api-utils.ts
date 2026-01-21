export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
};

export const handleApiError = (error: unknown): Response => {
  console.error("API Error:", error);
  return Response.json(
    {
      success: false,
      error: error instanceof Error ? error.message : "Internal Server Error",
    },
    { status: 500 },
  );
};
