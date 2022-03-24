import { Switch as HLSwitch } from '@headlessui/react';
import { Control, useController } from 'react-hook-form';
import { FieldName, SchemaToErrors } from '.';

type SwitchProps<FormSchema> = {
  control: Control<FormSchema>;
  errors?: SchemaToErrors<FormSchema>;
  name: FieldName<FormSchema>;
  label: string | React.ReactNode;
  required?: boolean;
};

export function Switch<FormSchema>({
  control,
  name,
  label,
  required = false,
}: SwitchProps<FormSchema>) {
  const {
    field: { onChange, onBlur, value },
  } = useController({
    name,
    control,
    rules: { required },
    defaultValue: false as any,
  });

  return (
    <HLSwitch.Group>
      <div className="flex items-center">
        <HLSwitch
          checked={!!value ?? false}
          onChange={() => {
            onChange(!value);
            onBlur();
          }}
          className={`${
            value ? 'bg-blue-600' : 'bg-gray-200'
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
        >
          <span
            className={`${
              value ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
          />
        </HLSwitch>
        <HLSwitch.Label className="ml-4">{label}</HLSwitch.Label>
      </div>
    </HLSwitch.Group>
  );
}
