import * as yup from 'yup';

const DOCUMENTS_SUPPORTED_FORMATS = ['application/pdf'];
const IMAGES_SUPPORTED_FORMATS = ['image/png', 'image/jpg', 'image/jpeg'];

const dateValidation = yup
  .date()
  .nullable()
  .transform((current, origin) => (origin === '' ? null : current));

const documentValidation = yup
  .mixed()
  .nullable()
  .test('format', 'validation.errors.format.document', (value) => {
    console.log(value, value.length === 1 && DOCUMENTS_SUPPORTED_FORMATS.includes(value[0].type));

    return value.length === 1 && DOCUMENTS_SUPPORTED_FORMATS.includes(value[0].type);
  });

const fileInputValidation = yup
  .array()
  .test('format', 'validation.errors.format.document', (value) => {
    if (!value) return false;

    const fileTypes = value.map((file) => file.type);
    const includesErrors = fileTypes
      .map((type) => DOCUMENTS_SUPPORTED_FORMATS.includes(type))
      .includes(false);

    return !includesErrors;
  });

const imageValidation = yup.array().test('format', 'validation.errors.format.image', (value) => {
  if (!value) return false;
  if (value.length === 0) return false;

  const fileTypes = value.map((file) => file.type);
  const includesErrors = fileTypes
    .map((type) => IMAGES_SUPPORTED_FORMATS.includes(type))
    .includes(false);

  return !includesErrors;
});

export const validationSchema = yup.object({
  project_types: yup.object().nullable().required(),
  title: yup.string().required(),
  sdgs: yup.array().nullable(),
  description: yup.string().required(),
  country: yup.object().nullable().nullable().required(),
  project_url: yup.string().required(),
  project_latitude: yup.string().nullable(),
  project_longitude: yup.string().nullable(),
  thumbnail: imageValidation.required(),
  cover: imageValidation.required(),
  project_registration: dateValidation.required(),
  project_video: yup.string(),
  types: yup.object().nullable().required(),
  sub_type: yup.object().nullable().required(),
  methodology: yup.object().nullable(),
  credit_start: dateValidation.required(),
  credit_end: dateValidation.required(),
  validators: yup.object().nullable(),
  first_verifier: yup.object().nullable(),
  standard: yup.object().nullable().required(),
  registry: yup.object().nullable().required(),
  credits: yup.string().required(),
  serial_number: yup.string().required(),
  registry_url: yup.string().required(),
  pdd: documentValidation.required(),
  validation_report: documentValidation,
  monitoring_report: documentValidation,
  verification_report: fileInputValidation.required(),
});
