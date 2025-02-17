import { getUsersOverview, getIntervalIds } from "@/app/_lib/data";
import Link from "next/link";
import SelectInterval from "./_components/SelectInterval";
import SleepTimelineBar from "./_components/SleepTimeLineBar";

import UserCard from "./_components/UserCard";
import MetricsCard from "./_components/MetricsCard";
import MobileMetricsCard from "./_components/MobileMetricsCard";
import TimeLine from "./_components/TimeLine";

export default async function Home({
	searchParams,
}: {
	searchParams?: {
		query?: string;
		page?: string;
	};
}) {
	// Get the intervals for which we have data:
	const intervals: string[] = await getIntervalIds();
	const query = searchParams?.query || intervals[0];
	// Get basic data for each user for the selected interval:
	let data = await getUsersOverview(query);

	return (
		<main className="flex min-h-screen flex-col items-center gap-5 px-2 md:px-10 lg:px-20">
			<nav className="w-full flex items-center justify-between gap-4 flex-row m-1 md:md-6 lg:mx-10 lg:my-6">
				<SelectInterval
					text={"Your family's sleep data for"}
					intervals={intervals}
				/>
				<div className="flex items-center flex-row gap-4 m-1 lg:gap-10">
					<span className="flex justify-center items-center text-center gap-1 text-xs lg:text-sm text-deep flex-col">
						<span className="h-6 w-6 rounded-md bg-out/30 block shadow-lg"></span>{" "}
						away
					</span>
					<span className="flex justify-center items-center text-center gap-1 text-xs lg:text-sm text-deep flex-col">
						<span className="h-6 w-6 rounded-md bg-awake/80 block shadow-lg"></span>
						awake
					</span>
					<span className="flex justify-center items-center text-center gap-1 text-xs lg:text-sm text-deep flex-col">
						<span className="h-6 w-6 rounded-md bg-light/90 block shadow-lg"></span>
						light
					</span>
					<span className="flex justify-center items-center text-center gap-1 text-xs lg:text-sm text-deep flex-col">
						<span className="h-6 w-6 rounded-md bg-deep/90 block shadow-lg"></span>
						deep
					</span>
				</div>
			</nav>

			{/* Timeline Component: */}
			<div className="w-full flex flex-col gap-2 lg:gap-4">
				{data.users.map((user) => {
					return (
						<Link key={user.id} href={`/users/${user.id}?query=${query}`}>
							{/* Timeline row: */}
							<section className="w-full my-2 flex gap-1 lg:gap-4 flex-col lg:flex-row">
								<UserCard
									name={user.name}
									highest={user.highest}
									lowest={user.lowest}
								/>
								<MobileMetricsCard
									name={user.name}
									score={user.intervals[0].score}
									avgHeartRate={user.intervals[0].avgHeartRate}
									avgTempBedC={user.intervals[0].avgTempBedC}
								/>
								{/* Color Coded Bar Denoting User's Sleep Data */}
								<SleepTimelineBar
									startTime={data.startTime}
									totalTimeInSeconds={data.totalTimeInSeconds}
									interval={user.intervals[0]}
								/>
								<MetricsCard
									score={user.intervals[0].score}
									avgHeartRate={user.intervals[0].avgHeartRate}
									avgTempBedC={user.intervals[0].avgTempBedC}
								/>
							</section>
						</Link>
					);
				})}
				{/* Time stamps: */}
				<TimeLine startTime={data.startTime} endTime={data.endTime} />
			</div>
		</main>
	);
}
