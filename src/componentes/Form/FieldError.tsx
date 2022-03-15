type FieldErrorProps = {
  errorClassName?: string;
  children?: React.ReactNode;
};
export const FieldError = ({ errorClassName, children }: FieldErrorProps) => {
  return (
    <p className={`mt-1 text-xs text-red-700 ${errorClassName}`} role="alert">
      {children}
    </p>
  );
};
