import {
	getUserIntervalReport,
	getIntervalIds,
	getUserAllTimeAverages,
} from "../../_lib/data";

import SelectInterval from "../../_components/selectInterval";
import UserIntervalSummary from "@/app/_components/UserIntervalSummary";
import UserAllTimeAveragesSummary from "@/app/_components/UserAllTimeAveragesSummary";
import LineChartComponent from "@/app/_components/LineChartComponent";
import MUILineChart from "@/app/_components/MUILineChart";
import SparkLineChartComponent from "@/app/_components/SparkLineChartComponent";
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
	// let allTimeData = await getUserAllTimeAverages(params.id);
	return (
		<main className="w-full flex min-h-screen flex-col justify-center lg:justify-start gap-5 p-5 lg:px-24">
			<nav className="w-[400px] flex items-center flex-row lg:my-6">
				<SelectInterval text={"Your sleep data for"} intervals={intervals} />
			</nav>
			<section className="w-full justify-center items-center lg:justify-between flex flex-col lg:flex-row gap-2">
				<UserIntervalSummary
					score={data.intervals[0].score}
					totalIntervalTime={data.totalIntervalTime}
					totalSleepTime={data.totalSleepTime}
					totalOutTime={data.totalOutTime}
					totalDeepSleepTime={data.totalDeepSleepTime}
					totalLightSleepTime={data.totalLightSleepTime}
					totalAwakeTime={data.totalAwakeTime}
					intervalAverageHeartRate={data.intervalAverageHeartRate}
					intervalAverageRespiratoryRate={data.intervalAverageRespiratoryRate}
					intervalAverageTempBedC={data.intervalAverageTempBedC}
				/>
				<div className="flex flex-1 flex-col gap-3 h-full w-[400px] lg:w-auto">
					<span className="text-deep">Heart Rate</span>
					<SparkLineChartComponent
						data={data.intervals[0].timeseries.heartRate}
					/>
					<span className="text-deep">Respitory Rate</span>
					<SparkLineChartComponent
						data={data.intervals[0].timeseries.respiratoryRate}
					/>
					<span className="text-deep">Bed Temperature Celsius</span>
					<SparkLineChartComponent
						data={data.intervals[0].timeseries.tempBedC}
					/>
				</div>
			</section>
			{/* <UserAllTimeAveragesSummary
				allTimeAverageScoreNum={allTimeData.allTimeAverageScoreNum}
				allTimeAverageHeartRate={allTimeData.allTimeAverageHeartRate}
				allTimeAverageRespiratoryRate={
					allTimeData.allTimeAverageRespiratoryRate
				}
				allTimeAverageTempBedC={allTimeData.allTimeAverageTempBedC}
				allTimeAverageTempRoomC={allTimeData.allTimeAverageTempRoomC}
			/> */}
		</main>
	);
}
