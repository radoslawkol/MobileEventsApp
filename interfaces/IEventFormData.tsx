export interface IEventFormData {
	eventName: string;
	description: string;
	price: string;
	maxMembers: string;
	eventDate: Date;
	eventTime: Date;
	coordinates: {
		latitude: number;
		longitude: number;
	};
}
