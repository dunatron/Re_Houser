import PropTypes from 'prop-types';
import React, { PureComponent, useMemo } from 'react';
import styled from 'styled-components';
import encodeImage from '@/Lib/encodeImage';
import Fab from '@material-ui/core/Fab';

const ImageList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
export default class ImagePicker extends PureComponent {
  render() {
    const { images } = this.props;
    return (
      <ImageList>
        {images.map((img, idx) => (
          <ImageTile
            key={idx}
            image={img}
            remove={() => this.props.remove(idx)}
          />
        ))}
      </ImageList>
    );
  }
}

ImagePicker.propTypes = {
  images: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
  remove: PropTypes.func.isRequired,
};
const ImgTile = styled.div`
  background: white;
  border: 1px solid ${props => props.theme.offWhite};
  box-shadow: ${props => props.theme.bs};
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 16px;
  @media (max-width: ${props => props.theme.breakpoints.values.md}px) {
    margin: 60px 0 0 0;
  }
  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
`;

const contentAsSrc = content => {
  const src = 'data:image/png;base64,' + encodeImage(content);
  return src;
};

const ImageTile = ({ image, remove }) => {
  const memoizedSrc = useMemo(() => contentAsSrc(image.data.content), [
    image.data,
  ]);
  return (
    <ImgTile>
      <Fab
        style={{ position: 'absolute' }}
        size="small"
        color="secondary"
        aria-label="Add"
        onClick={remove}>
        X
      </Fab>
      <img src={memoizedSrc} />
    </ImgTile>
  );
};

ImageTile.propTypes = {
  image: PropTypes.shape({
    data: PropTypes.shape({
      content: PropTypes.any,
    }),
  }).isRequired,
  remove: PropTypes.any.isRequired,
};
