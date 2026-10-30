import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormContext } from 'react-hook-form';

interface TextInputProps {
	label: string;
	name: string;
	placeholder?: string;
	type?: string;
}

const TextInput = ({ label, name, placeholder, type }: TextInputProps) => {
	const {
		register,
		formState: { errors },
	} = useFormContext();
	return (
		<div className="space-y-2">
			<Label htmlFor={name}>{label}</Label>
			<Input
				id={name}
				type={type}
				placeholder={placeholder}
				aria-invalid={!!errors[name]}
				className="h-12"
				{...register(name)}
			/>
			{errors[name] && (
				<p className="text-sm text-destructive">
					{errors[name]?.message as string}
				</p>
			)}
		</div>
	);
};

export default TextInput;
