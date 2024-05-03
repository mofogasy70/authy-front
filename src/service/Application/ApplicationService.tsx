import { Tag } from "antd";
import { VITE_URIAPI } from "../../constant";
import Application from "../../API/Application";
import axios from "axios";

class ApplicationService {
    constructor() {

    }
    public static async getApplication_APR() {
        const token = localStorage.getItem('token');
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        if (token) { headers.append('x-auth-token', token); }
        try {
            const response = await fetch(VITE_URIAPI + '/API/Application/getApproved', {
                method: 'GET',
                headers: headers,
            });
            if (response.ok) {
                const data = response.json();
                return data;
            } else {
                throw new Error('Failed to fetch Application');
            }
        } catch (error) {
            throw error;
        }
    }
    public static async search(obj:any) {
        const token = localStorage.getItem('token');
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        if (token) { headers.append('x-auth-token', token); }
        const JSONdata = {
            status:obj.status,
            DomainName:obj.DomainName,
            start:obj.start,
            end:obj.end,
            NameId:obj.NameId,
            sort:obj.sort
          };
        try {
            const response = await fetch(VITE_URIAPI + '/API/Application/search', {
                method: 'POST',
                headers: headers,
                body:JSON.stringify(JSONdata)
            });
            if (response.ok) {
                const data = response.json();
                return data;
            } else {
                throw new Error('Failed to fetch Application');
            }
        } catch (error) {
            throw error;
        }
    }
    public static async getApplication_HO() {
        const token = localStorage.getItem('token');
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        if (token) { headers.append('x-auth-token', token); }
        try {
            const response = await fetch(VITE_URIAPI + '/API/Application/getHoldOn', {
                method: 'GET',
                headers: headers,
            });
            if (response.ok) {
                const data = response.json();
                return data;
            } else {
                throw new Error('Failed to fetch Application');
            }
        } catch (error) {
            throw error;
        }
    }
    public static async getApplication_NOT_APR() {
        const token = localStorage.getItem('token');
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        if (token) { headers.append('x-auth-token', token); }
        try {
            const response = await fetch(VITE_URIAPI + '/API/Application/getNotApproved', {
                method: 'GET',
                headers: headers,
            });
            if (response.ok) {
                const data = response.json();
                return data;
            } else {
                throw new Error('Failed to fetch Application');
            }
        } catch (error) {
            throw error;
        }
    }
    public static toTag(nbr:string | undefined){
        switch (nbr) {
            case "2":
                return <Tag title="Approved" className="w-2/5 md:w-1/5 h-full flex items-center justify-center text-base font-blinkmacsystem" color="green-inverse">Approved</Tag>;
        
            case "1":
                return <Tag title="Hold on" className="w-2/5 md:w-1/5 h-full flex items-center justify-center text-base font-blinkmacsystem" color="orange-inverse">Hold on</Tag>;
        
            case "3":
                return <Tag title="Not Approved" className="w-2/5 md:w-1/5 h-full flex items-center justify-center text-base font-blinkmacsystem" color="red-inverse">Not Approved</Tag>;
        
            default:
                return <Tag title="Approved" className="w-2/5 md:w-1/5 h-full flex items-center justify-center text-base font-blinkmacsystem" color="green-inverse">Approved</Tag>;
        }
    }

    public static async  createAppdev(DomainName:string,Uri:string,Logo:File|null,Categorie:string,Platform:string,UriRedirection:string) {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        if (Logo) {
            alert(Logo)
            formData.append('file', Logo);
        }

        formData.append('DomainName', DomainName);
        formData.append('Uri', Uri);
        formData.append('Categorie', Categorie);
        formData.append('Platform', Platform);
        formData.append('UriRedirection', UriRedirection);
        try {
            const response = await axios.post(VITE_URIAPI + '/API/Application/', formData, {
              headers: {
                'Content-Type':'multipart/form-data',
                'x-auth-token': token,
              },
            });
            return response.data;
          } catch (error) {
            console.error('Erreur lors du téléchargement:', error);
          }
       
    }
    public static async getOrigins(application:string){
        const token = localStorage.getItem('token');
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        if (token) { headers.append('x-auth-token', token); }
        try {
            const response = await fetch(VITE_URIAPI + '/API/Origins/'+application, {
                method: 'GET',
                headers: headers,
            });
            if (response.ok) {
                const data = response.json();
                return data;
            } else {
                throw new Error('Failed to fetch Origins');
            }
        } catch (error) {
            throw error;
        }
    }
    public static async getRedirect(application:string){
        const token = localStorage.getItem('token');
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        if (token) { headers.append('x-auth-token', token); }
        try {
            const response = await fetch(VITE_URIAPI + '/API/Redirect/'+application, {
                method: 'GET',
                headers: headers,
            });
            if (response.ok) {
                const data = response.json();
                return data;
            } else {
                throw new Error('Failed to fetch Redirect');
            }
        } catch (error) {
            throw error;
        }
    }
}
export default ApplicationService;