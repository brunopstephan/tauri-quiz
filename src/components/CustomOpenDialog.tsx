import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

  type CustomOpenDialogProps = {
    children: React.ReactNode,
    trigger: React.ReactNode,
    isOpen: boolean,
    title: string,
    setIsOpen: (isOpen: boolean) => void,
  }

export function CustomOpenDialog({trigger, isOpen,setIsOpen, children, title}: CustomOpenDialogProps) {
    return <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <DialogTrigger asChild>
        {trigger}
    </DialogTrigger>
    <DialogContent>
        <DialogHeader>
        <DialogTitle> {title}</DialogTitle>
        </DialogHeader>
        {children}
    </DialogContent>
    </Dialog>
    
}