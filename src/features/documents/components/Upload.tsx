import { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useAuth } from '@/lib/auth';

import { Spinner } from '@/componentes/Elements/Spinner/Spinner';
import { Button } from '@/componentes/Elements/Button/Button';
import { MainLayout } from '@/componentes/Layout/MainLayout';
import { Dialog } from '@/componentes/Dialog/Dialog';
import { Form } from '@/componentes/Form/Form';
import { Input } from '@/componentes/Form/Inputs';
import { Select, SelectOption } from '@/componentes/Form/Select';

import { uploadDocument } from '../api/uploadDocument';
import { getFormOptions } from '../api/getFormOptions';
import { Breadcrumb } from '@/componentes/Elements/Breadcrumb/Breadcrumb';

export const Upload = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const uploadDocuments = uploadDocument();
  const formOption = getFormOptions();
  const user = useAuth();

  const handleSubmit = async (data: Record<string, any>) => {
    await uploadDocuments.mutateAsync(data);
    setIsOpen((old) => !old);
  };

  const SUPPORTED_FORMATS = ['application/pdf'];

  const validationSchema = yup.object({
    title: yup.string().required(),
    type: yup.object().required(),
    registry: yup.object().required(),
    credits: yup.string().required(),
    serial_number: yup.string().required(),
    document: yup
      .mixed()
      .nullable()
      .required()
      .test('format', 'validation.errors.format.pdf', (value) => {
        return value.length === 1 && SUPPORTED_FORMATS.includes(value[0].type);
      }),
  });

  const renderForm = () => {
    if (formOption.data) {
      return (
        <Fragment>
          <Form
            onSubmit={handleSubmit}
            className="flex flex-col"
            validationSchema={validationSchema}
          >
            <Input label={t('uploadDocuments.project.title')} required name="title" type="text" />

            <Select
              label={t('uploadDocuments.project.type')}
              required
              name="type"
              options={(formOption.data?.type as SelectOption[]) ?? []}
            />

            <Select
              label={t('uploadDocuments.registry.name')}
              required
              name="registry"
              options={(formOption.data?.registry as SelectOption[]) ?? []}
            />

            <Input
              label={t('uploadDocuments.credits.amount')}
              required
              name="credits"
              type="number"
            />

            <Input
              label={t('uploadDocuments.serialNumber')}
              required
              name="serial_number"
              type="text"
            />

            <Input
              label={t('uploadDocuments.PDD')}
              required
              name="document"
              type="file"
              accept={'.pdf'}
            />

            <Input type="hidden" name="created_by_user" defaultValue={user.user?.email as string} />

            <Button type="submit" disabled={uploadDocuments.isLoading}>
              {t('uploadDocuments.send.button')}
            </Button>
          </Form>

          <Dialog
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title={t('uploadDocuments.modal.title')}
            claim={t('uploadDocuments.modal.claim')}
            acceptLabel={t('uploadDocuments.modal.button.accept')}
          />
        </Fragment>
      );
    }

    return <Spinner />;
  };

  return (
    <MainLayout title={t('head.Upload.title')}>
      <Breadcrumb
        links={[
          { to: '/documents', label: t('documents.List.breadcrumbTitle') },
          {
            to: `/documents/upload`,
            label: t('documents.Upload.title'),
          },
        ]}
      />
      <h1 className="mb-4">{t('uploadDocuments.title')}</h1>
      test
      <>{renderForm()}</>
    </MainLayout>
  );
};
