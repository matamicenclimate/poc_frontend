import clsx from 'clsx';
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
  max?: number;
  min?: number;
  step?: string;
  onBlur?: (e: any) => void;
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
  max,
  min,
  onBlur = (e) => null,
  ...rest
}: InputProps<FormSchema>) {
  const { t } = useTranslation();

  /*  if (!register) {
    throw new Error('Input component requires a register. Are you using it inside a <Form />');
  }*/

  return (
    <div className={`relative flex flex-col ${wrapperClassName}`}>
      {type !== 'hidden' ? <Label {...{ labelClassName, name, required, label }} /> : null}
      <div className="flex items-center">
        {!!iconLeft && <div className="absolute left-2">{iconLeft}</div>}

        <input
          type={type}
          id={name}
          placeholder={placeholder}
          aria-label={label}
          className={clsx(
            `flex-grow rounded-md border-2 p-2 text-sm leading-normal`,
            !!iconRight && 'pr-10',
            !!iconLeft && 'pl-10',
            inputClassName,
            errors[name] && 'border-red-500'
          )}
          {...(register && register(name as Path<FormSchema>))}
          {...rest}
          max={max}
          min={min}
          onBlur={onBlur}
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
  max,
  onBlur = (e) => null,
  ...rest
}: InputProps<FormSchema>) {
  const { t } = useTranslation();

  // if (!register) {
  //   throw new Error('Input component requires a register. Are you using it inside a <Form />');
  // }

  return (
    <div className={`flex flex-col ${wrapperClassName}`}>
      {type !== 'hidden' ? <Label {...{ labelClassName, name, required, label }} /> : null}
      <textarea
        id={name}
        placeholder={placeholder}
        maxLength={max}
        className={clsx(
          `rounded-md border-2 p-2 text-sm`,
          inputClassName,
          errors[name] && 'border-red-500'
        )}
        {...(register && register(name))}
        {...rest}
        onBlur={onBlur}
      />
      {errors[name] && type !== 'hidden' && (
        <FieldError errorClassName={errorClassName}>{t<string>(errors[name].key)}</FieldError>
      )}
    </div>
  );
}
