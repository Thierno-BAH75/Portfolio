import { getSocialLinks } from "@/lib/data";
import AdminLoginClient from "./admin-login-client";

export default async function AdminLoginPage() {
  const socialLinks = await getSocialLinks();
  return <AdminLoginClient socialLinks={socialLinks} />;
}
