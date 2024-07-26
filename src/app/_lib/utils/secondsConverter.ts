export default function secondsConverter(duration: number) {
	let hours = duration / 3600;
	let remainder = duration % 3600;
	let hoursNum = Math.floor(hours);
	let remainderNum = Math.floor(remainder / 60);
	return [hoursNum, remainderNum];
}
