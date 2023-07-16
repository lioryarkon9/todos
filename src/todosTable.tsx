import { Table, Select, Checkbox } from "antd";
import Moment from "react-moment";
import React from "react";
import { Todo } from "./types";

interface IProps {
  todos: Todo[];
  setTodos: (updatedTodos: Todo[]) => void;
}

export const TodosTable: React.FunctionComponent<IProps> = ({
  todos,
  setTodos,
}) => {
  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const columns = [
    {
      title: "",
      dataIndex: "status",
      sorter: {
        compare: (a: Todo, b: Todo) => b.status.localeCompare(a.status),
      },
      key: "status",
      // render: (status: string) => <Radio checked={status === "complete"} />,
      render: (status: string, currentTodo: Todo) => (
        <Checkbox
          checked={status === "complete"}
          onChange={(event) => {
            const updatedTodos = todos.map((todo) => {
              if (todo.id === currentTodo.id) {
                return {
                  ...todo,
                  status: event.target.checked ? "complete" : "incomplete",
                };
              }

              return todo;
            });

            setTodos(updatedTodos);
          }}
        />
      ),
    },
    {
      title: "Task Name",
      dataIndex: "title",
      sorter: {
        compare: (a: Todo, b: Todo) => b.title.localeCompare(a.title),
      },
      key: "title",
      render: (title: string, todo: Todo) => {
        if (todo.status === "complete") {
          return <div style={{ textDecoration: "line-through" }}>{title}</div>;
        } else {
          return title;
        }
      },
    },
    {
      title: "Created at",
      dataIndex: "created_at",
      sorter: {
        compare: (a: Todo, b: Todo) =>
          parseFloat(b.created_at) - parseFloat(a.created_at),
      },
      defaultSortOrder: "ascend",
      key: "created_at",
      render: (created_at: string) =>
        isToday(new Date(parseFloat(created_at) * 1000)) ? (
          "Today"
        ) : (
          <Moment unix format="D MMM">
            {created_at}
          </Moment>
        ),
    },
    {
      title: "Priority",
      dataIndex: "priority",
      sorter: {
        compare: (a: Todo, b: Todo) => b.priority - a.priority,
      },
      key: "priority",
      render: (priority: number, currentTodo: Todo) => (
        <Select
          onChange={(priority) => {
            const updatedTodos = todos.map((todo) => {
              if (todo.id === currentTodo.id) {
                return { ...todo, priority };
              }

              return todo;
            });

            setTodos(updatedTodos);
          }}
          value={priority}
          options={[
            { value: 3.0, label: "High" },
            { value: 2.0, label: "Medium" },
            { value: 1.0, label: "Low" },
          ]}
        />
      ),
    },
  ];

  return <Table dataSource={todos} columns={columns} />;
};
