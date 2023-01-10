import React, { useEffect, useState }  from 'react'
import styles from '../styles/login.module.css'
import toast,{Toaster} from 'react-hot-toast'
import { generateOTP, verifyOTP } from '../helper/helper'
import { useNavigate } from 'react-router-dom'

const RecoveryComponent = () => {

  // first Get the userName
  const userName = localStorage.getItem('user');

  const [OTP, setOTP] = useState();
  const navigate = useNavigate()

  useEffect(() => {
    generateOTP(userName)
    .then((OTP) => {
      console.log(OTP)
      if(OTP) return toast.success("OTP has been sent to Your Email")
      return toast.error("There is an Error while Generating the OTP")
    })
    .catch(err =>{
      return err;
    })
  }, [userName]);

  async function onSubmit(e){
    e.preventDefault();
    try {
      let { status } = await verifyOTP({ username : userName, code : OTP })
      if(status === 201){
        toast.success('Verify Successfully!')
        return navigate('/reset')
      }  
    } catch (error) {
      return toast.error('Wront OTP! Check email again!')
    }
  }

  // handler of resend OTP
  function resendOTP(){

    let sentPromise = generateOTP(userName);

    toast.promise(sentPromise ,
      {
        loading: 'Sending...',
        success: <b>OTP has been send to your email!</b>,
        error: <b>Could not Send it!</b>,
      }
    );

    sentPromise.then((OTP) => {
      console.log(OTP)
    });
    
  }

  return (
    <div className='container mx-auto'>
      {/* toast message */}
      <Toaster position='top-center' reverseOrder={false} />

      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass}>
          <div className='title flex flex-col items-center'>
            <h4 className='text-3xl font-bold'>Reset Password</h4>
            <span className='py-2 text-xl w-2/3 text-center text-slate-200'>
              Enter OTP to Reset Your Password.
            </span>
          </div>

          <form className='pt-16' onSubmit={onSubmit} > 
          {/* onSubmit={handleSubmit} */}
            <div className='input text-center'>
              <samp className='text-center text-m text-gray-700'>
                Enter the 6 digit OTP sent to your Email</samp>
                

              <div className='textbox flex flex-col items-center gap-6 py-4'>
                <input onChange={(e) => setOTP(e.target.value) } className={styles.textbox} type="text" name="otp" placeholder='OTP' />
                <button className={styles.btn} type="submit">Recover</button>
              </div>
            </div>
          </form>

          <div className='text-center py-4'>
              <span className='text-gray-900'>Can't Get OTP ?<span> </span>
                <button onClick={resendOTP} className='text-cyan-900 hover:font-bold'>Re-send</button>
              </span>
            </div>

        </div>
      </div>
    </div>
  )
}

export default RecoveryComponent