import { getUsersOverview } from "@/app/_lib/data";

export default async function Home() {
	const data = await getUsersOverview();
	console.log(data);

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			Render aggregate user data
			{data.map((user) => {
				return (
					<div className="m-4 p-4 w-[200px] bg-red-200">
						<div>{user.name}</div>
						<div>{user.intervals[0].score}</div>
						<div>{user.intervals[0].totalSleepTime}</div>
					</div>
				);
			})}
		</main>
	);
}
