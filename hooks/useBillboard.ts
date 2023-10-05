import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useBillboard = () => {
  const { data, isLoading, error, mutate } = useSWR("/api/random", fetcher, {
    revalidateOnReconnect: false,
    revalidateOnFocus: false,
    revalidateIfStale: false,
  });
  return {
    data,
    isLoading,
    error,
    mutate,
  };
};
export default useBillboard;
