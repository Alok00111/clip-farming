import { Metadata } from "next";
import BlogListClient from "./BlogListClient";

import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Who We Help | ClipupMedia",
  description: "See how we scale every type of creator.",
};

export default function BlogPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogListClient />
    </Suspense>
  );
}
