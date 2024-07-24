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

	return basicUsersData;
};
