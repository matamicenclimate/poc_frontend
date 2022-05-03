import * as yup from 'yup';

const IMAGES_SUPPORTED_FORMATS = ['image/png', 'image/jpg', 'image/jpeg'];

const imageValidation = yup.array().test('format', 'validation.errors.format.image', (value) => {
  if (!value) return false;
  if (value.length === 0) return false;

  const fileTypes = value.map((file) => file.type);
  const hasErrors = fileTypes
    .map((type) => IMAGES_SUPPORTED_FORMATS.includes(type))
    .includes(false);

  return !hasErrors;
});

export const ProfileValidationSchema = yup.object({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  avatar: imageValidation.required(),
});

export type ProfileValidationSchema = yup.InferType<typeof ProfileValidationSchema>;
