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
		<select
			name="intervals"
			id="intervals"
			defaultValue={searchParams.get("query")?.toString()}
			onChange={(val) => handleSearch(val)}
		>
			{intervals.map((interval: string) => (
				<option key={interval} value={interval}>
					{interval}
				</option>
			))}
		</select>
	);
}
