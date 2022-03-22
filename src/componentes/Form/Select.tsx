import clsx from 'clsx';
import { TFunction } from 'i18next';
import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ReactSelect from 'react-select';
import { FieldError } from './FieldError';
import { Label } from './Label';

export type SelectOption = { value: any; label: string | TFunction };

type SelectProps = {
  name: string;
  label?: string;
  options: SelectOption[];
  isMulti?: boolean;
  // this should be inyected by the <Form />
  control?: any;
  errors?: Record<string, any>;
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

export const Select = ({
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
}: SelectProps) => {
  const { t } = useTranslation();

  const { field } = useController({
    name,
    control,
    rules: { required },
    defaultValue: isMulti ? [] : '',
  });

  return (
    <div className={clsx('flex flex-col', wrapperClassName)}>
      <Label {...{ labelClassName, name, required, label }} />
      <ReactSelect
        {...field}
        aria-labelledby={name}
        inputId={name}
        className={clsx(selectClassName, 'text-sm', errors[name] && 'border-red-500')}
        options={options}
        isMulti={isMulti}
        styles={colourStyles}
      />
      {errors[name] && (
        <FieldError errorClassName={errorClassName}>{t(errors[name].key)}</FieldError>
      )}
    </div>
  );
};
