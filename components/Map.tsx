import MapView, { Marker } from "react-native-maps";

export default function Map() {
	const region = {
		latitude: 37.78825,
		longitude: -122.4324,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	};
	return <MapView initialRegion={region}></MapView>;
}
