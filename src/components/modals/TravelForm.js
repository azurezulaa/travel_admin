import { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function TravelForm({
  handleClose,
  open,
  isNew,
  render,
  setRender,
  updateTravel,
  selectedTravel,
  setSelectedTravel,
}) {
  const [newTravel, setNewTravel] = useState({
    title: '',
    travelLocation: '',
    travelPrice: '',
    travelDay: '',
    travelImg: '',
    category: '',
  });
  const updateValues = (e) => {
    setSelectedTravel({ ...selectedTravel, [e.target.name]: e.target.value });
  };
  const handleChange = (e) => {
    if (isNew) {
      setNewTravel({ ...newTravel, [e.target.name]: e.target.value });
    } else {
      updateValues(e);
    }
  };

  const createTravel = async () => {
    try {
      await axios.post(`http://localhost:8000/travels`, newTravel);
      setRender(!render);
    } catch (err) {
      console.log('Err', err);
    } finally {
      handleClose();
    }
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <TextField
            id="outlined-helperText"
            name="title"
            label="title"
            value={isNew ? newTravel.title : selectedTravel.title}
            onChange={handleChange}
          />
          <TextField
            id="outlined-helperText"
            name="travelImg"
            label="image"
            value={isNew ? newTravel.travelImg : selectedTravel.travelImg}
            onChange={handleChange}
          />
          <TextField
            id="outlined-helperText"
            name="travelPrice"
            label="price"
            value={isNew ? newTravel.travelPrice : selectedTravel.travelPrice}
            onChange={handleChange}
          />
          <TextField
            id="outlined-helperText"
            name="travelDay"
            label="day"
            value={isNew ? newTravel.travelDay : selectedTravel.travelDay}
            onChange={handleChange}
          />
          <TextField
            id="outlined-helperText"
            name="travelLocation"
            label="location"
            value={isNew ? newTravel.travelLocation : selectedTravel.travelLocation}
            onChange={handleChange}
          />
          <TextField
            id="outlined-helperText"
            name="category"
            label="category"
            value={isNew ? newTravel.category : selectedTravel.category}
            onChange={handleChange}
          />
          <Button
            onClick={() => {
              if (isNew) {
                createTravel();
              } else {
                updateTravel();
                handleClose();
              }
            }}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
