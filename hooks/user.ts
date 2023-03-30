import axios from "@/utils/axios";
import {useRouter} from "next/router";
import useSWR from 'swr';

export const useUser = () => {
    const router = useRouter();
    const csrf = () => axios.get('/sanctum/csrf-cookie')
    const store = async (data: {}) =>  {
        await csrf();

        axios.post('api/register', data)
            .then(response => {
                if(response.status === 204) {
                    alert('User registered successfully.');
                    router.push('/')
                }
            })
            .catch(error => {
                alert('Something went wrong!');
                console.error(error)
            })
    }

    const { data: users } = useSWR('api/user', () =>
        axios
            .get('api/user')
            .then(res => res.data)
            .catch(error => {
                console.log(error)
            }),
    )
    return {
        store,
        users,
    }
}