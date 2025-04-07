
import { queryClient } from "@/App";
import { useMutation } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/core";

type DeleteCollectionProps = {
    id: number;
}

export function useDeleteCollection() {
    
    return useMutation({
        mutationFn: async (data: DeleteCollectionProps) => {
            await invoke ('delete_collection', data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['collections'],
            });
        }
       
    })
 }