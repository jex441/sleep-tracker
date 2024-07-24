import { getUser, getUserSleepData } from "../requests";
import Interval from "@/app/_types/Interval";
import secondsConverter from "@/app/_lib/utils/secondsConverter";

export const basicUserSleepData = async (
	userId: string,
	intervalId: string | null = null
) => {
	const user = await getUser(userId);
	let sleepData = await getUserSleepData(userId, intervalId);

	const formattedData = sleepData.map((interval: Interval) => {
		const avgHeartRateTotal = interval.timeseries.heartRate.reduce(
			(accum, cur) => {
				const [time, val] = cur;
				accum += val;
				return accum;
			},
			0
		);
		const avgHeartRate = Math.floor(
			avgHeartRateTotal / interval.timeseries.heartRate.length
		);
		const totalSleepTime = interval.stages.reduce((accum, cur) => {
			const { stage, duration } = cur;
			if (stage === "deep" || stage === "light") {
				accum += duration;
			}
			return accum;
		}, 0);
		const totalSleepTimeString = secondsConverter(totalSleepTime);
		return {
			score: interval.score,
			ts: interval.ts,
			totalSleepTime: totalSleepTimeString,
			stages: interval.stages,
			avgHeartRate: avgHeartRate,
		};
	});
	const response = {
		...user,
		intervals: formattedData,
	};

	return response;
};
