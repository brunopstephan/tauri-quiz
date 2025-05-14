import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

type QuestionProps = {
    word: string;
    options: string[];
    definition: string;
    onAnswer: (answer: string, id: number) => void;
    id: number;
}

export function Question(props: QuestionProps) {
    const { word, options, onAnswer, id, definition } = props;

    const [optionsWithColor, setOptionsWithColor] = useState<{
        option: string;
        color: string;
    }[]>(
        options.map((option) => ({
            option,
            color: '',
        }))
    );

    const [answered, setAnswered] = useState(false)

    return (
        <div className="flex flex-col gap-8">
            <h1 className="text-2xl self-center">The word is: <span className="font-bold ">{word}</span>. Which option is the correct?</h1>
            <div className="grid grid-cols-2 gap-2">
                {optionsWithColor.map(({color,option}) => 
                    {
                        const onClick = () => {
                            if (answered) return;
                            setAnswered(true)
                            if (option === definition) {
                                color = 'bg-green-500 hover:bg-green-600 pointer-events-none'
                            } else {
                                color = 'bg-red-500 hover:bg-red-600 pointer-events-none'
                            }

                            setOptionsWithColor((prev) =>
                                prev.map((item) =>
                                    item.option === option
                                        ? { ...item, color }
                                        : { ...item }
                                )
                            );

                            setTimeout(() => {
                                onAnswer(option, id)
                            }, 1500)

                            }

                        return (
                            <Button
                                key={option}
                                size={"lg"}
                                onClick={() => onClick()}
                                className={cn("text-lg", color )}
                            >
                                {option}
                            </Button>
                        )
                    }
                )}
            </div>
        </div>
    );
}