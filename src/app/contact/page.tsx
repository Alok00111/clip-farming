import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact | Clipping Agency",
  description: "Initiate a viral campaign. Book a strategy call today.",
};

export default function ContactPage() {
  return <ContactClient />;
}
