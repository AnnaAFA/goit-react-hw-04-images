import React, { useEffect, useState } from 'react';
import { Wrapper } from './App.styled';
import { SearchBar } from 'components/Searchbar/Searchbar';
import { ImagesGallery } from './components/ImageGallery/ImageGallery';
import Notiflix from 'notiflix';
import { Loader } from 'components/Loader/Loader';
import { LoadMoreButton } from 'components/Button/Button';
const { getImages } = require('services/api');

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [, setError] = useState('');

  useEffect(() => {
    if (searchQuery) {
      setImages([]);
      setPage(1);
      setStatus('idle');
      if (searchQuery.trim() === '') {
        Notiflix.Notify.warning('Write something!');
      } else {
        fetchImages(searchQuery, 1);
      }
    }
    if (status === 'idle' && page && searchQuery) {
      fetchImages(searchQuery, page);
    }
  }, [page, searchQuery, status]);

  const fetchImages = async (searchQuery, page) => {
    setStatus('pending');
    try {
      const { hits, totalHits } = await getImages({
        searchQuery,
        page,
      });
      if (hits.length === 0) {
        Notiflix.Notify.failure('Write a valid value!');
      } else {
        setImages(prevImages => [...prevImages, ...hits]);
        setTotal(totalHits);
        setStatus('resolved');
      }
    } catch (error) {
      setError(error.message);
      setStatus('rejected');
    }
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
    setStatus('resolved');
    fetchImages(searchQuery, page);
  };

  const handleSearch = searchQuery => {
    setSearchQuery(searchQuery);
  };

  const totalPage = Math.ceil(total / 12);

  return (
    <Wrapper>
      <SearchBar onChange={handleSearch} />
      {status === 'pending' && <Loader />}
      {status === 'resolved' && (
        <ImagesGallery
          images={images}
          totalPage={totalPage}
          page={page}
          status={status}
          onLoadMore={handleLoadMore}
        />
      )}
      {status === 'rejected' &&
        Notiflix.Notify.failure('Something went wrong!')}
      {images.length > 0 && totalPage > page && status !== 'pending' && (
        <LoadMoreButton loadMore={handleLoadMore} />
      )}
    </Wrapper>
  );
};
