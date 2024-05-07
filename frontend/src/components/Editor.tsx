import YooptaEditor, { createYooptaEditor } from "@yoopta/editor";
import Paragraph from "@yoopta/paragraph";
import Blockquote from "@yoopta/blockquote";
import { useMemo } from "react";
import LinkTool, { DefaultLinkToolRender } from "@yoopta/link-tool";
import ActionMenu, { DefaultActionMenuRender } from "@yoopta/action-menu-list";
import Toolbar, { DefaultToolbarRender } from "@yoopta/toolbar";
import { Bold, Italic, CodeMark, Underline, Strike, Highlight } from '@yoopta/marks';

const MARKS = [Bold, Italic, CodeMark, Underline, Strike, Highlight];

const TOOLS = {
  Toolbar: {
    tool: Toolbar,
    render: DefaultToolbarRender,
  },
  ActionMenu: {
    tool: Toolbar,
    render: DefaultActionMenuRender,
  },
  LinkTool: {
    tool: LinkTool,
    render: DefaultLinkToolRender,
  },
};

const plugins = [Paragraph, Blockquote];

export default function Editor() {
  const editor = useMemo(() => createYooptaEditor(), []);

  return (
    <div>
      <YooptaEditor placeholder="Type text.." plugins={plugins} tools={TOOLS} marks={MARKS}/>
    </div>
  );
}
