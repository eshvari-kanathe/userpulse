import 'bootstrap/dist/css/bootstrap.min.css'
import "./UserDashboard.css"
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { deleteUser, editUser, getAllUser } from "../../Redux/Slice/UserSlice"

export default function Dashboard() {

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const { userList } = useSelector((state) => state.user);
  const token = localStorage.getItem("token")
  // console.log("userList", userList)

  useEffect(() => {
    if (token) {
      dispatch(getAllUser())
      navigate("/dashboard")

    } else {
      navigate("/")
    }
  }, [token]);


  const handleLogOut = () => {
    localStorage.clear()
    window.location.reload()
    navigate('/');
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id))

  }

  const handleEdit = (user) => {
    dispatch(editUser(user))
  }

  return (
    <div className='user-container'>
      <h1 style={{ display: "flex", justifyContent: "center", margin: 20, color: "black" }}>ALL USERS</h1>

      <button type="submit" onClick={handleLogOut} className="logout-button" >
        Log Out
      </button>

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
          {userList.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td><Link to="/form"><button className='btn2' onClick={() => handleEdit(user)}>Edit</button></Link></td>
              <td><button className='del-button' onClick={() => handleDelete(user.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

