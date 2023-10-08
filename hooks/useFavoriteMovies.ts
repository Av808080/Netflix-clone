import useSWR from "swr";
import fetcher from "@/lib/fetcher";
const useFavoriteMovies = () => {
  const { data, isLoading, mutate, error } = useSWR("/api/favorite", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    data,
    isLoading,
    mutate,
    error,
  };
};
export default useFavoriteMovies;
