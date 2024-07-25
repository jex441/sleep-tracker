"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function SelectInterval({ intervals }: { intervals: string[] }) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	async function handleSearch(event: React.ChangeEvent<HTMLSelectElement>) {
		const params = new URLSearchParams(searchParams);
		if (event.target.value) {
			params.set("query", event.target.value);
		} else {
			params.delete("query");
		}
		replace(`${pathname}?${params.toString()}`);
	}

	return (
		<>
			<label htmlFor="intervals" className="text-lg text-white">
				Your family{"'"}s sleep data for
			</label>
			<select
				name="intervals"
				id="intervals"
				defaultValue={searchParams.get("query")?.toString()}
				onChange={(val) => handleSearch(val)}
				className="p-2 text-lg mx-1 text-white rounded-lg bg-transparent"
			>
				{intervals.map((interval: string) => (
					<option key={interval} value={interval}>
						{interval}
					</option>
				))}
			</select>
		</>
	);
}
