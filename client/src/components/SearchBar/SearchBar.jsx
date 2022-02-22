import React from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {getRecipeName} from '../../actions';
import './SearchBar.css'

function SearchBar() {
  const dispatch=useDispatch();
  const [name, setName] = useState('');

  
  
  function handleInput(e){
      e.preventDefault();
      setName(e.target.value);
  }

  function handleSubmit(e){
      e.preventDefault();
      if(name.length < 1){
        alert('Field is empty')
      }
      dispatch(getRecipeName(name))
  }


  return (
    <div>
        <input 
            className='input'
            type='text'
            placeholder='Search'
            onChange={e => handleInput(e)}
        />
        <button className='btn1' type='submit' onClick={e => handleSubmit(e)}>Search</button>
    </div>
  )
}

export default SearchBar