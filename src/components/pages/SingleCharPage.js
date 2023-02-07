import { useParams} from 'react-router-dom';
import { Helmet } from "react-helmet";

import useMarvelService from '../../services/MarvelService';
import AppBanner from "../appBanner/AppBanner";
import setContent from "../../utils/setContent";

import { useState, useEffect } from "react";

import './SingleCharPage.scss'; 

const SingleCharPage = () => {
    const {characterId} = useParams();
    const [char, setChar] = useState(null);
    const {getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateChar()
        // eslint-disable-next-line
    }, [characterId])

    const updateChar = () => {
        clearError();
        getCharacter(characterId)
            .then(onCharLoaded)
            .then(()=>setProcess('confirmed'));
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    return (
        <>
            <AppBanner/>
            {setContent(process, View, char)}
        </>
    )
}

const View = ({data}) => {
    const {name, description, thumbnail} = data;

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