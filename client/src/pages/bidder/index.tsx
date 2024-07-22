import BottomNav from "@/components/ui/bidder/bottom-nav";
import BidderMyTasks from "@/components/ui/bidder/mytasks-page";

export default function Bidder({ userId }: { user_id: string }) {
  return (
    <div>
      <BottomNav>
        <BidderMyTasks userId={userId} />
      </BottomNav>
    </div>
  );
}
