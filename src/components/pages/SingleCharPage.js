import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import AppBanner from "../appBanner/AppBanner";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import './SingleCharPage.scss';

const SingleCharPage = () => {
    const {characterId} = useParams();
    const [char, setChar] = useState(null);
    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateChar()
    }, [characterId])

    const updateChar = () => {
        clearError();
        getCharacter(characterId)
            .then(onCharLoaded);
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;
    

    return (
        <>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({char}) => {
    const {id, name, description, thumbnail, homepage, wiki, comics } = char;

    return(
        <div className="single-comic">
            <Helmet>
            <meta
                name="description"
                content={`${name}'s page`}
                />
                <title>{`${name}'s page`}</title>
            </Helmet>
            <img src={thumbnail} alt={name} className="single-comic__char-img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
            </div>
        </div>
    )
}

export default SingleCharPage;