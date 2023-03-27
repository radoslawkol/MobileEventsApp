import { API_URL } from "@env";
import axios from "axios";

type Event = {
	_id: string;
	eventName: string;
	eventDatetime: string;
};

export async function followingHelper(
	id: string,
	callback: () => void,
	token: string
) {
	try {
		const res = await axios.patch(
			`${API_URL}/followed-events`,
			{
				eventId: id,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (res.status === 200) {
			callback();
		}
	} catch (err) {
		console.log(err);
	}
}
