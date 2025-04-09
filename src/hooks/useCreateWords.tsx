
import { queryClient } from "@/App";
import { useMutation } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/core";

type CreateWordsProps = {
    collection_id: string;
    words: {
        word: string;
        definition: string;
    }[];
}

export function useCreateWords() {
    
    return useMutation({
        mutationFn: async (data: CreateWordsProps) => {
            await Promise.all(
                data.words.map(async (word) => {
                    await invoke('create_word', {
                        word: word.word,
                        definition: word.definition,
                        collection_id: data.collection_id
                    });
                }
            ));
        },
        onSuccess: () => {            
            queryClient.invalidateQueries({
                queryKey: ['words'],
            });
        }
       
    })
 }