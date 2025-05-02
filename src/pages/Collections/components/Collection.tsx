import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { WordsDialog } from "./WordsDialog";
import { DeleteCollectionDialog } from "./DeleteCollectionDialog";

type CollectionProps = {
    name: string;
    id: number
    words: {
        word: string;
        definition: string;
    }[];
}

export function Collection({ name, id,words}: CollectionProps) {
    return <div className="border-2 border-neutral-400 p-4 rounded-md flex flex-col items-center justify-center gap-2">
        {name}
        <div className="flex items-center justify-center gap-2">
            <WordsDialog collectionName="Coleção" words={words}>
                <Button><Eye /> See words</Button>
            </WordsDialog>
            <DeleteCollectionDialog id={id} name={name} />
        </div>
    </div>
}