"use client";

import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

export default function MUILineChart({ data }: { data: [string, number][] }) {
	let newData: { x: string; y: number }[] = [];

	data.map(([timestamp, val]) => {
		const date = new Date(timestamp);
		const time = date.toLocaleTimeString();

		newData.push({ x: time, y: val });
	});
	return (
		<div className="h-[160px] rounded-lg flex items-center justify-center bg-deep/90">
			<LineChart
				xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
				series={[
					{
						data: [2, 5.5, 2, 8.5, 1.5, 5],
						color: "#fff",
					},
				]}
				// dataset={newData}
				width={700}
				height={200}
			/>
		</div>
	);
}
