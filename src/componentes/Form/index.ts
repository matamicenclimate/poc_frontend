import { TFunction } from 'i18next';
import { Path } from 'react-hook-form';

export type FieldName<FormSchema> = keyof FormSchema & Path<FormSchema>;

export type SelectOption = { value: unknown; label: string | TFunction };

export type SchemaToErrors<FormSchema> = {
  [Property in keyof FormSchema]?: any | undefined | { key: string };
};
