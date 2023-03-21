import React, { useState } from "react";
import menuDefault from 'assets/images/menu.png';

export const ImageContent = ({ src }: { src: string }) => {
    const [loading, setLoading] = useState(true);
    return (
        <div className="bg-cover bg-center " style={{ backgroundImage: `url("${src}")`, paddingTop: '70%' }}>
            {loading && <div className="absolute animate-pulse bg-black/30 w-full h-full top-0 left-0"></div>}
            <img src={src} alt="" className="opacity-0 absolute" onLoad={() => setLoading(false)}/>
        </div>
    )
}