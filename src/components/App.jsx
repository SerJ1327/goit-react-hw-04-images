import { useState, useEffect, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchImages } from './services/api';

import { ImageGallery } from './ImageGallery/ImageGallery';
import { StyledApp } from './StyledApp';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

const toastConfig = {
  position: 'top-center',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
};

export const App = () => {
  const [imagesState, setImagesState] = useState([]);
  const [isShowModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowLoadMore, setIsSowLoadMore] = useState(false);
  const [selectedImage, setSelectedImage] = useState({ url: null, alt: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');
  const isFirstRender = useRef(true);
  const PER_PAGE = 12;

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    async function getImages() {
      setIsLoading(true);
      try {
        const images = await fetchImages(query, currentPage, PER_PAGE);

        if (images.totalHits - currentPage * PER_PAGE > PER_PAGE) {
          setIsSowLoadMore(true);
        } else {
          setIsSowLoadMore(false);
        }

        setImagesState([...imagesState, ...images.hits]);
      } catch (error) {
        toast.error(
          `Opps, some error occured. Please, try again later. Error: ${error.message}`,
          toastConfig
        );
      } finally {
        setIsLoading(false);
      }
    }

    if (query) {
      getImages();
    }
  }, [query, currentPage]);

  const onSubmit = input => {
    const handleQuery = input.trim();
    if (handleQuery && handleQuery !== query) {
      setCurrentPage(1);
      setQuery(handleQuery);
      setImagesState([]);
    }
    if (handleQuery && handleQuery === query) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const onSelectedImage = largeImage => {
    setSelectedImage(largeImage);
    onOpenModal();
  };

  const onOpenModal = () => {
    setShowModal(true);
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  return (
    <StyledApp>
      {isShowModal && (
        <Modal
          selectedImage={selectedImage}
          onCloseModal={onCloseModal}
          isLoading={isLoading}
        />
      )}

      <Searchbar onSubmit={onSubmit} />

      {isLoading && <Loader />}

      <ImageGallery images={imagesState} onSelectedImage={onSelectedImage} />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {isShowLoadMore && <Button onSubmit={onSubmit} query={query} />}
    </StyledApp>
  );
};
