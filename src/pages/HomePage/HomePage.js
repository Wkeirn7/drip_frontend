import React, { useState, useContext, useEffect } from 'react';
import { userGraphList } from '../../api/internal_api';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import GraphCard from '../../components/GraphCard/GraphCard';
import { userGraphDelete } from '../../api/internal_api';
import { Button, Spinner } from 'react-bootstrap';
import './HomePage.css';

const HomePage = () => {
    const [userGraphs, setUserGraphs] = useState([]);
    const [deleted, setDeleted] = useState(false);
    const [displayLoading, setDisplayLoading] = useState(false)
    const user = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const getUserGraphs = async (token) => {
            setDisplayLoading(true);
            let resp = null;
            resp = await userGraphList(token);
            if(resp){
                setDisplayLoading(false)
                return resp;
            }else{
                setDisplayLoading(false)
                console.log('api call failed');
            }
        }

        const setGraphState = async() =>{

            if(!user.isLoggedIn){
                navigate('/login')
            }else{
                let graphs = await getUserGraphs(localStorage.getItem('user'))
                setUserGraphs(graphs)
            }
        }
        setGraphState();
    }, [user, navigate, deleted]);

    const callDeleteGraph = async (token, id) => {
        let resp = await userGraphDelete(token, id)
        if(resp === 'deleted object'){
            setDeleted(true);
        }else{
            alert('error deleting graph')
        }
    };

    const displayGraphs = () => {
        return userGraphs.map((graph, index) => {
            return <GraphCard className={'flexChild'} handleDelete={callDeleteGraph} graphInfo={graph} key={index} />
        });
    }

    const addGraphClick = () => {
        return navigate('/new_graph')
    }

    return (
        <div>
            <Button className={'graphButton'} onClick={addGraphClick}>Add Graph</Button>
            <div className='graphList'>
                {
                    (userGraphs && !displayLoading) 
                    ?   displayGraphs() 
                    :   <Spinner 
                            animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>}
            </div>
        </div>
    );
}

export default HomePage;
