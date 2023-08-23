import { Component } from 'react';
import {
  SearchForm,
  SearchFormButton,
  SearchFormInput,
  Searchbar,
} from './Searchbar.styled';
import { AiOutlineSearch } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import PropTypes from 'prop-types';

export class SearchBar extends Component {
  state = {
    searchQuery: '',
  };

  handleChange = e => {
    this.setState({ searchQuery: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onChange(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };
  render() {
    return (
      <Searchbar>
        <SearchForm onSubmit={this.handleSubmit}>
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
            onChange={this.handleChange}
          />
        </SearchForm>
      </Searchbar>
    );
  }
}

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
};
