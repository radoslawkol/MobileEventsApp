import SignUpScreen from "../SignUpScreen";
import {
	render,
	screen,
	fireEvent,
	waitFor,
} from "@testing-library/react-native";

describe("Signup Screen", () => {
	const navigation = { navigate: (name: string) => {} };

	test("Renders correctly", () => {
		render(<SignUpScreen navigation={navigation} />);

		const headingElement = screen.getByText("Sign Up");
		expect(headingElement).toBeOnTheScreen();

		const surnameInput = screen.getByTestId("surnameInput");
		expect(surnameInput).toBeOnTheScreen();

		const emailInput = screen.getByTestId("emailInput");
		expect(emailInput).toBeOnTheScreen();

		const passwordInput = screen.getByTestId("passwordInput");
		expect(passwordInput).toBeOnTheScreen();

		const confirmPasswordInput = screen.getByTestId("confirmPasswordInput");
		expect(confirmPasswordInput).toBeOnTheScreen();

		const submitButton = screen.getByTestId("registerBtn");
		expect(submitButton).toBeOnTheScreen();
	});

	test("Show error messages if inputs are empty and form submitted", async () => {
		render(<SignUpScreen navigation={navigation} />);

		const submitButton = screen.getByTestId("registerBtn");
		await fireEvent.press(submitButton);

		await waitFor(() => {
			expect(screen.getByText("First Name is required.")).toBeOnTheScreen();
			expect(screen.getByText("Surname is required.")).toBeOnTheScreen();
			expect(screen.getByText("Email is required.")).toBeOnTheScreen();
			expect(screen.getByText("Password is required.")).toBeOnTheScreen();
			expect(
				screen.getByText("Confirm Password is required.")
			).toBeOnTheScreen();
		});
	});

	test("Show error if email input is invalid", async () => {
		render(<SignUpScreen navigation={navigation} />);

		const emailInput = screen.getByTestId("emailInput");
		await fireEvent.changeText(emailInput, "adsad@");

		const submitButton = screen.getByTestId("registerBtn");
		await fireEvent.press(submitButton);

		await waitFor(() => {
			expect(screen.getByText("Email has to be valid.")).toBeOnTheScreen();
		});
	});

	test("Show error if password is longer than 20 characters", async () => {
		render(<SignUpScreen navigation={navigation} />);

		const passwordInput = screen.getByTestId("passwordInput");

		await fireEvent.changeText(passwordInput, "231321adasda395392159");

		const submitButton = screen.getByTestId("registerBtn");
		await fireEvent.press(submitButton);

		await waitFor(() => {
			expect(
				screen.getByText("Password is not valid. Max 20 characters.")
			).toBeOnTheScreen();
		});
	});

	test("Show error if password is shorter than 6 characters", async () => {
		render(<SignUpScreen navigation={navigation} />);

		const passwordInput = screen.getByTestId("passwordInput");

		await fireEvent.changeText(passwordInput, "23asd");

		const submitButton = screen.getByTestId("registerBtn");
		await fireEvent.press(submitButton);

		await waitFor(() => {
			expect(
				screen.getByText("Password is not valid. Min 6 characters.")
			).toBeOnTheScreen();
		});
	});

	test("Show error if password and confirm password not match", async () => {
		render(<SignUpScreen navigation={navigation} />);

		const passwordInput = screen.getByTestId("passwordInput");
		await fireEvent.changeText(passwordInput, "1ads432da!");

		const confirmPasswordInput = screen.getByTestId("confirmPasswordInput");
		await fireEvent.changeText(confirmPasswordInput, "2ads532dn");

		const submitButton = screen.getByTestId("registerBtn");
		await fireEvent.press(submitButton);

		await waitFor(() => {
			expect(screen.getByText("Passwords don't match.")).toBeOnTheScreen();
		});
	});
});
