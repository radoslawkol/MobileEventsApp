import axios from "axios";
import { API_URL } from "@env";
import { useEffect } from "react";
import { IEvent } from "../interfaces/IEvent";

export function useGetEvents(
	setEvents: React.Dispatch<React.SetStateAction<never[]>>,
	setError: React.Dispatch<React.SetStateAction<string>>
) {
	async function fetchEvents() {
		try {
			const res = await axios.get(`${API_URL}/events`);

			if (res.status === 200) {
				setEvents(res.data.data);
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
