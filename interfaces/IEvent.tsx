export interface IEvent {
	_id: string;
	eventName: string;
	description: string;
	price: string;
	maxMembers: string;
	eventDatetime: string;
	coordinates: {
		latitude: number;
		longitude: number;
	};
}
