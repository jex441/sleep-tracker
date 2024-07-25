import { getUser, getUserSleepData } from "../requests";
import Interval from "@/app/_types/Interval";

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

		const avgHeartTempBedC = interval.timeseries.tempBedC.reduce(
			(accum, cur) => {
				const [time, val] = cur;
				accum += val;
				return accum;
			},
			0
		);
		const avgTempBedC = Math.floor(
			avgHeartTempBedC / interval.timeseries.tempBedC.length
		);
		const totalSleepTime = interval.stages.reduce((accum, cur) => {
			const { stage, duration } = cur;
			if (stage === "deep" || stage === "light") {
				accum += duration;
			}
			return accum;
		}, 0);

		const totalSessionTime = interval.stages.reduce((accum, cur) => {
			const { stage, duration } = cur;
			accum += duration;
			return accum;
		}, 0);

		return {
			score: interval.score,
			ts: interval.ts,
			totalSleepTime: totalSleepTime,
			totalSessionTime: totalSessionTime,
			stages: interval.stages,
			avgHeartRate: avgHeartRate,
			avgTempBedC: avgTempBedC,
		};
	});
	const response = {
		...user,
		intervals: formattedData,
	};

	return response;
};
