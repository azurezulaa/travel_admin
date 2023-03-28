import PropTypes from 'prop-types';
import axios from 'axios';
// @mui
import { Box, Card, Link, Typography, Stack, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ travel, setRender, render, handleOpen, setOpen, setDeleteID }) {
  const { _id, title, travelPrice, travelImg } = travel;

  const updateTravel = async (id) => {
    // try {
    //   await axios.update(`http://localhost:8000/travels/${id}`);
    //   console.log('CAT Ustlaa');
    //   setRender(!render);
    // } catch (err) {
    //   console.log('Err', err);
    // }
  };

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {/* {status && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {status}
          </Label>
        )} */}
        <StyledProductImg alt={title} src={travelImg} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
            {title}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through',
              }}
            >
              {/* {priceSale && fCurrency(priceSale)} */}
            </Typography>
            &nbsp;
            {fCurrency(travelPrice)}
          </Typography>
          <div>
            <IconButton size="large">
              <EditIcon
                sx={{ color: '#1c54b2' }}
                onClick={() => {
                  updateTravel(_id);
                  handleOpen();
                }}
              />
            </IconButton>
            <IconButton
              size="large"
              onClick={() => {
                setOpen(true);
                setDeleteID(_id);
              }}
            >
              <DeleteIcon sx={{ color: '#1c54b2' }} />
            </IconButton>
          </div>
        </Stack>
      </Stack>
    </Card>
  );
}
