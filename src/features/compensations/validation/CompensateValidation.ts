import * as yup from 'yup';

const DOCUMENTS_SUPPORTED_FORMATS = ['application/pdf'];
const IMAGES_SUPPORTED_FORMATS = ['image/png', 'image/jpg', 'image/jpeg'];

export const calculateCompensationValidation = yup.object({
  wallet: yup.object().nullable().required(),
  amount: yup.number().required(),
});

export type CalculateCompensationSchema = yup.InferType<typeof calculateCompensationValidation>;
