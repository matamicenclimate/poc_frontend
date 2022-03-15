import clsx from 'clsx';
import { UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FieldError } from './FieldError';
import { Label } from './Label';

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

  if (!register) {
    throw new Error('Input component requires a register. Are you using it inside a <Form />');
  }

  return (
    <div className={`flex flex-col ${wrapperClassName}`}>
      <Label {...{ labelClassName, name, required, label }} />

      <input
        type={type}
        id={name}
        placeholder={placeholder}
        className={`error:border-red-700 rounded-md border p-2 invalid:border-red-500 ${inputClassName}`}
        {...register(name)}
        {...rest}
      />
      {errors[name] && (
        <FieldError errorClassName={errorClassName}>{t(errors[name].key)}</FieldError>
      )}
    </div>
  );
}

export function Textarea({
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

  if (!register) {
    throw new Error('Input component requires a register. Are you using it inside a <Form />');
  }

  return (
    <div className={`flex flex-col ${wrapperClassName}`}>
      <Label {...{ labelClassName, name, required, label }} />

      <textarea
        id={name}
        placeholder={placeholder}
        className={`error:border-red-700 rounded-md border p-2 invalid:border-red-500 ${inputClassName}`}
        {...register(name)}
        {...rest}
      />
      {errors[name] && (
        <FieldError errorClassName={errorClassName}>{t(errors[name].key)}</FieldError>
      )}
    </div>
  );
}
