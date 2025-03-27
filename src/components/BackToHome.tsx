import { Home } from "lucide-react";
import { Button } from "./ui/button";

export function BackToHome() {
    return <a href="/"><Button variant="outline"><Home /> Home</Button></a>
}