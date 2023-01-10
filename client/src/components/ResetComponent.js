import React from 'react'
import styles from '../styles/login.module.css'
import toast,{Toaster} from 'react-hot-toast'
import { useFormik } from 'formik'
import { resetPasswordValidate } from '../validations/loginValidation' 
import { useNavigate, Navigate } from 'react-router-dom'
import {resetPass} from '../helper/helper'


const ResetComponent = () => {

  const username = localStorage.getItem('user');
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues : {
      password : '',
      confirm_pass : ''
    },
    validate:resetPasswordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      let resetPromise = resetPass({ username, password: values.password })

      toast.promise(resetPromise, {
        loading: 'Updating...',
        success: <b>Reset Successfully...!</b>,
        error : <b>Could not Reset!</b>
      });
       navigate('/')
    }
  })

  return (
    <div className='container mx-auto'>
      {/* toast message */}
      <Toaster position='top-center' reverseOrder={false} />
      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass}>
          <div className='title flex flex-col items-center'>
            <h4 className='text-3xl font-bold'>New Password</h4>
            <span className='py-2 text-xl w-2/3 text-center text-slate-200'>
              Enter Your New Password.
            </span>
          </div>

          <form className='py-20' onSubmit={formik.handleSubmit}>
            
            <div className='textbox flex flex-col items-center gap-6'>
              <input {...formik.getFieldProps('password')} className={styles.textbox} type="text" name="password" placeholder='New Password' />
              <input {...formik.getFieldProps('confirm_pass')} className={styles.textbox} type="password" name="confirm_pass" placeholder='Confirm Password' />
              
              <button className={styles.btn} type="submit">Confirm</button>
            </div>

          </form>

        </div>
      </div>
    </div>
  )
}

export default ResetComponent

