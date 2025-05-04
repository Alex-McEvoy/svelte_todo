type ValidationResult =
	| { success: true; title: string; description?: string; date: string }
	| { success: false; message: string };

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
