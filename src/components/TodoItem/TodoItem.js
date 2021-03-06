import React from 'react'

export const TodoItem = ({ todo, handleDelete, handleDone, setTodoEdit }) => {

  const { id, title, desc, done } = todo;

  return (
    <>
      <div className={`border-2 ${done ? 'border-green-300' : 'border-stone-300'} rounded p-3 mt-3`}>
        <div className='flex md:justify-end sm:justify-center space-x-1.5 mb-3'>
          <h2 className={`md:text-3xl text-stone-400 ${done && 'line-through'} ${done && 'italic'} overflow-hidden`}>
            {title}
          </h2>
          <button
            className={`${done ? 'bg-yellow-500' : 'bg-green-500'} hover:${done ? 'bg-yellow-300' : 'bg-green-300'} text-white font-bold py-2 px-4 rounded md:w-2/12`}
            onClick={() => handleDone(id)}
          >
            { done ? 'Todo' : 'Done' }
          </button>
        </div>

        <p className='md:text-lg md:text-right text-stone-500'>{desc}</p>
        <hr />
        <div className='flex justify-end space-x-1.5 mt-2'>
          <button
            className='bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded md:w-2/12'
            onClick={() => setTodoEdit(todo)}
          >
            Edit
          </button>
          <button
            className='bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded md:w-2/12'
            onClick={() => handleDelete(todo.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  )
}
