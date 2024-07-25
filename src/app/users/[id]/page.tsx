import {
	getUserIntervalReport,
	getIntervalIds,
	getUserAllTimeAverages,
} from "../../_lib/data";
import SelectInterval from "../../_components/selectInterval";
import secondsConverter from "@/app/_lib/utils/secondsConverter";
import Image from "next/image";
import heart from "/public/heart.png";
import temp from "/public/temp.png";
import UserIntervalSummary from "@/app/_components/UserIntervalSummary";
import UserAllTimeAveragesSummary from "@/app/_components/UserAllTimeAveragesSummary";
import LineChartComponent from "@/app/_components/LineChartComponent";
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
	const query = searchParams?.query || intervals[0];
	let data = await getUserIntervalReport(params.id, query);
	let allTimeData = await getUserAllTimeAverages(params.id);
	return (
		<main className="flex min-h-screen flex-col justify-start gap-5 px-24">
			<nav className="w-full flex items-center justify-between gap-4 flex-row m-1 md:md-6 lg:mx-10 lg:my-6">
				<SelectInterval intervals={intervals} />
			</nav>
			<section className="w-full flex flex-row gap-4">
				<UserIntervalSummary
					score={data.intervals[0].score}
					totalSleepTime={data.totalSleepTime}
					intervalAverageHeartRate={data.intervalAverageHeartRate}
					intervalAverageRespiratoryRate={data.intervalAverageRespiratoryRate}
					intervalAverageTempBedC={data.intervalAverageTempBedC}
				/>
				<LineChartComponent data={data.intervals[0].timeseries.tempBedC} />
			</section>
			<UserAllTimeAveragesSummary
				allTimeAverageScoreNum={allTimeData.allTimeAverageScoreNum}
				allTimeAverageHeartRate={allTimeData.allTimeAverageHeartRate}
				allTimeAverageRespiratoryRate={
					allTimeData.allTimeAverageRespiratoryRate
				}
				allTimeAverageTempBedC={allTimeData.allTimeAverageTempBedC}
				allTimeAverageTempRoomC={allTimeData.allTimeAverageTempRoomC}
			/>
		</main>
	);
}
