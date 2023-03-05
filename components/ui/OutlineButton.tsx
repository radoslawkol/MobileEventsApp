import { Pressable, View, Text, StyleSheet } from "react-native";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

interface IProps {
	icon?: "user" | "map";
	size?: number;
	color?: string;
	onPress: () => void;
	children: string;
	testID?: string;
	style?: object;
}

export default function OutlineButton({
	icon,
	size,
	color,
	onPress,
	children,
	testID,
	style,
}: IProps) {
	return (
		<Pressable
			onPress={onPress}
			style={({ pressed }) => [styles.button, pressed && styles.pressed]}
			testID={testID}
		>
			<View style={[styles.container, style]}>
				{icon === "map" ? (
					<FontAwesome5 name={icon} size={size} color={color} />
				) : (
					<AntDesign name={icon} size={size} color={color} />
				)}
				<Text style={[styles.text, style]}>{children}</Text>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		alignItems: "flex-start",
	},
	container: {
		paddingVertical: 8,
		paddingHorizontal: 10,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: Colors.textLight,
		backgroundColor: "transparent",
	},
	text: {
		marginLeft: 4,
		fontSize: 16,
		color: Colors.textLight,
	},
	pressed: {
		transform: [{ scale: 0.98 }],
		opacity: 0.7,
	},
});
