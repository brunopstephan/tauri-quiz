import { Button } from "@/components/ui/button";

export function Home() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="font-bold text-4xl">Japanese Quiz</h1>
        <div className="flex flex-col gap-4 mt-8 w-48">
        <a className="w-full" href="/quiz"><Button className="w-full" size={'lg'}>Quiz</Button></a>
        <a className="w-full" href="/settings"><Button className="w-full" size={'lg'}>Settings</Button></a>
        </div>
        </div>
    )
}