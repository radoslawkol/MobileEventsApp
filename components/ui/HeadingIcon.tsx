import { View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface IProps {
	icon: "login" | "home" | "user";
	size: number;
	color: string;
	children: string;
}

export default function HeadingIcon({ icon, size, color, children }: IProps) {
	return (
		<View style={styles.container}>
			<AntDesign name={icon} size={size} color={color} />
			<Text style={styles.heading}>{children}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
	},
	heading: {
		marginLeft: 4,
		fontSize: 18,
	},
});
