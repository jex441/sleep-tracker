"use client";

import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

export default function MobileMUILineChart({
	title,
	data,
}: {
	title: string;
	data: [string, number][];
}) {
	let xAxis: number[] = [];
	let yAxis: number[] = [];
	data.map(([timestamp, val]) => {
		const time = Date.parse(timestamp);
		yAxis.push(val);
		xAxis.push(time);
	});
	return (
		<div className="h-[140px] mb-4 rounded-lg flex my-1 flex-col lg:items-start lg:justify-start bg-white/90">
			<LineChart
				margin={{ top: 10, left: 50, bottom: 20, right: 40 }}
				bottomAxis={{
					tickLabelStyle: {
						fontSize: 11,
					},
				}}
				xAxis={[
					{
						data: xAxis,
						valueFormatter: (val) => {
							const date = new Date(val);
							return date.toLocaleTimeString();
						},
					},
				]}
				series={[
					{
						curve: "linear",
						data: yAxis,
					},
				]}
				width={400}
				height={120}
			/>
		</div>
	);
}
