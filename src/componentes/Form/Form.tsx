import React from 'react';
import { useForm } from 'react-hook-form';
import useYupValidationResolver from './useValidationResolver';
import * as yup from 'yup';

interface FormProps {
  defaultValues?: any;
  children: React.ReactElement[];
  onSubmit: (data: any) => void;
  className?: string;
  validationSchema?: any;
}
export const Form = ({
  defaultValues,
  children,
  onSubmit,
  className,
  validationSchema = yup.object({}),
}: FormProps) => {
  console.log({ validationSchema });
  const resolver = useYupValidationResolver(validationSchema);
  const methods = useForm({ defaultValues, resolver, mode: 'onBlur' });
  const { handleSubmit } = methods;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      {React.Children.map(children, (child) => {
        return child.props.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                register: methods.register,
                control: methods.control,
                key: child.props.name,
                errors: methods.formState.errors,
              },
            })
          : child;
      })}
    </form>
  );
};
