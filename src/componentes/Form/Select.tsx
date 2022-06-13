import clsx from 'clsx';
import { Control, useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ReactSelect, { OptionsOrGroups, StylesConfig } from 'react-select';

import { FieldName, SchemaToErrors, SelectOption } from '.';
import { FieldError } from './FieldError';
import { Label } from './Label';
import { Tooltip } from './Tooltip';

type SelectProps<FormSchema> = {
  name: FieldName<FormSchema>;
  label?: string;
  options: SelectOption[];
  isMulti?: boolean;
  tooltipInfo?: string;
  defaultValues?: any;
  // this should be injected by the <Form />
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

const colourStyles = (iconLeft: boolean, hasErrors: boolean): StylesConfig => ({
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
  control: (base) => ({
    ...base,
    border: hasErrors ? 'solid 2px var(--color--error)' : 'solid 2px var(--color--neutral-6)',
    borderRadius: '0.375rem',
  }),
});

export function Select<FormSchema>({
  name,
  label,
  errors = {},
  required = false,
  defaultValues = undefined,
  tooltipInfo,
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
    // TODO: this is for the fileValidation, should be improved
    defaultValue: isMulti ? ([] as any) : ('' as any),
  });

  return (
    <div className={clsx('relative flex flex-col', wrapperClassName)}>
      <div className="flex items-center">
        {tooltipInfo && <Tooltip className="mr-2 mb-1" info={tooltipInfo} />}
        <Label {...{ labelClassName, name, required, label }} />
      </div>
      <div className="flex items-center">
        {!!iconLeft && <div className="absolute left-2 z-10">{iconLeft}</div>}
        <ReactSelect
          {...field}
          aria-labelledby={name}
          inputId={name}
          className={clsx(selectClassName, 'flex-grow text-sm')}
          options={options as OptionsOrGroups<any, any>}
          isMulti={isMulti}
          styles={colourStyles(!!iconLeft, !!errors[name])}
        />
      </div>

      {errors[name] && (
        <FieldError errorClassName={errorClassName}>{t<string>(errors[name].key)}</FieldError>
      )}
    </div>
  );
}
