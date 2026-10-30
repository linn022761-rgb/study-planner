import TextInput from '@/components/forms/TextInput';
import SelectInput from '@/components/forms/SelectInput';

type TaskFieldsProps = {
	minDueDate: string;
};
export default function TaskFields({ minDueDate }: TaskFieldsProps) {
	const options: SelectOption = [
		{ label: 'Low', value: 'low' },
		{ label: 'Medium', value: 'medium' },
		{ label: 'High', value: 'high' },
	];
	return (
		<div className="space-y-5">
			<TextInput
				label="Task Title"
				name="title"
				placeholder="e.g Study React"
			/>
			<TextInput
				label="Subject"
				name="subject"
				placeholder="e.g. Web Development"
			/>
			<TextInput label="Due Date" name="dueDate" type="date" />

			<SelectInput
				label="Priority"
				name="priority"
				placeholder="Choose Priority"
				options={options}
			/>
		</div>
	);
}
