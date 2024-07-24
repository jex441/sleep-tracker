import { getUsers } from "./requests";
import { basicUserSleepData } from "./utils/basicUserSleepData";
import User from "@/app/_types/User";

export const getUsersOverview = async () => {
	// get basic data for each user
	//return one object with basic data for each user for home page. should paginate based on date (interval)

	const users = await getUsers();

	const basicUsersData = await Promise.all(
		users.map(async (user) => await basicUserSleepData(user.id))
	);

	return basicUsersData;
};

/*

{intervals: [ {
    date: mm-dd-yy formatted,
users: [
    {
        id: 1,
        name: 'jon',
        sleepData: {
            score: 99, 
            avgHeartRate: 15 round num,
            stages: [{stage, duration}]
        }
    },
     id: 2,
        name: 'jan',
        sleepData: {
            score: 91, 
            avgHeartRate: 12,
            stages: [{stage, duration}]
        }
],],},
}...
    */
