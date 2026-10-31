import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Controller, useFormContext } from 'react-hook-form';

interface SelectInputProps {
  label: string;
  name: string;
  placeholder?: string;
  options: SelectOption;
}

const SelectInput = ({
  label,
  name,
  placeholder,
  options,
}: SelectInputProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="space-y-2 h-12">
      <Label>{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger className="w-full h-12" size="default">
              <SelectValue className={'h-12'} placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent className="w-full h-12">
              {options?.map((option) => (
                <SelectItem
                  key={option.value}
                  className={'h-12'}
                  value={option.value}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {errors[name] && (
        <p className="text-sm text-destructive">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default SelectInput;
