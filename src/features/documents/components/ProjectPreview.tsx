import { Pill } from '@/componentes/Elements/Pill/Pill';
import { Title } from '@/componentes/Elements/Title/Title';

type ProjectPreviewProps = {
  values: Record<string, any>;
};
export const ProjectPreview = ({ values }: ProjectPreviewProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <div
          className="col-span-1 flex justify-center rounded bg-neutral-7 bg-cover bg-center"
          style={{
            backgroundImage: values.thumbnail?.url
              ? `url(${values.thumbnail.url})`
              : !!values.thumbnail && values.thumbnail.length > 0
              ? `url(${URL.createObjectURL(values.thumbnail[0])}`
              : '',
          }}
        />
        <div className="col-span-3 space-y-4 text-sm">
          <Title size={5} as={3}>
            {values.title}
          </Title>

          <p>
            {values.project_type?.label ?? values.project_type?.name ?? ''} -{' '}
            {values.country?.label ?? values.country?.name ?? ''}
          </p>
          <p className="font-bold text-primary">{values.credits ?? 0} credits</p>
          <div className="flex gap-2">
            {values.sdgs.map((sdg: any) => (
              <Pill key={sdg.value} style="solid" variant="featured">
                {sdg.label}
              </Pill>
            ))}
          </div>
        </div>
      </div>
      <div className="text-neutral-4">{values.description}</div>
    </div>
  );
};
