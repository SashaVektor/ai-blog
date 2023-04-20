import { PencilSquareIcon, XMarkIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { Editor } from '@tiptap/react'

interface CategoryAndEditProps {
    isEditable: boolean,
    handleIsEditable: (bool: boolean) => void
    setTitle: (title: string) => void
    title: string
    tempTitle: string
    setTempTitle: (tempTitle : string) => void
    tempContent: string
    setTempContent: (tempContent: string) => void
    editor: Editor | null
    post: FormattedPost
}

const CategoryAndEdit = ({isEditable, handleIsEditable, editor, setTempContent,
setTempTitle, setTitle, tempContent, tempTitle, title, post }: CategoryAndEditProps) => {

    const handleEnableEdit = () => {
        handleIsEditable(!isEditable)
        setTempTitle(title)
        setTempContent(editor?.getHTML() || "")
    }

    const handleCancelEdit = () => {
        handleIsEditable(!isEditable)
        setTitle(tempTitle)
        editor?.commands.setContent(tempContent)
    }

    return (
        <div className='flex justify-between items-center'>
            <h4 className='bg-accent-orange py-2 px-5 text-wh-900 text-sm font-bold'>
                {post?.category}
            </h4>
            <div className='mt-4'>
                {isEditable ? (
                    <div className='flex justify-between gap-3'>
                        <button onClick={handleCancelEdit}>
                            <XMarkIcon className='h-6 w-6 text-accent-red' />
                        </button>
                    </div>
                ) : (
                    <button onClick={handleEnableEdit}>
                        <PencilSquareIcon className='h-6 w-6 text-accent-red' />
                    </button>
                )}
            </div>
        </div>
    )
}

export default CategoryAndEdit
