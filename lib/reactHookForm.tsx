import { useCallback } from "react";

type Error = {
	path: string;
	message: string;
	type: null | "validation";
};

export const useYupValidationResolver = (validationSchema: any) =>
	useCallback(
		async (data: any) => {
			try {
				const values = await validationSchema.validate(data, {
					abortEarly: false,
				});

				return {
					values,
					errors: {},
				};
			} catch (errors: any) {
				return {
					values: {},
					errors: errors.inner.reduce(
						(allErrors: Error, currentError: Error) => ({
							...allErrors,
							[currentError.path]: {
								type: currentError.type ?? "validation",
								message: currentError.message,
							},
						}),
						{}
					),
				};
			}
		},
		[validationSchema]
	);
