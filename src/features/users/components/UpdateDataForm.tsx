import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button } from '@/componentes/Elements/Button/Button';
import { Spinner } from '@/componentes/Elements/Spinner/Spinner';
import { SelectOption } from '@/componentes/Form';
import FileInput from '@/componentes/Form/FileInput';
import { Input, Textarea } from '@/componentes/Form/Inputs';
import { Select } from '@/componentes/Form/Select';
import { AuthUser } from '@/features/auth';

import { FormOption, useGetFormOptions } from '../../../features/documents/api/useGetFormOptions';
import { useUpdateProfile } from '../api/useUpdateProfile';
import { ProfileValidationSchema } from '../validation/ProfileValidation';

type UpdateDataFormProps = {
  initialData: AuthUser;
};

export const UpdateDataForm = ({ initialData }: UpdateDataFormProps) => {
  const { t } = useTranslation();
  const formOption = useGetFormOptions();

  const methods = useForm<ProfileValidationSchema>({
    mode: 'onBlur',
    defaultValues: {
      alias: initialData?.alias,
      name: initialData?.name,
      surname: initialData?.surname,
    },
  });

  const updateProfile = useUpdateProfile();

  const baseInputProps = {
    register: methods.register,
    control: methods.control,
    errors: methods.formState.errors,
    wrapperClassName: 'col-span-2',
  };

  const formOptionToSelectOption = (options: FormOption[] | undefined): SelectOption[] => {
    if (options === undefined) return [];
    return options.map((option) => ({
      value: option.id,
      label: option.name,
    }));
  };

  const getAvatarPreview = () => {
    if (methods.watch('avatar')?.length === 1) {
      return URL.createObjectURL(methods.watch('avatar')[0]);
    }
    return 'avatar-placeholder.jpg';
  };

  const handleSubmit = (data: any) => {
    updateProfile.mutate(data);
  };

  return (
    <form className="space-y-8" onSubmit={methods.handleSubmit(handleSubmit)}>
      <div className="grid grid-cols-6 grid-rows-1 items-center gap-3  ">
        <img
          src={getAvatarPreview()}
          className="col-span-1 mx-auto h-[84px] rounded-full md:col-span-1"
        />
        <FileInput<ProfileValidationSchema>
          {...baseInputProps}
          label={t('profile.avatar')}
          name="avatar"
          control={methods.control}
          wrapperClassName="col-span-5 "
        />
      </div>
      <Input<ProfileValidationSchema>
        label={t('profile.alias')}
        name="alias"
        type="text"
        placeholder={t('profile.alias')}
        {...baseInputProps}
        required
      />
      <Input<ProfileValidationSchema>
        label={t('profile.name')}
        name="name"
        type="text"
        placeholder={t('profile.name')}
        {...baseInputProps}
      />
      <Input<ProfileValidationSchema>
        label={t('profile.surname')}
        name="surname"
        type="text"
        placeholder={t('profile.surname')}
        {...baseInputProps}
      />
      <Input<ProfileValidationSchema>
        label={t('profile.city')}
        name="city"
        type="text"
        placeholder="Select city..."
        {...baseInputProps}
      />
      <Select<ProfileValidationSchema>
        {...{
          ...baseInputProps,
          options: formOptionToSelectOption(formOption.data?.countries),
          label: t('profile.country'),
          name: 'country',
          wrapperClassName: '',
          placeholder: 'Select country...',
        }}
        required
      />
      <Textarea<ProfileValidationSchema>
        {...baseInputProps}
        label={t('profile.bio')}
        name="bio"
        type="text"
        placeholder="Write description here..."
      />
      <Input<ProfileValidationSchema>
        label={t('profile.personal_URL')}
        name="personal_URL"
        type="text"
        placeholder="https://"
        {...baseInputProps}
      />

      <div className="mt-8 flex justify-between space-x-4">
        <Button type="button" variant="danger" className="min-w-[28%]" size="md" disabled>
          {t('profile.button_delete')}
        </Button>
        {updateProfile.isLoading && <Spinner size="md" />}
        <Button type="submit" className="min-w-[28%]" size="md" disabled={updateProfile.isLoading}>
          {t('profile.button_update')}
        </Button>
      </div>
    </form>
  );
};
