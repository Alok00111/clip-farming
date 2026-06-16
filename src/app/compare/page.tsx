import { Metadata } from "next";
import CompareClient from "./CompareClient";

export const metadata: Metadata = {
  title: "Compare & Pricing | Clipping Agency",
  description: "Why we outperform traditional agencies and software tools.",
};

export default function ComparePage() {
  return <CompareClient />;
}
