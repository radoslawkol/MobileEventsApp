import { View, Text, StyleSheet, Button, Alert } from "react-native";
import Colors from "../constants/Colors";
import MapView, { Marker, Callout } from "react-native-maps";
import { useState } from "react";
import { IEvent } from "../interfaces/IEvent";
import { useGetEvents } from "../hooks/useGetEventsHook";

interface IProps {
	navigation: { navigate: (screen: string, param: {}) => void };
}

const region = {
	latitude: 37.65,
	longitude: -122.32,
	latitudeDelta: 1.4222,
	longitudeDelta: 0.8421,
};

export default function HomeScreen({ navigation }: IProps) {
	const [events, setEvents] = useState([]);
	const [error, setError] = useState("");

	function navigateHandler(eventId: string) {
		navigation.navigate("Detail", { eventId });
	}

	useGetEvents(setEvents, setError);

	return (
		<View>
			<>
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
					{events.map((event: IEvent, index) => (
						<Marker
							key={event._id}
							coordinate={event.coordinates}
							title={event.eventName}
							icon={require("../assets/images/location.png")}
						>
							<Callout tooltip onPress={() => navigateHandler(event._id)}>
								<View style={styles.labelContainer}>
									<View>
										<Text style={styles.labelTitle}>{event.eventName}</Text>
									</View>
								</View>
							</Callout>
						</Marker>
					))}
				</MapView>
				<Button title='Go to detail page' onPress={navigateHandler} />
				{error &&
					Alert.alert("Cannot fetch events.", error, [
						{
							text: "Try again",
							onPress: () => useGetEvents(setEvents, setError),
						},
					])}
			</>
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
