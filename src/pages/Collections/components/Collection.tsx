import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { WordsDialog } from "./WordsDialog";

type CollectionProps = {
    name: string;

}

export function Collection({ name,  }: CollectionProps) {
    return <div className="border-2 border-neutral-400 p-4 rounded-md flex flex-col items-center justify-center gap-2">
        {name}
        <WordsDialog collectionName="Coleção">
            <Button><Eye /> See words</Button>
        </WordsDialog>
    </div>
}