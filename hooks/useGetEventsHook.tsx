import axios from "axios";
import { API_URL } from "@env";
import { useEffect } from "react";

export function useGetEvents(
	setData: React.Dispatch<React.SetStateAction<never[]>>,
	setError: React.Dispatch<React.SetStateAction<string>>,
	eventId?: string
) {
	async function fetchEvents() {
		try {
			const res = await axios.get(
				`${API_URL}/events/${eventId ? eventId : ""}`
			);

			if (res.status === 200) {
				setData(res.data.data);
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
