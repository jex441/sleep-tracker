import Interval from "@/app/_types/Interval";

export default function allTimeAverageTimeSeries(
	data: Interval[],
	value: string
): number {
	const averages = data.map((interval) => {
		const total = interval.timeseries[value].reduce((accum, cur) => {
			const [time, val] = cur;
			accum += val;
			return accum;
		}, 0);
		const avg = total / interval.timeseries[value].length;
		return avg;
	});
	console.log(averages);
	const sumOfAllAverageHeartRatings = averages.reduce((accum, cur) => {
		accum += cur;
		return accum;
	}, 0);

	const allTimeAverageHeartRating = Math.floor(
		sumOfAllAverageHeartRatings / data.length
	);
	return allTimeAverageHeartRating;
}
