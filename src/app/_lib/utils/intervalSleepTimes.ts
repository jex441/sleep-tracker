import Interval from "@/app/_types/Interval";

export default function intervalSleepTimes(interval: Interval) {
	let totalSleepTime = 0;
	let totalAwakeTime = 0;
	let totalDeepSleepTime = 0;
	let totalLightSleepTime = 0;
	let totalOutTime = 0;

	let totalIntervalTime = interval.stages.reduce((accum, cur) => {
		const { stage, duration } = cur;
		if (stage === "deep") {
			totalDeepSleepTime += duration;
		}
		if (stage === "deep" || stage === "light") {
			totalSleepTime += duration;
		}
		if (stage === "light") {
			totalLightSleepTime += duration;
		}
		if (stage === "awake") {
			totalAwakeTime += duration;
		}
		if (stage === "out") {
			totalOutTime += duration;
		}
		accum += duration;
		return accum;
	}, 0);
	console.log("=?", (totalAwakeTime / totalIntervalTime) * 100);
	return {
		totalSleepTime,
		totalDeepSleepTime,
		totalLightSleepTime,
		totalIntervalTime,
		totalOutTime,
		totalAwakeTime,
	};
}
