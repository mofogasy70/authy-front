import { useState } from "react";

const Uselogic = () => {
    const [chartData, setChartData] = useState({
        options: {
            chart: {
                id: 'area',
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

            },
            colors: ['#00ff00'],
        },
        series: [
            {
                name: 'series-1',
                type: 'area',
                data: [30, 40, 45, 50, 49, 60, 70, 91, 125, 135, 160, 180],
            },
        ],
    });
    return {
        chartData
    }
}
export default Uselogic;