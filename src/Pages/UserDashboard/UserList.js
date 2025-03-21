import 'bootstrap/dist/css/bootstrap.min.css'
import "./UserDashboard.css"
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deleteUser, editUser, getAllUser } from "../../Redux/Slice/UserSlice";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

export default function Dashboard() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null)

  const { userList } = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch])

  const handleLogOut = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload()
  }

  const handleEdit = (user) => {
    dispatch(editUser(user))
  }

  const handleClickOpen = (id) => {
    setSelectedUserId(id)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedUserId(null)
  }

  const handleDelete = () => {
    if (selectedUserId) {
      dispatch(deleteUser(selectedUserId)).then((res) => {
        if (res.payload === "User deleted successfully") {
          dispatch(getAllUser());
        }
      })
    }
    setOpen(false)
    setSelectedUserId(null)
  }
  const handleShowAll=()=>{
    navigate("/ProductData")
  }


  return (
    <div className='user-container'>
      <h1 style={{ display: "flex", justifyContent: "center", margin: 20, color: "black" }}>ALL USERS</h1>
      
      <button type="submit" onClick={handleLogOut} className="logout-button" >
        Log Out
      </button>
      <button onClick={handleShowAll}  className='prod'>Show All Product</button>

      <table className='table'>
        <thead>
          <tr>
            <th>S No.</th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList?.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td><Link to="/form"><button className='btn2' onClick={() => handleEdit(user)}>Edit</button></Link></td>
              <td><button className='del-button' variant="outlined" onClick={() => handleClickOpen(user.id)}>Delete</button>
                <Dialog
                  className='dialogBox'
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                      Are you sure want to delete user
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleDelete} autoFocus>Agree</Button>
                  </DialogActions>
                </Dialog>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
