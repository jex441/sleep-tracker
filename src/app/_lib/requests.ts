import { baseUrl } from "./config";
import User from "@/app/_types/User";
import Interval from "../_types/Interval";

export const getUsers = async (): Promise<User[]> => {
	const response = await fetch(`${baseUrl}/users.json`);
	const data = await response.json();
	return data.users;
};

export const getUser = async (id: string): Promise<User> => {
	const response = await fetch(`${baseUrl}/users.json`);
	const data = await response.json();
	const user = data.users.filter((user: User) => user.id === id);
	return user[0];
};

export const getUserSleepData = async (userId: string): Promise<Interval[]> => {
	const response = await fetch(`${baseUrl}/${userId}.json`);
	const data = await response.json();

	return data.intervals;
};
