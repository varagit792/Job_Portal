import Skeleton from './Skeleton';
import { BiLoaderAlt } from 'react-icons/bi';

const Loader = () => {
    return (
        <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <div className="flex justify-center items-center"> <BiLoaderAlt className="animate-spin h-10 w-10" /></div>
        </>
    )
}
export default Loader;