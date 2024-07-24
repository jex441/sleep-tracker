import { getUsersOverview } from "@/app/_lib/data";

export default async function Home() {
	const data = await getUsersOverview();
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			Render aggregate user data
		</main>
	);
}
