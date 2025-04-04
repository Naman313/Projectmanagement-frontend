import {ToastContainer, toast} from 'react-toastify';


export default function Toast(){
    return(
        <>
        <ToastContainer 
        position="top-center"
        autoClose= {2000}
        newestOnTop= {true}
        pauseOnHover
        theme='light'
    />
        </>
    )
}
export { toast };