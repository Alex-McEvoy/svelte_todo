type ValidationResult =
	| { success: true; title: string; description?: string; date: string }
	| { success: false; message: string };

/**
 * @function validateEventFormData
 * @description
 * A utility function to validate event form data. This function ensures 
 * that the required fields (`title` and `date`) are present and checks 
 * that the provided date is not in the past. If validation passes, it 
 * returns a success result along with the extracted form data.
 *
 * @param formData (FormData): The form data object containing event details 
 * such as `title`, `description`, and `date`.
 *
 * @returns {ValidationResult} An object indicating whether the validation 
 * was successful, along with an optional message or the validated data.
 */
export function validateEventFormData(formData: FormData): ValidationResult {
	const title = formData.get('title')?.toString();
	const description = formData.get('description')?.toString();
	const date = formData.get('date')?.toString();

	if (!title || !date) {
		return { success: false, message: 'Title and Date are required' };
	}

	const eventDate = new Date(date);
	if (eventDate < new Date()) {
		return { success: false, message: 'Date cannot be in the past' };
	}

	return { success: true, title, description, date };
}
