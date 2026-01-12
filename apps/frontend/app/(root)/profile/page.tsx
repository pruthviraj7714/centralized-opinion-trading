import AdminProfilePage from "@/components/AdminProfilePage";
import UserProfilePage from "@/components/UserProfilePageComponent";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  if(session.user.role === "ADMIN") {
    return <AdminProfilePage authToken={session.accessToken} />
  }

  return <UserProfilePage authToken={session.accessToken!} />;
}
