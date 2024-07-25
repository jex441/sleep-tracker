import React from "react";
import Stage from "../_types/Stage";

export default function sleepTimeline({
	interval,
	totalTimeInSeconds,
	usersTotalPercentOfSession,
	startTime,
}: {
	interval: { stages: Stage[]; ts: string };
	totalTimeInSeconds: number;
	usersTotalPercentOfSession: number;
	startTime: number;
}) {
	const colors = {
		awake: "bg-[#E3B279]",
		light: "bg-[#6051F1]",
		deep: "bg-[#300395]",
		out: "bg-[#E7E6FC]",
	};
	// Render each family member's sleep timeline to begin by subtracting this family member's start
	// by the earliest interval start time.
	const delaySeconds = Math.floor((Date.parse(interval.ts) - startTime) / 1000);
	const delayPercent = (delaySeconds / totalTimeInSeconds) * 100;
	const delayString = `${delayPercent}%`;

	return (
		<div className="h-[100px] w-full bg-[#E7E6FC] flex flex-row justify-start rounded-lg">
			{/* Padding for start time delay */}
			{delayPercent > 0 && (
				<div className="" style={{ width: delayString }}></div>
			)}
			{/* Render a color coded progress bar that varies depending on the stage and its duration */}
			{interval.stages.map(({ stage, duration }) => {
				const bgcolor: string = colors[stage as keyof typeof colors];
				const percent = Math.ceil((duration / totalTimeInSeconds) * 100);
				const width = `${percent}%`;
				return (
					<div
						key={duration}
						className={`${bgcolor} block`}
						style={{ width: width }}
					></div>
				);
			})}
		</div>
	);
}
