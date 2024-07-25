import { getUsersOverview, getIntervalIds } from "@/app/_lib/data";
import Link from "next/link";
import SelectInterval from "./_components/selectInterval";
import SleepTimelineBar from "./_components/sleepTimelineBar";
import Image from "next/image";
import heart from "/public/heart.png";
import temp from "/public/temp.png";
import landscape from "/public/landscape.png";
import rectangle from "/public/rectangle.png";
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
	const query = searchParams?.query || null;
	// Get basic data for each user for the selected interval:
	let data = await getUsersOverview(query);

	let startTime = new Date(data.startTime);
	let endTime = new Date(data.endTime);

	return (
		<main className="flex min-h-screen flex-col items-center gap-5 px-2 md:px-10 lg:px-20">
			<nav className="w-full flex items-center justify-between flex-col gap-4 lg:flex-row m-1 md:md-6 lg:mx-10 lg:my-6">
				<SelectInterval intervals={intervals} />
				<div className="flex items-center flex-row gap-10">
					<span className="flex justify-center items-center text-center gap-1 text-sm text-deep flex-col">
						<span className="h-6 w-6 rounded-md bg-out/40 block shadow-lg"></span>{" "}
						away
					</span>
					<span className="flex justify-center items-center text-center gap-1 text-sm text-deep flex-col">
						<span className="h-6 w-6 rounded-md bg-light block shadow-lg"></span>
						light
					</span>
					<span className="flex justify-center items-center text-center gap-1 text-sm text-deep flex-col">
						<span className="h-6 w-6 rounded-md bg-deep block shadow-lg"></span>
						deep
					</span>
					<span className="flex justify-center items-center text-center gap-1 text-sm text-deep flex-col">
						<span className="h-6 w-6 rounded-md bg-awake block shadow-lg"></span>
						awake
					</span>
				</div>
			</nav>

			{/* Timeline Component: */}
			<div className="w-full flex flex-col gap-6">
				<header className="text-deep w-[70%] self-center flex justify-between">
					<div>{startTime.toLocaleTimeString()}</div>
					<div>{endTime.toLocaleTimeString()}</div>
				</header>
				{data.users.map((user) => {
					const score = user.intervals[0].score;
					const scoreColor = score < 60 ? "#FA5555" : "#2C3D4F";
					return (
						<Link key={user.id} href={`/users/{user.id}`}>
							{/* Timeline row: */}
							<section className="w-full my-2 flex gap-1 lg:gap-4 flex-row">
								{/* Username Card: */}
								<article className="text-deep text-center lg:text-[20px] font-semibold tracking-wide rounded-lg w-[20%] bg-white/90 flex items-center justify-center drop-shadow-md">
									{user.name}
								</article>
								{/* Color Coded Bar Denoting User's Sleep Data */}
								<SleepTimelineBar
									data={data}
									startTime={data.startTime}
									totalTimeInSeconds={data.totalTimeInSeconds}
									interval={user.intervals[0]}
								/>
								{/* Metrics bar and averages for this interval */}
								<article className="rounded-lg w-[20%] bg-white/90 flex items-center justify-start p-1 lg:p-2 flex-col drop-shadow-md">
									<span className="hidden lg:block text-xs text-secondary lg:text-sm">
										Sleep Score
									</span>
									<span
										className={`lg:text-[24px] font-bold`}
										style={{ color: scoreColor }}
									>
										{user.intervals[0].score}
									</span>
									<div className="flex flex-col lg:flex-row lg:justify-around w-full">
										<span className="flex text-secondary justify-around flex-row items-center gap-1 text-sm">
											<span>
												<Image
													alt="average heart rate"
													className="h-3 w-auto"
													src={heart}
												/>
											</span>
											<span>{user.intervals[0].avgHeartRate}</span>
										</span>
										<span className="flex text-secondary flex-row justify-between items-center gap-1 text-sm">
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
								</article>
							</section>
						</Link>
					);
				})}
			</div>
			<div className="absolute bottom-0 z-10">
				<Image alt="bg" src={landscape} width={1470} height={162} />
			</div>
			<div className="absolute bottom-5 z-0">
				<Image alt="bg" src={rectangle} width={1470} height={52} />
			</div>
		</main>
	);
}

// need total
