import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';
// @mui
import { Grid } from '@mui/material';
import ShopProductCard from './ProductCard';

// components

import DeleteModal from '../../../components/modals/DeleteModal';
// ----------------------------------------------------------------------

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default function ProductList({
  travels,
  setRender,
  render,
  handleOpen,
  setIsNew,
  setSelectedTravel,
  setTravel,
  ...other
}) {
  const [open, setOpen] = useState(false);
  const [deleteID, setDeleteID] = useState(null);

  const handleClose = () => setOpen(false);

  const deleteTravel = async () => {
    try {
      await axios.delete(`http://localhost:8000/travels/${deleteID}`);
      setRender(!render);
    } catch (err) {
      console.log('Err', err);
    }
  };

  return (
    <Grid container spacing={3} {...other}>
      {travels?.map((travel) => (
        <Grid key={travel._id} item xs={12} sm={6} md={3}>
          <ShopProductCard
            travel={travel}
            setRender={setRender}
            render={render}
            handleOpen={handleOpen}
            setOpen={setOpen}
            setDeleteID={setDeleteID}
            setIsNew={setIsNew}
            setSelectedTravel={setSelectedTravel}
          />
        </Grid>
      ))}
      <DeleteModal open={open} handleClose={handleClose} yes={deleteTravel} />
    </Grid>
  );
}
