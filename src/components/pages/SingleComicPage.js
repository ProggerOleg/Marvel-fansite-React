import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import './singleComicPage.scss';
import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

const SingleComicPage = (props) => {
    const {comicsId} = useParams();
    const [comics, setComics] = useState(null);
    const {getComics, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateComics()
        // eslint-disable-next-line
    }, [comicsId])

    const updateComics = () => {
        clearError();
        getComics(comicsId)
            .then(onComicsLoaded)
            .then(()=>setProcess('confirmed'));
    }

    const onComicsLoaded = (comics) => {
        setComics(comics);
    }

    return (
        <>
            {setContent(process, View, comics)}
        </>
    )
}

const View = ({data}) => {
    const {title, description, pageCount, thumbnail, language, price } = data;

    return(
        <div className="single-comic">
            <Helmet>
            <meta
                name="description"
                content={`${title} comics book`}
                />
                <title>{title}</title>
            </Helmet>
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;