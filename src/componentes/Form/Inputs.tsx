import clsx from 'clsx';
import { IconLeft } from 'react-day-picker';
import { Path, UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FieldName, SchemaToErrors } from '.';
import { FieldError } from './FieldError';
import { Label } from './Label';

export type InputProps<FormSchema> = {
  // defaults
  name: FieldName<FormSchema>;
  type: 'text' | 'email' | 'number' | 'file' | 'hidden' | 'date' | 'country';
  placeholder?: string;
  label?: string;
  htmlFor?: string;
  required?: boolean;
  accept?: string;
  disabled?: boolean;
  value?: any;
  // hook-form
  register?: UseFormRegister<FormSchema>;
  errors?: SchemaToErrors<FormSchema>;
  defaultValue?: any;
  // style
  labelClassName?: string;
  errorClassName?: string;
  inputClassName?: string;
  wrapperClassName?: string;
  iconLeft?: React.ReactElement;
  iconRight?: React.ReactElement;
  // stepper
  step?: string;
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
  iconLeft,
  iconRight,
  ...rest
}: InputProps<FormSchema>) {
  const { t } = useTranslation();

  if (!register) {
    throw new Error('Input component requires a register. Are you using it inside a <Form />');
  }

  return (
    <div className={`relative flex flex-col ${wrapperClassName}`}>
      {type !== 'hidden' ? <Label {...{ labelClassName, name, required, label }} /> : null}
      <div className="flex items-center">
        {!!iconLeft && <div className="absolute left-2">{iconLeft}</div>}

        <input
          type={type}
          id={name}
          placeholder={placeholder}
          className={clsx(
            `flex-grow rounded-md border p-2`,
            !!iconRight && 'pr-10',
            !!iconLeft && 'pl-10',
            inputClassName,
            errors[name] && 'border-red-500'
          )}
          {...register(name as Path<FormSchema>)}
          {...rest}
        />
        {!!iconRight && <div className="absolute right-2">{iconRight}</div>}
      </div>

      {!!errors[name] && type !== 'hidden' && (
        <FieldError errorClassName={errorClassName}>{t<string>(errors[name].key)}</FieldError>
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
        <FieldError errorClassName={errorClassName}>{t<string>(errors[name].key)}</FieldError>
      )}
    </div>
  );
}
