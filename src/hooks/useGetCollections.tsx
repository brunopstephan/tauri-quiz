import { useQuery } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/core";

export function useGetCollections() {
    return useQuery({
       queryKey: ['collections'],
       queryFn: async () => {
           const collections = await invoke('list_collections') as any[];

           
           return await Promise.all(collections.map(async (collection) => {
            const [id, name] = collection

            const words = await invoke('get_words', { collectionId: id }) as any[];
            
            return {
                id,
                name,
                words: words.map((word) => (
                    {
                        id: word[0],
                        word: word[1],
                        definition: word[2],
                        collection_id: word[3]
                    }
                ))
            }

           }));
       }
       
    })
}