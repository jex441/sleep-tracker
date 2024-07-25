"use client";

import { VictoryChart, VictoryTheme, VictoryLine } from "victory";

export default function LineChartComponent({
	data,
}: {
	data: [string, number][];
}) {
	let newData: { x: string; y: number }[] = [];

	data.map(([timestamp, val]) => {
		const date = new Date(timestamp);
		const time = date.toLocaleTimeString();

		newData.push({ x: time, y: val });
	});

	return (
		<VictoryChart height={520} width={1200} theme={VictoryTheme.material}>
			<VictoryLine
				style={{
					data: { stroke: "#fff" },
					parent: { border: "1px solid #fff" },
				}}
				data={newData}
			/>
		</VictoryChart>
	);
}
