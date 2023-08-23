import React, { Component } from 'react';
import { Wrapper } from './App.styled';
import { SearchBar } from 'components/Searchbar/Searchbar';
import { ImagesGallery } from './components/ImageGallery/ImageGallery';
import Notiflix from 'notiflix';
import { Loader } from 'components/Loader/Loader';
import { LoadMoreButton } from 'components/Button/Button';
const { getImages } = require('services/api');

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    total: 0,
    page: 1,
    status: 'idle',
  };

  componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery) {
      this.setState({ images: [], page: 1, status: 'idle' });
      if (searchQuery.trim() === '') {
        Notiflix.Notify.warning('Write something!');
      } else {
        this.fetchImages(searchQuery, 1);
      }
    }

    if (
      prevState.page !== page &&
      this.state.status === 'idle' &&
      prevState.searchQuery === searchQuery
    ) {
      if (searchQuery !== '') {
        this.fetchImages(searchQuery, page);
      }
    }
  }

  fetchImages = async (searchQuery, page) => {
    await this.setState({ status: 'pending' });
    try {
      const { hits, totalHits } = await getImages({
        searchQuery,
        page,
      });

      if (hits.length === 0) {
        Notiflix.Notify.failure('Write a valid value!');
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        total: totalHits,
        status: 'resolved',
      }));
    } catch (error) {
      this.setState({ error: error.message });
      this.setState({ status: 'rejected' });
    }
  };

  handleLoadMore = () => {
    this.setState(
      prevState => ({
        page: prevState.page + 1,
        status: 'resolved',
      }),
      () => {
        this.fetchImages(this.state.searchQuery, this.state.page);
      }
    );
  };

  handleSearch = searchQuery => {
    this.setState({ searchQuery });
  };

  render() {
    const { total, images, page, status } = this.state;
    const totalPage = Math.ceil(total / 12);

    return (
      <Wrapper>
        <SearchBar onChange={this.handleSearch} />
        {status === 'pending' && <Loader />}
        {status === 'resolved' && (
          <ImagesGallery
            images={images}
            totalPage={totalPage}
            page={page}
            status={status}
            onLoadMore={this.handleLoadMore}
          />
        )}
        {status === 'rejected' &&
          Notiflix.Notify.failure('Something went wrong!')}
        {images.length > 0 && totalPage > page && status !== 'pending' && (
          <LoadMoreButton loadMore={this.handleLoadMore} />
        )}
      </Wrapper>
    );
  }
}
