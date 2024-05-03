import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApplicationAPI from "../../../API/Application";
import { VITE_URIAPI } from "../../../constant";
import dayjs from "dayjs";
import ApplicationService from "../../../service/Application/ApplicationService";
import OriginsAPI from "../../../API/Origins";
import RedirectAPI from "../../../API/Redirect";

const Uselogic = () => {
    const id = useParams().id;
    const [application, setApplication] = useState<any>()

    const [securitystatus, setsecuritystatus] = useState<boolean>(false);
    const [DomainName, setDomainName] = useState<string>();
    const [AppId, setAppId] = useState<string>();
    const [User, setUser] = useState<string>();
    const [value, setvalue] = useState<string>();
    const [value_d, setvalue_d] = useState<string>();
    const [Uri, setUri] = useState<string>();
    const [UriRedirection, setUriRedirection] = useState<string>();
    const [Logo, setLogo] = useState<string>();
    const [createdAt, setcreatedAt] = useState<string>();
    const [status, setstatus] = useState<number>();
    const [AppKey, setAppKey] = useState<string>();
    const [Categorie, setCategorie] = useState<string>();
    const [Platform, setPlatform] = useState<string>();
    const [Origins, setOrigins] = useState<any[]>([]);
    const [Redirect, setRedirect] = useState<any[]>([]);


    const setTempvalue = (event: React.ChangeEvent<HTMLInputElement>) => { setvalue(event.target.value); }
    const setTempvalue_d = (event: React.ChangeEvent<HTMLInputElement>) => { setvalue_d(event.target.value); }

    const createOrigins = async () => {
        try {
            await OriginsAPI.create({ value, Application: id });
            window.location.reload();
        } catch (error) {
            console.log(error);
            throw error
        }
    }
    const deleteOrigins = async (_id:string) => {
        _id && await OriginsAPI.delete(_id);
        window.location.reload()
    }

    const createRedirect = async () => {
        try {
            await RedirectAPI.create({ value:value_d, Application: id });
            window.location.reload()
        } catch (error) {
            console.log(error);
            throw error
        }
    }
    const deleteRedirect = async (_id:string) => {
        _id && await RedirectAPI.delete(_id);
        window.location.reload()
    }
    

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

    const chartOptions = {
        labels: ['Using', 'not Using'],
        colors: ['#008FFB', '#00E396'],
    };

    const chartSeries = [10, 90];

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
        setLogo(VITE_URIAPI + appTemp.Logo);
        setcreatedAt(dayjs(appTemp.createdAt).format("ddd D, MMMM YYYY"));
        setstatus(appTemp.status);
        setAppKey(appTemp.AppKey);
        setCategorie(appTemp.Categorie.Name);
        setPlatform(appTemp.Platform.Name);
        setsecuritystatus(appTemp.securityStatus);
        setOrigins(await ApplicationService.getOrigins(appTemp._id));
        setRedirect(await ApplicationService.getRedirect(appTemp._id));
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
        Categorie,
        chartSeries,
        chartOptions,
        securitystatus,
        Origins,
        value,
        value_d,
        setvalue_d,
        setTempvalue_d,
        setTempvalue,
        deleteOrigins,
        createOrigins,
        Redirect,
        deleteRedirect,
        createRedirect
    }
}
export default Uselogic;