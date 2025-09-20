import { MY_STATUS_PATH, UPDATE_MY_STATUS_PATH } from '@/constants/api';
import { api } from '@/lib/api';
import type { MemberStatusResponse, MemberStatusUpdateRequest } from '@/types/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const updateMyStatus = async (body: MemberStatusUpdateRequest) => {
  const { data } = await api.put<MemberStatusResponse>({
    path: UPDATE_MY_STATUS_PATH,
    body,
  });
  return data;
};

const useUpdateMyStatusMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateMyStatus,
    onSuccess: () => {
      // 내 상태 쿼리 캐시 무효화
      queryClient.invalidateQueries({ queryKey: [MY_STATUS_PATH] });
    },
  });

  return mutation;
};

export default useUpdateMyStatusMutation;