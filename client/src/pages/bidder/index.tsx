import BidderMyTasks from "@/components/ui/bidder-mytasks-page";
import BottomNav from "@/components/ui/bottom-nav";

export default function Bidder() {
  return (
    <div>
      <BidderMyTasks name="Leanne Graham" />
      <BottomNav navIndex={0} />
    </div>
  );
}
