import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/componentes/Elements/Button/Button';
import { MainLayout } from '@/componentes/Layout/MainLayout';
import { Dialog } from '@/componentes/Dialog/Dialog';
import { Form } from '@/componentes/Form/Form';
import { Input } from '@/componentes/Form/Inputs';
import { Select } from '@/componentes/Form/Select';
import { useUploadDocument } from '../api/useUploadDocument';
import { useAuth } from '@/lib/auth';
import * as yup from 'yup';

export const UploadDocuments = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const uploadDocuments = useUploadDocument();

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

  const user = useAuth();
  const validationSchema = yup.object({
    title: yup.string().required('Required'),
  });
  return (
    <MainLayout>
      <>
        <Form onSubmit={handleData} className="flex flex-col" validationSchema={validationSchema}>
          <label htmlFor="title">{t('upload.documents.project.title')}</label>
          <Input name="title" type="text" />

          <label htmlFor="type">{t('upload.documents.registry.name')}</label>
          <Select name="type" options={typeOptions} />

          <label htmlFor="registry">{t('upload.documents.registry.name')}</label>
          <Select name="registry" options={registryOptions} isMulti />

          <label htmlFor="credits">{t('upload.documents.credits.amount')}</label>
          <Input name="credits" type="number" />

          <label htmlFor="serial_number">{t('upload.documents.serialNumber')}</label>
          <Input name="serial_number" type="text" />

          <label htmlFor="document">{t('upload.documents.PDD')}</label>
          <Input name="document" type="file" accept={'.pdf'} />

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
          acceptLabel={t('upload.documents.modal.button.accept')}
        />
      </>
    </MainLayout>
  );
};
