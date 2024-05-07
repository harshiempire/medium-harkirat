import React, { ChangeEvent, useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import List from "@editorjs/list";
import Quote from '@editorjs/quote';

// const DEFAULT_INITIAL_DATA = {
//   time: new Date().getTime(),
//   blocks: [],
// };

const EditorComponent = ({
  data,
  onChange,
}: {
  data: string;
  onChange: (e: any) => void;
}) => {
  const ejInstance = useRef();

  const initEditor = () => {
    const editor = new EditorJS({
      holder: "editorjs",
      onReady: () => {
        ejInstance.current = editor;
      },
      autofocus: true,
      data: {
        time: new Date().getTime(),
        blocks: [JSON.parse(data)],
      },
      onChange: async () => {
        const content = await editor.saver.save();
        onChange(JSON.stringify(content));
        console.log(content);
      },

      tools: {
        header: Header,
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
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
            shortcut: 'CMD+SHIFT+O',
            config: {
              quotePlaceholder: 'Enter a quote',
              captionPlaceholder: 'Quote\'s author',
            },
          },
      },
    });
  };

  // This will run only once
  useEffect(() => {
    if (ejInstance.current === null) {
      initEditor();
    }

    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, []);

  return (
    <>
      <div id="editorjs"></div>
    </>
  );
};

export default EditorComponent;
