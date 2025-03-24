import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import ImageGenerator from "../components/ImageGenerator";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession(authOption);

  if (!session) {
    redirect("/sign-in"); // Redirect if not logged in
  }

  // stripe listen --forward-to localhost:3000/api/webhook

  return (
    <>
      <div>
        <ImageGenerator />
      </div>
    </>
  );
}
