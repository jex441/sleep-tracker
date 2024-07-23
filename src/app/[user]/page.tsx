import { getUser } from "../_lib/requests";

export default async function User({ params }: { params: { user: string } }) {
	const data = await getUser(params.user);
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			Render single user data
		</main>
	);
}
