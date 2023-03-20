import { INavigation } from "../interfaces/INavigation";
import { API_URL } from "@env";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const loginUser = async (
	data: FormData,
	setError: (error: string) => void,
	state: object | null,
	dispatch: React.Dispatch<any>,
	navigation: INavigation
) => {
	try {
		setError("");
		console.log(data);

		const res = await axios.post(`${API_URL}/login`, data, {
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (res.status === 200) {
			console.log(res.data.data);
			const { data } = res.data;
			dispatch({ type: "LOGIN", payload: data });

			await SecureStore.setItemAsync("token", data.token);

			if (state) {
				navigation.navigate("AccountScreen");
			}
		}
	} catch (err) {
		setError(err.response.data.message);
		console.log(err.response.data.message);
	}
};
