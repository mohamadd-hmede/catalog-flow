"use server";

export async function submitContact(
  previousState: { message: string },
  formData: FormData,
) {
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  console.log("Contact submission:", {
    name,
    email,
    message,
  });

  return {
    message: "Your message was sent successfully!",
  };
}
