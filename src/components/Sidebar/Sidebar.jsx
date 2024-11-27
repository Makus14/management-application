import { useProjectContext } from "../ProjectContext";

export default function Sidebar({ onOpenForm, onOpenProject }) {
  const { projects, setSelected } = useProjectContext();

  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
        Your Projects
      </h2>
      <button
        onClick={onOpenForm}
        className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100"
      >
        + Add Project
      </button>
      <ul className="mt-8">
        {projects.map((value) => (
          <div key={value.key}>
            <button
              onClick={() => {
                setSelected(value);
                onOpenProject(value);
              }}
              className="w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800"
            >
              {value.title}
            </button>
          </div>
        ))}
      </ul>
    </aside>
  );
}
