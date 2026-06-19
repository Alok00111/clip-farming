import { Metadata } from "next";
import EditorsClient from "./EditorsClient";

export const metadata: Metadata = {
  title: "For Editors | ClipupMedia",
  description: "Join the elite network of editors at ClipupMedia. Stop chasing clients, start editing.",
};

export default function EditorsPage() {
  return <EditorsClient />;
}
