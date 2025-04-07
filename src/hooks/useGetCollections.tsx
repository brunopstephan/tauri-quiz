import { useQuery } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/core";

export function useGetCollections() {
    return useQuery({
       queryKey: ['collections'],
       queryFn: async () => {
           const collections = await invoke('list_collections');
           
           return collections as any[];
       }
       
    })
}