import React from "react";
import Stage from "../_types/Stage";

export default function SleepTimeline({
	data,
	interval,
	totalTimeInSeconds,
	startTime,
}: {
	data: any;
	interval: { stages: Stage[]; ts: string };
	totalTimeInSeconds: number;
	startTime: number;
}) {
	const colors = {
		awake: "bg-awake",
		light: "bg-light",
		deep: "bg-deep",
		out: "bg-out/50",
	};
	// Render each family member's sleep timeline to begin by subtracting this family member's start
	// by the earliest interval start time.
	const delaySeconds = Math.floor((Date.parse(interval.ts) - startTime) / 1000);
	const delayPercent = (delaySeconds / totalTimeInSeconds) * 100;
	const delayString = `${delayPercent}%`;
	return (
		<div className="lg:h-[100px] w-full bg-out/25 flex flex-row justify-start rounded-lg drop-shadow-lg">
			{/* Padding for start time delay */}
			{delayPercent > 0 && (
				<div className="" style={{ width: delayString }}></div>
			)}
			{/* Render a color coded progress bar that varies depending on the stage and its duration */}
			{interval.stages.map(({ stage, duration }, idx) => {
				const bgcolor: string = colors[stage as keyof typeof colors];
				const percent = Math.ceil((duration / totalTimeInSeconds) * 100);
				const width = `${percent}%`;
				return (
					<div
						key={String(duration) + stage}
						className={`${bgcolor} block ${idx === 0}`}
						style={{ width: width }}
					></div>
				);
			})}
		</div>
	);
}
