import * as yup from 'yup';

export const FundsValidationSchema = yup.object({
  amount: yup.number().required(),
  receiver: yup.string().required(),
});

export type FundsValidationSchema = yup.InferType<typeof FundsValidationSchema>;
