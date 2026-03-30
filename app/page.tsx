import Homepage from "@/components/homepage";
import { siteContent } from "@/lib/site-content";

export default function Home() {
  return <Homepage content={siteContent.fr} />;
}
