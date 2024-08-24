export const revalidate = 0
const getAllTasks = async () => {
  const tasks = await fetch('http://backend:5000/api/tasks')
  return tasks.json()
}

const Tasks = async () => {
  const tasks = await getAllTasks()
  return <div>
    {tasks.map((task: any) => <div key={task._id}>{task?.title}</div>)}

  </div>
}
export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <Tasks />
    </main>
  );
}
