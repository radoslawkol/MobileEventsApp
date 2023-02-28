import { View, Text, StyleSheet } from "react-native";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";

interface IProps {
	icon: "login" | "home" | "user" | "bookmark" | "calendar" | "clockcircleo";
	size: number;
	color: string;
	children: string;
	style?: object;
}

export default function HeadingIcon({
	icon,
	size,
	color,
	children,
	style,
}: IProps) {
	return (
		<View style={styles.container}>
			{icon === "bookmark" ? (
				<FontAwesome5 name={icon} size={size} color={color} />
			) : (
				<AntDesign name={icon} size={size} color={color} />
			)}

			<Text style={[styles.heading, style]}>{children}</Text>
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
