import { getUsers, getUserSleepData } from "./requests";
import { basicUserSleepData } from "./utils/basicUserSleepData";

export const getIntervalIds = async (
	userId: string | null = null
): Promise<[]> => {
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

export const getUsersOverview = async (intervalId: string | null = null) => {
	// get basic data for each user
	//return one object with basic data for each user for home page. should paginate based on date (interval)

	const users = await getUsers();
	// const intervals = await getIntervals();

	const basicUsersData = await Promise.all(
		users.map(async (user) => await basicUserSleepData(user.id, intervalId))
	);

	// need earliest start time, longest duration
	// make a timeline, then map sessions with colored divs accordingly
	let startTime: number = Infinity;
	let endTime: number = -Infinity;

	//earliest start time
	basicUsersData.map((userData) => {
		const stamp = Date.parse(userData.intervals[0].ts);
		const currentEarliest = startTime;
		if (stamp < currentEarliest) {
			startTime = stamp;
		}
	});

	basicUsersData.map((userData) => {
		const start = Date.parse(userData.intervals[0].ts);
		const userSessionTime = userData.intervals[0].totalSessionTime * 1000;
		const total = start + userSessionTime;
		if (total > endTime) {
			endTime = total;
		}
	});

	const totalTimeInSeconds = (endTime - startTime) / 1000;

	const response = {
		totalTimeInSeconds: totalTimeInSeconds,
		startTime: startTime,
		endTime: endTime,
		users: basicUsersData,
	};
	return response;
};
