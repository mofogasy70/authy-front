import { EllipsisOutlined, InfoOutlined } from "@ant-design/icons";
import { Col, FloatButton, Row } from "antd";
import { Footer } from "antd/es/layout/layout";
import { Link } from "react-router-dom";
const Foot: React.FC = () => {
    return (
        <div>
            <Footer className="bg-white">
                <FloatButton.Group
                    trigger="click"
                    type="primary"
                    style={{ right: 24 }}
                    icon={<EllipsisOutlined />}
                >
                    <FloatButton icon={<InfoOutlined />} />
                    <FloatButton icon={<Link to={"https://youngdev.mg/"}><img src="./l.svg"></img></Link>}></FloatButton>
                </FloatButton.Group>
            </Footer>
        </div>
    );
}
export default Foot;