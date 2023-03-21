import { View, Text, Pressable, StyleSheet, Button } from "react-native";
import Colors from "../constants/Colors";
import HeadingIcon from "./ui/HeadingIcon";
import { LinearGradient } from "expo-linear-gradient";
import OutlineButton from "./ui/OutlineButton";

interface IProps {
	item: {
		id: string;
		eventName: string;
		eventDatetime: string;
		date: string;
	};
}
export default function FavouriteCard({ item }: IProps) {
	const unfollowHandler = () => {
		console.log("unfollow");
	};
	return (
		<Pressable
			style={({ pressed }) => [styles.card, pressed && styles.pressed]}
		>
			<LinearGradient
				colors={["rgba(32, 28, 189, 1)", "rgba(69, 19, 176, 0.79)"]}
				style={styles.container}
			>
				<Text style={styles.name}>{item.eventName}</Text>
				<View style={styles.info}>
					<HeadingIcon
						icon='calendar'
						size={20}
						color={Colors.textLight}
						style={styles.date}
					>
						{item.eventDatetime.slice(0, 10).split("-").reverse().join("-")}
					</HeadingIcon>
					<HeadingIcon
						icon='clockcircleo'
						size={20}
						color={Colors.textLight}
						style={styles.time}
					>
						{item.eventDatetime.slice(11, -8)}
					</HeadingIcon>
					<OutlineButton color={Colors.textLight} onPress={unfollowHandler}>
						Unfollow
					</OutlineButton>
				</View>
			</LinearGradient>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	card: {
		marginBottom: 20,
		borderRadius: 10,
		elevation: 4,
		shadowColor: Colors.secondary,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 6,
		shadowOpacity: 0.25,
	},
	pressed: {
		backgroundColor: Colors.secondary,
	},
	container: {
		padding: 16,
		borderRadius: 10,
	},
	name: {
		marginBottom: 10,
		fontSize: 20,
		color: Colors.textLight,
	},
	date: {
		fontSize: 16,
		color: Colors.textLight,
	},
	time: {
		fontSize: 16,
		color: Colors.textLight,
	},
	info: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
});
