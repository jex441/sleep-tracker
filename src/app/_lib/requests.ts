import { baseUrl } from "./config";

// get users
export const getUsers = async () => {
	const response = await fetch(`${baseUrl}/users.json`);
	return await response.text();
};

export const getUser = async (id: string) => {
	const response = await fetch(`${baseUrl}/users.json`);
	// const userData = response.json().filter((user) => user.id === id);
	return await response.text();
};

// get individual user and sleep data by user id
export const getSleepData = async (userId: string) => {
	const response = await fetch(`${baseUrl}/sleep?userId=${userId}.json`);
	return await response.text();
};
