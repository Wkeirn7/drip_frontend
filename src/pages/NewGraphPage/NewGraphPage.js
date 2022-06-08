import React, { useEffect, useContext } from 'react';
import UserContext from '../../contexts/UserContext.js';
import GraphForm from '../../components/GraphForm/GraphForm.js';
import { newGraph } from '../../api/internal_api.js';
import { useNavigate } from 'react-router-dom';
import './NewGraphPage.css';

const NewGraphPage = () => {
    const navigate = useNavigate();
    const user = useContext(UserContext);

    const callCreateGraph = async (graphData) => {
        if(Number(graphData['reinvestment_amount']) < 1){
            alert('invalid reinvestment amount')
        }else{
            let resp = null;
            resp = await newGraph(localStorage.getItem('user'), graphData);
            if(resp){
                navigate('/')
            }else{
                alert('Error creating Graph')
            }
        }
    }

    useEffect(() => {
        if(!user.isLoggedIn){
            navigate('/login')
        }
    });


    return (
        <div className='GraphFormArea'>
            <GraphForm submission={callCreateGraph} />
        </div>
    )
};

export default NewGraphPage;
