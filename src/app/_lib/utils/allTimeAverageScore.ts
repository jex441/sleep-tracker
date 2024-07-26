import Interval from "@/app/_types/Interval";

// For getting a user's average score accross all intervals
export default function allTimeAverageScore(data: Interval[]): number {
	const scores = data.map((interval) => interval.score);

	const sumOfAllScores = scores.reduce((accum, cur) => {
		accum += cur;
		return accum;
	}, 0);

	const allTimeAverageScore = Math.floor(sumOfAllScores / scores.length);
	return allTimeAverageScore;
}
