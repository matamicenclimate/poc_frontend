import { UseFormRegister } from 'react-hook-form';

export interface InputProps {
  name: string;
  type: 'text' | 'email' | 'number' | 'file' | 'hidden';
  label?: string;
  htmlFor?: string;
  register?: UseFormRegister<any>;
  errors?: Record<string, any>;
  required?: boolean;
  labelClassName?: string;
  errorClassName?: string;
  inputClassName?: string;
}

export function Input({
  name,
  type,
  label,
  register,
  errors = {},
  required = false,
  labelClassName,
  errorClassName,
  inputClassName,
  ...rest
}: any) {
  return (
    <div className="mb-4 flex flex-col">
      {label && (
        <label className={labelClassName} htmlFor={name} id={name}>
          {label} {required && ' *'}
        </label>
      )}
      <input
        type={type}
        id={name}
        className={`border error:border-red-700 invalid:border-red-500 ${inputClassName}`}
        {...register(name)}
        {...rest}
      />
      {errors[name] && (
        <p className={`text-red-700 ${errorClassName}`} role="alert">
          {errors[name].message}
        </p>
      )}
    </div>
  );
}

export function Select({ errors, register, options, name, ...rest }: any) {
  return (
    <>
      <select {...register(name)} {...rest}>
        {options.map((value: any) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
      {errors && (
        <p className="text-red" role="alert">
          {errors[name].message}
        </p>
      )}
    </>
  );
}
