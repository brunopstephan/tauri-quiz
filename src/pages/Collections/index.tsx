import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Collection } from "./components";

export function Collections() {
    return <div className="flex flex-col items-center gap-4">
    <h1 className="font-bold text-4xl">Collections</h1>

    <Button size={'lg'} animated><Plus /> Add Collection</Button>

    <div className="flex flex-wrap gap-4 justify-center">
        <Collection />
    </div>

</div>;
}
