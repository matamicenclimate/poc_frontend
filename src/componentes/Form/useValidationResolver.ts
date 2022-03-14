import { useCallback } from 'react';

const useYupValidationResolver = (validationSchema: Record<string, any>) =>
  useCallback(
    async (data) => {
      console.log({ data });
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {},
        };
      } catch (errors: any) {
        console.log({ errors });

        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors: any, currentError: any) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? 'validation',
                key: currentError.message,
              },
            }),
            {}
          ),
        };
      }
    },
    [validationSchema]
  );

export default useYupValidationResolver;
