import { FC, ReactNode } from "react"

interface cardStat {
    icon: ReactNode
    title: string
    subTitle?: string
    value: number
}
const CardStat: FC<cardStat> = ({ icon, subTitle, title, value }) => {
    return (<div className="min-h-min w-1/4 p-3 bg-white rounded-md shadow-md">
        <div className="flex items-center justify-center">
            <div>
                <p className="text-base w-full">{title}</p>
                <p className="text-xs text-gray-500">{subTitle && subTitle}</p>
            </div>
            <div className="flex flex-grow"></div>
            <div className="flex items-end justify-start">
                {icon}
            </div>
        </div>
        <div className="flex h-8 items-end justify-end text-3xl mt-3">
            {value}
        </div>
    </div>)
}
export default CardStat