import clsx from 'clsx';
import { useEffect } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useIMask } from 'react-imask';

import { FieldError } from './FieldError';
import { InputProps } from './Inputs';
import { Label } from './Label';

export function CurrencyInput<FormSchema extends Record<string, any>>({
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
  control,
  ...rest
}: InputProps<FormSchema> & { control: UseControllerProps<FormSchema>['control'] }) {
  const { t } = useTranslation();

  if (!register) {
    throw new Error('Input component requires a register. Are you using it inside a <Form />');
  }

  const {
    field: { onChange, onBlur },
  } = useController({
    name,
    control,
    rules: { required },
    defaultValue: [] as any,
  });

  const {
    ref,
    maskRef,
    value,
    setValue,
    unmaskedValue,
    setUnmaskedValue,
    typedValue,
    setTypedValue,
  } = useIMask({ mask: '$0*' });

  useEffect(() => {
    setValue(value);
  }, [value]);

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
          // @ts-expect-error idk
          ref={ref}
          {...rest}
          max={max}
        />
        {!!iconRight && <div className="absolute right-2">{iconRight}</div>}
      </div>

      {!!errors[name] && type !== 'hidden' && (
        <FieldError errorClassName={errorClassName}>{t<string>(errors[name].key)}</FieldError>
      )}
    </div>
  );
}
