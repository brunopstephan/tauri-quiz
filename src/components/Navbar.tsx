import { Button } from "./ui/button";
import { Home, List, Play, Settings } from "lucide-react";

export function Navbar() {
    const url = window.location.pathname
    return <div className="flex p-4 gap-4">
        <a href='/'><Button variant={url === "/" ? "default" : "outline"}><Home /> Home</Button></a>
        <a href="/quiz"><Button variant={url === "/quiz" ? "default" : "outline"}><Play /> Play</Button></a>
        <a href="/collections"><Button variant={url === "/collections" ? "default" : "outline"}><List /> Collections</Button></a>
        <a href="/settings"><Button variant={url === "/settings" ? "default" : "outline"}><Settings /> Settings</Button></a>
    </div>
}