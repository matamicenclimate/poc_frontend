import clsx from 'clsx';
import { UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export type InputProps = {
  name: string;
  type: 'text' | 'email' | 'number' | 'file' | 'hidden' | 'date' | 'country';
  placeholder?: string;
  label?: string;
  htmlFor?: string;
  register?: UseFormRegister<any>;
  errors?: Record<string, Record<string, string>>;
  required?: boolean;
  labelClassName?: string;
  errorClassName?: string;
  inputClassName?: string;
  wrapperClassName?: string;
  value?: any;
  step?: string;
  defaultValue?: any;
  accept?: string;
};

export function Input({
  name,
  type,
  label,
  placeholder,
  register,
  errors = {},
  required = false,
  labelClassName,
  errorClassName,
  inputClassName,
  wrapperClassName,
  ...rest
}: InputProps) {
  const { t } = useTranslation();
  if (!register)
    throw new Error('Input component requires a register. Are you using it inside a <Form />');
  return (
    <div className={`mb-4 flex flex-col ${wrapperClassName}`}>
      {label && (
        <label className={clsx('ml-2', labelClassName)} htmlFor={name} id={name}>
          {label} {required && ' *'}
        </label>
      )}
      <input
        type={type}
        id={name}
        placeholder={placeholder}
        className={`border p-2 rounded-md   error:border-red-700 invalid:border-red-500 ${inputClassName}`}
        {...register(name)}
        {...rest}
      />
      {errors[name] && (
        <p className={`text-red-700 ${errorClassName}`} role="alert">
          {t(errors[name].key)}
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
