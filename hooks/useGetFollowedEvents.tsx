import axios from "axios";
import { API_URL } from "@env";
import { useEffect } from "react";

export function useGetFollowedEvents(
	token: string,
	setData: React.Dispatch<React.SetStateAction<never[]>>
) {
	async function getFavourites() {
		try {
			const res = await axios.get(`${API_URL}/followed-events`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (res.status === 200) {
				setData(res.data.data);
			}
		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {
		getFavourites();
	}, []);
}
