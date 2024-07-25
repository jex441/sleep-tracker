import React from "react";
import Image from "next/image";
import heart from "/public/heart.png";
import temp from "/public/temp.png";
import Interval from "../_types/Interval";

export default function MetricsCard({
	score,
	avgHeartRate,
	avgTempBedC,
}: {
	score: number;
	avgHeartRate: number;
	avgTempBedC: number;
}) {
	const scoreColor = score < 60 ? "#FA5555" : "#2C3D4F";
	return (
		<article className="rounded-lg w-[15%] bg-white/90 flex items-center justify-start p-1 lg:p-2 flex-col drop-shadow-md">
			<span className="hidden lg:block text-xs text-secondary lg:text-sm">
				Sleep Score
			</span>
			<span
				className={`lg:text-[24px] font-bold`}
				style={{ color: scoreColor }}
			>
				{score}
			</span>
			<div className="flex flex-col lg:flex-row lg:justify-around w-full">
				<span className="flex text-secondary justify-around flex-row items-center gap-1 text-sm">
					<span>
						<Image
							alt="average heart rate"
							className="h-3 w-auto"
							src={heart}
						/>
					</span>
					<span>{avgHeartRate}</span>
				</span>
				<span className="flex text-secondary flex-row justify-between items-center gap-1 text-sm">
					<span>
						<Image alt="average bed temp C" className="h-4 w-auto" src={temp} />
					</span>
					<span>{avgTempBedC} °</span>
				</span>
			</div>
		</article>
	);
}
