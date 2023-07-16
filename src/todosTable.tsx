import { Table, Radio, Select } from "antd";
import Moment from "react-moment";

type Todo = {
  title: string;
  status: string;
  priority: number;
  created_at: string;
  id: string;
};

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

export const TodosTable = () => {
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
      key: "status",
      render: (status: string) => <Radio checked={status === "complete"} />,
    },
    {
      title: "Task Name",
      dataIndex: "title",
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
      key: "priority",
      render: (priority: number) => (
        <Select
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

  return <Table dataSource={INITIAL_TODOS} columns={columns} />;
};
