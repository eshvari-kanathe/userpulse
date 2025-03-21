import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { createCategory, getCategory } from "../../Redux/Slice/Category";
import { Button, Card, CardActions, CardContent, CardMedia, Dialog, DialogActions, DialogContent, Typography } from "@mui/material";
import { getCategory, createCategory } from "../../Redux/Slice/CategorySlice";
import { GetAllProduct } from "../../Redux/Slice/ProductSlice";

const ProductData = () => {
  const dispatch = useDispatch()
  const { productData } = useSelector((state) => state.category)
  const { AllProduct } = useSelector((state) => state.product)
  const [open, setOpen] = useState(false)

  const [cateId, setCateId] = useState("")
  const [status, setStatus] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [file, setFile] = useState(null)

  useEffect(() => {
    dispatch(getCategory())
  }, [dispatch])


  const saveData = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("name", name)
    formData.append("description", description)
    formData.append("status", status)
    formData.append("image", file)
    formData.append("categoryId", cateId)
    // console.log([...formData.entries()].forEach(i => console.log(i)))

    dispatch(createCategory(formData))
    setOpen(false);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(GetAllProduct())
  }, [])


  return (
    <div className="d-flex p-4">
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Create Product
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent id="alert-dialog-description">
            <form onSubmit={(e) => saveData(e)}>
              <select onChange={(e) => setCateId(e.target.value)} className="m-3 w-60 border-1 border-gray-300 h-11">
                <option value="" className="p-2">Please select category</option>
                {productData?.map((cate, index) => (
                  <option key={index} value={cate._id}>{cate.name}</option>
                ))}
              </select>
              <input type="text" placeholder="Eneter name" value={name} onChange={(e) => setName(e.target.value)} className="m-3 w-60" />
              <input type="text" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} className="m-3 w-60" />
              <input
                type="file"
                placeholder="Choose image"
                onChange={(e) => setFile(e.target.files[0])}
                className="m-3 w-60"
              />
              <select onChange={(e) => setStatus(e.target.value)} className="m-3 w-60 border-1 border-gray-300 h-11">
                <option value="">Select status</option>
                <option value={true}>Active</option>
                <option value={false}>Inactive</option>
              </select>


              <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button type="submit" autoFocus>
                  Add Product
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </div>


      {/* {AllProduct?.map((item) => <ul>
        <li>{item.name}</li>
        <li>{item.description}</li>
        <img src={`https://node-js-wse4.onrender.com/uploads/${item.fileName}`} alt={item.id}/>
        <li>{item.status}</li>
      </ul>)} */}

      {AllProduct?.map((item) => <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140,width:160 }}
          image={`https://node-js-wse4.onrender.com/uploads/${item.fileName}`}
          title={item.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {item.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Delete</Button>
          <Button size="small">Edit</Button>
        </CardActions>
      </Card>)}

    </div>
  )
};

export default ProductData;
