import axios from "axios";
import { useEffect } from "react";
import { API_URL, GOOGLE_MAPS_API_KEY } from "@env";

export function useGetEventDetails(
	setData: React.Dispatch<React.SetStateAction<never[]>>,
	setError: React.Dispatch<React.SetStateAction<string>>,
	eventId?: string
) {
	async function fetchEvents() {
		try {
			const res = await axios.get(`${API_URL}/events/${eventId}`);

			if (res.status === 200) {
				const event = await convertDetails(res.data.data);
				setData(event);
			}
		} catch (err) {
			setError(err);
			console.log(err);
		}
	}

	useEffect(() => {
		fetchEvents();
	}, []);
}

async function convertDetails(event) {
	try {
		const res = await axios.get(
			`https://maps.googleapis.com/maps/api/geocode/json?latlng=${event.coordinates.latitude},${event.coordinates.longitude}&key=${GOOGLE_MAPS_API_KEY}`
		);
		console.log(res.data.results[0].formatted_address);
		const address = res.data.results[0].formatted_address
			.split(", ")
			.slice(0, 2)
			.join(", ");

		const convertedEvent = {
			_id: event._id,
			coordinates: event.coordinates,
			address,
			eventName: event.eventName,
			description: event.description,
			price: event.price,
			maxMembers: event.maxMembers,
			time: event.eventDatetime.slice(12, 16),
			date: event.eventDatetime.slice(0, 10).split("-").reverse().join("."),
		};
		console.log(convertedEvent);
		return convertedEvent;
	} catch (err) {
		console.log(err);
	}
}
