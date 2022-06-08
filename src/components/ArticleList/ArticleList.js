import React, { useEffect, useState } from 'react';
import { getAssetNews } from '../../api/third_party_api';
import ArticleSection from '../ArticleSection/ArticleSection';
import { Spinner } from 'react-bootstrap';
import './ArticleList.css';

const ArticleList = (props) => {
    const [articles, setArticles] = useState()
    const [displayLoading, setDisplayLoading] = useState(false)

    useEffect(() => {
        const getArticles = async () => {
            setDisplayLoading(true)
            let resp = null;
            resp = await getAssetNews(props.ticker);
            if(resp){
                setDisplayLoading(false)
                setArticles(resp['results']);
            }else{
                setDisplayLoading(false)
                console.log('api call failed')
            }
        }
        getArticles();
    },[props.ticker]);

    const displayArticles = () => {
        return articles.map((article, index) => {
            return <ArticleSection className={'ArticleSection'} article={article} key={index} />
        });
    }

    return (
        <div className='ArticleList'>
            {(articles && !displayLoading) 
            ?   displayArticles() 
            :   <Spinner 
                    animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>}
        </div>
    )
}

export default ArticleList;