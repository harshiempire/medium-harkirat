export const configForBlock  = {
  code: {
    className: "language-js",
  },
  delimiter: {
    className: "border border-2 w-16 mx-auto",
  },
  embed: {
    className: "border-0",
  },
  header: {
    className: "font-bold py-2",
    actionsClassNames: {},
  },
  image: {
    className: "w-full max-w-screen-md",
    actionsClassNames: {
      stretched: "w-full h-80 object-cover",
      withBorder: "border border-2",
      withBackground: "p-2",
    },
  },
  list: {
    className: "list-inside px-4",
  },
  paragraph: {
    className: "text-base text-opacity-75 py-2 leading-relaxed	",
    actionsClassNames: {
      alignment: "text-{alignment}", // This is a substitution placeholder: left or center.
    },
  },
  quote: {
    className: "py-3 px-5 italic font-serif",
  },
  table: {
    className: "table-auto",
  },
};
