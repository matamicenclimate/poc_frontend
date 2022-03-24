import { TFunction } from 'i18next';
import { FieldError, Path } from 'react-hook-form';

export type FieldName<FormSchema> = keyof FormSchema & string & Path<FormSchema>;

export type SelectOption = { value: any; label: string | TFunction };

export type SchemaToErrors<Schema> = {
  [Property in keyof Schema]?: any | { key: string };
};
