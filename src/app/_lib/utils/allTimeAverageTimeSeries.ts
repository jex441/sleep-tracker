import Interval from "@/app/_types/Interval";

// Will supply the average value across multiple interval's timeseries data with a given key (heartRate, tempBedC, etc)
export default function allTimeAverageTimeSeries(
	data: Interval[],
	value: string
): number {
	const averages = data.map((interval) => {
		const total = interval.timeseries[value].reduce(
			(accum: number, cur: [string, number]) => {
				const [time, val] = cur;
				accum += val;
				return accum;
			},
			0
		);
		const avg = total / interval.timeseries[value].length;
		return avg;
	});

	const sumOfAllAverages = averages.reduce((accum, cur) => {
		accum += cur;
		return accum;
	}, 0);

	const allTimeAverage = Math.floor(sumOfAllAverages / data.length);
	return allTimeAverage;
}
