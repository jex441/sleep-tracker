import React from "react";
import Image from "next/image";
import heartlight from "/public/heartlight.png";
import templight from "/public/templight.png";
import resplight from "/public/resplight.png";
import bedlight from "/public/bedlight.png";
import sleeplight from "/public/sleeplight.png";

export default function UserAveragesSummary({
	allTimeAverageScoreNum,
	allTimeAverageHeartRate,
	allTimeAverageRespiratoryRate,
	allTimeAverageTempBedC,
	allTimeAverageTempRoomC,
}: {
	allTimeAverageScoreNum: number;
	allTimeAverageHeartRate: number;
	allTimeAverageRespiratoryRate: number;
	allTimeAverageTempBedC: number;
	allTimeAverageTempRoomC: number;
}) {
	return (
		<div className="h-[200px] w-full bg-out/90 text-white flex flex-row p-8 flex justify-between items-center rounded-lg">
			<span className="flex justify-center gap-2 items-center">
				<Image alt="avgHeartRate" width={32} height={32} src={sleeplight} />
				<span>
					<h2 className="text-[42px]">{allTimeAverageScoreNum}</h2>
				</span>
			</span>
			<span className="flex justify-center gap-2 items-center">
				<Image alt="avgHeartRate" width={32} height={32} src={heartlight} />
				<span>
					<h2 className="text-[42px]">{allTimeAverageHeartRate}</h2>
				</span>
			</span>
			<span className="flex justify-center gap-2 items-center">
				<Image alt="avgHeartRate" width={32} height={32} src={resplight} />
				<span>
					<h2 className="text-[42px]">{allTimeAverageRespiratoryRate}</h2>
				</span>
			</span>
			<span className="flex justify-center gap-2 items-center">
				<Image alt="avgHeartRate" width={32} height={32} src={templight} />
				<span>
					<h2 className="text-[42px]">{allTimeAverageTempRoomC}°</h2>
				</span>
			</span>
			<span className="flex justify-center gap-2 items-center">
				<Image alt="avgHeartRate" width={32} height={32} src={bedlight} />
				<span>
					<h2 className="text-[42px]">{allTimeAverageTempBedC}°</h2>
				</span>
			</span>
		</div>
	);
}
