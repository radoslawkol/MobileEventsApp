export interface EventFormData {
	eventName: string;
	description: string;
	price: string;
	maxMembers: string;
	eventDate: Date;
	eventTime: Date;
	coordinates: {
		lat: number;
		lng: number;
	};
}
