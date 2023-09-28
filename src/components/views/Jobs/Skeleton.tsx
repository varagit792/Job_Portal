const Skeleton = () => {
    return (
        <div className=" shadow rounded-xl py-5 px-5 w-full mb-5 bg-[#FFF]">
            <div className="animate-pulse space-y-5">
                <div className="flex space-x-4">
                    <div className="bg-slate-700 h-16 w-16 rounded-lg"></div>
                    <div className="flex-1 space-y-6 py-1">
                        <div className="space-y-5">
                            <div className="grid grid-cols-3 gap-5">
                                <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                                <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                            </div>
                            <div className="grid grid-cols-3 gap-5">
                                <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                            </div>
                        </div>
                        <div className="h-2 bg-slate-700 rounded"></div>
                    </div>
                </div>
                <div className="h-2 bg-slate-700 rounded"></div>
                <div className="h-2 bg-slate-700 rounded"></div>
                <div className="h-2 bg-slate-700 rounded"></div>
                <div className="grid grid-cols-4 gap-5">
                    <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                </div>
            </div>
        </div>
    )
}
export default Skeleton;