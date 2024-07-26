import Interval from "@/app/_types/Interval";
import TimeSeries from "@/app/_types/TimeSeries";

export default function invtervalAverageTimeSeries(
	interval: Interval,
	value: string
): number {
	const total = interval.timeseries[value].reduce(
		(accum: number, cur: [string, number]) => {
			const [time, val] = cur;
			accum += val;
			return accum;
		},
		0
	);

	const average = Math.floor(total / interval.timeseries[value].length);
	return average;
}
