import { CustomOpenDialog } from "@/components"
import { useState } from "react";

type WordsDialogProps = {
  children: React.ReactNode,
  collectionName: string,
}

export function WordsDialog({children, collectionName}: WordsDialogProps) {
    const [isOpen, setIsOpen] = useState(false);
    return <CustomOpenDialog 
        trigger={children} 
        title={`${collectionName}'s words` } 
        isOpen={isOpen} 
        setIsOpen={setIsOpen}
        > 
            <h1>teste</h1> 
        </CustomOpenDialog>
}