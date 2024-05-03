import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApplicationAPI from "../../../API/Application";

const Uselogic = () => {
    const id = useParams().id;
    const [application, setApplication] = useState<any>()

    const [DomainName, setDomainName] = useState<string>();
    const [AppId, setAppId] = useState<string>();
    const [User, setUser] = useState<string>();
    const [Uri, setUri] = useState<string>();
    const [UriRedirection, setUriRedirection] = useState<string>();
    const [Logo, setLogo] = useState<string>();
    const [createdAt, setcreatedAt] = useState<string>();
    const [status, setstatus] = useState<string>();
    const [AppKey, setAppKey] = useState<string>();
    const [Categorie, setCategorie] = useState<string>();
    const [Platform, setPlatform] = useState<string>();

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

    useEffect(() => {
        fetchApplication();
    }, []);
    async function fetchApplication() {
        const appTemp: any = id && await ApplicationAPI.findById(id);
        setDomainName(appTemp.DomainName);
        setAppId(appTemp.AppId);
        setUser(appTemp.User);
        setUri(appTemp.Uri);
        setUriRedirection(appTemp.UriRedirection);
        setLogo(appTemp.Logo);
        setcreatedAt(appTemp.createdAt);
        setstatus(appTemp.status);
        setAppKey(appTemp.AppKey);
        setCategorie(appTemp.Categorie);
        setPlatform(appTemp.Platform);
    }
    return {
        DomainName,
        AppId,
        User,
        Uri,
        UriRedirection,
        Logo,
        createdAt,
        status,
        AppKey,
        chartData,
        Platform,
        Categorie
    }
}
export default Uselogic;