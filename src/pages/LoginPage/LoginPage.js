import React, { useContext, useState } from 'react';
import UserForm from '../../components/LoginForm/UserForm';
import { getToken } from '../../api/internal_api';
import { useNavigate, Link } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import './LoginPage.css';

let LoginPage = (props) => {
    const navigate = useNavigate();
    const user = useContext(UserContext);
    const initializeState = () => !!JSON.parse('"' + localStorage.getItem('user') + '"');
    const [token, setToken] = useState(initializeState);

    const handleFormSubmit = async (userObj) => {
        let resp = null;
        resp = await getToken(userObj);
        if(resp){
            localStorage.setItem("user", resp['token'])
            console.log(localStorage.getItem('user'));
            setToken(!!JSON.parse('"' + localStorage.getItem("user") + '"'));
            console.log(token)
            return props.changeUserStatus('login');
        }else{
            alert('Invalid Login');
        }
    }

    const navigateHome = () => {
        navigate('/')
    }

    return (
        <div className='LoginArea'>
            <h1>Login:</h1>
            <UserForm submission={handleFormSubmit} />
            <p>Don't have an account?</p>
            <Link to='/new_user' replace >Create an account</Link>
            { token && navigateHome() } 
        </div>
    )
};

export default LoginPage;

