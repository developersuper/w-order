import React from "react";

const PlaceCardSeleton = () => {
    return <div className="animate-pulse p-6 rounded-xl bg-white shadow-card">
        <div className="h-5 w-1/3 bg-neutral-10 rounded-full"></div>
        <div className="items-center text-sm font-normal text-neutral-60 mt-2">
            <div className="h-3 w-1/2 bg-neutral-10 rounded-full"></div>
            <div className="h-3 w-1/2 bg-neutral-10 rounded-full mt-2"></div>
        </div>
        <div className="flex mt-[18px] space-x-2.5">
            <div className="body-small bg-neutral-10 rounded-full px-3 py-1 text-sm">
                <div className="h-4 w-[40px] bg-slate-700 rounded"></div>
            </div>
            <div className="body-small bg-neutral-10 rounded-full px-3 py-1 text-sm">
                <div className="h-4 w-[40px] bg-slate-700 rounded"></div>
            </div>
        </div>
        <div className="flex justify-end w-full mt-8">
            <div className={`flex space-x-2 max-w-[160px] w-full`}>
                <div className="h-8 w-[80px] rounded-full bg-neutral-10"></div>
                <div className="h-8 w-[80px] rounded-full bg-neutral-10"></div>
            </div>
        </div>
    </div>
}

export default PlaceCardSeleton;