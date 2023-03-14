import AddEventScreen from "../AddEventScreen";
import {
	render,
	screen,
	fireEvent,
	waitFor,
} from "@testing-library/react-native";
import { text } from "./__mock__/text";

describe("Add Event Screen", () => {
	test("Renders correctly", () => {
		render(<AddEventScreen />);

		const headingElement = screen.getAllByText("Add Event")[0];
		expect(headingElement).toBeOnTheScreen();

		const nameInput = screen.getByTestId("eventNameInput");
		expect(nameInput).toBeOnTheScreen();

		const priceInput = screen.getByTestId("priceInput");
		expect(priceInput).toBeOnTheScreen();

		const maxMembersInput = screen.getByTestId("maxMembersInput");
		expect(maxMembersInput).toBeOnTheScreen();

		const descriptionTextarea = screen.getByTestId("descriptionInput");
		expect(descriptionTextarea).toBeOnTheScreen();

		const eventDateInput = screen.getByTestId("eventDateInput");
		expect(eventDateInput).toBeOnTheScreen();

		const eventTimeInput = screen.getByTestId("eventTimeInput");
		expect(eventTimeInput).toBeOnTheScreen();

		const submitButton = screen.getByTestId("addEventSubmitBtn");
		expect(submitButton).toBeOnTheScreen();
	});

	test("Show errors messages if inputs are empty and form submited", async () => {
		render(<AddEventScreen />);

		const submitButton = screen.getByTestId("addEventSubmitBtn");
		await fireEvent.press(submitButton);

		await waitFor(() => {
			expect(screen.getByText("Please provide Event Name.")).toBeOnTheScreen();
			expect(screen.getByText("Please provide price.")).toBeOnTheScreen();
			expect(
				screen.getByText("Please provide max members number.")
			).toBeOnTheScreen();
			expect(screen.getByText("Please write a description.")).toBeOnTheScreen();
			expect(screen.getByText("Please set event date.")).toBeOnTheScreen();
			expect(screen.getByText("Please set event time.")).toBeOnTheScreen();
			expect(
				screen.getByText("Try to set location pin on the map.")
			).toBeOnTheScreen();
		});
	});

	test("Show error if description text is longer than 300 words", async () => {
		render(<AddEventScreen />);

		const descriptionTextarea = screen.getByTestId("descriptionInput");
		await fireEvent.changeText(descriptionTextarea, text);

		const submitButton = screen.getByTestId("addEventSubmitBtn");
		await fireEvent.press(submitButton);

		await waitFor(() => {
			expect(
				screen.getByText("Description can have max 300 characters.")
			).toBeOnTheScreen();
		});
	});
});
