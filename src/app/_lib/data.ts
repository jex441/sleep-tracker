"use server";

import { getUsers, getUserSleepData } from "./requests";
import { basicUserSleepData } from "./utils/basicUserSleepData";

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
