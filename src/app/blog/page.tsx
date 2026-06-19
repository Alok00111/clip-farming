import { Metadata } from "next";
import BlogListClient from "./BlogListClient";

export const metadata: Metadata = {
  title: "Creator Success Stories | ClipupMedia",
  description: "See how we scale every type of creator.",
};

export default function BlogPage() {
  return <BlogListClient />;
}
