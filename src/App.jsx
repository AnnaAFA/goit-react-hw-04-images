import { useEffect, useState } from 'react';
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
    if (searchQuery.trim() !== '') {
      fetchImages(searchQuery, page);
    }
  }, [page, searchQuery]);

  const fetchImages = async (searchQuery, page) => {
    setStatus('pending');
    try {
      const { hits, totalHits } = await getImages({
        searchQuery,
        page,
      });
      if (hits.length === 0) {
        Notiflix.Notify.failure('Write a valid value!');
        setImages([]);
      } else {
        setImages(prevImages => [...prevImages, ...hits]);
        setTotal(totalHits);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setStatus('resolved');
    }
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleSearch = searchValue => {
    if (searchValue.trim() === '') {
      Notiflix.Notify.warning('Write something!');
      setImages([]);
      return;
    } else if (searchValue !== searchQuery) {
      setImages([]);
      setPage(1);
      setSearchQuery(searchValue);
    }
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
