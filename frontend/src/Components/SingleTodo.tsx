import {
  Button,
  Card,
  Flex,
  Form,
  TextContent,
  Text,
  TextVariants,
  TextInput,
} from '@patternfly/react-core'
import React, { FormEvent, useState } from 'react'
import { Todo } from './Model'

type Props = {
  todo: Todo
  handleEdit: (id: number, todo: string) => void
  handleDone: (id: number, isDone: boolean) => void
  handleDelete: (id: number) => void
}

const SingleTodo = ({ todo, handleEdit, handleDone, handleDelete }: Props) => {
  const [edit, setEdit] = useState<boolean>(false)
  const [editTodo, setEditTodo] = useState<string>(todo.todo)

  const handleEditOption = (e: FormEvent, id: number) => {
    e.preventDefault()
    handleEdit(id, editTodo)
    setEdit(false)
  }

  const updateTask = (name: string) => {
    setEditTodo(name)
  }

  return (
    <>
      {!todo && <p>hello</p>}
      <Card style={{ width: '20rem', padding: '1rem', margin: '5rem' }}>
        <Form
          onSubmit={(e) => {
            handleEditOption(e, todo.id)
          }}
        >
          {edit ? (
            <TextInput
              value={editTodo}
              type="text"
              id="horizontal-form-name"
              aria-describedby="horizontal-form-name-helper"
              name="horizontal-form-name"
              onChange={updateTask}
            />
          ) : todo.isDone ? (
            <s>{todo.todo}</s>
          ) : (
            <TextContent>
              <Text component={TextVariants.h2}>{todo.todo}</Text>
            </TextContent>
          )}
          <Flex>
            <Button
              className="option"
              onClick={() => {
                if (!todo.isDone) setEdit(!edit)
              }}
            >
              Edit
            </Button>
            <Button
              variant="secondary"
              isDanger
              onClick={() => {
                handleDelete(todo.id)
              }}
            >
              Delete
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                handleDone(todo.id, todo.isDone)
              }}
            >
              Done
            </Button>
          </Flex>
        </Form>
      </Card>
    </>
  )
}

export default SingleTodo
