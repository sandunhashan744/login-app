import React,{useRef} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../assets/avatar.png'
import styles from '../styles/login.module.css'
import toast, { Toaster} from 'react-hot-toast'
import { useFormik } from 'formik'
import { userLoginValidate } from '../validations/loginValidation' 
import { login } from '../helper/helper'

const UserLoginComponent = () => {

  const inputRef = useRef(null);

  const navigate = useNavigate();

  // check the user name is Entered 
  
  const handleClick = () => {
    const user = inputRef.current.value 
    if(!user){

      toast.error('User name must be Required..!');
      inputRef.current.focus()

    }else{
      localStorage.setItem('user', user);
      //console.log(user);
      navigate('/recovery')

    }

  };

  const formik = useFormik({
    initialValues : {
      username : '',
      password : ''
    },
    validate:userLoginValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      let loginPromise = login(values);
      toast.promise(loginPromise,{
        loading : 'loading...',
        success : <b>Login Successful..🙂👍</b>,
        error : <b>Login Error...😟👎</b>
      });

      loginPromise.then(res => {
        let {token} = res.data;
        localStorage.setItem('token', token);
        navigate('/profile')
      });
    }
  })

  return (
    <div className='container mx-auto'>
      {/* toast message */}
      <Toaster position='top-center' reverseOrder={false} />
      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass}>
          <div className='title flex flex-col items-center'>
            <h4 className='text-3xl font-bold'>Welcome </h4>
            <span className='py-2 text-xl w-2/3 text-center text-slate-200'>
              Explore More by connecting with us.
            </span>
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className='profile flex justify-center py-2'>
              <img src={avatar} className={styles.profile_img} alt="avatar" />
            </div>
            <div className='textbox flex flex-col items-center gap-4'>
              <input {...formik.getFieldProps('username')} 
              className={styles.textbox} type="text" name="username" placeholder='User Name'   ref={inputRef} />
              <input {...formik.getFieldProps('password')} className={styles.textbox} type="password" name="password" placeholder='Password' />
              
              <button className={styles.btn} type="submit">Sign In</button>
            </div>

            <div className='text-center py-3'>
              <span className='text-gray-900'>Not a Member :<span> </span>
                <Link className='text-red-700 hover:font-bold ' to={"/register"}>Register Now</Link>
              </span>
              {/* <Link onClick={handleClick} className='text-blue-700 hover:font-bold py-3' to={"/recovery"}>Forget Password</Link> */}
            </div>
          </form>
            <div className='text-center -mt-6'>
              <button onClick={handleClick} className='text-blue-700 hover:font-bold py-3'>Forget Password</button>
            </div>
          
        </div>
      </div>
    </div>
  )
}

export default UserLoginComponent