import {React,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import avatar from '../assets/avatar.png'
import styles from '../styles/login.module.css'
import toast,{Toaster} from 'react-hot-toast'
import { useFormik } from 'formik'
import { profileValidation } from '../validations/loginValidation' 
import convetBase64 from '../helper/convert'
import useFetch from '../hook/featch-hook'
import {updateUser} from '../helper/helper'

const ProfileComponent = () => {

  const navigate = useNavigate();

  const [file, setFile] = useState();
  const [{ isLoading, apiData, serverError }] = useFetch();
  
  const formik = useFormik({
    initialValues : {
      firstName : apiData?.firstName || '' ,
      lastName : apiData?.lastName || '',
      mobile : apiData?.mobile || '',
      email : apiData?.email || '',
      address : apiData?.address || ''
    },
    enableReinitialize: true,
    validate:profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      values = await Object.assign(values, {profile: file || apiData?.profile || ''})
     // console.log(values)
      let udateUserPromise = updateUser(values);
      toast.promise(udateUserPromise,{
        loading : 'Updating...',
        success : <b>Update Successful..🙂👍</b>,
        error : <b>Updating Error...😟👎</b>
      });
    }
  })

  // for image upload
  const onUpload = async e =>{
    const base64 = await convetBase64(e.target.files[0]);
    //setFile(base64);
    setFile(e.target.files[0]);
  }

  // logout handler
  const userLogout = () =>{
    localStorage.removeItem('token');
    navigate('/')
    
  }

  if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

  return (
    <div className='container mx-auto'>
      {/* toast message */}
      <Toaster position='top-center' reverseOrder={false} />

      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass}>
          <div className='title flex flex-col items-center'>
            <h4 className='text-3xl font-bold'>Profile </h4>
            
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className='profile flex justify-center py-2'>
              <label htmlFor="profile">
                <img src={file || apiData?.profile || avatar} className={styles.profile_img} alt="avatar" />
              </label>
              <input onChange={onUpload} type="file" id='profile' name='profile' />
            </div>
            <div className='textbox flex flex-col items-center gap-4'>
              <div className='name flex w-3/4 gap-5'>
                <input {...formik.getFieldProps('firstName')} className={styles.textbox} type="text" name="firstName" placeholder='First Name' />
                <input {...formik.getFieldProps('lastName')} className={styles.textbox} type="text" name="lastName" placeholder='Last Name' />
              </div>

              <div className='name flex w-3/4 gap-5'>
                <input {...formik.getFieldProps('mobile')} className={styles.textbox} type="number" name="mobile" placeholder='Phone' />
                <input {...formik.getFieldProps('email')} className={styles.textbox} type="email" name="email"  />
              </div>
              
              <input {...formik.getFieldProps('address')} className={styles.textbox} type="text" name="address" placeholder='Address' />
              
              <button className={styles.btn} type="submit">Update</button>
            </div>

            <div className='text-center py-2'>
              <span className='text-gray-900'>Come Back Later? <span> </span>
                <button onClick={userLogout} className='text-red-800 font-medium hover:font-bold'>Log out</button>
              </span>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}

export default ProfileComponent