import { useContext } from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { AuthContext } from "../store/authContext";
import * as SecureStore from "expo-secure-store";

export default function LogoutBtn() {
	const [state, dispatch] = useContext(AuthContext);

	async function logoutHandler() {
		dispatch({ type: "LOGOUT" });
		await SecureStore.deleteItemAsync("token");
	}

	return (
		<Pressable onPress={logoutHandler} style={styles.button}>
			<View>
				<MaterialIcons name='logout' size={24} color={Colors.secondary} />
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		paddingHorizontal: 10,
		marginRight: 10,
	},
});
