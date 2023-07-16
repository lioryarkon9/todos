import { Layout } from "antd";
import { Content, Header } from "antd/lib/layout/layout";
import { TodosTable } from "./todosTable";

export const App = () => {
  return (
    <Layout>
      <Header className={'todo-header'}>TO DO LIST</Header>
      <Content>
        <TodosTable />
      </Content>
    </Layout>
  );
};
