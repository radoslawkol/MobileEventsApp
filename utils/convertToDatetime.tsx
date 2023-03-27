export function convertToDatetime(time: Date, date: Date) {
	const convertedTime = new Date(time).toISOString().split("T")[1].slice(0);
	const convertedDate = date.toISOString().split("T")[0];
	const datetime = [convertedDate, convertedTime].join("T");

	return datetime;
}
