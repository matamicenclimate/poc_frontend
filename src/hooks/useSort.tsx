import { useState } from 'react';
import { ReactComponent as UpDownArrow } from '@/assets/icons/bx-up-down-arrow.svg';
import { Icon } from '@/componentes/Icon/Icon';

export interface SortState {
  field?: string;
  order?: 'asc' | 'desc';
}

export function useSort() {
  const [sort, setSort] = useState<SortState>({
    field: undefined,
    order: undefined,
  });

  function toggleSort(field: string) {
    if (field !== sort.field) {
      setSort({ field, order: 'asc' });
    }
    if (sort.order === 'asc') {
      setSort((old) => ({ ...old, order: 'desc' }));
    } else if (sort.order === 'desc') {
      setSort((old) => ({ ...old, order: undefined }));
    } else {
      setSort((old) => ({ ...old, order: 'asc' }));
    }
  }

  function isActiveSort(field: string) {
    return !!sort.order && sort.field === field;
  }

  function renderArrow(field: string) {
    if (field === sort.field) {
      if (sort.order === 'asc') return <Icon id="arrow-up-simple-line" className="h-4 w-4" />;
      else if (sort.order === 'desc')
        return <Icon id="arrow-down-simple-line" className="h-4 w-4" />;
      return <Icon id="up-down-arrow" className="h-4 w-4" />;
    }
    return <Icon id="up-down-arrow" className="h-4 w-4" />;
  }
  return { sort, toggleSort, isActiveSort, renderArrow };
}
