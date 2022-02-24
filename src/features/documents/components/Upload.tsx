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

export const Upload = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const uploadDocuments = uploadDocument();

  const handleData = async (data: any) => {
    await uploadDocuments.mutateAsync(data);
    setIsOpen((old) => !old);
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
    title: yup.string().required(),
    type: yup.object().required(),
    registry: yup.array().required(),
    credits: yup.string().required(),
    serial_number: yup.string().required(),
    // document: yup.array().nullable().required(),
    // .test('format', 'validation.errors.format.pdf', (value) => {
    //   if (value) {
    //     return value[0] && SUPPORTED_FORMATS.includes(value[0].type);
    //   }
    //   return false;
    // }),
  });

  return (
    <MainLayout>
      <>
        <Form onSubmit={handleData} className="flex flex-col" validationSchema={validationSchema}>
          <Input label={t('upload.documents.project.title')} required name="title" type="text" />

          <Select
            label={t('upload.documents.project.type')}
            required
            name="type"
            options={typeOptions}
          />

          <Select
            label={t('upload.documents.registry.name')}
            required
            name="registry"
            options={registryOptions}
            isMulti
          />

          <Input
            label={t('upload.documents.credits.amount')}
            required
            name="credits"
            type="number"
          />

          <Input
            label={t('upload.documents.serialNumber')}
            required
            name="serial_number"
            type="text"
          />

          <Input
            label={t('upload.documents.PDD')}
            required
            name="document"
            type="file"
            accept={'.pdf'}
          />

          <Input type="hidden" name="created_by_user" defaultValue={user.user?.email as string} />

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
