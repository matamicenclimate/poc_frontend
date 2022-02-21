import { TFunction } from 'i18next';
import { Controller } from 'react-hook-form';
import ReactSelect from 'react-select';

export type SelectOption = { value: any; label: string | TFunction };
type SelectProps = {
  name: string;
  label?: string;
  options: SelectOption[];
  isMulti?: boolean;
  // this should be inyected by the <Form />
  control?: any;
  errors?: Record<string, any>;
  required?: boolean;
  labelClassName?: string;
  errorClassName?: string;
  selectClassName?: string;
};

export const Select = ({
  name,
  label,
  errors = {},
  required = false,
  labelClassName,
  errorClassName,
  selectClassName,
  options,
  isMulti = false,
  control,
}: SelectProps) => {
  // const { control } = useForm();

  return (
    <Controller
      name={name}
      // this is inyected by the <Form /> component
      control={control}
      render={({ field }) => (
        <div className="mb-4">
          {label && (
            <label className={labelClassName} htmlFor={name} id={name}>
              {label} {required && ' *'}
            </label>
          )}
          <ReactSelect
            {...field}
            aria-labelledby={name}
            inputId={name}
            className={selectClassName}
            options={options}
            isMulti={isMulti}
          />
          {errors[name] && (
            <p className={`text-red-700 ${errorClassName}`} role="alert">
              {errors[name].message}
            </p>
          )}
        </div>
      )}
    />
  );
};
