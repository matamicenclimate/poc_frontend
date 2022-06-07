import { useAlert } from 'react-alert';
import { useMutation, useQueryClient } from 'react-query';

import { httpClient } from '@/lib/httpClient';

function markAsRead(): Promise<any> {
  return httpClient.put(`/notifications/me/read`);
}

export function useMarkNotificationsAsRead() {
  const queryClient = useQueryClient();
  const alert = useAlert();

  return useMutation(markAsRead, {
    onSuccess: () => {
      queryClient.invalidateQueries(['notifications']);
    },
  });
}
