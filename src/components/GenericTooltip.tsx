import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

type GenericTooltipProps = {
    children: React.ReactNode
    text: string
}

export function GenericTooltip({children, text}: GenericTooltipProps) {
    return <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>
        {text}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
}