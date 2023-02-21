import { Pressable, View, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

export default function LogoutBtn() {
	function logoutHandler() {}
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
