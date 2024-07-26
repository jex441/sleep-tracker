import React from "react";
import Image from "next/image";
import heart from "/public/heart.png";
import bedtemp from "/public/bedtemp.png";
import Interval from "../_types/Interval";

export default function MobileMetricsCard({
	score,
	name,
	avgHeartRate,
	avgTempBedC,
}: {
	name: string;
	score: number;
	avgHeartRate: number;
	avgTempBedC: number;
}) {
	const scoreColor = () => {
		if (score < 60) {
			return "#FA8B6C";
		}
		if (score < 80) {
			return "#E3B279";
		} else {
			return "#2C3D4F";
		}
	};

	const color = scoreColor();

	return (
		<article className="lg:hidden rounded-lg  bg-white/95 flex items-center justify-start p-1 gap-4 flex-row drop-shadow-md">
			<span className="px-2 text-xs font-semibold text-secondary">{name}</span>
			<div className="mx-4 flex items-center gap-2">
				<span className="text-xs text-secondary">Sleep Score</span>
				<span className="font-bold" style={{ color: color }}>
					{score}
				</span>
			</div>
			<div className="flex flex-row gap-6">
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
				<span className="flex text-secondary justify-around flex-row items-center gap-1 text-sm">
					<span>
						<Image
							alt="average bed temp C"
							className="h-4 w-auto"
							src={bedtemp}
						/>
					</span>
					<span>{avgTempBedC} °</span>
				</span>
			</div>
		</article>
	);
}
