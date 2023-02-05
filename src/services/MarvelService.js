import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    const _apiKey = '950bd9858e42c818287d2a698ea14489';
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&apikey=${_apiKey}`);
        return res.data.results.map(_transformCharacter)
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?apikey=${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getCharacterByName = async (name) => {
		const res = await request(`${_apiBase}characters?name=${name}&apikey=${_apiKey}`);
		return res.data.results.map(_transformCharacter);
	};

    const getAllComics = async (offset) => {
        const res = await request(`${_apiBase}/comics?limit=8&offset=${offset}&apikey=${_apiKey}`);
        return res.data.results.map(_transformComics)
    }

    const getComics = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?apikey=${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }

    const _transformCharacter = (character) => {
        return {
            id: character.id,
            name: character.name,
            description: character.description ? character.description : 'There is no description found for this character',
            thumbnail: character.thumbnail.path + '.' + character.thumbnail.extension,
            homepage: character.urls[0].url,
            wiki: character.urls[1].url,
            comics: character.comics.items
        }
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || 'There is no description on this comics',
            pageCount: comics.pageCount ? `${comics.pageCount} pages` : 'No information about the number of pages',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: comics.textObjects.language || 'en-rus',
            price: comics.prices[0].price ? comics.prices[0].price : 'not avaliable'
        }
    }

    return {loading, error, getAllCharacters, getCharacter, clearError, getAllComics, getComics, getCharacterByName}
}

export default useMarvelService;
