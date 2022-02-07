/** @format */

import React, { useState } from "react";
import StudentCreateForm from "../../../components/forms/StudentCreateForm";
import { registerStudent } from "../../../actions/adminAction";
import { useDispatch, useSelector } from "react-redux";
import Meta from "../../../components/Meta";
import { upload } from "../../../actions/userAction";
import { toast } from "react-toastify";
import { UPLOAD_IMAGE_RESET } from "../../../constants/userConstants";
import Loading from "../../../components/Loading";

const StudentCreatePage = () => {
  const intialValues = {
    email: "",
    phone: "",
    image: "",
    name: "",
    institute: "",
    branch: "",
    section: "",
    year: "",
  };

  const dispatch = useDispatch();
  const [values, setValues] = useState(intialValues);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadedButtonText, setUploadedButtonText] = useState("Upload Image");

  const uploadImage = useSelector((state) => state.uploadImage);
  const { image, loading: uploading } = uploadImage;

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    let file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
    setUploadedButtonText(file.name);
    dispatch(upload(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      values.image = image;
      setLoading(true);
      setValues(intialValues);
      if (
        !values.email &&
        !values.image &&
        !values.phone &&
        !values.name &&
        !values.institute &&
        !values.branch &&
        !values.section &&
        !values.year
      ) {
        toast.warning("All Fields are required");
        setLoading(false);
        return;
      }
      dispatch(registerStudent(values));
      setPreview("");
      dispatch({ type: UPLOAD_IMAGE_RESET });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Meta title="Kakshaa : Create Student" />
      {loading ? (
        <Loading />
      ) : (
        <StudentCreateForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleImage={handleImage}
          values={values}
          setValues={setValues}
          preview={preview}
          uploading={uploading}
          uploadedButtonText={uploadedButtonText}
        />
      )}
    </div>
  );
};

export default StudentCreatePage;
