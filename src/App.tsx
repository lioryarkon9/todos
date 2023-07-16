import React from "react";
import { Layout, Modal, Select } from "antd";
import { Content, Header } from "antd/lib/layout/layout";
import { TodosTable } from "./todosTable";
import { Todo } from "./types";

const INITIAL_TODOS = [
  {
    priority: 3.0,
    created_at: "1688565475.3983865",
    id: "673ef381-6033-4d48-b97d-1879a9050f70",
    status: "complete",
    title: "Buy groceries",
  },
  {
    priority: 2.0,
    created_at: "1688565475.3984172",
    id: "366a5ca2-bc1d-4531-9fb3-afdd44bbe3d5",
    title: "Call mom",
    status: "incomplete",
  },
  {
    priority: 3.0,
    created_at: "1688565475.3984244",
    id: "9dc1a4b0-1e45-45f4-879f-dd240845df51",
    status: "complete",
    title: "Finish the report",
  },
  {
    priority: 3.0,
    created_at: "1688565475.3984303",
    id: "5a1aacc0-7f5d-4016-b050-d8c027b0cfaa",
    status: "complete",
    title: "Prepare for the meeting",
  },
  {
    priority: 2.0,
    created_at: "1688565475.3984363",
    id: "4ecb48ca-e0ba-46e0-9394-b5bb082c4d41",
    status: "incomplete",
    title: "Book a restaurant",
  },
  {
    priority: 1.0,
    created_at: "1688565475.3984423",
    id: "84ec3c73-95a6-4c45-88dd-3735b1317adf",
    status: "incomplete",
    title: "Send an email to John",
  },
];

function isValidTodo(todo: Todo | null): boolean {
  if (!todo) {
    return false;
  }

  return todo.title.length > 3;
}

export const App = () => {
  const [todos, setTodos] = React.useState<Todo[]>(INITIAL_TODOS);
  const [newTodo, setNewTodo] = React.useState<null | Todo>(null);

  function newTodoSetup() {
    const blankTodo: Todo = {
      id: crypto.randomUUID(),
      title: "",
      status: "incomplete",
      created_at: (new Date().getTime() / 1000).toString(),
      priority: 2.0,
    };

    setNewTodo(blankTodo);
  }

  function newTodoCleanup() {
    setNewTodo(null);
  }

  return (
    <Layout>
      <Modal
        title="ADD TASK"
        centered
        open={!!newTodo}
        onOk={() => {
          if (isValidTodo(newTodo)) {
            setTodos([...todos, newTodo as Todo]);
          }

          return;
        }}
        onCancel={newTodoCleanup}
      >
        {newTodo && (
          <>
            <div>
              <textarea
                onChange={(event) =>
                  setNewTodo({ ...newTodo, title: event.target.value })
                }
                style={{ width: "100%", height: "150px" }}
                value={newTodo.title}
              />
            </div>

            <div>
              <Select
                value={newTodo.priority}
                options={[
                  { value: 3.0, label: "High" },
                  { value: 2.0, label: "Medium" },
                  { value: 1.0, label: "Low" },
                ]}
              />
            </div>
          </>
        )}
      </Modal>

      <Header className={"todo-header"}>
        TO DO LIST <button onClick={newTodoSetup}>+ Add Todo</button>
      </Header>
      <Content>
        <TodosTable todos={todos} setTodos={setTodos} />
      </Content>
    </Layout>
  );
};
