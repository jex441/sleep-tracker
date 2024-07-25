import { getUsersOverview, getIntervalIds } from "@/app/_lib/data";
import Link from "next/link";
import SelectInterval from "./_components/selectInterval";
import SleepTimelineBar from "./_components/sleepTimelineBar";
import Image from "next/image";
import heart from "/public/heart.png";
import temp from "/public/temp.png";

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
	return (
		<main className="flex min-h-screen flex-col items-center gap-5 px-2 md:px-10 lg:px-20">
			<nav className="w-full justify-start m-2 md:md-6 lg:m-10">
				<SelectInterval intervals={intervals} />
			</nav>

			{/* Timeline */}
			<div className="w-full flex flex-col gap-6">
				<header className="text-white w-[70%] self-center flex justify-between">
					<div>{startTime.toLocaleTimeString()}</div>
					<div>{endTime.toLocaleTimeString()}</div>
				</header>
				{data.users.map((user) => {
					return (
						//Row
						<div key={user.id} className=" w-full flex gap-1 lg:gap-4 flex-row">
							<div className="text-[#300395] text-center lg:text-[20px] font-semibold tracking-wide rounded-lg w-[20%] bg-white flex items-center justify-center">
								{user.name}
							</div>
							<SleepTimelineBar
								startTime={data.startTime}
								usersTotalPercentOfSession={
									(user.intervals[0].totalSessionTime /
										data.totalTimeInSeconds) *
									100
								}
								totalTimeInSeconds={data.totalTimeInSeconds}
								interval={user.intervals[0]}
							/>
							<div className="rounded-lg w-[20%] bg-white flex items-center justify-start p-1 lg:p-2 flex-col">
								<span className="hidden lg:block text-xs text-gray-500 lg:text-sm">
									Sleep Score
								</span>
								<span className="lg:text-[24px] text-indigo-800 font-bold">
									{user.intervals[0].score}
								</span>
								<div className="flex flex-col lg:flex-row lg:justify-around w-full">
									<span className="flex text-gray-500 justify-around flex-row items-center gap-1 text-sm">
										<span>
											<Image
												alt="average heart rate"
												className="h-3 w-auto"
												src={heart}
											/>
										</span>
										<span>{user.intervals[0].avgHeartRate}</span>
									</span>
									<span className="flex text-gray-500 flex-row justify-between items-center gap-1 text-sm">
										<span>
											<Image
												alt="average bed temp C"
												className="h-4 w-auto"
												src={temp}
											/>
										</span>
										<span>{user.intervals[0].avgTempBedC} °</span>
									</span>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</main>
	);
}

// need total
