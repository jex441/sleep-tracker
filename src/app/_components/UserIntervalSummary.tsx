import React from "react";
import secondsConverter from "@/app/_lib/utils/secondsConverter";
import Image from "next/image";
import heartlight from "/public/heartlight.png";
import templight from "/public/templight.png";
import resplight from "/public/resplight.png";
import bedlight from "/public/bedlight.png";
import sleeplight from "/public/sleeplight.png";

export default function UserIntervalSummary({
	score,
	totalSleepTime,
	intervalAverageHeartRate,
	intervalAverageRespiratoryRate,
	intervalAverageTempBedC,
}: {
	score: number;
	totalSleepTime: number;
	intervalAverageHeartRate: number;
	intervalAverageRespiratoryRate: number;
	intervalAverageTempBedC: number;
}) {
	return (
		<div className="h-[400px] w-[400px] bg-out/90 text-white flex flex-col p-6 flex justify-center items-center rounded-lg">
			<span>
				<h1 className="text-[72px]">{score}</h1>
			</span>
			<span>
				<h2 className="text-[34px]">{secondsConverter(totalSleepTime)}</h2>
			</span>
			<span className="flex flex-row justify-between my-4 w-full items-center">
				<span className="flex justify-center gap-4 items-center">
					<Image alt="avgHeartRate" width={28} height={28} src={heartlight} />
					<h2 className="text-[32px]">{intervalAverageHeartRate}</h2>
				</span>
				<span className="flex justify-center gap-4 items-center">
					<Image alt="avgHeartRate" width={28} height={28} src={resplight} />
					<h2 className="text-[32px]">{intervalAverageRespiratoryRate}</h2>
				</span>
				<span className="flex justify-center gap-4 items-center">
					<Image alt="avgHeartRate" width={28} height={28} src={bedlight} />
					<h2 className="text-[32px]">{intervalAverageTempBedC}°</h2>
				</span>
			</span>
		</div>
	);
}
