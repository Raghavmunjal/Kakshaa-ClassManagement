/** @format */

import React, { useState } from "react";
import CourseCreateForm from "../../../components/forms/CourseCreateForm";
import { useDispatch, useSelector } from "react-redux";
import Meta from "../../../components/Meta";
import { courseCreate } from "../../../actions/courseAction";
import { UPLOAD_IMAGE_RESET } from "../../../constants/userConstants";
import { upload } from "../../../actions/userAction";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import Loading from "../../../components/Loading";

const Create = () => {
  const intialValues = {
    title: "",
    description: "",
    image: "",
    institute: "",
    branch: "",
    section: "",
    year: "",
  };

  const dispatch = useDispatch();
  const history = useHistory();
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
    try {
      let file = e.target.files[0];
      setPreview(window.URL.createObjectURL(file));
      setUploadedButtonText(file.name);
      dispatch(upload(file));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      values.image = image;
      setValues(intialValues);
      if (
        !values.title &&
        !values.image &&
        !values.description &&
        !values.institute &&
        !values.branch &&
        !values.section &&
        !values.year
      ) {
        toast.warning("All Fields are required");
        return;
      }
      dispatch(courseCreate(values));
      setPreview("");
      dispatch({ type: UPLOAD_IMAGE_RESET });
      setLoading(false);
      history.push("/instructor/dashboard");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <Meta title="Kakshaa : Create Course" />
      {loading ? (
        <Loading />
      ) : (
        <CourseCreateForm
          handleSubmit={handleSubmit}
          handleImage={handleImage}
          handleChange={handleChange}
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

export default Create;
