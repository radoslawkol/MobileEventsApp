import { GOOGLE_MAPS_API_KEY } from "@env";

interface IGeolocation {
	latitude: number;
	longitude: number;
}

export const getMapPreview = (
	title: string,
	geolocation: IGeolocation
): string => {
	const { latitude, longitude } = geolocation;
	const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=14&size=600x300&maptype=roadmap
&markers=color:black|label:${title}|${latitude},${longitude}
&key=${GOOGLE_MAPS_API_KEY}`;

	return imagePreviewUrl;
};
