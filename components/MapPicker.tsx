import { StyleSheet, View, Text } from "react-native";
import { useState } from "react";
import MapView, { MapPressEvent, Marker, Callout } from "react-native-maps";
import Colors from "../constants/Colors";

type Coordinates = {
	latitude: number;
	longitude: number;
};

type LatLng = {
	lng: number;
	lat: number;
};

type ErrorObject = {
	[key: string]: {
		message: string;
		type: string;
	};
};

interface IProps {
	setValue: (name: "coordinates", coordinates: Coordinates) => void;
	errors: ErrorObject;
}

export default function MapPicker({ setValue, errors }: IProps) {
	const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(null);
	const region = {
		latitude: 37.78825,
		longitude: -122.4324,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	};

	function selectLocationHandler(event: MapPressEvent) {
		const lat = event.nativeEvent.coordinate.latitude;
		const lng = event.nativeEvent.coordinate.longitude;

		setSelectedLocation({ lat: lat, lng: lng });
		setValue("coordinates", {
			latitude: lat,
			longitude: lng,
		});
	}

	return (
		<>
			<Text style={styles.mapLabel}>Pick a location</Text>
			<MapView
				zoomEnabled={true}
				scrollEnabled={true}
				showsScale={true}
				loadingIndicatorColor='#666666'
				loadingBackgroundColor='#eeeeee'
				moveOnMarkerPress={false}
				style={styles.map}
				initialRegion={region}
				onPress={selectLocationHandler}
			>
				{selectedLocation && (
					<Marker
						title='Picked location'
						coordinate={{
							latitude: selectedLocation.lat,
							longitude: selectedLocation.lng,
						}}
						icon={require("../assets/images/location.png")}
					>
						<Callout tooltip>
							<View style={styles.labelContainer}>
								<View>
									<Text style={styles.labelTitle}>Picked location</Text>
								</View>
							</View>
						</Callout>
					</Marker>
				)}
			</MapView>
			{errors["coordinates.lat"] ? (
				<Text style={styles.errorMessage}>
					{errors["coordinates.lat"].message}
				</Text>
			) : (
				errors["coordinates.lng"] && (
					<Text style={styles.errorMessage}>
						{errors["coordinates.lng"].message}
					</Text>
				)
			)}
		</>
	);
}

const styles = StyleSheet.create({
	map: {
		width: "100%",
		height: 250,
	},
	labelContainer: {
		padding: 6,
		borderRadius: 5,
		backgroundColor: Colors.secondary,
	},
	labelTitle: {
		color: Colors.textLight,
	},
	mapLabel: {
		color: Colors.secondary,
		margin: 4,
	},
	errorMessage: {
		paddingHorizontal: 10,
		paddingVertical: 4,
		color: Colors.textLight,
		borderRadius: 10,
		backgroundColor: Colors.error,
		transform: [{ translateY: 14 }],
	},
});
