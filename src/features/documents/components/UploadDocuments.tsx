import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/componentes/Elements/Button/Button';
import { MainLayout } from '@/componentes/Layout/MainLayout';
import { Dialog } from '@/componentes/Dialog/Dialog';
import { Form } from '@/componentes/Form/Form';
import { Input } from '@/componentes/Form/Inputs';

import { Select } from '@/componentes/Form/Select';
import { uploadDocument } from '../api/uploadDocument';
import { useAuth } from '@/lib/auth';
import * as yup from 'yup';

export const UploadDocuments = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const uploadDocuments = uploadDocument();

  const handleData = async (data: any) => {
    await uploadDocuments.mutateAsync(data);
    setIsOpen((old) => !old);
    console.log(data);
  };

  const typeOptions = [
    { value: 'carbon', label: t('upload.documents.project.type.options.carbon') },
    { value: 'nature', label: t('upload.documents.project.type.options.nature') },
    { value: 'irecs', label: t('upload.documents.project.type.options.irecs') },
  ];

  const registryOptions = [
    { value: 'cdm', label: 'CDM' },
    { value: 'verra', label: 'Verra' },
    { value: 'goldStandard', label: 'Gold Standard' },
    { value: 'ecoregistry', label: 'Ecoregistry' },
    { value: 'bme', label: 'BME' },
  ];

  const SUPPORTED_FORMATS = ['application/pdf'];

  const user = useAuth();

  const validationSchema = yup.object({
    title: yup.string().required(t('upload.documents.validation.error')),
    type: yup.object().required(t('upload.documents.validation.error')),
    registry: yup.array().required(t('upload.documents.validation.error')),
    credits: yup.string().required(t('upload.documents.validation.error')),
    serial_number: yup.string().required(t('upload.documents.validation.error')),
    document: yup
      .mixed()
      .nullable()
      .test(
        'document',
        t('upload.documents.validation.error'),
        // value it is equal [object FileList]
        // value && console.log('_______value ' + JSON.stringify(value)
        //JSON.stringify(value)[0] it is equal to  {"0":{}}
        (value) => !value || (value && !SUPPORTED_FORMATS.includes(value.type))
      )
      .required(t('upload.documents.validation.error')),
  });

  return (
    <MainLayout>
      <>
        <Form onSubmit={handleData} className="flex flex-col" validationSchema={validationSchema}>
          <Input
            htmlFor="title"
            label={t('upload.documents.project.title')}
            required
            name="title"
            type="text"
          />

          <Select
            htmlFor="type"
            label={t('upload.documents.registry.name')}
            required
            name="type"
            options={typeOptions}
          />

          <Select
            htmlFor="registry"
            label={t('upload.documents.registry.name')}
            required
            name="registry"
            options={registryOptions}
            isMulti
          />

          <Input
            htmlFor="credits"
            label={t('upload.documents.credits.amount')}
            required
            name="credits"
            type="number"
          />

          <Input
            htmlFor="serial_number"
            label={t('upload.documents.serialNumber')}
            required
            name="serial_number"
            type="text"
          />

          <Input
            htmlFor="document"
            label={t('upload.documents.PDD')}
            required
            name="document"
            type="file"
            accept={'.pdf'}
          />

          <Input type="hidden" name="created_by_user" value={user.user?.email} />

          <Button type="submit" disabled={uploadDocuments.isLoading}>
            {t('upload.documents.send.button')}
          </Button>
        </Form>
      </>
      <>
        <Dialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={t('upload.documents.modal.title')}
          claim={t('upload.documents.modal.claim')}
          acceptLabel={t('upload.documents.modal.button.accept')}
        />
      </>
    </MainLayout>
  );
};
