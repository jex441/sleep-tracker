import { getUserIntervalReport, getIntervalIds } from "../../_lib/data";
import SelectInterval from "../../_components/selectInterval";
import secondsConverter from "@/app/_lib/utils/secondsConverter";
import Image from "next/image";
import heart from "/public/heart.png";
import temp from "/public/temp.png";

export default async function User({
	params,
	searchParams,
}: {
	searchParams?: {
		query?: string;
		page?: string;
	};
	params: { id: string };
}) {
	const intervals: string[] = await getIntervalIds();
	console.log("=>", intervals[0]);
	const query = searchParams?.query || intervals[0];
	// Get basic data for each user for the selected interval:
	let data = await getUserIntervalReport(params.id, query);

	// let startTime = new Date(data.startTime);
	// let endTime = new Date(data.endTime);

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<SelectInterval intervals={intervals} />
			<div className="h-[500px] w-[500px] bg-out/50 flex flex-col p-4 flex justify-center items-center rounded-lg">
				<span>
					<h1 className="text-[64px]">{data.intervals[0].score}</h1>
				</span>
				<span>
					<h2 className="text-[48px]">
						{secondsConverter(data.totalSleepTime)}
					</h2>
				</span>
				<span className="flex flex-row justify-between w-full items-center">
					<span className="flex justify-center gap-2 items-center">
						<Image alt="avgHeartRate" width={20} height={20} src={heart} />
						<h2 className="text-[32px]">{data.intervalAverageHeartRate}</h2>
					</span>
					<span className="flex justify-center gap-2 items-center">
						<h2 className="text-[32px]">
							{data.intervalAverageRespiratoryRate}
						</h2>
					</span>
					<span className="flex justify-center gap-2 items-center">
						<Image alt="avgHeartRate" width={20} height={20} src={temp} />
						<h2 className="text-[32px]">{data.intervalAverageTempBedC}°</h2>
					</span>
				</span>
			</div>
		</main>
	);
}
