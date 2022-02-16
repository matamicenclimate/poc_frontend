import { TFunction } from 'i18next';
import { Controller } from 'react-hook-form';
import ReactSelect from 'react-select';

export type SelectOption = { value: any; label: string | TFunction };
type SelectProps = {
  name: string;
  options: SelectOption[];
  isMulti?: boolean;
  // this should be inyected by the <Form />
  control?: any;
};

export const Select = ({ name, options, isMulti = false, control }: SelectProps) => {
  // const { control } = useForm();

  return (
    <Controller
      name={name}
      // this is inyected by the <Form /> component
      control={control}
      render={({ field }) => <ReactSelect {...field} options={options} isMulti={isMulti} />}
    />
  );
};
