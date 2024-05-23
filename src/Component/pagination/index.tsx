import { LeftOutlined, LoadingOutlined, RightOutlined } from "@ant-design/icons"
import { Spin } from "antd"
import { FC } from "react"

interface PaginationProps {
    OnNext: () => void
    OnPrev: () => void
    currentPage: number
    onselct?: (page: number) => void,
    loading: boolean
}
const Pagination: FC<PaginationProps> = ({ OnNext, OnPrev, currentPage = 1, onselct, loading }) => {
    return (<div className="flex items-center justify-center space-x-3 max-w-min min-h-min rounded-sm">
        <button onClick={OnPrev} className="p-1"><LeftOutlined /></button>
        <div className="font-blinkmacsystem p-1">{loading ? <Spin indicator={<LoadingOutlined />}></Spin> : currentPage}</div>
        <button onClick={OnNext} className="p-1"><RightOutlined /></button>
    </div>)
}
export default Pagination