import { getUsers } from "@/app/_lib/requests";

export default async function Home() {
	const data = await getUsers();
	console.log(data);
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			Render aggregate user data
			{data}
		</main>
	);
}
