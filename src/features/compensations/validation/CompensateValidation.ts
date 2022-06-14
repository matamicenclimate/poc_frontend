import * as yup from 'yup';

export const calculateCompensationValidation = yup.object({
  wallet: yup.object().nullable().required(),
  amount: yup.number().required(),
});

export type CalculateCompensationSchema = yup.InferType<typeof calculateCompensationValidation>;
