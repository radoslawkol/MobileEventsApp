import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import HeadingIcon from "../components/ui/HeadingIcon";
import IconButton from "../components/ui/IconButton";
import OutlineButton from "../components/ui/OutlineButton";
import Colors from "../constants/Colors";

interface IProps {
	navigation: { navigate: (screen: string) => void };
}

export default function DetailScreen({ navigation }: IProps) {
	function navigateHandler() {
		navigation.navigate("ViewMap");
	}

	function followHandler() {
		console.log("followed");
	}

	return (
		<ScrollView style={styles.container}>
			<View>
				<Image
					style={styles.image}
					source={{
						uri: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
					}}
				/>
			</View>

			<View>
				<Text style={styles.title}>San Francisco Rock Festival</Text>
				<Text style={styles.description}>
					Lorem ipsum dolor sit amet consectetur. Morbi velit tortor eget sit
					enim. Proin etiam vestibulum tincidunt fermentum faucibus. Tempor in
					id neque enim. Maecenas pretium ultrices eleifend aenean mattis non
					enim. Et nam vitae elit dictumst aliquet elit tempor pulvinar magnis.
					Volutpat diam at dictum ultrices.
				</Text>
			</View>
			<View style={styles.detailsContainer}>
				<HeadingIcon
					style={styles.textItem}
					icon='location-outline'
					size={24}
					color={Colors.secondary}
				>
					San Francisco, Long Street 34
				</HeadingIcon>
				<HeadingIcon
					style={styles.textItem}
					icon='calendar'
					size={20}
					color={Colors.secondary}
				>
					23.02.2023
				</HeadingIcon>
				<HeadingIcon
					style={styles.textItem}
					icon='clockcircleo'
					size={20}
					color={Colors.secondary}
				>
					14.30
				</HeadingIcon>
				<HeadingIcon
					style={styles.textItem}
					icon='cash-outline'
					size={20}
					color={Colors.secondary}
				>
					25$
				</HeadingIcon>
				<HeadingIcon
					style={styles.textItem}
					icon='user'
					size={20}
					color={Colors.secondary}
				>
					1550
				</HeadingIcon>
			</View>
			<View style={styles.buttonContainer}>
				<IconButton
					icon='user'
					size={20}
					color={Colors.textLight}
					onPress={followHandler}
				>
					Follow
				</IconButton>
				<OutlineButton
					icon='map'
					style={styles.outlineBtn}
					size={20}
					color={Colors.secondary}
					onPress={navigateHandler}
				>
					View on Map
				</OutlineButton>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		marginVertical: 30,
		paddingHorizontal: 32,
	},
	image: {
		width: "100%",
		height: 200,
		borderRadius: 20,
	},
	title: {
		marginTop: 30,
		marginBottom: 16,
		fontSize: 22,
		fontWeight: "bold",
		color: Colors.textDark,
	},
	description: {
		fontSize: 16,
		color: Colors.textDark,
		letterSpacing: 1,
		lineHeight: 20,
	},
	textItem: {
		marginBottom: 6,
		fontSize: 16,
		color: Colors.textDark,
	},
	detailsContainer: {
		marginVertical: 30,
	},
	buttonContainer: {
		width: 250,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	outlineBtn: {
		color: Colors.secondary,
		borderColor: Colors.secondary,
	},
});
