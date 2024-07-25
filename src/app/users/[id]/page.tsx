import { getUserAverages } from "../../_lib/data";

export default async function User({ params }: { params: { id: string } }) {
	const data = await getUserAverages(params.id);
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			Render single user data
		</main>
	);
}
