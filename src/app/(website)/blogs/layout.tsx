import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Insights & Technical Blog | Najhum Technologies",
  description: "Insights on industrial IoT engineering, EV charging infrastructure, smart building automation, and precision agriculture technology.",
  path: "/blogs",
  keywords: ["Najhum blog", "IoT technology insights", "EV charging innovations", "smart agriculture UAE"],
});

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
