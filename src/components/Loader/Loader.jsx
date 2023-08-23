import { LoaderStyle } from './Loader.styled';

const { ThreeDots } = require('react-loader-spinner');

export function Loader() {
  return (
    <LoaderStyle>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#20B2AA"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </LoaderStyle>
  );
}
