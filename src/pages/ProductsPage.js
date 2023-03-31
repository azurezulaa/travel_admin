import { Helmet } from 'react-helmet-async';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
// @mui
import { Container, Stack, Typography, Button } from '@mui/material';
// components
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';
import { AuthContext } from '../context/authContext';
import TravelForm from '../components/modals/TravelForm';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const { token } = useContext(AuthContext);
  const [isNew, setIsNew] = useState(true);
  const [openFilter, setOpenFilter] = useState(false);
  const [travels, setTravels] = useState([]);
  const [render, setRender] = useState(false);
  const [selectedTravel, setSelectedTravel] = useState({});
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const getTravels = () => {
    axios
      .get('http://localhost:8000/travels', {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTravels(res.data.travels);
      })
      .catch((err) => {
        console.log('Err', err);
      });
  };

  const updateTravel = async () => {
    try {
      await axios.put(`http://localhost:8000/travels/${selectedTravel._id}`, selectedTravel);
      setRender(!render);
    } catch (err) {
      console.log('Err', err);
    }
  };

  useEffect(() => {
    getTravels();
  }, [render]);

  return (
    <>
      <Helmet>
        <title> Travels </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Travels
        </Typography>

        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 5 }}
        >
          <Button
            variant="contained"
            onClick={() => {
              handleOpen();
              setIsNew(true);
            }}
          >
            Create new travel
          </Button>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>

        {travels?.length > 0 && (
          <ProductList
            travels={travels}
            setRender={setRender}
            render={render}
            handleOpen={handleOpen}
            setIsNew={setIsNew}
            setSelectedTravel={setSelectedTravel}
          />
        )}
        <ProductCartWidget />
      </Container>
      <TravelForm
        open={open}
        handleClose={handleClose}
        setIsNew={setIsNew}
        isNew={isNew}
        setRender={setRender}
        render={render}
        updateTravel={updateTravel}
        selectedTravel={selectedTravel}
        setSelectedTravel={setSelectedTravel}
      />
    </>
  );
}
