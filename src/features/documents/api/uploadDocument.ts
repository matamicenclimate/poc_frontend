import { useAlert } from 'react-alert';
import { documentKeys } from './index';
import { AxiosRequestConfig } from 'axios';
import { httpClient } from '@/lib/httpClient';
import { useMutation, useQueryClient } from 'react-query';
import { format } from 'date-fns';
import { SelectOption } from '@/componentes/Form';

export type CarbonDocumentDTO = Record<string, any>;

function toFormData(carbonDocument: CarbonDocumentDTO) {
  const formData = new FormData();

  const { ...newDocument } = carbonDocument;

  newDocument.status = 'pending';

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
    return value === undefined;
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

export function uploadDocument() {
  const queryClient = useQueryClient();
  const alert = useAlert();

  const config: AxiosRequestConfig<FormData> = {
    headers: {
      'content-type': 'application/form-data',
    },
  };
  return useMutation(
    (carbonDocument: CarbonDocumentDTO) => {
      const formData = toFormData(carbonDocument);
      console.log(formData);

      return httpClient.post(`/carbon-documents`, formData, config);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(documentKeys.lists());
      },
      onError: () => {
        alert.error('Error uploading document');
      },
    }
  );
}
