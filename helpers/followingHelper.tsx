import { API_URL } from "@env";
import axios from "axios";

type Event = {
	_id: string;
	eventName: string;
	eventDatetime: string;
};

export async function followingHelper(
	id: string,
	setData: React.Dispatch<React.SetStateAction<Event[]>>,
	token: string
) {
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
		setData((prev) => [...prev].filter((event) => event._id !== id));
	}

	console.log(res);
}
