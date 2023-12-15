import React, { useState, useEffect, useContext } from 'react'
import AddTaskForm from './components/AddTaskForm'
import TaskList from './components/TaskList'
import { DarkThemeContext } from './ThemeContext.jsx'
import { MdDarkMode, MdSunny } from 'react-icons/md'

function SunnyButton () {
  const { darkTheme, toggleTheme } = useContext(DarkThemeContext)

  return (
    <MdSunny onClick={toggleTheme}
             className={`bg-gray-300 cursor-pointer dark:bg-gray-700 p-2 rounded-lg  bottom-5 right-5 ${
                darkTheme ? 'text-white' : 'text-black'
              }`}
             size={32}
    />
  )
}

function DarkButton () {
  const { darkTheme, toggleTheme } = useContext(DarkThemeContext)

  return (
    <MdDarkMode
      onClick={toggleTheme}
      className={`bg-gray-300 cursor-pointer dark:bg-gray-700 p-2 rounded-lg  bottom-5 right-5 ${
                darkTheme ? 'text-white' : 'text-black'
              }`}
      size={32}
    />
  )
}

function App () {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || [])
  const { darkTheme, toggleTheme } = useContext(DarkThemeContext)


  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks]);

  const addTask = (title) => {
    const newTask = { id: Date.now(), title, completed: false }
    setTasks([...tasks, newTask])
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }

  const editTask = (id, title) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, title } : task)))
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }

  const toggleCompleted = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }

  const clearTasks = () => {
    setTasks([])
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }

  const getCompletedTasks = () => tasks.filter((task) => task.completed)
  const getRemainingTasks = () => tasks.filter((task) => !task.completed)


  return (
    <div id="App"
         className={`hero
                     ${darkTheme ? 'bg-gray-900' : 'bg-gray-100'}
                     h-screen md:min-h-[700px]
                     w-screen m-auto
                     flex flex-col items-center
                     transition-all duration-500`}>
      <div className={`flex flex-col space-y-6 w-[600px] md:w-[100%] z-10 p-4 ${
          darkTheme ? 'text-gray-100' : 'text-slate-700'
        }`}
      >
        <header className='w-full flex items-center justify-between'>
          <h1 className={`uppercase text-4xl font-bold tracking-widest mb-4 md:text-3xl`}>
            Tasks
          </h1>

          {darkTheme ? <SunnyButton /> : <DarkButton />}
        </header>
        <div className=' shadow-md'>
          <AddTaskForm darkTheme={darkTheme} onAddTask={addTask} />
        </div>
        <div
          className={`scroll ${
            darkTheme ? 'bg-gray-800' : 'bg-white'
          } w-full h-[400px] md:h-[500px] px-2 overflow-y-scroll rounded-md shadow-lg relative transition-all duration-500`}
        >
          <div
            className={`w-full overflow-hidden mb- sticky top-0 ${
              darkTheme ? 'bg-gray-800' : 'bg-white'
            } flex items-center justify-between text-gray-500 border-b`}
          >
            <p className=' text-gray-500 px-2 py-3'>
              {getRemainingTasks().length} tasks left{' '}
            </p>
            <button onClick={clearTasks}>Clear all tasks</button>
          </div>

          {tasks.length
           ? (
             <TaskList
               tasks={tasks}
               onEditTask={editTask}
               onDeleteTask={deleteTask}
               onToggleCompleted={toggleCompleted}
             />
           )
           : (
             <div className=' w-full h-[80%] flex items-center justify-center overflow-hidden'>
               <p className=' text-gray-500 text-center z-10'>Empty task</p>
             </div>
           )}
        </div>
      </div>
    </div>
  )
}

export default App
