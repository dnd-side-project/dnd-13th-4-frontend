import { UPDATE_MY_STATUS_PATH } from '@/constants/api';
import { api } from '@/lib/api';
import type { MemberStatusResponse, MemberStatusUpdateRequest } from '@/types/api';
import { useMutation } from '@tanstack/react-query';

const updateMyStatus = async (body: MemberStatusUpdateRequest) => {
  const { data } = await api.put<MemberStatusResponse>({
    path: UPDATE_MY_STATUS_PATH,
    body,
  });
  return data;
};

const useUpdateMyStatusMutation = () => {
  const mutation = useMutation({
    mutationFn: updateMyStatus,
  });

  return mutation;
};

export default useUpdateMyStatusMutation;