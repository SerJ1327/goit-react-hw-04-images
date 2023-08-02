import { Component } from 'react';
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
export class App extends Component {
  state = {
    images: [],
    isShowModal: false,
    isLoading: false,
    isShowLoadMore: false,
    selectedImage: { url: null, alt: null },
    currentPage: 1,
    query: '',
    perPage: 12,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      this.state.query !== prevState.query ||
      this.state.currentPage !== prevState.currentPage
    ) {
      this.setState({ isLoading: true });
      try {
        const images = await fetchImages(
          this.state.query,
          this.state.currentPage,
          this.state.perPage
        );

        if (
          images.totalHits - this.state.currentPage * this.state.perPage >
          this.state.perPage
        ) {
          this.setState({ isShowLoadMore: true });
        } else {
          this.setState({ isShowLoadMore: false });
        }

        this.setState({
          images: [...this.state.images, ...images.hits],
          totalHits: images.totalHits,
        });
      } catch (error) {
        toast.error(
          `Opps, some error occured. Please, try again later. Error: ${error.message}`,
          toastConfig
        );
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  onSubmit = input => {
    const query = input.trim();

    if (query && query !== this.state.query) {
      this.setState({ currentPage: 1, query, images: [] });
    }

    if (query && query === this.state.query) {
      this.setState({ currentPage: this.state.currentPage + 1 });
    }
  };

  onSelectedImage = largeImage => {
    this.setState({ selectedImage: largeImage });
    this.onOpenModal();
  };

  onOpenModal = () => {
    this.setState({ isShowModal: true });
  };

  onCloseModal = () => {
    this.setState({ isShowModal: false });
  };

  render() {
    return (
      <StyledApp>
        {this.state.isShowModal && (
          <Modal
            selectedImage={this.state.selectedImage}
            onCloseModal={this.onCloseModal}
            isLoading={this.state.isLoading}
          />
        )}

        <Searchbar
          clearCurrentPage={this.clearCurrentPage}
          onSubmit={this.onSubmit}
        />

        {this.state.isLoading && <Loader />}

        <ImageGallery
          images={this.state.images}
          onSelectedImage={this.onSelectedImage}
        />

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

        {this.state.isShowLoadMore && (
          <Button onSubmit={this.onSubmit} query={this.state.query} />
        )}
      </StyledApp>
    );
  }
}
