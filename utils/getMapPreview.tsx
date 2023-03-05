import { GOOGLE_MAPS_API_KEY } from "@env";

interface IGeolocation {
	lat: number;
	lng: number;
}

export const getMapPreview = (
	title: string,
	geolocation: IGeolocation
): string => {
	const { lat, lng } = geolocation;
	const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=600x300&maptype=roadmap
&markers=color:black|label:${title}|${lat},${lng}
&key=${GOOGLE_MAPS_API_KEY}`;

	return imagePreviewUrl;
};
