import StatCard from "@/components/dashboard/StatCard";
import ActionCard from "@/components/dashboard/ActionCard";
import { dashboardIcons } from "@/utility/icons";
import Image from "next/image";

export default function DashboardPage() {
  return (
    <div className="px-6 py-2 space-y-2">
      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <StatCard
          className="bg-stat-success"
          textColor="text-success"
          title={<>Number of <span className="font-bold">Creatives</span> you have</>}
          value={<>Unlimited <span className="font-bold">Creatives</span></>}
          icon={<Image src={dashboardIcons.creative} alt="Creatives" width={120} height={120} />}
        />
        <StatCard
          Button={true}
          className="bg-stat-info"
          textColor="text-info"
          title={<>Number of <span className="font-bold">Social Profiles</span> you've used</>}
          value={<>1 / 10 <span className="font-bold">Social Profiles</span></>}
          icon={<Image src={dashboardIcons.creative} alt="Social Profiles" width={120} height={120} />}
        />
        <StatCard
          className="bg-state-purple"
          textColor="text-purple"
          title={<>Number of <span className="font-bold">Scheduled Posts</span> you have left</>}
          value={<>Unlimited <span className="font-bold">Scheduled Posts</span></>}
          icon={<Image src={dashboardIcons.creative} alt="Scheduled Posts" width={120} height={120} />}
        />
        <StatCard
          className="bg-state-gray"
          title={<>Number of <span className="font-bold">Travis Texts</span> you have left</>}
          value={<>Unlimited <span className="font-bold">Travis Texts</span></>}
          icon={<Image src={dashboardIcons.creative} alt="Travis Texts" width={120} height={120} />}
        />
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <ActionCard
          icon={<Image src={dashboardIcons.create} alt="Text Copy" width={300} height={300} />}
          title="Create a Text Copy"
          buttonText="Create"
        />
        <ActionCard
          icon={<Image src={dashboardIcons.create} alt="Create Content" width={300} height={300} />}
          title="Create Content"
          buttonText="Create"
        />
        <ActionCard
          icon={<Image src={dashboardIcons.create} alt="Scheduler" width={300} height={300} />}
          title="Go to Scheduler"
          buttonText="Scheduler"
        />
      </div>
    </div>
  );
}
