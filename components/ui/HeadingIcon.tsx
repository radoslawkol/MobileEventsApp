import { View, Text, StyleSheet } from "react-native";
import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons";

interface IProps {
	icon:
		| "login"
		| "home"
		| "user"
		| "bookmark"
		| "calendar"
		| "clockcircleo"
		| "location-outline"
		| "user"
		| "cash-outline" | "pluscircleo";
	size: number;
	color: string;
	children: React.ReactNode;
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
			) : icon === "location-outline" ? (
				<Ionicons
					name={icon}
					size={size}
					color={color}
					style={styles.translateLeft}
				/>
			) : icon === "cash-outline" ? (
				<Ionicons name={icon} size={size} color={color} />
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
	translateLeft: {
		transform: [{ translateX: -2 }],
	},
});
