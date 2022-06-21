import { UseQueryResult } from 'react-query';

import { Spinner } from '@/componentes/Elements/Spinner/Spinner';

type DataRendererProps<Model> = {
  data: UseQueryResult<Model, unknown>;
  render: (data: Model) => React.ReactElement;
  error?: React.ReactElement;
  loader?: React.ReactElement;
};

export function DataRenderer<Model>({ data, render, error, loader }: DataRendererProps<Model>) {
  if (data.data) {
    return render(data.data);
  }

  if (data.error instanceof Error) {
    if (error) return error;
    return <p>{('An error has occurred: ' + data.error.message) as string}</p>;
  }

  if (loader) return loader;
  return (
    <div className="flex justify-center p-8">
      <Spinner />
    </div>
  );
}
