import Interval from "@/app/_types/Interval";

// For getting a user's average score accross all intervals
export default function allTimeAverageScoreFunction(data: Interval[]): {
	allTimeAverageScore: number;
	highest: number;
	lowest: number;
} {
	const scores = data.map((interval) => interval.score);
	let highest: number = 0;
	let lowest: number = Infinity;

	const sumOfAllScores = scores.reduce((accum, cur) => {
		if (cur > highest) {
			highest = cur;
		}
		if (cur < lowest) {
			lowest = cur;
		}
		accum += cur;
		return accum;
	}, 0);

	const allTimeAverageScore = Math.floor(sumOfAllScores / scores.length);
	return {
		allTimeAverageScore: allTimeAverageScore,
		highest: highest,
		lowest: lowest,
	};
}
