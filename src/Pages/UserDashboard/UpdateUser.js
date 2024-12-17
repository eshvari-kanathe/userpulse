import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllUser, updateUser } from "../../Redux/Slice/UserSlice";

const validationSchema = yup.object({
    name: yup
        .string("Enter your name")
        .required("Name is required"),
    email: yup
        .string("Enter your email")
        .required("Email is required")
        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "Enter a valide email "),

    password: yup
        .string("Enter your password")
        .min(6, "Password should be of minimum 6 characters length")
        .required("Password is required"),
})

export default function UpdatedUser() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { edit } = useSelector((state) => state.user)

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const updatedData = {
                id: edit.userData.id,
                name: values.name,
                email: values.email,
                password: values.password,
            }

            dispatch(updateUser(updatedData)).then((res) => {
                if (res.payload?.message == "User updated successfully") {
                    dispatch(getAllUser())
                    navigate("/dashboard")
                }
            })
        }
    })

    useEffect(() => {
        if (edit.isEdit) {
            formik.setValues({
                name: edit.userData?.name,
                email: edit.userData?.email,
                password: "",
            });
        }
    }, [edit.isEdit, edit.userData, formik.setValues])

    return (
        <div>
            <h1 style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
                Update User
            </h1>
            <form className="centered-form" onSubmit={formik.handleSubmit}>
                <div>
                    <label>Name</label>
                    <input
                        name="name"
                        type="text"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.name && formik.errors.name && (
                        <div style={{ color: "red" }}>{formik.errors.name}</div>
                    )}
                </div>
                <div>
                    <label>Email</label>
                    <input
                        name="email"
                        type="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <div style={{ color: "red" }}>{formik.errors.email}</div>
                    )}
                </div>
                <div>
                    <label>Password</label>
                    <input
                        name="password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter new password"
                    />
                    {formik.touched.password && formik.errors.password && (
                        <div style={{ color: "red" }}>{formik.errors.password}</div>
                    )}
                </div>
                <div>
                    <button type="submit">Update</button>
                    <Link to="/dashboard"><button style={{ marginTop: 10 }} type="submit">Back</button></Link>
                </div>
            </form>
        </div>
    )
}
