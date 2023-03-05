import { View, Text, TextInput, StyleSheet, Image, Button } from "react-native";
import Colors from "../constants/Colors";
import MapView, { Marker, Callout } from "react-native-maps";
import { useState } from "react";
import OutlineButton from "../components/ui/OutlineButton";
import IconButton from "../components/ui/IconButton";

interface IProps {
	navigation: { navigate: (screen: string) => void };
}

const region = {
	latitude: 37.65,
	longitude: -122.32,
	latitudeDelta: 0.0922,
	longitudeDelta: 0.0421,
};

const markersData = [
	{
		index: 0,
		latlng: {
			latitude: 37.772275,
			longitude: -122.392992,
		},
		title: "Rock Festival San Francisco",
		description: "Super event",
	},
	{
		index: 1,
		latlng: {
			latitude: 37.972275,
			longitude: -122.392992,
		},
		title: "Folk Music Festival",
		description: "Super event For fans das d sajd sa jdj saj da",
	},
	{
		index: 2,
		latlng: {
			latitude: 36.772275,
			longitude: -120.392992,
		},
		title: "Classical Music Concert",
		description: "Long Street 54",
	},
];

export default function HomeScreen({ navigation }: IProps) {
	const [markers, setMarkers] = useState(markersData);
	function navigateHandler() {
		navigation.navigate("Detail");
	}

	return (
		<View>
			<View style={styles.inputContainer}>
				<TextInput
					placeholder='Search for a city'
					style={styles.input}
					placeholderTextColor={Colors.secondary}
				/>
			</View>
			<MapView
				zoomEnabled={true}
				scrollEnabled={true}
				showsScale={true}
				loadingIndicatorColor='#666666'
				loadingBackgroundColor='#eeeeee'
				moveOnMarkerPress={false}
				showsCompass={true}
				provider='google'
				style={styles.map}
				initialRegion={region}
			>
				{markers.map((marker, index) => (
					<Marker
						key={marker.index}
						coordinate={marker.latlng}
						title={marker.title}
						description={marker.description}
						icon={require("../assets/images/location.png")}
					>
						<Callout tooltip onPress={navigateHandler}>
							<View style={styles.labelContainer}>
								<View>
									<Text style={styles.labelTitle}>{marker.title}</Text>
								</View>
							</View>
						</Callout>
					</Marker>
				))}
			</MapView>
			<Button title='Go to detail page' onPress={navigateHandler} />
		</View>
	);
}

const styles = StyleSheet.create({
	inputContainer: {
		margin: 30,
	},
	input: {
		padding: 8,
		fontSize: 16,
		color: Colors.secondary,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: Colors.secondary,
	},
	map: {
		width: "100%",
		height: "100%",
	},
	labelContainer: {
		padding: 6,
		borderRadius: 5,
		backgroundColor: Colors.secondary,
	},
	labelTitle: {
		color: Colors.textLight,
	},
});
