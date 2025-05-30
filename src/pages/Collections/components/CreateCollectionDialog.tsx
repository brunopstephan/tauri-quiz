import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import {  z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { CustomOpenDialog } from '@/components';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCreateCollection } from '@/hooks';
import { useCreateWords } from '@/hooks/useCreateWords';


const ACCEPTED_MIME_TYPES = ["text/csv"]
const ACCEPTED_FILE_EXTENSIONS = [".csv"]

const csvFileSchema = z.custom<File>((file) => {
	if (!(file instanceof File)) {
		return false
	}

	if (!ACCEPTED_MIME_TYPES.includes(file.type)) {
		return false
	}

	const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`
	if (!ACCEPTED_FILE_EXTENSIONS.includes(fileExtension)) {
		return false
	}

	return true
}, "The file must be a valid csv file.")

const collectionFilter = z.object({
	name: z.string({ message: 'Name is required' }).min(1, { message: 'Name is required' }),
	words: csvFileSchema,
})

type CreateCollectionDialogProps = {
    children: React.ReactNode,
  }
  
type CollectionFilter = z.infer<typeof collectionFilter>;

export function CreateCollectionDialog({children}: CreateCollectionDialogProps) {

    const [isOpen, setIsOpen] = useState(false);

    const {
		handleSubmit,
		formState: { errors },
		control,
		reset,
		clearErrors,
	} = useForm<CollectionFilter>({
		resolver: zodResolver(collectionFilter),
	})

    const clearFields = useCallback(() => {
		reset()
		clearErrors()
	}, [reset, clearErrors])

    useEffect(() => {
		if (!isOpen) {
			clearFields()
		}
	}, [isOpen, clearFields])

	const {mutateAsync: createCollectionFn} = useCreateCollection()
	const {mutateAsync: createWordsFn} = useCreateWords()


	const [createdColletionId, setCreatedCollectionId] = useState<string | null>(null)
	const [parsedWords, setParsedWords] = useState<{ word: string; definition: string }[]>([])	
	

    function handleCreateCollection(data: CollectionFilter) {
		
		if (data.words instanceof File) {
			const reader = new FileReader();
			reader.onload = (event) => {
				const fileContent = event.target?.result;
				if (typeof fileContent === 'string') {
					const rows = fileContent.split('\n').filter(row => row.trim() !== '');
					setParsedWords(rows.map(row => {
						const [word, definition] = row.split(',').map(cell => cell.trim());
						return { word, definition };
					}));
					
				}
			};
			reader.readAsText(data.words);
		}
		
       
		createCollectionFn(data).then(async(d) => {
			setIsOpen(false)
			const [id] = d as any[]
			setCreatedCollectionId(id)
		})
		.catch((error) => {
			console.error("Error creating collection:", error);
		})
    }

	useEffect(() => {
		if (createdColletionId && parsedWords.length > 0) {			
			createWordsFn({
				collection_id: createdColletionId,
				words: parsedWords
			}).then(() => {
				setCreatedCollectionId(null)
				setParsedWords([])
			})
			.catch((error) => {
				console.error("Error creating words:", error);
			})
		}
	}, [createdColletionId, parsedWords])

    return <CustomOpenDialog trigger={children} title="Create Collection" isOpen={isOpen} setIsOpen={setIsOpen}>
        <form onSubmit={handleSubmit(handleCreateCollection)} className="flex flex-col gap-4">
        <div className="w-full flex flex-col space-y-2">
					<label>Name</label>

					<Controller
						name="name"
						control={control}
						render={({ field }) => (
							<Input
								{...field}
								placeholder="Collection 1"
								className={errors?.name?.message && 'border-red-500'}
								/* onChange={(e: ChangeEvent<HTMLInputElement>) => {
									field.onChange(e)
								}} */
							/>
						)}
					/>
					{errors.name && (
						<span className="text-red-500">* {errors.name.message}</span>
					)}
				</div>
                


                <div className="flex w-full flex-col space-y-2">
					<label>Words</label>

					<Controller
						name="words"
						control={control}
						render={({ field }) => (
								<Input

								className={errors?.words?.message && 'border-red-500'}
								type='file'
								accept=".csv"
								onBlur={field.onBlur}
								name={field.name}
								ref={field.ref}
								onChange={(e: ChangeEvent<HTMLInputElement>) => {
									if (e.target.files?.[0]) {
										field.onChange(e.target.files[0]);
									}
								}}
							/>
						)}
					/>
					{errors.words && (
						<span className="text-red-500">* {errors.words.message}</span>
					)}
				</div>

                <Button type="submit">Create</Button>
        </form>
    </CustomOpenDialog>
    
}