import React, { useState } from 'react'
import { links } from '../../../Data/dashboard-links'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { VscSettings, VscSettingsGear, VscSignOut } from 'react-icons/vsc'
import SidebarLink from './SidebarLink'
import { logout } from '../../../Services/Operations/authAPI'
import ConfirmationModal from '../../Common/ConfirmationModal'

const Sidebar = () => {
    const {user} = useSelector((state) => state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [confirmationModal, setConfirmationModal] = useState(null);
    

    return (
        <div className='bg-richblack-700 w-[15%] h-full min-h-screen pt-4'>
            <div className={`flex w-full flex-col items-start gap-4 text-base font-semibold border-b-[1px] pb-4`}>
                {
                    links.map((link) => {
                        return (link.type === "" || link.type === user.accountType) && 
                            <SidebarLink key={link.id} name={link.name} path={link.path} logo={link.logo}/>
                    })
                }
            </div>

            <div className={`flex w-full flex-col items-start gap-2 text-base font-semibold pt-4`}>
                <button className='w-full flex px-2 py-3 hover:bg-richblack-600 transition-all duration-200 flex-row pl-4 items-center gap-2' onClick={() => navigate('/dashboard/settings')}>
                    <VscSettingsGear />
                    <p>
                        Settings
                    </p>
                </button>

                <button className='w-full px-2 py-3 hover:bg-richblack-600 transition-all duration-200 flex flex-row pl-4 items-center gap-2' onClick={() => setConfirmationModal({
                    text1: "Are you sure to?",
                    text2: "You will be logged out of your account.",
                    btn1Text: "Log Out",
                    btn2Text: "Cancel",
                    btn1Handler: () => dispatch(logout(navigate, dispatch)),
                    btn2Handler: () => setConfirmationModal(null),
                })}>
                    <VscSignOut />
                    <p>
                        Log Out
                    </p>
                </button>
            </div>
            {
                confirmationModal && <ConfirmationModal modalData={confirmationModal}/>
            }
        </div>
    )
}

export default Sidebar
