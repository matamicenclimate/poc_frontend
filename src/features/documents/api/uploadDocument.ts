import { documentKeys } from './index';
import { SelectOption } from '@/componentes/Form/Select';
import { AxiosRequestConfig } from 'axios';
import { httpClient } from '@/lib/httpClient';
import { useMutation, useQueryClient } from 'react-query';

export type CarbonDocumentDTO = Record<string, any>;

function toFormData(carbonDocument: CarbonDocumentDTO) {
  const formData = new FormData();

  const { document, ...newDocument } = carbonDocument;
  newDocument.type = carbonDocument.type.value;
  newDocument.status = 'pending';

  // parse the object to formData
  Object.keys(newDocument).forEach((key) => {
    if (Array.isArray(newDocument[key])) {
      newDocument[key].forEach((option: SelectOption) => {
        formData.append(`${key}[]`, option.value);
      });
    } else {
      formData.append(key, newDocument[key]);
    }
  });

  formData.append('document', document[0]);

  console.log({
    carbonDocument,
    formData,
  });

  return formData;
}

export function uploadDocument() {
  // const queryClient = useQueryClient();

  const config: AxiosRequestConfig<FormData> = {
    headers: {
      'content-type': 'application/form-data',
    },
  };

  return useMutation(
    (carbonDocument: CarbonDocumentDTO) => {
      const formData = toFormData(carbonDocument);

      return httpClient.post(`/carbon-documents`, formData, config);
    },
    {
      onSuccess: () => {
        // ✅ refetch the comments list for our blog post
        //   queryClient.invalidateQueries(['posts', id, 'comments']);
        // documentKeys.detail(id)
      },
    }
  );
}
