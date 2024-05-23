import { HomeOutlined, LoadingOutlined } from "@ant-design/icons";
import { Breadcrumb, Card, List, Spin } from "antd";
import { Link } from "react-router-dom";
import Usepagination from "../../../Component/usepagination";
import Pagination from "../../../Component/pagination";

const Connection = () => {
    const token = localStorage.getItem('token');
    const { data, loading, page, pagesize, nextPage, prevPage } = Usepagination({ api: '/API/ConLog', limit: 3, token: token })
    return (<div>
        <div className="w-full h-10 flex items-center justify-start text-sm p-1">
            <Breadcrumb className="font-blinkmacsystem">
                <Breadcrumb.Item><Link to={"/Acceuil"}><HomeOutlined /></Link></Breadcrumb.Item>
                <Breadcrumb.Item>Connection</Breadcrumb.Item>
            </Breadcrumb>
        </div>
        <Card className="mt-2" title="connection history">
            <List>
                {loading ?
                    <Spin indicator={<LoadingOutlined />}></Spin> :
                    data ? data.map((e, index) => (<div key={index}>{e.Date}</div>)) : null}
            </List>
            <Pagination
                loading={loading}
                OnNext={nextPage}
                OnPrev={prevPage}
                currentPage={page}
            />
        </Card>
    </div>);
}
export default Connection;