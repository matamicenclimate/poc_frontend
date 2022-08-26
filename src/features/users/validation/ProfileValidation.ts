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
  avatar: imageValidation,
  email: yup.string().email(),
  alias: yup.string(),
  name: yup.string(),
  surname: yup.string(),
  city: yup.string(),
  country: yup.object({ label: yup.string(), value: yup.string() }),
  bio: yup.string(),
  personal_URL: yup.string(),
});

export type ProfileValidationSchema = yup.InferType<typeof ProfileValidationSchema>;
