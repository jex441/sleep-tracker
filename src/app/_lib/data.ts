import { getUsers, getUserSleepData } from "./requests";
import { basicUserSleepData } from "./utils/basicUserSleepData";
import allTimeAverageTimeSeries from "./utils/allTimeAverageTimeSeries";
import allTimeAverageScore from "./utils/allTimeAverageScore";
import intervalSleepTimes from "./utils/intervalSleepTimes";
import intervalAverageTimeSeries from "./utils/intervalAverageTimeSeries";
import Interval from "@/app/_types/Interval";

// For getting the intervals to populate the drop down navigation
export const getIntervalIds = async (): Promise<[]> => {
	const users = await getUsers();

	const data = await Promise.all(
		users.map(async (user) => await getUserSleepData(user.id))
	);

	const intervalsSet = new Set();

	data.forEach((userSleepInterval) => {
		userSleepInterval.forEach((interval) => {
			const id = interval.ts.split("T")[0];
			if (!intervalsSet.has(id)) {
				intervalsSet.add(id);
				return;
			}
		});
	});

	return Array.from(intervalsSet) as [];
};

// For getting basic data about all users for one given interval (Home page data)
export const getUsersOverview = async (intervalId: string | null = null) => {
	const users = await getUsers();

	// Get basic data for each user:
	const basicUsersData = await Promise.all(
		users.map(async (user) => await basicUserSleepData(user.id, intervalId))
	);

	let startTime: number = Infinity;
	let endTime: number = -Infinity;

	// Determine earliest interval start time for the chosen day
	basicUsersData.map((userData) => {
		const stamp = Date.parse(userData.intervals[0].ts);
		const currentEarliest = startTime;
		if (stamp < currentEarliest) {
			startTime = stamp;
		}
	});

	// Determine time at which the last person ended their session for this interval
	basicUsersData.map((userData) => {
		const start = Date.parse(userData.intervals[0].ts);
		const userSessionTime = userData.intervals[0].totalSessionTime * 1000;
		const total = start + userSessionTime;
		if (total > endTime) {
			endTime = total;
		}
	});

	// Total session time from first in to last out. To be used for rendering the timeline:
	const totalTimeInSeconds = (endTime - startTime) / 1000;

	const response = {
		totalTimeInSeconds: totalTimeInSeconds,
		startTime: startTime,
		endTime: endTime,
		users: basicUsersData,
	};
	return response;
};

// For getting all of a user's time series averages across intervals
export const userTimeSeriesAverages = async (userId: string) => {
	const data = await getUserSleepData(userId);
	const allTimeAverageHeartRate = allTimeAverageTimeSeries(data, "heartRate");
	const allTimeAverageRespiratoryRate = allTimeAverageTimeSeries(
		data,
		"respiratoryRate"
	);
	const allTimeAverageTempBedC = allTimeAverageTimeSeries(data, "tempBedC");
	const allTimeAverageTempRoomC = allTimeAverageTimeSeries(data, "tempRoomC");
	// const allTimeAverageTnt = allTimeAverageTimeSeries(data, "tnt"); returns 1

	const allTimeAverageScoreNum = allTimeAverageScore(data);
	const sleepTimes = intervalSleepTimes(data[0]);

	return {
		allTimeAverageHeartRate,
		allTimeAverageRespiratoryRate,
		allTimeAverageScoreNum,
		allTimeAverageTempBedC,
		allTimeAverageTempRoomC,
	};
};

// For getting the time series averages of a single sleep interval
export const userIntervalTimeSeriesAverages = async (
	userId: string,
	intervalId: string
) => {
	const data = await getUserSleepData(userId, intervalId);
	const intervalAverageHeartRate = intervalAverageTimeSeries(
		data[0],
		"heartRate"
	);
	const intervalAverageRespiratoryRate = intervalAverageTimeSeries(
		data[0],
		"respiratoryRate"
	);
	const intervalAverageTempBedC = intervalAverageTimeSeries(
		data[0],
		"tempBedC"
	);
	const intervalAverageTempRoomC = intervalAverageTimeSeries(
		data[0],
		"tempRoomC"
	);

	return {
		intervalAverageHeartRate,
		intervalAverageRespiratoryRate,
		intervalAverageTempBedC,
		intervalAverageTempRoomC,
	};
};

// For getting detailed data about a single user's sleep interval
export const getUserIntervalReport = async (
	userId: string,
	intervalId: string
) => {
	const interval: Interval[] = await getUserSleepData(userId, intervalId);

	const intervalSleepTimesData = intervalSleepTimes(interval[0]);
	const intervalTimeSeriesAveragesData = await userIntervalTimeSeriesAverages(
		userId,
		intervalId
	);

	const basicIntervalData = await basicUserSleepData(userId, intervalId);

	return {
		...basicIntervalData,
		...intervalSleepTimesData,
		...intervalTimeSeriesAveragesData,
	};
};

// For getting averages of all of a user's timeseries data across intervals
// I believe this is redundant given we already have userTimeSeriesAverages
export const getUserAllTimeAverages = async (userId: string) => {
	const timeSeriesAverages = userTimeSeriesAverages(userId);
	return timeSeriesAverages;
};
