import { useState } from 'react';
import {
  SearchForm,
  SearchFormButton,
  SearchFormInput,
  Searchbar,
} from './Searchbar.styled';
import { AiOutlineSearch } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import PropTypes from 'prop-types';

export const SearchBar = ({ onChange }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = e => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    onChange(searchQuery);
    setSearchQuery('');
  };

  return (
    <Searchbar>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <IconContext.Provider value={{ size: '2em' }}>
            <div>
              <AiOutlineSearch />
            </div>
          </IconContext.Provider>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </SearchForm>
    </Searchbar>
  );
};

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
};
