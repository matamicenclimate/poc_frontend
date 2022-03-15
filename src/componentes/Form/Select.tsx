import clsx from 'clsx';
import { TFunction } from 'i18next';
import { Controller } from 'react-hook-form';
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
      defaultValue={isMulti ? [] : ''}
      render={({ field }) => (
        <div className={clsx('flex flex-col', wrapperClassName)}>
          <Label {...{ labelClassName, name, required, label }} />
          <ReactSelect
            {...field}
            aria-labelledby={name}
            inputId={name}
            className={selectClassName}
            options={options}
            isMulti={isMulti}
          />
          {errors[name] && (
            <FieldError errorClassName={errorClassName}>{t(errors[name].key)}</FieldError>
          )}
        </div>
      )}
    />
  );
};
