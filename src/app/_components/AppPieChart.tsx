"use client";

import { PieChart } from "@mui/x-charts/PieChart";

import React from "react";
import secondsConverter from "@/app/_lib/utils/secondsConverter";
import Image from "next/image";
import heart from "/public/heart.png";
import temp from "/public/temp.png";
import bed from "/public/bedtemp.png";

export default function AppPieChart({
	totalDeepSleepTime,
	totalIntervalTime,
	totalAwakeTime,
	totalLightSleepTime,
	totalOutTime,
}: {
	totalDeepSleepTime: number;
	totalIntervalTime: number;
	totalLightSleepTime: number;
	totalAwakeTime: number;
	totalOutTime: number;
}) {
	const deepPercent = Math.floor(
		(totalDeepSleepTime / totalIntervalTime) * 100
	);
	const awakePercent = Math.floor((totalAwakeTime / totalIntervalTime) * 100);
	const lightPercent = Math.floor(
		(totalLightSleepTime / totalIntervalTime) * 100
	);
	const outPercent = Math.floor((totalOutTime / totalIntervalTime) * 100);

	const pieData = [
		{ value: deepPercent, color: "#2C3D4F", label: "deep sleep" },
		{ value: lightPercent, color: "#3A648C", label: "light sleep" },
		{ value: awakePercent, color: "#E3B279", label: "awake" },
		{ value: outPercent, color: "#535454", label: "away" },
	];

	return (
		<PieChart
			slotProps={{
				legend: { hidden: true },
			}}
			series={[
				{
					data: pieData,
					innerRadius: 70,
					outerRadius: 90,
					paddingAngle: 2,
					cornerRadius: 2,
					startAngle: -90,
					endAngle: 360,
					cx: 180,
				},
			]}
		/>
	);
}
