import clsx from 'clsx';
import { TFunction } from 'i18next';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ReactSelect from 'react-select';

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
  // const { control } = useForm();
  const { t } = useTranslation();

  return (
    <Controller
      name={name}
      // this is inyected by the <Form /> component
      control={control}
      render={({ field }) => (
        <div className={clsx('mb-4 flex flex-col', wrapperClassName)}>
          {label && (
            <label className={clsx('ml-2', labelClassName)} htmlFor={name} id={name}>
              {label} {required && ' *'}
            </label>
          )}
          <ReactSelect
            {...field}
            aria-labelledby={name}
            inputId={name}
            className={selectClassName}
            options={options}
            isMulti={isMulti}
          />
          {errors[name] && (
            <p className={clsx('text-red-700', errorClassName)} role="alert">
              {t(errors[name].key)}
            </p>
          )}
        </div>
      )}
    />
  );
};
