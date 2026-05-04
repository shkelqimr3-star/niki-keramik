import { MarketingPage } from "@/components/MarketingPages";
import { SiteFrame } from "@/components/SiteFrame";

export default function Home() {
  return (
    <SiteFrame>
      <MarketingPage page="home" />
    </SiteFrame>
  );
}
