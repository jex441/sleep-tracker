type TimeValuePair = [string, number];

export default interface TimeSeries {
	tnt: TimeValuePair[];
	tempRoomC: TimeValuePair[];
	tempBedC: TimeValuePair[];
	respitoryRate: TimeValuePair[];
	heartRate: TimeValuePair[];
	heating: TimeValuePair[];
	[key: string]: any;
}
