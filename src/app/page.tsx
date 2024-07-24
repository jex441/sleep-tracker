import { getUsersOverview, getIntervalIds } from "@/app/_lib/data";
import Link from "next/link";
import SelectInterval from "./_components/selectInterval";
import SleepTimelineBar from "./_components/sleepTimelineBar";
export default async function Home({
	searchParams,
}: {
	searchParams?: {
		query?: string;
		page?: string;
	};
}) {
	const intervals: string[] = await getIntervalIds();
	const query = searchParams?.query || null;
	let data = await getUsersOverview(query);
	let startTime = new Date(data.startTime);
	let endTime = new Date(data.endTime);

	console.log(data);
	return (
		<main className="flex min-h-screen flex-col items-center gap-10 px-20">
			<nav className="w-full justify-start m-10">
				<SelectInterval intervals={intervals} />
			</nav>
			<header className="bg-red-100 w-full flex justify-between">
				<div>{endTime.toISOString().split("T")[1]}</div>
				<div>{startTime.toISOString().split("T")[1]}</div>
			</header>

			{/* Timeline */}
			<div className="w-full flex flex-col gap-10">
				{data.users.map((user) => {
					return (
						<div className="w-full border-1 border border-red-500">
							<SleepTimelineBar data={user.intervals[0].stages} />
						</div>
					);
				})}
			</div>
		</main>
	);
}

// need total
