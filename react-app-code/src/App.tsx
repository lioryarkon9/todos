import {Layout} from 'antd';
import {Content, Header} from "antd/es/layout/layout";
import {TodosTable} from "./todosTable";

const App = () => {

    return (
        <Layout>
            <Header>TODO</Header>
            <Content>
                <TodosTable />
            </Content>
        </Layout>
    );
}

export default App;
