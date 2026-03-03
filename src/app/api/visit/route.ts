import { handleFormSubmission } from "@/lib/api";
import { visitSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  return handleFormSubmission({
    request,
    schema: visitSchema,
    rateLimitKey: "visit",
    onSuccess: (data, ip) => {
      console.info("[VISIT]", {
        name: data.name,
        email: data.email,
        preferredDate: data.preferredDate,
        ip,
      });
    },
  });
}
