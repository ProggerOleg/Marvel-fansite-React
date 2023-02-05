import { useState } from "react";
import { Helmet } from "react-helmet";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundery from '../errorBoundery/ErrorBoundery';
import SearchChar from "../searchChar/SearchChar";

import decoration from '../../resources/img/vision.png';

const MainPage = () => {

    const [selectedChar, setChar] = useState(null);


    const onCharSelected = (id) => {
        setChar(id);
    }

    return (
        <>
            <Helmet>
            <meta
                name="description"
                content="Marvel information portal"
                />
                <title>Marvel information portal</title>
            </Helmet>
            <ErrorBoundery>
                <RandomChar/>
            </ErrorBoundery>
            <div className="char__content">
                <ErrorBoundery>
                    <CharList onCharSelected={onCharSelected}/>
                </ErrorBoundery>
            <div className="right">
            <ErrorBoundery>
                    <CharInfo charId={selectedChar}/>
                </ErrorBoundery>
                <ErrorBoundery>
                    <SearchChar/>
                </ErrorBoundery>
            </div>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage;