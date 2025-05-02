import { Button } from "@/components/ui/button";
import { useGetCollections } from "@/hooks";
import { Word } from "@/schemas";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { Question } from "./components/Question";

export function Quiz() {
    const { data: collections, isLoading } = useGetCollections()
    
    const [words, setWords] = useState<Word[] | null>(null)

    const [questions, setQuestions] = useState<{
        word: string;
        options: string[];
        definition: string;
        id: number;
    }[]| null>(null)


    const [answered, setAnswered] = useState<{
        id: number;
        answer: string;
        correct: boolean;
        correctAnswer: string;
        word: string;
    }[]>([])
    
    const [currentQuestion, setCurrentQuestion] = useState(0)

    function handleAnswer(answer: string, id: number) {
        const word = words!.find((word) => word.id === id)
        if (!word) return;
        const isCorrect = word.definition === answer
        setAnswered((prev) => [...prev, { id, answer, correct: isCorrect, correctAnswer: word.definition, 
            word: word.word }])

        setCurrentQuestion((prev) => prev + 1)

        
    }



    useEffect(() => {
        if(words === null) {
            setQuestions(null)
            setAnswered([])
            setCurrentQuestion(0)
            return
        }
        
        const shuffledWords = words!.sort(() => Math.random() - 0.5).slice(0, words!.length);

        const questions = shuffledWords?.map((word) => {
            const options = shuffledWords!.map((word) => word.definition)
            
            const shuffledOptions = [...new Set([...options.filter(o => o !== word.definition).sort(() => Math.random() - 0.5).slice(0, 3), word.definition])].sort(() => Math.random() - 0.5);
            return {
                word: word.word,
                options: shuffledOptions,
                definition: word.definition,
                id: word.id
            }
        })

        setQuestions(questions!)
    }, [words])
    
    if (isLoading) {
        return <div className="flex justify-center items-center ">
           <Loader className="animate-spin" />
        </div>
    }
    return <div className="flex flex-col items-center gap-4">
        {
            words && questions
            ? 
            <>
                <div className="flex justify-end gap-4 w-full">
                    <Button
                        variant="outline"
                        onClick={() => setWords(null)}
                        className="capitalize">Reset
                        </Button>
                </div>
                {
                    currentQuestion <= questions.length - 1 ?
                    <Question
                    word={questions[currentQuestion].word}
                    options={questions[currentQuestion].options}
                    definition={questions[currentQuestion].definition}
                    onAnswer={handleAnswer}
                    id={questions[currentQuestion].id}
                />
                :
                <>
                    <h1 className="text-2xl">Quiz finished!</h1>
                    <h2>
                    You answered {answered.filter(a => a.correct).length}/{answered.length} questions correctly.</h2>
                    <div className="grid grid-cols-4 gap-4">
                        {
                            answered.map((question) => (
                                <div key={question.id} className={`flex flex-col gap-2 p-4 rounded-md ${question.correct ? "bg-green-500" : "bg-red-500"}`}>
                                    <h1 className="text-lg font-bold">{question.word}</h1>
                                    <p className="text-sm">Your answer: {question.answer}</p>
                                    <p className="text-sm">Correct answer: {question.correctAnswer}</p>
                                </div>
                            ))
                        }
                    </div>
                </>
                }
                
            </> 
            : <>
            <h1 className="font-bold text-4xl">Select a collection</h1>

            <div className="flex flex-wrap gap-4 justify-center">
                    {
                        collections?.map((collection) => (
                            <Button 
                            size={"lg"}
                            onClick={() => setWords(collection.words)}
                            key={collection.id}
                            className="capitalize text-lg">{collection.name}</Button>
                        ))
                    }
                </div>
            </> 
        }
    </div>;
}