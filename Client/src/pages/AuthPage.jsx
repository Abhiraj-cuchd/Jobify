import { useState } from "react";
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom";
import { Office } from '../assets/index';
import { SignUp } from '../components/index';

const AuthPage = () => {

  const {user} = useSelector(state => state.user);
  const [open, setOpen] = useState(true);
  const location = useLocation();

  let from  = location?.state?.from?.pathname || '/';

  if (user.token) return window.location.replace(from);
  

  return (
    <div className="w-full">
      <img src={Office} alt="office" className="object-contain" />
      <SignUp open={open} setOpen={setOpen } />
    </div>
  )
}

export default AuthPage