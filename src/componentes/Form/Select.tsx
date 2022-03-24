import clsx from 'clsx';
import { TFunction } from 'i18next';
import { Control, Path, useController, UseControllerProps } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ReactSelect from 'react-select';
import { FieldName, SchemaToErrors, SelectOption } from '.';
import { FieldError } from './FieldError';
import { Label } from './Label';

type SelectProps<FormSchema> = {
  name: FieldName<FormSchema>;
  label?: string;
  options: SelectOption[];
  isMulti?: boolean;
  // this should be inyected by the <Form />
  control: Control<FormSchema>;
  errors?: SchemaToErrors<FormSchema>;
  required?: boolean;
  labelClassName?: string;
  errorClassName?: string;
  selectClassName?: string;
  wrapperClassName?: string;
};

const colourStyles = {
  multiValueLabel: () => ({
    backgroundColor: 'var(--color--secondary-blue)',
    color: 'var(--color--primary-blue)',
    paddingRight: 10,
    paddingLeft: 8,
    lineHeight: 1.8,
  }),
  multiValueRemove: () => ({
    backgroundColor: 'var(--color--secondary-blue)',
    color: 'var(--color--primary-blue)',
    paddingRight: 8,
    lineHeight: 1.8,
  }),
};

export function Select<FormSchema>({
  name,
  label,
  errors = {},
  required = false,
  labelClassName,
  errorClassName,
  selectClassName,
  wrapperClassName,
  options,
  isMulti = false,
  control,
}: SelectProps<FormSchema>) {
  const { t } = useTranslation();

  const { field } = useController({
    name,
    control,
    rules: { required },
    defaultValue: isMulti ? [] : ('' as any),
  });

  return (
    <div className={clsx('flex flex-col', wrapperClassName)}>
      <Label {...{ labelClassName, name, required, label }} />
      <ReactSelect
        {...field}
        aria-labelledby={name}
        inputId={name}
        className={clsx(selectClassName, 'text-sm', errors[name] && 'border-red-500')}
        options={options as any}
        isMulti={isMulti}
        styles={colourStyles}
      />
      {errors[name] && (
        <FieldError errorClassName={errorClassName}>{t(errors[name].key)}</FieldError>
      )}
    </div>
  );
}
