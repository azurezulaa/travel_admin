import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import axios from 'axios';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';

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
export default function CategoryForm({ open, handleClose, isNew, render, setRender, selectedCategory, ud }) {
  const [newCat, setNewCat] = useState({
    title: '',
    description: '',
    categoryImg: '',
    categoryRating: '',
  });

  const handleChange = (e) => {
    if (isNew) {
      setNewCat({ ...newCat, [e.target.name]: e.target.value });
    } else {
      ud(e);
    }
  };

  const updateCategoryById = async () => {
    try {
      await axios.put(`http://localhost:8000/categories/${selectedCategory._id}`, selectedCategory);
      console.log('CAT shinchlegdlee');
      setRender(!render);
    } catch (err) {
      console.log('Err', err);
    } finally {
      handleClose();
    }
  };

  const createCategory = async () => {
    try {
      await axios.post(`http://localhost:8000/categories`, newCat);
      console.log('CAT shinchlegdlee');
      setRender(!render);
    } catch (err) {
      console.log('Err', err);
    } finally {
      setNewCat({
        title: '',
        description: '',
        categoryImg: '',
        categoryRating: '',
      });
      handleClose();
    }
  };

  const getImgUrl = async (e) => {
    try {
      const bodyData = new FormData();
      bodyData.append('image', e.target.files[0]);
      const res = await axios.post(`http://localhost:8000/upload`, bodyData);

      console.log(res);
      if (isNew) {
        setNewCat({ ...newCat, categoryImg: res.data.imgUrl });
      } else {
        ud({ ...selectedCategory, categoryImg: res.data.imgUrl });
      }
    } catch (err) {
      console.log('Err', err);
    }
  };

  return (
    <div>
      {console.log(isNew)}
      <Modal open={open} onClose={handleClose}>
        <Fade in={open}>
          <Box sx={style}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <div>
                <InputLabel>Нэр</InputLabel>
                <TextField value={isNew ? newCat.title : selectedCategory?.title} name="title" onChange={handleChange}>
                  Text in a modal kjsdfjdslkfdsl;kf
                </TextField>
                <InputLabel>Тайлбар</InputLabel>
                <OutlinedInput
                  value={isNew ? newCat.description : selectedCategory?.description}
                  name="description"
                  onChange={handleChange}
                >
                  Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </OutlinedInput>
              </div>
              <div>
                <InputLabel>Зураг</InputLabel>
                <OutlinedInput type="file" onChange={getImgUrl}>
                  {/* onChange={getImgUrl} */}
                  Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </OutlinedInput>
                <InputLabel>Үнэлгээ</InputLabel>
                <OutlinedInput
                  value={isNew ? newCat.categoryRating : selectedCategory?.categoryRating}
                  name="categoryRating"
                  onChange={handleChange}
                >
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
                    updateCategoryById();
                  }
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
