import React from 'react'
import { useNavigate } from "react-router-dom";
import { createUser } from '../../api/internal_api';
import UserForm from '../../components/LoginForm/UserForm';
import './createUserPage.css';

export default function CreateUserPage() {
    let navigate = useNavigate();

    const callCreateUser = async (userObj) => {
        let resp = null;
        resp = await createUser(userObj);
        if(resp){
            navigate('/login')
        }else{
            alert('Invalid entry for Email or Password')
        }
    }
  
    return (
        <div className='CreateUserArea'>
            <h1>Enter New User Info:</h1>
            < UserForm submission={callCreateUser} />
        </div>
    )
}
