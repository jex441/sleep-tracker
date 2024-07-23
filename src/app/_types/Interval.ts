import Stage from "./Stage";
import TimeSeries from "./TimeSeries";

export interface Interval {
	id: string;
	ts: string;
	stages: Stage[];
	score: number;
	timeseries: TimeSeries;
}
