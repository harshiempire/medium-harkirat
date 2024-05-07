import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";

const editor = new EditorJS({
  /**
   * Id of Element that should contain the Editor
   */
  holder: "editorjs",
  inlineToolbar: ["link", "marker", "bold", "italic"],
  /**
   * Available Tools list.
   * Pass Tool's class or Settings object for each Tool you want to use
   */
  tools: {
    header: {
      class: Header,
      inlineToolbar: ["marker", "link"],
      config: {
        placeholder: "Header",
      },
      shortcut: "CMD+SHIFT+H",
    },
    list: {
      class: List,
      inlineToolbar: true,
    },
  },
});

export {editor}
