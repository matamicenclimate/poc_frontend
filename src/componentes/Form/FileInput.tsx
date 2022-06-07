import clsx from 'clsx';
import { useDropzone } from 'react-dropzone';
import { useController,UseControllerProps } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Icon } from '../Icon/Icon';
import { FieldName, SchemaToErrors } from '.';
import { FieldError } from './FieldError';
import { Label } from './Label';

export type FileInputProps<FormSchema> = {
  name: FieldName<FormSchema>;
  placeholder?: string;
  label?: string;
  control: UseControllerProps<FormSchema>['control'];
  errors?: SchemaToErrors<FormSchema>;
  required?: boolean;
  labelClassName?: string;
  errorClassName?: string;
  inputClassName?: string;
  wrapperClassName?: string;
  value?: any;
  step?: string;
  defaultValue?: any;
  accept?: string;
  isMulti?: boolean;
};
function FileInput<FormSchema>({
  name,
  label,
  control,
  wrapperClassName = '',
  errorClassName,
  required = false,
  isMulti = false,
  errors = {},
  accept,
}: FileInputProps<FormSchema>) {
  const { t } = useTranslation();
  const {
    field: { onChange, onBlur, value },
  } = useController({
    name,
    control,
    rules: { required },
    defaultValue: [] as any,
  });
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    multiple: isMulti,
    onDropAccepted: (file) => {
      if (isMulti) {
        onChange([...acceptedFiles, ...file]);
      } else {
        onChange(file);
      }
      onBlur();
    },
  });
  return (
    <div className={clsx('flex flex-col', wrapperClassName)}>
      <Label {...{ name: name.toString(), required, label }} />
      <div
        {...getRootProps()}
        role="button"
        aria-label={t('components.FileInput.ariaLabel')}
        id={name.toString()}
        className="w-full"
        onBlur={onBlur}
      >
        <input {...getInputProps()} />
        <div
          className={clsx(
            'w-full rounded border-2 border-dashed p-3',
            isDragActive && 'border-4',
            errors[name] && 'border-red-500'
          )}
        >
          {!(value as any).length && (
            <div className="space-y-2 text-center">
              <div className="flex justify-center">
                <Icon id="cloud-upload" className="h-9 w-9" />
              </div>
              <div className="text-sm font-bold text-primary">
                {t<string>('components.FileInput.dragAndDrop')}
              </div>
              <div className="text-xs text-neutral-4">
                {t<string>('components.FileInput.selectFiles')} ({accept} - Max 10Mb/file)
              </div>
            </div>
          )}
          <div className="space-y-2">
            {(value as File[]).map((file: File, index: number) => {
              return (
                <div
                  key={file.name}
                  className="flex cursor-default items-center space-x-2 rounded bg-neutral-7 p-4 text-sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Icon id="file-document-line" className="h-8 w-8 text-neutral-6" />
                  <div className="flex-grow space-y-2">
                    <div className="font-bold">{file.name}</div>
                    <div className="text-xs">
                      {file.type} - {(file.size / 10000).toFixed(2)} MB
                    </div>
                  </div>
                  <button
                    className="p-1"
                    onClick={() => window.open(URL.createObjectURL(file), '_blank')?.focus()}
                  >
                    <Icon id="show" className="h-6 w-6 fill-neutral-4" />
                  </button>
                  <button
                    className="p-1"
                    onClick={() => {
                      onChange((value as File[]).filter((_, i) => i !== index));
                    }}
                  >
                    <Icon id="x-close-neutral-4" className="h-6 w-6" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        {errors[name] && (
          <FieldError errorClassName={errorClassName}>{t<string>(errors[name].key)}</FieldError>
        )}
      </div>
    </div>
  );
}

export default FileInput;
