"use client";

import React from "react";
import Box from "@mui/material/Box";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";

export default function SparkLineChartComponent({
	data,
}: {
	data: [string, number][];
}) {
	let newData: { x: string; y: number }[] = [];

	let datas = data.map(([timestamp, val]) => {
		return val;
	});
	return (
		<Box
			sx={{
				flexGrow: 1,
				backgroundColor: "#2C3D4F",
				opacity: 0.9,
				borderRadius: 2,
				height: "120px",
				width: "100%",
				padding: "10px",
			}}
		>
			<SparkLineChart data={datas} height={100} />
		</Box>
	);
}
