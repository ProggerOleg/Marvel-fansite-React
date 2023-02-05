import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup'
import useMarvelService from '../../services/MarvelService';
import { useState } from 'react';
import {Link} from 'react-router-dom';

import './searchChar.scss';

const SearchChar = () => {
  const {loading, error, getCharacterByName, clearError} = useMarvelService();
  const [character, setCharacter] = useState(null);
  
  const onCharLoaded = (char) => {
    setCharacter(char);
  }

  const updateChar = (name) => {
    clearError();

    getCharacterByName(name)
        .then(onCharLoaded);
  }

  const errorMessage = error ? <div className="char__search-critical-error"><ErrorMessage /></div> : null;
  const results = !character ? null : character.length > 0 ?
                    <div className="char__search-wrapper">
                        <div className="char__search-success">There is! Visit {character[0].name}'s page?</div>
                        <Link to={`/characters/${character[0].id}`} className="button button__secondary">
                            <div className="inner">To page</div>
                        </Link>
                    </div> : 
                    <div className="char__search-error">
                        The character was not found. Check the name and try again
                    </div>;

    return(
        <div className="char__search-form">
            <Formik
                initialValues = {{
                    char: ''
                }} 
                validationSchema = {Yup.object({
                  char: Yup.string()
                      .required('This field is required!')})}
                onSubmit = { ({char}) => {
                      updateChar(char);
                    }}>
                    <Form className='form'>
                      <label className="char__search-label" htmlFor="char">Or find a character by name:</label>
                      <div className="char__search-wrapper">
                          <Field 
                              id="char" 
                              name='char' 
                              type='text' 
                              placeholder="Enter name"/>
                          <button 
                              type='submit' 
                              className="button button__main"
                              disabled={loading}>
                              <div className="inner">find</div>
                          </button>
                      </div>
                    <ErrorMessage className='char__search-error' name='char' component='div'/>
                    </Form>
            </Formik>
            {results}
            {errorMessage}
        </div>
    )
}

export default SearchChar;