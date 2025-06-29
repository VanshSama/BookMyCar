import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import * as logos from 'react-icons/vsc'

const SidebarLink = ({name, path, logo}) => {
    const Icon = logos[logo];
    const location = useLocation();
    const navigate = useNavigate();

    function matchRoute(path){
        const pt = location.pathname.split('/').at(-1);
        const mpt = path.split('/').at(-1);

        if(pt === mpt){
            return true;
        }
        return false;
    }

    return (
        <button className={`w-full flex gap-2 items-center py-2 pl-4 ${matchRoute(path) ? "text-yellow-50 border-l-4 border-yellow-100" : "text-richblack-25 "} hover:bg-richblack-600 transition-all duration-200`} onClick={() => navigate(path)}>
            <Icon />
            {name}
        </button>
    )
}

export default SidebarLink
