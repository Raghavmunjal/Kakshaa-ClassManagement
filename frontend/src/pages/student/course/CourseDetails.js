/** @format */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tab, Tabs } from "react-bootstrap";
import Meta from "../../../components/Meta";
import { getCourseDetails } from "../../../actions/courseAction";
import Lesson from "../../../components/Lesson";
import Announcement from "../../../components/Announcement";
import Loading from "../../../components/Loading";

const CourseDetails = ({ match }) => {
  const { slug } = match.params;
  const [key, setKey] = useState("lesson");
  const dispatch = useDispatch();
  const role = "student";

  const { course, loading } = useSelector((state) => state.courseGetDetails);

  useEffect(() => {
    if (!course || !course.title || course.slug !== slug)
      dispatch(getCourseDetails(slug, "student"));
    //eslint-disable-next-line
  }, [slug]);

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
                <Lesson course={course} role={role} />
              </Tab>
              <Tab eventKey="announcement" title="Announcement">
                <Announcement course={course} role={role} />
              </Tab>
            </Tabs>
          </>
        )
      )}
    </>
  );
};

export default CourseDetails;
