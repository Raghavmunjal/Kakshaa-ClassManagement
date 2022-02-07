import React, { useEffect, useState } from "react";
import CourseCard from "../../components/cards/InstructorCourseCard";
import { getCourses } from "../../actions/courseAction";
import { useDispatch, useSelector } from "react-redux";
import { COURSE_CREATE_RESET } from "../../constants/courseConstants";
import { Col, Row } from "react-bootstrap";
import Paginate from "../../components/Paginate";
import Meta from "../../components/Meta";
import publish from "../../images/publish.svg";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { courses, page, pages, loading } = useSelector(
    (state) => state.courseGetAll
  );
  const { success } = useSelector((state) => state.courseCreate);

  const [paginatePage, setPaginatePage] = useState(1);

  const value = "instructor";
  useEffect(() => {
    if (success) {
      dispatch({ type: COURSE_CREATE_RESET });
    }
    dispatch(getCourses(value, paginatePage));
  }, [dispatch, success, paginatePage]);

  return (
    <>
      <Meta title="Instructor Dashboard" />
      {loading ? (
        <Loading />
      ) : (
        <div>
          {courses && courses.length > 0 && (
            <h3 className="text-center text-success mb-3">Courses</h3>
          )}
          <Row>
            {courses && courses.length > 0 ? (
              courses.map((course) => {
                return (
                  <Col key={course._id} sm={12} md={6} lg={4} xl={3}>
                    <CourseCard course={course} />
                  </Col>
                );
              })
            ) : (
              <>
                <div className="container text-center mt-5 pt-5">
                  <img
                    src={publish}
                    alt="not Authorize"
                    style={{ width: "100%", height: "300px" }}
                  />

                  <p className="mt-5" style={{ letterSpacing: ".75px" }}>
                    You have not created any course yet 😥
                  </p>
                  <Link
                    to="/instructor/course/create"
                    style={{ color: "#02b875" }}
                    className="mt-3"
                  >
                    Create Course
                  </Link>
                </div>
              </>
            )}
          </Row>
          {courses && courses.length > 0 && (
            <Row>
              <Paginate
                pages={pages}
                page={page}
                setPaginatePage={setPaginatePage}
              />
            </Row>
          )}
        </div>
      )}
    </>
  );
};

export default Dashboard;
