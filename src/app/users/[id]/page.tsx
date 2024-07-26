import Image from "next/image";

import background from "/public/background.png";
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
import MobileMuiChart from "@/app/_components/MobileMuiChart";

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
		<main className="w-full flex min-h-screen flex-col justify-center lg:justify-start gap-1 p-5 lg:px-24">
			<nav className="w-[400px] flex items-center flex-row lg:my-4">
				<SelectInterval text={"Your sleep data for"} intervals={intervals} />
			</nav>
			<section className="w-full justify-center gap-6 items-center lg:justify-between flex flex-col lg:flex-row gap-2">
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
				<div className="hidden lg:flex flex-col flex-1 px-auto justify-start items-start h-full w-[400px] lg:w-auto">
					<span className="text-deep">Heart Rate</span>
					<MUILineChart
						title={"Heart Rate"}
						data={data.intervals[0].timeseries.heartRate}
					/>
					<span className="text-deep">Bed Temperature Celsius</span>
					<MUILineChart
						title={"Bed Temperature C"}
						data={data.intervals[0].timeseries.tempBedC}
					/>
					<span className="text-deep">Respiratory Rate</span>
					<MUILineChart
						title={"Respiratory Rate"}
						data={data.intervals[0].timeseries.respiratoryRate}
					/>
				</div>

				<div className="flex lg:hidden flex-col flex-1 px-auto justify-start items-start h-full w-[400px] lg:w-auto">
					<span className="text-deep">Heart Rate</span>
					<MobileMuiChart
						title={"Heart Rate"}
						data={data.intervals[0].timeseries.heartRate}
					/>
					<span className="text-deep">Bed Temperature Celsius</span>
					<MobileMuiChart
						title={"Bed Temperature C"}
						data={data.intervals[0].timeseries.tempBedC}
					/>
					<span className="text-deep">Respiratory Rate</span>
					<MobileMuiChart
						title={"Respiratory Rate"}
						data={data.intervals[0].timeseries.respiratoryRate}
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
			{/* <div className="absolute -bottom-20 left-0 -z-10">
				<Image alt="bg" src={background} width={1400} height={415} />
			</div> */}
		</main>
	);
}
