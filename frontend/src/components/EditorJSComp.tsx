import { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
// @ts-ignore
import Header from "@editorjs/header";
// @ts-ignore
import Paragraph from "@editorjs/paragraph";
// @ts-ignore
import List from "@editorjs/list";
// @ts-ignore
import Quote from "@editorjs/quote";

const EditorComponent = ({
  data,
  onChange,
}: {
  data: string;
  onChange: (data: string) => void;
}) => {
  let timeoutId: any;
  const ejInstance = useRef<EditorJS | null>(null);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: "editorjs",
      autofocus: true,
      data: JSON.parse(data),

      onChange: async () => {
        // Clear any existing timeout
        clearTimeout(timeoutId);

        // Set a new timeout
        timeoutId = setTimeout(async () => {
          const content = await editor.save();
          onChange(JSON.stringify(content));
        }, 500); // Adjust the delay time as needed (e.g., 500 milliseconds)
      },

      tools: {
        header: {
          class: Header,
          inlineToolbar: true,
          config: {
            placeholder: 'Heading'
          },

        },
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
          config: {
            placeholder: 'Paragraph'
          },
        },
        list: {
          class: List,
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered",
          },
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+O",
          config: {
            quotePlaceholder: "Enter a quote",
            captionPlaceholder: "Quote's author",
          },
        },
      },
    });
    ejInstance.current = editor;
  };

  useEffect(() => {
    if (ejInstance.current === null) {
      initEditor();
    }

    // return () => {
    //   if (ejInstance.current) {
    //     ejInstance.current.destroy();
    //     ejInstance.current = null;
    //   }
    // };
  }, []);

  return <div id="editorjs"></div>;
};

export default EditorComponent;
