import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose, DialogHeader  } from "@/components/ui/dialog"
import { useDeleteCollection } from "@/hooks"
import { Trash } from "lucide-react"

type DeleteCollectionDialogProps = {
    id: number
    name: string
}

export function DeleteCollectionDialog({id, name}: DeleteCollectionDialogProps) {
    const { mutateAsync: deleteCollectionFn } = useDeleteCollection()
    return <Dialog >
    <DialogTrigger>
        <Button variant="destructive" size={'icon'}><Trash /></Button>
    </DialogTrigger>
    <DialogContent>
        <DialogHeader>
            <DialogTitle>Confirm exclusion</DialogTitle>
            <DialogDescription>Are you sure you want to delete {name} collection?</DialogDescription>
        </DialogHeader>
        <div className="flex gap-4">
            <DialogClose>
                <Button 
                onClick={() => {
                    deleteCollectionFn({id})
                }}
                variant="destructive">Delete</Button>
            </DialogClose>
            <DialogClose>
                <Button>Cancel</Button>
            </DialogClose>
        </div>
    </DialogContent>
    </Dialog>
}