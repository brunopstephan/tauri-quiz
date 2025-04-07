
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
            await invoke ('create_collection', data)
        },
        onSuccess: () => {            
            queryClient.invalidateQueries({
                queryKey: ['collections'],
            });
        }
       
    })
 }