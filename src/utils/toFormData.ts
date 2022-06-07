import { format } from 'date-fns';

import { SelectOption } from '@/componentes/Form';

export function toFormData<GenericDTO extends Record<string, any>>(document: GenericDTO) {
  const formData = new FormData();

  const { ...newDocument } = document;

  function isSelectOption(object: Record<string, any>): object is SelectOption {
    if (typeof object !== 'object') return false;
    return !!object.value && !!object.label;
  }

  function isMultiSelectOption(object: Record<string, any>[]): object is SelectOption[] {
    if (typeof object !== 'object') return false;
    let isValid = true;
    object.forEach((value) => {
      isValid = isValid && !!value.value && !!value.label;
    });
    return isValid;
  }

  function isFileList(list: any[]): list is File[] {
    if (typeof list !== 'object') return false;
    let isValid = true;
    list.forEach((value) => {
      isValid = isValid && !!value.size && !!value.type;
    });
    return isValid;
  }

  function isDate(object: Record<string, any>): object is Date {
    if (typeof object !== 'object') return false;
    return object instanceof Date && !isNaN(object.valueOf());
  }

  function isUndefined(value: any): value is undefined {
    return value === undefined || value === null;
  }

  function isEmptyArray(array: any[]) {
    return Array.isArray(array) && array.length === 0;
  }

  // parse the object to formData
  Object.keys(newDocument).forEach((key) => {
    if (isUndefined(newDocument[key]) || isEmptyArray(newDocument[key])) {
      // do nothing
    } else if (isDate(newDocument[key])) {
      formData.append(key, format(newDocument[key], 'yyyy-MM-dd'));
    } else if (isSelectOption(newDocument[key])) {
      formData.append(key, newDocument[key].value);
    } else if (isFileList(newDocument[key])) {
      formData.append(key, newDocument[key][0]);
    } else if (isMultiSelectOption(newDocument[key])) {
      const ids = newDocument[key].map((entry: SelectOption) => entry.value);
      formData.append(`${key}`, JSON.stringify(ids));
    } else {
      formData.append(key, newDocument[key]);
    }
  });
  return formData;
}
