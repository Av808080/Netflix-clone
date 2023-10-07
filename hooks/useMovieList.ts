import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useMovieList = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/movies", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
  });
  return {
    data,
    isLoading,
    error,
    mutate,
  };
};
export default useMovieList;
