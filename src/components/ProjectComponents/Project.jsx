const array = [
  "Learn the basics 1",
  "Learn the basics 2",
  "Learn the basics 3",
];

export default function Project() {
  const tasks = (task) => {
    return (
      <ul className="flex justify-between p-4 mt-8 rounded-md bg-stone-100">
        <li className="flex justify-between my-4">{task}</li>
        <button className="text-stone-700 hover:text-red-500">Clear</button>
      </ul>
    );
  };

  return (
    <div className="w-[35rem] mt-16">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-stone-600 mb-2">
          Learning React
        </h1>
        <button className="text-stone-700 hover:text-red-500">Delete</button>
      </div>
      <p className="text-stone-400 mb-4">Dec 29, 2024</p>
      <header className="pb-4 mb-4 border-b-2 border-stone-300">
        description
      </header>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <div className="flex items-center gap-4">
        <input className="w-64 px-2 py-1 rounded-sm bg-stone-200" />
        <button className="text-stone-700 hover:text-stone-950">
          Add Task
        </button>
      </div>
      {array.map((value) => tasks(value))}
    </div>
  );
}
