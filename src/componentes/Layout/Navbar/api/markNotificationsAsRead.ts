import { httpClient } from '@/lib/httpClient';
import { useMutation, useQueryClient } from 'react-query';
import { useAlert } from 'react-alert';

function markAsRead(): Promise<any> {
  return httpClient.put(`/notifications/me/read`);
}

export function markNotificationsAsRead() {
  const queryClient = useQueryClient();
  const alert = useAlert();

  return useMutation(markAsRead, {
    onSuccess: () => {
      queryClient.invalidateQueries(['notifications']);
    },
  });
}
