"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function SelectInterval({
	text,
	intervals,
}: {
	text: string;
	intervals: string[];
}) {
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
		<div className="bg-white/90 flex flex-row items-center w-[150px] lg:w-[420px] rounded-md p-1 lg:px-4 drop-shadow-md">
			<label
				htmlFor="intervals"
				className="hidden text-sm lg:text-lg lg:block text-deep"
			>
				{text}
			</label>
			<select
				name="intervals"
				id="intervals"
				defaultValue={searchParams.get("query")?.toString()}
				onChange={(val) => handleSearch(val)}
				className="p-2 text-lg text-deep rounded-lg bg-transparent"
			>
				{intervals.map((interval: string) => (
					<option key={interval} value={interval}>
						{interval}
					</option>
				))}
			</select>
		</div>
	);
}
