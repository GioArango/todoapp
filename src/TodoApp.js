import React, { useState } from 'react';
import { SearchTodo } from './components/SearchTodo/SearchTodo';
import { TodoAdd } from './components/TodoAdd/TodoAdd';
import { TodoList } from './components/TodoList/TodoList';

const initialTodos = JSON.parse(localStorage.getItem('TodoApp')) || [];

export const TodoApp = () => {

  const [todos, setTodos] = useState(initialTodos);
  const [todoEdit, setTodoEdit] = useState(null);
  const [todoSearch, setTodoSearch] = useState(false);
  const [todoSearchEmpty, setTodoSearchEmpty] = useState(false);

  const handleDone = (todoId) => {
    const doneTodos = todos.map(todo => (
      todo.id === todoId
        ? { ...todo, done: !todo.done }
        : todo
    ));
    
    const [doneTodoStorage] = doneTodos;

    localStorage.setItem('TodoAppEdit', JSON.stringify(doneTodoStorage));
    setTodos(doneTodos);
  }

  const handleDelete = (todoId) => {

    if (todoEdit && todoId === todoEdit.id) {
      setTodoEdit(null);
    }

    const deleteTodos = todos.filter(td => td.id !== todoId);
    setTodos(deleteTodos);
    localStorage.setItem('TodoAppDelete', JSON.stringify(todos));
  }

  const handleAdd = (todo) => {

    const newTodo = {
      id: Date.now(),
      ...todo,
      done: false
    }

    const changedTodos = [
      newTodo,
      ...todos
    ]

    setTodos(changedTodos);

  }

  const handleEdit = (todoEdit) => {
    localStorage.setItem('TodoAppEdit', JSON.stringify(todoEdit));
    const changeTodo = todos.map(todo => (
      todo.id === todoEdit.id
        ? todoEdit
        : todo
    ));

    setTodos(changeTodo);
    setTodoEdit(null);
  }

  const handleSearch = (todo) => {
    const normalizeTodo = todo.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    const filteredTodo = todos.filter(td => td.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(normalizeTodo));

    ((filteredTodo.length > 0) ? setTodoSearchEmpty(false) : setTodoSearchEmpty(true));
    setTodos(filteredTodo);
  }

  if (!todoSearch) {
    localStorage.setItem('TodoApp', JSON.stringify(todos));
  }


  return (
    <div className='m-5'>
      <h1 className='text-4xl font-bold text-center text-green-500 mb-3'>TODO APP</h1>
      <hr />
      <SearchTodo
        handleSearch={handleSearch}
        setTodos={setTodos}
        setTodoSearch={setTodoSearch}
      />
      <div className='grid grid-cols-2 gap-5'>
        <TodoList
          todos={todos}
          handleDelete={handleDelete}
          handleDone={handleDone}
          setTodoEdit={setTodoEdit}
          todoSearch={todoSearch}
          todoSearchEmpty={todoSearchEmpty}
          setTodoSearch={setTodoSearch}
        />
        <TodoAdd
          handleAdd={handleAdd}
          todoEdit={todoEdit}
          handleEdit={handleEdit}
          setTodoEdit={setTodoEdit}
          todoSearch={todoSearch}
        />
      </div>
    </div>
  )
}
