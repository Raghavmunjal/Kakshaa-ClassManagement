/** @format */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tab, Tabs } from "react-bootstrap";
import Meta from "../../../components/Meta";
import axios from "axios";
import { toast } from "react-toastify";
import {
  addLesson,
  getCourseDetails,
  addAnnouncement,
} from "../../../actions/courseAction";
import Lesson from "../../../components/Lesson";
import Announcement from "../../../components/Announcement";
import Loading from "../../../components/Loading";

const CourseDetails = ({ match }) => {
  const { slug } = match.params;
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  //const [progress, setProgress] = useState(0);
  const [key, setKey] = useState("lesson");
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const role = "instructor";

  const intialValues = {
    title: "",
    description: "",
    video: "",
  };

  const initialAnnouncementValues = {
    description: "",
    file: "",
  };

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const [values, setValues] = useState(intialValues);
  const [announcementValues, setAnnouncementValues] = useState(
    initialAnnouncementValues
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (!values.video) {
        toast.error("Please Upload Video");
        return;
      }
      dispatch(addLesson(slug, values));
      setUploaded(false);
      toast.success("Lesson Uploaded Successfully");
    } catch (error) {
      console.log(error);
      setUploaded(false);
    }
  };

  const handleVideoUpload = async (e) => {
    try {
      setUploading(true);
      setUploaded(false);
      const file = e.target.files[0];
      const videoData = new FormData();
      videoData.append("video", file);

      const { data } = await axios.post(
        `/api/instructor/course/upload-video`,
        videoData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
          // onUploadProgress: (progressEvent) => {
          //   const { loaded, total } = progressEvent;
          //   const percentage = Math.floor(
          //     ((loaded / 1000) * 100) / (total / 1000)
          //   );
          //   setProgress(percentage);
          // },
        }
      );
      //setProgress(0);
      setValues({ ...values, video: data });
      setUploading(false);
      setUploaded(true);
    } catch (error) {
      console.log(error);
      setUploading(false);
      toast.error("Video Uploading Failed");
    }
  };

  const handleFileUpload = async (e) => {
    try {
      setUploading(true);
      var fileToLoad = e.target.files[0];
      var fileReader = new FileReader();
      fileReader.onload = async (fileLoadedEvent) => {
        var base64 = fileLoadedEvent.target.result;
        var file = base64;
        const { data } = await axios.post(
          `/api/instructor/course/upload-announcement`,
          { file },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        setAnnouncementValues({ ...announcementValues, file: data });
        setUploading(false);
      };
      fileReader.readAsDataURL(fileToLoad);
    } catch (error) {
      console.log(error);
      setUploading(false);
      toast.error("File Uploading Failed");
    }
  };

  const handleAnnouncementSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(addAnnouncement(slug, announcementValues));
      toast.success("Announcement Uploaded Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const { course, loading } = useSelector((state) => state.courseGetDetails);

  useEffect(() => {
    if (!course || !course.title || course.slug !== slug)
      dispatch(getCourseDetails(slug, "instructor"));
  }, [dispatch, slug, course]);

  return (
    <>
      <Meta title={`Kakshaa : ${slug}`} />
      {loading ? (
        <Loading />
      ) : (
        course && (
          <>
            <h4 className="text-center">{course.title}</h4>
            <div className="underline"></div>

            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className="mb-3"
            >
              <Tab eventKey="lesson" title="Lesson">
                <Lesson
                  course={course}
                  role={role}
                  setShowLessonModal={setShowLessonModal}
                  handleVideoUpload={handleVideoUpload}
                  showLessonModal={showLessonModal}
                  handleSubmit={handleSubmit}
                  //progress={progress}
                  uploading={uploading}
                  uploaded={uploaded}
                  values={values}
                  handleChange={handleChange}
                />
              </Tab>
              <Tab eventKey="announcement" title="Announcement">
                <Announcement
                  role={role}
                  course={course}
                  setShowAnnouncementModal={setShowAnnouncementModal}
                  announcementValues={announcementValues}
                  handleFileUpload={handleFileUpload}
                  handleAnnouncementSubmit={handleAnnouncementSubmit}
                  setAnnouncementValues={setAnnouncementValues}
                  showAnnouncementModal={showAnnouncementModal}
                  uploading={uploading}
                />
              </Tab>
            </Tabs>
          </>
        )
      )}
    </>
  );
};

export default CourseDetails;
