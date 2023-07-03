import '@patternfly/react-core/dist/styles/base.css'
import './fonts.css'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AddToForm from './Components/AddToForm'
import { Todo } from './Components/Model'
import SingleTodo from './Components/SingleTodo'

type AddTodo = (text: string) => void

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  // const [error, setError] = useState(null)
  // console.log(error)

  async function fetchData() {
    const response = await axios.get('http://localhost:8000/healthz')
    setTodos(response.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleAdd: AddTodo = (todo: string) => {
    if (todo) {
      axios.post('http://localhost:8000/', {
        todo: todo,
      })
      fetchData()
    }
  }

  const handleDone = async (id: number, isDone: boolean) => {
    // setTodos(
    //   todos.map((todo) =>
    //     todo.id === id ? { ...todo, isDone: !todo.isDone } : todo,
    //   ),
    // )
    await axios.put(`http://localhost:8000/${id}`, { isDone: !isDone })
    fetchData()
  }

  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:8000/${id}`)
    fetchData()
    // setTodos(todos.filter((todo) => todo.id !== id))
  }

  const handleEdit = async (id: Number, editTodo: string) => {
    // setTodos(
    //   todos.map((todo) =>
    //     todo.id === id ? { ...todo, todo: editTodo } : todo,
    //   ),
    // )
    await axios.put(`http://localhost:8000/${id}`, { todo: editTodo })
    fetchData()
  }

  return (
    <>
      <AddToForm handleAdd={handleAdd} />

      {todos.map((todo) => (
        <SingleTodo
          todo={todo}
          key={todo.id}
          handleEdit={handleEdit}
          handleDone={handleDone}
          handleDelete={handleDelete}
        />
      ))}
    </>
  )
}

export default App
