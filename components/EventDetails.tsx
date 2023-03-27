import { View, StyleSheet } from "react-native";
import HeadingIcon from "./ui/HeadingIcon";
import Colors from "../constants/Colors";

interface IProps {
	address: string;
	date: string;
	time: string;
	price: number;
	maxMembers: number;
	style?: object;
}

export default function EventDetails({
	address,
	date,
	time,
	price,
	maxMembers,
	style,
}: IProps) {
	return (
		<View style={[styles.detailsContainer, style]}>
			<HeadingIcon
				style={[styles.textItem]}
				icon='location-outline'
				size={22}
				color={Colors.secondary}
			>
				{address}
			</HeadingIcon>
			<HeadingIcon
				style={styles.textItem}
				icon='calendar'
				size={20}
				color={Colors.secondary}
			>
				{date}
			</HeadingIcon>
			<HeadingIcon
				style={styles.textItem}
				icon='clockcircleo'
				size={20}
				color={Colors.secondary}
			>
				{time}
			</HeadingIcon>
			<HeadingIcon
				style={styles.textItem}
				icon='cash-outline'
				size={20}
				color={Colors.secondary}
			>
				{price}$
			</HeadingIcon>
			<HeadingIcon
				style={styles.textItem}
				icon='user'
				size={20}
				color={Colors.secondary}
			>
				{maxMembers}
			</HeadingIcon>
		</View>
	);
}

const styles = StyleSheet.create({
	textItem: {
		marginBottom: 6,
		fontSize: 16,
		color: Colors.textDark,
	},
	detailsContainer: {
		marginVertical: 30,
	},
});
