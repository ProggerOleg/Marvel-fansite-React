import './comicsList.scss';
import { useState, useEffect } from 'react';

import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage'
import useMarvelService from '../../services/MarvelService';

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([])
    const [offset, setOffset] = useState(8)
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [comicsEnded, setComicsEnded] = useState(false)

    const {error, loading, getAllComics, clearError} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsLoaded)
    }

    const onComicsLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }

        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setNewItemLoading(newItemLoading=>false);
        setOffset(offset=> offset+9);
        setComicsEnded(comicsEnded=>ended);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner style={{'text-align':'center'}}/> : null;
    const elements = comicsList.map(item=>{
        return(
        <li className="comics__item"
            key={item.id}>
            <a href="#">
                <img src={item.thumbnail} alt="ultimate war" className="comics__item-img"/>
                <div className="comics__item-name">{item.title}</div>
                <div className="comics__item-price">{item.price + '$'}</div>
            </a>
        </li>
        )
    }) 

    return (
        <div className="comics__list">
            {spinner}
            <ul className="comics__grid">
                {errorMessage}
                {elements}
            </ul>
            <button 
                className="button button__main button__long"
                onClick={() => onRequest(offset)}
                style={{'display': comicsEnded ? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;