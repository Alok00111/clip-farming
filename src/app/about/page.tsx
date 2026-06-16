import { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us | Clipping Agency",
  description: "The story behind the #1 short-form clipping agency.",
};

export default function AboutPage() {
  return <AboutClient />;
}
