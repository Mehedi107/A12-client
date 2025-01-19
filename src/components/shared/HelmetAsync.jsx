import { Helmet } from 'react-helmet-async';

/* eslint-disable-next-line react/prop-types */
const HelmetAsync = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export default HelmetAsync;
