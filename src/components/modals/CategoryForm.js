import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import axios, { AxiosHeaders } from 'axios';
import Button from '@mui/material/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  pb: 2,
};
export default function CategoryForm({ open, setOpen, isNew, id, render }) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [categoryValues, setCategoryValues] = useState({
    title: '',
    description: '',
    categoryImg: '',
    categoryRating: 0,
  });

  const updateCategory = async () => {
    try {
      await axios.put(`http://localhost:8000/categories/${id}`, categoryValues);
      console.log('CAT shinchlegdlee');
      render();
    } catch (err) {
      console.log('Err', err);
    }
  };

  const createCategory = async () => {
    try {
      await axios.post(`http://localhost:8000/categories`, categoryValues);
      console.log('CAT shinchlegdlee');
      render();
    } catch (err) {
      console.log('Err', err);
    }
  };

  const getImgUrl = async (e) => {
    // await url
    // console.log(e.target.files[0]);
    const bodyData = new FormData();
    bodyData.append('image', e.target.files[0]);
    console.log(bodyData, 'asdasd');
    await axios
      .post(`http://localhost:8000/upload`, bodyData)
      .then((res) => {
        console.log('RES', res);
      })
      .catch((err) => {
        console.log('Err', err);
      });
    setCategoryValues({ ...categoryValues, categoryImg: 'url' });
  };

  const onChangeValue = (e) => {
    setCategoryValues({ ...categoryValues, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <div>
                <InputLabel>Нэр</InputLabel>
                <OutlinedInput placeholder="" name="title" onChange={onChangeValue}>
                  Text in a modal kjsdfjdslkfdsl;kf
                </OutlinedInput>
                <InputLabel>Тайлбар</InputLabel>
                <OutlinedInput onChange={onChangeValue} placeholder="">
                  Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </OutlinedInput>
              </div>
              <div>
                <InputLabel>Зураг</InputLabel>
                <OutlinedInput type="file" placeholder="" onChange={getImgUrl}>
                  {/* onChange={getImgUrl} */}
                  Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </OutlinedInput>
                <InputLabel>Үнэлгээ</InputLabel>
                <OutlinedInput placeholder="" onChange={onChangeValue}>
                  Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </OutlinedInput>
              </div>
            </Box>
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Button
                onClick={() => {
                  if (isNew) {
                    createCategory();
                  } else {
                    updateCategory();
                  }
                  setOpen(false);
                }}
              >
                Хадгалах
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
