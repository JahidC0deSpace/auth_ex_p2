import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useFormik} from "formik";
import toast, { Toaster } from "react-hot-toast";

import { profileValidate } from "../helper/validate";
import avatar from "../assets/profile.png";
import styles from "../styles/Username.module.css";
import extend from "../styles/Profile.module.css";
import { convertToBase64 } from "../helper/conver";
import useFetch from "../hooks/fetch.hook";
import { updateUser } from "../helper/helper";


export const Profile = () => {

  const navigate=useNavigate();
  const [file,setFile]=useState();
  const [{isLoading,apiData,serverError}]=useFetch()


const formik=useFormik({
  initialValues:{
    firstName:apiData?.firstName ||'',
    lastName:apiData?.lastName || '',
    email:apiData?.email ||'',
    mobile:apiData?.mobile ||'',
    address:apiData?.address ||''
  },
  enableReinitialize:true,
  validate:profileValidate,
  validateOnBlur:false,
  validateOnChange:false,
  onSubmit: async values =>{
    values=await Object.assign(values,{profile:file||apiData?.profile||''})
    let updatePromise=updateUser(values);


    toast.promise(updatePromise,{
      loading:"Updating..",
      success :<b>Updated Successfully</b>,
      error :<b>Could Not Update....</b>
    });
  }
})


//coverting the image 
const onUpload =async e=>{
  const base64=await convertToBase64(e.target.files[0]);
  setFile(base64);
}


//logout handler 
function userLogout() {
  localStorage.removeItem('token');
  navigate('/');
  
}

if(isLoading) return <h1 className="text-2xl font-bold">IsLoading</h1>;
if(serverError) return <h1 className=" text-xl text-red-500 ">{serverError.message}</h1>

  return (
    <div className="container mx-auto">

    <Toaster position='top-center' toastOptions={{duration:3000}} reverseOrder={false}></Toaster>

    <div className='flex justify-center items-center h-screen'>
      <div className={`${styles.glass} ${extend.glass}`} style={{ width: "45%", height:'95%', paddingTop: '2em'}}>

        <div className="title flex flex-col items-center">
          <h4 className='text-5xl font-bold'>Profile</h4>
          <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Update Your Profile
          </span>
        </div>

        <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className='profile flex justify-center py-4'>
                <label htmlFor="profile">
                  <img src={apiData?.profile || file ||avatar} className={`${styles.profile_img} ${extend.profile_img}`} alt="avatar" />
                </label>
                
                <input type="file" id='profile' name='profile' onChange={onUpload}/>
            </div>

            <div className="textbox flex flex-col items-center gap-6">
            <div className="name flex w-3/4 gap-10">
            <input {...formik.getFieldProps('firstName')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='FirstName' />
            <input {...formik.getFieldProps('lastName')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='LastName' />
            </div>

            <div className="name flex w-3/4 gap-10">
            <input {...formik.getFieldProps('mobile')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Mobile No.' />
            <input {...formik.getFieldProps('email')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Email*' />
            </div>
        
            <input {...formik.getFieldProps('address')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Address' />
            <button className={styles.btn} type='submit'>Update</button>
        

            </div>
        </form>
        <div className="text-center py-4">
              <span className='text-gray-500'>Comeback Later? <button onClick={userLogout} className='text-red-500'>Logout</button></span>
        </div>

      </div>
    </div>
  </div>
  );
};
