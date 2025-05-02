
import { queryClient } from "@/App";
import { useMutation } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/core";

type CreateCollectionProps = {
    name: string;
    description?: string;
}

export function useCreateCollection() {
    
    return useMutation({
        mutationFn: async (data: CreateCollectionProps) => {
            const result = await invoke('create_collection', data)
            
            return result
        },
        onSuccess: () => {            
            queryClient.invalidateQueries({
                queryKey: ['collections'],
            });
        }
       
    })
 }