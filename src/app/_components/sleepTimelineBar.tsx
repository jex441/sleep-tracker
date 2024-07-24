import React from "react";

export default function sleepTimeline({
	data,
}: {
	data: { stage: string; duration: number }[];
}) {
	const colors = {
		awake: "bg-yellow-400",
		light: "bg-red-300",
		deep: "bg-purple-600",
		out: "bg-white",
	};
	return (
		<div className="h-[100px] w-full bg-purple-100 flex flex-row">
			{}
			{data.map(({ stage, duration }) => {
				const color: string = colors[stage];
				const width = Math.floor(duration / 100);
				return (
					<div
						key={duration + stage}
						className={`${color} w-[1%] h-full`}
					></div>
				);
			})}
		</div>
	);
}
