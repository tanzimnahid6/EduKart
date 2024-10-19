"use server";

const { signIn } = require("@/auth");

export const credentialLogin = async (formData) => {
  try {
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (!res || res.error) {
      // Handle login error (e.g., invalid credentials)
      console.log("Login failed:", res?.error || "Unknown error");
      throw new Error(res?.error || "Login failed");
    }

    return res;
  } catch (error) {
    console.log("Error during login:", error);
    // Pass a meaningful error message
    throw new Error(error.message || "An unexpected error occurred");
  }
};
