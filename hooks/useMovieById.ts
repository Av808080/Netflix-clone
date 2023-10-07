import useSWR from "swr";
import fetcher from "@/lib/fetcher";
const useMovieById = (movieId: string) => {
  const { data, isLoading, error, mutate } = useSWR(
    `/api/${movieId}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
    }
  );
  return {
    data,
    isLoading,
    error,
    mutate,
  };
};
export default useMovieById;
