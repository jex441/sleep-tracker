"use client";

import { PieChart } from "@mui/x-charts/PieChart";

import React from "react";
import secondsConverter from "@/app/_lib/utils/secondsConverter";
import Image from "next/image";
import heart from "/public/heart.png";
import temp from "/public/temp.png";
import resp from "/public/heart.png";
import bed from "/public/bedtemp.png";
import sleep from "/public/sleep.png";
import AppPieChart from "./AppPieChart";

export default function UserIntervalSummary({
	score,
	totalSleepTime,
	totalDeepSleepTime,
	totalIntervalTime,
	totalAwakeTime,
	totalLightSleepTime,
	intervalAverageHeartRate,
	intervalAverageRespiratoryRate,
	intervalAverageTempRoomC,
	intervalAverageTempBedC,
	totalOutTime,
}: {
	score: number;
	totalDeepSleepTime: number;
	totalIntervalTime: number;
	totalLightSleepTime: number;
	totalAwakeTime: number;
	intervalAverageTempRoomC: number;
	totalSleepTime: number;
	intervalAverageHeartRate: number;
	intervalAverageRespiratoryRate: number;
	intervalAverageTempBedC: number;
	totalOutTime: number;
}) {
	const deepPercent = (totalDeepSleepTime / totalIntervalTime) * 100;
	const awakePercent = (totalAwakeTime / totalIntervalTime) * 100;
	const lightPercent = (totalLightSleepTime / totalIntervalTime) * 100;
	const outPercent = (totalOutTime / totalIntervalTime) * 100;
	const time = secondsConverter(totalSleepTime);

	const pieData = [
		{ value: deepPercent, color: "#2C3D4F" },
		{ value: lightPercent, color: "#3A648C" },
		{ value: awakePercent, color: "#E3B279" },
		{ value: outPercent, color: "#535454" },
	];

	const scoreColor = () => {
		if (score < 50) {
			return "#FA8B6C";
		}
		if (score < 70) {
			return "#E3B279";
		} else {
			return "#2C3D4F";
		}
	};
	const color = scoreColor();

	const caption = () => {
		if (score < 50) {
			return "Poor";
		}
		if (score < 70) {
			return "Not Great";
		} else {
			return "Good";
		}
	};

	return (
		<div className="hidden h-[550px] w-[400px] shadow-lg bg-white/90 text-deep md:flex flex-col p-4 flex justify-center items-center rounded-lg">
			<AppPieChart
				totalDeepSleepTime={totalDeepSleepTime}
				totalIntervalTime={totalIntervalTime}
				totalAwakeTime={totalAwakeTime}
				totalLightSleepTime={totalLightSleepTime}
				totalOutTime={totalOutTime}
			/>
			<span className="text-center">
				<span className="text-lightgray sleep-score">Sleep Fitness Score</span>
				<h1 className="text-[58px]" style={{ color: color }}>
					{score}
				</h1>
				<span style={{ color: color }}>{caption()}</span>
			</span>
			<span className="flex flex-row mt-4">
				<h2 className="text-[34px] mr-1">
					{time[0]}
					<span className="text-lightgray">hr </span>
				</h2>
				<h2 className="text-[34px]">
					{time[1]}
					<span className="text-lightgray">min</span>
				</h2>
			</span>
			<span className="flex flex-row justify-around my-4 w-full items-center">
				<span className="flex justify-center gap-2 items-center">
					<Image alt="avgHeartRate" width={22} height={22} src={heart} />
					<h2 className="text-[28px]">{intervalAverageHeartRate}</h2>
				</span>
				<span className="flex justify-center gap-2 items-center">
					<Image alt="avgHeartRate" width={22} height={22} src={temp} />
					<h2 className="text-[28px]">{intervalAverageTempRoomC}°</h2>
				</span>
				<span className="flex justify-center gap-2 items-center">
					<Image alt="avgHeartRate" width={22} height={22} src={bed} />
					<h2 className="text-[28px]">{intervalAverageTempBedC}°</h2>
				</span>
			</span>
		</div>
	);
}
