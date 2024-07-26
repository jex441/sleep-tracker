"use client";
import React from "react";

export default function TimeLine({
	startTime,
	endTime,
}: {
	startTime: number;
	endTime: number;
}) {
	let startTimeString = new Date(startTime).toLocaleTimeString();
	let endTimeString = new Date(endTime).toLocaleTimeString();

	let int = (endTime - startTime) / 2;
	let midTimeInt = startTime + int;
	let midTimeString = new Date(midTimeInt).toLocaleTimeString();

	let quarter = (endTime - startTime) / 4;
	let quarterTimeInt = startTime + quarter;
	let quarterTimeString = new Date(quarterTimeInt).toLocaleTimeString();

	let threeQuarterTimeInt = startTime + quarter * 3;
	let threeQuarterTimeString = new Date(
		threeQuarterTimeInt
	).toLocaleTimeString();
	return (
		<section className="border-t pt-2 w-full text-deep text-sm lg:text-md lg:w-[75%] self-center flex justify-between">
			<div>{startTimeString}</div>
			<div className="hidden lg:block">{quarterTimeString}</div>
			<div>{midTimeString}</div>
			<div className="hidden lg:block">{threeQuarterTimeString}</div>
			<div>{endTimeString}</div>
		</section>
	);
}
