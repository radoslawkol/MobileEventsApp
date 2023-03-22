import { IEventFormData } from "../interfaces/IEventFormData";
import { convertToDatetime } from "../utils/convertToDatetime";
import { API_URL } from "@env";
import axios from "axios";
import { INavigation } from "../interfaces/INavigation";

export async function createEvent(
	data: IEventFormData,
	token: string,
	setShowSuccessModal: React.Dispatch<React.SetStateAction<boolean>>,
	setError: (error: string) => void,
	navigation: INavigation
) {
	try {
		const {
			eventName,
			price,
			maxMembers,
			description,
			eventDate,
			eventTime,
			coordinates,
		} = data;

		const eventDatetime = convertToDatetime(eventTime, eventDate);

		const res = await axios.post(
			`${API_URL}/events`,
			{
				eventName,
				price,
				maxMembers,
				description,
				eventDatetime,
				coordinates,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (res.status === 200) {
			setShowSuccessModal(true);
			navigation.navigate("Home");
		}
	} catch (err) {
		setError(err.response.data.message);
		console.log(err);
	}
}
