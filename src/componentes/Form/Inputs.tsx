import clsx from 'clsx';
import { Path, UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FieldName, SchemaToErrors } from '.';
import { FieldError } from './FieldError';
import { Label } from './Label';

export type InputProps<FormSchema> = {
  name: FieldName<FormSchema>;
  type: 'text' | 'email' | 'number' | 'file' | 'hidden' | 'date' | 'country';
  placeholder?: string;
  label?: string;
  htmlFor?: string;
  register?: UseFormRegister<FormSchema>;
  errors?: SchemaToErrors<FormSchema>;
  required?: boolean;
  labelClassName?: string;
  errorClassName?: string;
  inputClassName?: string;
  wrapperClassName?: string;
  value?: any;
  step?: string;
  defaultValue?: any;
  accept?: string;
  disabled?: boolean;
};

export function Input<FormSchema extends Record<string, any>>({
  name,
  type,
  label,
  placeholder,
  register,
  errors = {} as any,
  required = false,
  labelClassName,
  errorClassName,
  inputClassName,
  wrapperClassName,
  ...rest
}: InputProps<FormSchema>) {
  const { t } = useTranslation();

  if (!register) {
    throw new Error('Input component requires a register. Are you using it inside a <Form />');
  }

  return (
    <div className={`flex flex-col ${wrapperClassName}`}>
      {type !== 'hidden' ? <Label {...{ labelClassName, name, required, label }} /> : null}

      <input
        type={type}
        id={name}
        placeholder={placeholder}
        className={clsx(`rounded-md border p-2`, inputClassName, errors[name] && 'border-red-500')}
        {...register(name as Path<FormSchema>)}
        {...rest}
      />
      {!!errors[name] && type !== 'hidden' && (
        <FieldError errorClassName={errorClassName}>{t(errors[name].key)}</FieldError>
      )}
    </div>
  );
}

export function Textarea<FormSchema>({
  name,
  type,
  label,
  placeholder,
  register,
  errors = {} as any,
  required = false,
  labelClassName,
  errorClassName,
  inputClassName,
  wrapperClassName,
  ...rest
}: InputProps<FormSchema>) {
  const { t } = useTranslation();

  if (!register) {
    throw new Error('Input component requires a register. Are you using it inside a <Form />');
  }

  return (
    <div className={`flex flex-col ${wrapperClassName}`}>
      {type !== 'hidden' ? <Label {...{ labelClassName, name, required, label }} /> : null}
      <textarea
        id={name}
        placeholder={placeholder}
        className={clsx(`rounded-md border p-2`, inputClassName, errors[name] && 'border-red-500')}
        {...register(name)}
        {...rest}
      />
      {errors[name] && type !== 'hidden' && (
        <FieldError errorClassName={errorClassName}>{t(errors[name].key)}</FieldError>
      )}
    </div>
  );
}
