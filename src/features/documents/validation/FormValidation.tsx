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
    return value.length === 1 && DOCUMENTS_SUPPORTED_FORMATS.includes(value[0].type);
  });

const imageValidation = yup
  .mixed()
  .nullable()
  .test('format', 'validation.errors.format.image', (value) => {
    return value.length === 1 && IMAGES_SUPPORTED_FORMATS.includes(value[0].type);
  });

export const validationSchema = yup.object({
  project_types: yup.object().required(),
  title: yup.string().required(),
  sdgs: yup.array().nullable(),
  description: yup.string().required(),
  country: yup.object().nullable().required(),
  project_url: yup.string().required(),
  project_latitude: yup.string().nullable(),
  project_longitude: yup.string().nullable(),
  thumbnail: imageValidation.required(),
  cover: imageValidation.required(),
  project_registration: dateValidation.required(),
  project_video: yup.string(),
  types: yup.object().required(),
  sub_type: yup.object().required(),
  methodology: yup.object(),
  credit_start: dateValidation.required(),
  credit_end: dateValidation.required(),
  validators: yup.object(),
  first_verifier: yup.object(),
  standard: yup.object().required(),
  registry: yup.object().required(),
  credits: yup.string().required(),
  serial_number: yup.string().required(),
  registry_url: yup.string().required(),
  pdd: documentValidation.required(),
  validation_report: documentValidation,
  monitoring_report: documentValidation,
  verification_report: documentValidation.required(),
});
