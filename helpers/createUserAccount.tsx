import axios from "axios";
import { API_URL } from "@env";
import * as SecureStore from "expo-secure-store";
import { INavigation } from "../interfaces/INavigation";
import { FormData } from "../interfaces/FormData";

export const createUserAccount = async (
	data: FormData,
	setError: (error: string) => void,
	state: object | null,
	dispatch: React.Dispatch<any>,
	navigation: INavigation
) => {
	try {
		setError("");

		const formData = {
			firstName: data.firstName,
			surname: data.surname,
			email: data.email,
			password: data.password,
		};
		console.log(formData);

		const res = await axios.post(`${API_URL}/signup`, formData, {
			headers: {
				"Content-Type": "application/json",
			},
		});

		console.log(res);
		if (res.status === 200) {
			const { data } = res.data;
			console.log(data);
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
