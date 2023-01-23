import {React,useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../assets/avatar.png'
import styles from '../styles/login.module.css'
import toast, {Toaster} from 'react-hot-toast'
import { useFormik } from 'formik'
import { registationValidation } from '../validations/loginValidation' 
import convetBase64 from '../helper/convert'
import {registerUser} from '../helper/helper'

const RegisterComponent = () => {

  const [file, setFile] = useState();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues : {
      email : '',
      username : '',
      password : ''
    },
    validate:registationValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      values = await Object.assign(values, {profile: file || ''})
      //console.log(values)
      let registerPromise = registerUser(values)
      toast.promise(registerPromise, {
        loading : 'Creating...',
        success : <b>Register Successfully.🙂</b>,
        error : <b>Couldn't Register.😟</b>
      });
      registerPromise.then(function(){ navigate('/')});
    }
  })

  //for image upload
  const onUpload = async e =>{
    const base64 = await convetBase64(e.target.files[0]);
    setFile(base64);
  }

  return (
    <div className='container mx-auto'>
      {/* toast message */}
      <Toaster position='top-center' reverseOrder={false} />
      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass}>
          <div className='title flex flex-col items-center'>
            {/* <h4 className='text-3xl font-bold'>Register Here</h4> */}
            <span className='py-2 text-xl w-2/3 text-center text-slate-200'>
              Happy to with us.
            </span>
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className='profile flex justify-center py-2'>
              <label htmlFor="profile">
                <img src={file || avatar} className={styles.profile_img} alt="avatar" />
              </label>
              <input onChange={onUpload} type="file" id='profile' name='profile' />
            </div>
            <div className='textbox flex flex-col items-center gap-3'>
              <input {...formik.getFieldProps('email')} className={styles.textbox} type="email" name="email" placeholder='Email' />
              <input {...formik.getFieldProps('username')} className={styles.textbox} type="text" name="username" placeholder='User Name' />
              <input {...formik.getFieldProps('password')} className={styles.textbox} type="password" name="password" placeholder='Password' />
              
              <button className={styles.btn} type="submit">Register</button>
            </div>

            <div className='text-center py-2'>
              <span className='text-gray-900'>Alredy Registered <span> </span>
                <Link className='text-green-800 font-medium hover:font-bold ' to={"/"}>Login Now</Link>
              </span>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}

export default RegisterComponent