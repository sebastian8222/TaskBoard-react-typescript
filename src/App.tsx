import React, { HtmlHTMLAttributes, useRef, useState,  } from "react";

type formElement = React.FormEvent<HTMLFormElement>;

function App() {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);
  const taskInput = useRef<HTMLInputElement>(null);

  interface ITask {
    name: string;
    done: boolean;
  }

  const handleSubmite = (e: formElement) => {
    //de donde viene el dato
    e.preventDefault();
    addTask(newTask);
    setNewTask("");
    taskInput.current?.focus();
  };

  const addTask = (name: string): void => {
    const newTasks: ITask[] = [...tasks, { name, done: false }];
    setTasks(newTasks);
  };

  const toggleDoneTask = (i: number): void => {
    const newTasks: ITask[] = [...tasks]; //ITask: especifico que es una arreglo de tareas
    newTasks[i].done = !newTasks[i].done;
    setTasks(newTasks);
  };

  const removeTask = (i: number): void => {
    const newTasks : ITask[] = [...tasks];
    newTasks.splice(i, 1);
    setTasks(newTasks);
    
  };

  return (
    <div className="w-full max-w-md">
      <form
        onSubmit={handleSubmite}
        className="bg-white shadow-md rounded px-8 p-6 mt-4 mx-4"
      >
        <div className="mt-6 flex max-w-md gap-x-4 ">
          <label htmlFor="email-address" className="sr-only">
            Task
          </label>
          <input
            placeholder="Enter your task"
            required
            className="min-w-0 flex-auto rounded-md border border-white/10 bg-white/5 px-[calc(theme(spacing.4)-1px)] py-[calc(theme(spacing[1.5])-1px)] text-base leading-7 text-slate-600 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            onChange={(e) => {
              setNewTask(e.target.value);
            }}
            value={newTask}
            ref={taskInput}//al ingresar una nueva tarea el cursor se ubica de nuevo en el input 
            autoFocus
          />
          <button className="flex-none rounded-md bg-indigo-500 py-1.5 px-3.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
            Save
          </button>
        </div>
      </form>
      {tasks.map((t: ITask, i: number) => (
        <div className="max-w-xl rounded overflow-hidden shadow-md mt-3 mx-4" key={i}>
          <h2 className="mx-5 text-center font-bold" style={{ textDecoration: t.done ? "line-through" : "" }}>
            {t.name}
          </h2>
          <form className="w-full max-w-sm ">
          <div className="flex items-center border-b py-2 mx-5">
            <button
              className=" flex-shrink-0 text-sm border-4  py-1 px-2 rounded" type="button"
              onClick={() => {
                toggleDoneTask(i);
              }}
            >
              {t.done ? "✓" : "❌"}
            </button>
            <button
              className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button"
              onClick={() => {
                removeTask(i);
              }}
            >
              🗑
            </button>
            </div>
          </form>
        </div>
      ))}
    </div>
  );
}

export default App;
