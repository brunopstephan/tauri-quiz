import { Button } from "@/components/ui/button";

export function Home() {
    return (
        <div className="flex flex-col items-center">
        <h1 className="font-bold text-4xl animate-bounce">Japanese Quiz</h1>
        <div className="flex flex-col gap-4 mt-8 w-48">
        <a className="w-full" href="/quiz"><Button className="w-full" size={'lg'} animated>Play</Button></a>
        <a className="w-full" href="/collections"><Button className="w-full" size={'lg'} animated>Collections</Button></a>
        <a className="w-full" href="/settings"><Button className="w-full" size={'lg'} animated>Settings</Button></a>
        </div>
        </div>
    )
}