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

		return {
			score: interval.score,
			ts: interval.ts,
			stages: interval.stages,
			avgHeartRate: avgHeartRate,
		};
	});
	const response = { ...user, sleepData: formattedData };

	return response;
};
