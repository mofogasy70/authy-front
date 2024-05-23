import { FC, useCallback, useEffect, useState } from "react";
import { VITE_URIAPI } from "../../constant";
interface metadata {
    currentPage: number,
    totalPages: number,
    totalCount: number
    nextPage: number,
    prevPage: number
}
interface JsonResponse {
    docs: any[]
    metadata: metadata
}
interface UsepaginationProps {
    api: string
    limit: number,
    token: string | null
}
const Usepagination = ({ api, limit, token }: UsepaginationProps) => {
    const [loading, setloading] = useState<boolean>(true);
    const [page, setpage] = useState<number>(1);
    const [data, setdata] = useState<any[]>([]);
    const [metadata, setmetadata] = useState<metadata>();
    const fetchData = useCallback(async () => {
        setloading(true)
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        if (token) { headers.append('x-auth-token', token); }
        try {
            const response = await fetch(VITE_URIAPI + api + `?page=${page}&limit=${limit}`, {
                method: 'GET',
                headers: headers,

            });
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const JsonResponse: JsonResponse = await response.json();
            setdata(JsonResponse.docs)
            setmetadata(JsonResponse.metadata)
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
        setloading(false)
    }, [api, page, limit, setdata]);

    const nextPage = useCallback(() => { setpage(metadata?.nextPage || 1) }, [setdata, metadata]);

    const prevPage = useCallback(() => { setpage(metadata?.prevPage || 1) }, [setdata, metadata]);

    useEffect(() => {
        fetchData()
    }, [api, page, limit]);


    return {
        loading,
        data,
        page,
        pagesize: metadata?.totalPages,
        prevPage,
        nextPage
    }
}
export default Usepagination;