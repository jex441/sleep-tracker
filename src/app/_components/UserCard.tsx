import React from "react";

export default function UserCard({
	name,
	highest,
	lowest,
}: {
	name: string;
	highest: number;
	lowest: number;
}) {
	const scoreColor = (score: number) => {
		if (score < 50) {
			return "#FA8B6C";
		}
		if (score < 80) {
			return "#E3B279";
		} else {
			return "#2C3D4F";
		}
	};
	const highestColor = scoreColor(highest);
	const lowestColor = scoreColor(lowest);

	return (
		<article className="hidden text-deep text-center rounded-lg w-[15%] bg-white/95 lg:flex flex-col items-center justify-center drop-shadow-md">
			<div className="text-[18px] font-semibold username">{name}</div>
			<div className="flex flex-col justify-around text-sm w-full m-2">
				<span className="w-full flex justify-around">
					<span>highest</span>
					<span className="highest" style={{ color: highestColor }}>
						{highest}
					</span>
				</span>
				<span className="w-full flex justify-around">
					<span>lowest</span>
					<span className="lowest" style={{ color: lowestColor }}>
						{lowest}
					</span>
				</span>
			</div>
		</article>
	);
}
