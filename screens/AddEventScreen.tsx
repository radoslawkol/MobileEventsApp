import { useState, useContext } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import HeadingIcon from "../components/ui/HeadingIcon";
import Colors from "../constants/Colors";
import { useYupValidationResolver } from "../lib/reactHookForm";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import FormGroup from "../components/FormGroup";
import FormTextarea from "../components/FormTextarea";
import IconButton from "../components/ui/IconButton";
import MapPicker from "../components/MapPicker";
import RNDateTimePicker, {
	DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import FormDateInput from "../components/FormDateInput";
import { AuthContext } from "../store/authContext";
import { EventFormData } from "../interfaces/EventFormData";
import { createEvent } from "../helpers/createEvent";

const MAX_WORDS = 300;

type ErrorData = {
	[key: string]: {
		message: string;
		type: string;
	};
};

const validationSchema = yup.object({
	eventName: yup
		.string()
		.required("Please provide Event Name.")
		.max(30, "Event name can be max 30 charachters"),
	price: yup.number().required("Please provide price."),
	maxMembers: yup.number().required("Please provide max members number."),
	description: yup
		.string()
		.trim()
		.required("Please write a description.")
		.test(
			"len",
			`Description can have max ${MAX_WORDS} characters.`,
			(val) => val.split(" ").length <= MAX_WORDS
		),
	eventDate: yup.date().required("Please set event date."),
	eventTime: yup.string().required("Please set event time."),
	coordinates: yup.object({
		lat: yup.number().required("Try to set location pin on the map."),
		lng: yup.number().required("Try to set location pin on the map."),
	}),
});

interface IProps {
	navigation: { navigate: (name: string) => void };
}

export default function AddEventScreen({ navigation }: IProps) {
	const [state, dispatch] = useContext(AuthContext);
	const [error, setError] = useState("");
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const currentDate = new Date();
	const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
	const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);

	const resolver = useYupValidationResolver(validationSchema);
	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<FormData>({ resolver });

	function submitHandler(data: EventFormData) {
		createEvent(data, state.token, setShowSuccessModal, setError, navigation);
	}

	return (
		<ScrollView style={styles.container}>
			<>
				<HeadingIcon icon='pluscircleo' size={24} color={Colors.secondary}>
					Add Event
				</HeadingIcon>
				<View style={styles.formContainer}>
					<Controller
						name='eventName'
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<FormGroup
								errors={errors as ErrorData}
								name='eventName'
								value={value}
								onChange={onChange}
								onBlur={onBlur}
								defaultValue=''
							/>
						)}
					/>
					<Controller
						name='price'
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<FormGroup
								numeric={true}
								maxLength={10}
								errors={errors as ErrorData}
								name='price'
								value={value}
								onChange={onChange}
								onBlur={onBlur}
								defaultValue=''
							/>
						)}
					/>
					<Controller
						name='maxMembers'
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<FormGroup
								numeric={true}
								errors={errors as ErrorData}
								name='maxMembers'
								value={value}
								onChange={onChange}
								onBlur={onBlur}
								defaultValue=''
							/>
						)}
					/>
					<View>
						<Controller
							name='description'
							control={control}
							render={({ field: { onChange, onBlur, value } }) => (
								<FormTextarea
									MAX_WORDS={MAX_WORDS}
									errors={errors as ErrorData}
									name='description'
									value={value}
									onChange={onChange}
									onBlur={onBlur}
									defaultValue=''
								/>
							)}
						/>
					</View>

					<View style={styles.buttonsContainer}>
						<Controller
							control={control}
							name='eventDate'
							render={({ field: { onChange, onBlur, value } }) => (
								<FormDateInput
									onButtonClick={() => setIsDatePickerOpen(true)}
									errors={errors as ErrorData}
									name='eventDate'
									value={value}
									onChange={onChange}
									onBlur={onBlur}
									defaultValue={currentDate}
								/>
							)}
						/>
					</View>
					{isDatePickerOpen && (
						<RNDateTimePicker
							minimumDate={currentDate}
							value={new Date()}
							onChange={(event: DateTimePickerEvent, date: Date) => {
								setIsDatePickerOpen(false);
								setValue("eventDate", date, { shouldValidate: true });
							}}
						/>
					)}
					<View style={styles.buttonsContainer}>
						<Controller
							control={control}
							name='eventTime'
							render={({ field: { onChange, onBlur, value } }) => (
								<FormDateInput
									mode='time'
									onButtonClick={() => setIsTimePickerOpen(true)}
									errors={errors as ErrorData}
									name='eventTime'
									value={value}
									onChange={onChange}
									onBlur={onBlur}
									defaultValue={currentDate}
								/>
							)}
						/>
					</View>
					{isTimePickerOpen && (
						<RNDateTimePicker
							mode='time'
							value={new Date()}
							onChange={(event: DateTimePickerEvent, time: Date) => {
								setIsTimePickerOpen(false);
								setValue("eventTime", time, { shouldValidate: true });
							}}
						/>
					)}
					<View>
						<Controller
							control={control}
							name='coordinates'
							render={({ field: props }) => (
								<MapPicker setValue={setValue} errors={errors as ErrorData} />
							)}
						/>
					</View>
				</View>
				<View style={styles.buttonsContainer}>
					<IconButton
						icon='pluscircleo'
						size={20}
						color={Colors.textLight}
						onPress={handleSubmit(submitHandler)}
						testID='addEventSubmitBtn'
					>
						Add Event
					</IconButton>
				</View>
				{showSuccessModal &&
					Alert.alert(
						"Event created successfully!",
						"Congratulation on creating a new event."
					)}
				{error && Alert.alert("Cannot create an event!", error)}
			</>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 30,
		marginVertical: 30,
	},
	formContainer: {
		marginVertical: 20,
	},
	buttonsContainer: {
		marginVertical: 20,
		flexDirection: "row",
		alignItems: "flex-start",
		justifyContent: "space-between",
	},
});
