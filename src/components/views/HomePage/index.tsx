import { Link } from "react-router-dom";


const HomePage = () => {
    return (
        <>
            <div className="h-[10%] w-full"></div>
            <div className="flex justify-center items-center flex-col h-[90%]">
                <h1>Wellcome to Home Page</h1>
                <Link to="/profile" className="bg-gray-500 py-1 px-2 text-white">profile</Link>
            </div>
        </>
    )
}

export default HomePage;