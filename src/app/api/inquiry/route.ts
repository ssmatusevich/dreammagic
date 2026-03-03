import { handleFormSubmission } from "@/lib/api";
import { inquirySchema } from "@/lib/schemas";

export async function POST(request: Request) {
  return handleFormSubmission({
    request,
    schema: inquirySchema,
    rateLimitKey: "inquiry",
    onSuccess: (data, ip) => {
      console.info("[INQUIRY]", {
        type: data.type,
        artworkSlug: data.artworkSlug,
        name: data.name,
        email: data.email,
        ip,
      });
    },
  });
}
