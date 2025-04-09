import { redirect } from "next/navigation";

//If this page was accessed directly (after hard refresh), redirect to upload page
//This is to prevent the user from accessing the summary page directly
//without going through the upload page first
export default function Page() {
  redirect("/upload");
}
