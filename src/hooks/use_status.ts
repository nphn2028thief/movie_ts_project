import { useAppSelector } from "../redux_store";

export const useIsRequestPending = (sliceName: string, actionName: string) => {
  return useAppSelector(
    (state) => state.apiSlice?.[sliceName]?.[actionName].status === "pending"
  );
};

export const useIsRequestSuccess = (sliceName: string, actionName: string) => {
  return useAppSelector(
    (state) => state.apiSlice?.[sliceName]?.[actionName].status === "fulfilled"
  );
};

export const useIsRequestError = (sliceName: string, actionName: string) => {
  return useAppSelector(
    (state) => state.apiSlice?.[sliceName]?.[actionName].status === "rejected"
  );
};

export const useGetStatus = (sliceName: string, actionName: string) => {
  const isLoading = useIsRequestPending(sliceName, actionName);
  const isSuccess = useIsRequestSuccess(sliceName, actionName);
  const isError = useIsRequestError(sliceName, actionName);

  return [isLoading, isSuccess, isError];
};
