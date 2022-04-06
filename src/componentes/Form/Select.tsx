import clsx from 'clsx';
import { Control, useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ReactSelect, { OptionsOrGroups, StylesConfig } from 'react-select';
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
  // style
  labelClassName?: string;
  errorClassName?: string;
  selectClassName?: string;
  wrapperClassName?: string;
  iconLeft?: React.ReactElement;
};

const colourStyles = (iconLeft: boolean): StylesConfig => ({
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
  valueContainer: (base) => ({
    ...base,
    paddingLeft: iconLeft ? '2rem' : base.paddingLeft,
  }),
});

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
  iconLeft,
}: SelectProps<FormSchema>) {
  const { t } = useTranslation();

  const { field } = useController({
    name,
    control,
    rules: { required },
    defaultValue: isMulti ? [] : ('' as any),
  });

  return (
    <div className={clsx('relative flex flex-col', wrapperClassName)}>
      <Label {...{ labelClassName, name, required, label }} />
      <div className="flex items-center">
        {!!iconLeft && <div className="absolute left-2 z-10">{iconLeft}</div>}
        <ReactSelect
          {...field}
          aria-labelledby={name}
          inputId={name}
          className={clsx(selectClassName, 'flex-grow text-sm', errors[name] && 'border-red-500')}
          options={options as OptionsOrGroups<any, any>}
          isMulti={isMulti}
          styles={colourStyles(!!iconLeft)}
          defaultValue={isMulti ? [] : ('' as any)}
        />
      </div>

      {errors[name] && (
        <FieldError errorClassName={errorClassName}>{t(errors[name].key)}</FieldError>
      )}
    </div>
  );
}
