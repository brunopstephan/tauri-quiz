import { Button } from "@/components/ui/button";

type QuestionProps = {
    word: string;
    options: string[];
    definition: string;
    onAnswer: (answer: string, id: number) => void;
    id: number;
}

export function Question(props: QuestionProps) {
    const { word, options, onAnswer, id } = props;

    return (
        <div className="flex flex-col gap-8">
            <h1 className="text-2xl self-center">The word is: <span className="font-bold ">{word}</span>. Which option is the correct?</h1>
            <div className="grid grid-cols-2 gap-2">
                {options.map((option) => (
                    <Button
                        key={option}
                        size={"lg"}
                        onClick={() => onAnswer(option, id)}
                        className="text-lg"
                    >
                        {option}
                    </Button>
                ))}
            </div>
        </div>
    );
}