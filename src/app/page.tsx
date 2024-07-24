import { getUsersOverview, getIntervalIds } from "@/app/_lib/data";
import Link from "next/link";
import SelectInterval from "./_components/selectInterval";

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
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			Render aggregate user data
			<SelectInterval intervals={intervals} />
			{data.map((user) => {
				return (
					<Link key={user.id} href={`/users/${user.id}}`}>
						<div className="m-4 p-4 w-[600px] bg-white rounded-md">
							<div>{user.name}</div>
							<div>score: {user.intervals[0].score}</div>
							<div>total sleep time: {user.intervals[0].totalSleepTime}</div>
							<div>avg heart rate: {user.intervals[0].avgHeartRate}</div>
						</div>
					</Link>
				);
			})}
		</main>
	);
}
