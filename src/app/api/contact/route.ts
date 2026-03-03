import { handleFormSubmission } from "@/lib/api";
import { contactSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  return handleFormSubmission({
    request,
    schema: contactSchema,
    rateLimitKey: "contact",
    onSuccess: (data, ip) => {
      console.info("[CONTACT]", { name: data.name, email: data.email, ip });
    },
  });
}
