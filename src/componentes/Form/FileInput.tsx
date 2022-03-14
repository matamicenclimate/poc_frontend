import clsx from 'clsx';
import { useDropzone } from 'react-dropzone';
import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ReactComponent as UploadIcon } from '@/assets/icons/bx-cloud-upload.svg';
import { ReactComponent as FileIcon } from '@/assets/icons/bx-File_Document_Line.svg';
import { ReactComponent as ShowIcon } from '@/assets/icons/bx-show.svg';
import { ReactComponent as DeleteIcon } from '@/assets/icons/bx-x.svg';
export type FileInputProps = {
  name: string;
  placeholder?: string;
  label?: string;
  htmlFor?: string;
  control: any;
  errors?: Record<string, Record<string, string>>;
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
const FileInput = ({
  name,
  label,
  control,
  wrapperClassName = '',
  errorClassName,
  required = false,
  isMulti = false,
  errors = {},
  accept,
}: FileInputProps) => {
  const { t } = useTranslation();
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { invalid, isTouched, isDirty },
    formState: { touchedFields, dirtyFields },
  } = useController({
    name,
    control,
    rules: { required: true },
    defaultValue: [],
  });
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    onDrop: (file) => {
      onChange(file);
      onBlur();
    },
  });
  return (
    <div className={clsx('flex flex-col', wrapperClassName)}>
      <label className={clsx('mb-3 text-xs text-neutral-4')} htmlFor={name} id={name}>
        {label} {required && '(required)'}
      </label>
      <div
        {...getRootProps()}
        role="button"
        aria-label="File Upload"
        id={name}
        className="w-full"
        onBlur={onBlur}
      >
        <input {...getInputProps()} />
        <div
          className={clsx('w-full rounded border-2 border-dashed p-3', isDragActive && 'border-4')}
        >
          {!acceptedFiles.length && (
            <div className="space-y-2 text-center">
              <div className="flex justify-center">
                <UploadIcon />
              </div>
              <div className="text-sm font-bold text-primary">Drag and drop</div>
              <div className="text-xs text-neutral-4">Select files ({accept} - Max 10Mb/file)</div>
            </div>
          )}
          {!!acceptedFiles?.length && (
            <div className=" ">
              {acceptedFiles.map((file: any) => {
                return (
                  <div
                    key={file.name}
                    className="flex items-center space-x-2 rounded bg-neutral-7 p-4 text-sm"
                  >
                    <FileIcon />
                    <div className="flex-grow space-y-2">
                      <div className="font-bold">{file.name}</div>
                      <div className="text-xs">
                        {file.type} - {(file.size / 100000).toFixed(2)} MB
                      </div>
                    </div>
                    <ShowIcon />
                    <DeleteIcon />
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {errors[name] && (
          <p className={`text-red-700 ${errorClassName}`} role="alert">
            {t(errors[name].key)}
          </p>
        )}
      </div>
    </div>
  );
};

export default FileInput;
