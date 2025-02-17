import {
	getUserIntervalReport,
	getIntervalIds,
	getUserAllTimeAverages,
} from "../../_lib/data";
import SelectInterval from "../../_components/SelectInterval";
import UserIntervalSummary from "@/app/_components/UserIntervalSummary";
import MobileUserIntervalSummary from "@/app/_components/MobileUserIntervalSummary";
import UserAllTimeAveragesSummary from "@/app/_components/UserAllTimeAveragesSummary";
import MUILineChart from "@/app/_components/MUILineChart";
import MobileMuiChart from "@/app/_components/MobileMuiChart";

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

	// Not using all time averages here:
	// let allTimeData = await getUserAllTimeAverages(params.id);
	const name: string = data.name;
	const firstName = name.split(" ")[0];
	return (
		<main className="w-full flex min-h-screen flex-col justify-center lg:justify-start gap-1 p-4 lg:px-24">
			<nav className="w-[350px] ml-4 mb-4 flex items-center flex-row lg:ml-0 lg:my-4">
				<SelectInterval
					text={`${firstName}'s sleep data for`}
					intervals={intervals}
				/>
			</nav>
			<section className="w-full justify-center lg:gap-6 items-center lg:justify-between flex flex-col lg:flex-row gap-2">
				{/* A work-around to have a responsive pie chart. Room for optimization here */}
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
					intervalAverageTempRoomC={data.intervalAverageTempRoomC}
				/>
				<MobileUserIntervalSummary
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
					intervalAverageTempRoomC={data.intervalAverageTempRoomC}
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

				<div className="flex lg:hidden flex-col flex-1 px-auto justify-start items-start h-full w-[350px] lg:w-auto">
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
