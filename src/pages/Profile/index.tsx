import { useState } from 'react'
import Profile from './components/Profile'
import ChangePassword from './components/ChangePassword'
import ModalPopup from '../../components/Modal';
const ProfileSetting = () => {
    const [show, setshow] = useState(false);
    return (
        <>
            <Profile  setshow={setshow }/>
            <ModalPopup view="" type ="assignment"  height="auto" show={show}  setshow={setshow } childern = {<ChangePassword setshow ={setshow}  />}  />
        </>
    )
}

export default ProfileSetting