import { Metadata } from "next";
import BlogListClient from "./BlogListClient";

export const metadata: Metadata = {
  title: "Blog & Strategies | Clipping Agency",
  description: "Field reports from the frontlines of viral engineering.",
};

export default function BlogPage() {
  return <BlogListClient />;
}
