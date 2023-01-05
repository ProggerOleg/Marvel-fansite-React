import {Component} from 'react';
import PropTypes from 'prop-types'

import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage'
import MarvelService from '../../services/MarvelService';

import './charList.scss';

class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,
        charEnded: false,
        selectedCharId: null
        // selectItem: null
    }
    
    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
        window.addEventListener('scroll', this.checkPosition);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.checkPosition);
    }

    selectItem = (id) => {
        console.log(id)
        this.setState({
            selectedCharId: id
        })
    }

    checkPosition = () =>  {
        // Нам потребуется знать высоту документа и высоту экрана:
        const height = document.body.offsetHeight
        const screenHeight = window.innerHeight
      
        // Они могут отличаться: если на странице много контента,
        // высота документа будет больше высоты экрана (отсюда и скролл).
      
        // Записываем, сколько пикселей пользователь уже проскроллил:
        const scrolled = window.scrollY
      
        // Обозначим порог, по приближении к которому
        // будем вызывать какое-то действие.
        // В нашем случае — 1/12 экрана до конца страницы:
        const threshold = height - screenHeight / 12
      
        // Отслеживаем, где находится низ экрана относительно страницы:
        const position = scrolled + screenHeight
      
        if (position >= threshold) {
          // Если мы пересекли полосу-порог, вызываем нужное действие.
          this.setState({
            offset: this.state.offset+9
          })
          this.onRequest(this.state.offset+9)
        }
      }
      
    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        this.setState(({offset, charList}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    itemRefs = [];

    setRef = (ref) => {
        this.itemRefs.push(ref);
    }

    focusOnItem = (id) => {
        this.itemRefs.forEach(item=> item.classList.remove('char__item_selected'));
        this.itemRefs[id].classList.add('char__item_selected');
        this.itemRefs[id].focus();
    }

    // Этот метод создан для оптимизации, 
    // чтобы не помещать такую конструкцию в метод render
    renderItems(arr) {
        const items =  arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }

        let classNames = 'char__item'
        // if (this.state.selectedCharId == item.id) {
        //     classNames += '_selected'
        // }
            
            return (
                <li 
                    className={classNames}
                    tabIndex={0}
                    ref={this.setRef}
                    key={item.id}
                    onClick={() => {
                        this.props.onCharSelected(item.id)
                        this.focusOnItem(i);
                        // this.selectItem(item.id)
                        }}
                    onKeyPress={(e)=> {
                        if (e.key === ' ' || e.key ==='Enter') {
                            this.props.onCharSelected(item.id);
                            this.focusOnItem(i);
                        }
                    }}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    render() {

        const {charList, loading, error,newItemLoading, offset, charEnded} = this.state;
        
        const items = this.renderItems(charList);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button 
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display': charEnded ? 'none' : 'block'}}
                    onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}


export default CharList;