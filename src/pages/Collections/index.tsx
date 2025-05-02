import { Button } from "@/components/ui/button";
import { Loader, Plus } from "lucide-react";
import { Collection, CreateCollectionDialog } from "./components";
import { useGetCollections } from "@/hooks";

export function Collections() {
    const { data: collections, isLoading } = useGetCollections()
    
    
    if (isLoading) {
        return <div className="flex justify-center items-center ">
           <Loader className="animate-spin" />
        </div>
    }
    
    return <div className="flex flex-col items-center gap-4">
    <h1 className="font-bold text-4xl">Collections</h1>

    <CreateCollectionDialog><Button size={'lg'} animated><Plus /> Add Collection</Button></CreateCollectionDialog>

    <div className="flex flex-wrap gap-4 justify-center">
        {
            collections?.map((collection) => (
                <Collection key={collection.id} name={collection.name} id={collection.id} words={collection.words} />
            ))
        }
    </div>

</div>;
}
