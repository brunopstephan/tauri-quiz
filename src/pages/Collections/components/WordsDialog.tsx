import { CustomOpenDialog } from "@/components"
import { useState } from "react";

type WordsDialogProps = {
  children: React.ReactNode,
  collectionName: string,
  words: {
    word: string;
    definition: string;
  }[];
}

export function WordsDialog({children, collectionName, words}: WordsDialogProps) {  
    const [isOpen, setIsOpen] = useState(false);
    return <CustomOpenDialog 
        trigger={children} 
        title={`${collectionName}'s words` } 
        isOpen={isOpen} 
        setIsOpen={setIsOpen}
        > 
            <div className="max-h-96">
            {
              words?.length ? words.map((word) => (
                <div key={word.word} className="flex flex-col gap-2">
                  <h2 className="text-lg font-bold">{word.word}</h2>
                  <p>{word.definition}</p>
                </div>
              )) : (
                <p className="text-center text-neutral-500">No words found</p>
              )
            }
            </div>
        </CustomOpenDialog>
}