import { documentKeys } from './index';
import { useQuery } from 'react-query';

function fetchFormOptions(): Promise<{
  registry: Record<string, string>[];
  type: Record<string, string>[];
}> {
  return Promise.resolve({
    registry: [
      { value: 'cdm', label: 'CDM' },
      { value: 'verra', label: 'Verra' },
      { value: 'goldStandard', label: 'Gold Standard' },
      { value: 'ecoregistry', label: 'Ecoregistry' },
      { value: 'bme', label: 'BME' },
    ],
    type: [
      { value: 'carbon', label: 'Carbon offset' },
      { value: 'nature', label: 'Nature based solutions' },
      { value: 'irecs', label: 'Irecs' },
    ],
  });
}
export function getFormOptions() {
  return useQuery(documentKeys.form(), () => fetchFormOptions());
}
