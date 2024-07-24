import { getUser, getUserSleepData } from "../requests";
import Interval from "@/app/_types/Interval";

export const basicUserSleepData = async (userId: string) => {
	const user = await getUser(userId);
	const sleepData = await getUserSleepData(userId);

	const formattedData = sleepData.map((interval: Interval) => {
		const avgHeartRate = interval.timeseries.heartRate.reduce((accum, cur) => {
			const [time, val] = cur;
			accum += val;
			const avg = accum / interval.timeseries.heartRate.length;
			return avg;
		}, 0);

		const totalSleepTime = interval.stages.reduce((accum, cur) => {
			const { stage, duration } = cur;
			if (stage === "deep" || stage === "light") {
				accum += duration;
			}
			return accum;
		}, 0);

		return {
			score: interval.score,
			ts: interval.ts,
			totalSleepTime: totalSleepTime,
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
