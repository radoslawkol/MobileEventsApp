import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { API_URL } from "@env";
import { useEffect, Dispatch } from "react";

const useCheckIfUserTokenIsValid = (state: object, dispatch: Dispatch<any>) => {
	async function getUserIfTokenValid() {
		try {
			const token = await SecureStore.getItemAsync("token");
			console.log("token", token);
			if (!token) return;

			const res = await axios.get(`${API_URL}/users/current`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (res.status === 200) {
				dispatch({ type: "LOGIN", payload: res.data.data });
			}
		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {
		getUserIfTokenValid();
	}, []);
};

export default useCheckIfUserTokenIsValid;
