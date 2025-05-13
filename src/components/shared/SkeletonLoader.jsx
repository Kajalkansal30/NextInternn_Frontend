const SkeletonLoader = () => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse">
            <div className="p-6 space-y-4">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                <div className="pt-4">
                    <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonLoader;