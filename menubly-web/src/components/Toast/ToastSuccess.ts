import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const customToast = {
    success: (message: string) => toast.success(message,{
        position: 'top-right',
        progress: undefined
    }),
    error: (message: string) => toast.error(message,{
        position: 'top-right',
        progress: undefined,
    })
}

export default customToast;