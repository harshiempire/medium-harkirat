import { clsx } from "clsx";

function Button({
  children,
  loading,
  onClick,
}: {
  children: string;
  loading: boolean;
  onClick: () => void;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        disabled={loading}
        className={clsx(
          "text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full",
          {
            "bg-slate-500 opacity-75": loading === true,
          }
        )}
      >
        {!loading ? children : "Loading..."}
      </button>
    </div>
  );
}

export default Button;
