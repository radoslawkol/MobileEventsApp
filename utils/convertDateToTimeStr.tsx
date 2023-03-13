export function convertDateToTimeStr(date: Date) {
	return `
		${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`;
}
