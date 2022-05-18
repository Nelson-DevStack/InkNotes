import useSWR from "swr";
import { useApi } from "./useApi";

export function useFetch(url){
  const api = useApi();

  // GET
  const { data, error } = useSWR(url, async (url)=>{
    const res = await api.get(url);
    return res;
  });

  return { data, error };
};