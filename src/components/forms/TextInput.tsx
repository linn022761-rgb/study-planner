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
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const registration = register(name);

  return (
    <div className="space-y-2">
      {/* Label */}
      <Label htmlFor={name}>{label}</Label>

      {/* Input */}
      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        aria-invalid={!!errors[name]}
        className="h-12"
        {...registration}
        onChange={(event) => {
          registration.onChange(event);

          // User ပြန်ရိုက်တဲ့အခါ Error ပျောက်မယ်
          clearErrors(name);
        }}
      />

      {/* Error Message */}
      {errors[name] && (
        <p className="text-sm text-destructive">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default TextInput;
