import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { WordsDialog } from "./WordsDialog";

export function Collection() {
    return <div className="border-2 border-neutral-400 p-4 rounded-md flex flex-col items-center justify-center gap-2">
        Coleção
        <WordsDialog collectionName="Coleção">
            <Button><Eye /> See words</Button>
        </WordsDialog>
    </div>
}