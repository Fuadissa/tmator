import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextEditorMenuBar from "./TextEditorMenuBar";
import Image from "@tiptap/extension-image";

type TextEditorProps = {
  onChange: (content: string) => void;
  onImageUpload: (file: File) => Promise<string>; // Update to return a Promise<string>
  initialContent?: string;
};

export default function RichTextEditor({
  onChange,
  onImageUpload,
  initialContent,
}: TextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit, Underline, Image],
    content: initialContent,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[200px] max-h-[300px] overflow-auto cursor-text rounded-md border p-4 ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
      },
    },
    immediatelyRender: false,
  });

  const handleImageUploadCallback = async (file: File) => {
    const imageUrl = await onImageUpload(file); // Await the URL result here
    editor?.chain().focus().setImage({ src: imageUrl }).run();
  };

  return (
    <div>
      <TextEditorMenuBar
        editor={editor}
        onImageUpload={handleImageUploadCallback}
      />
      <EditorContent editor={editor} />
    </div>
  );
}
