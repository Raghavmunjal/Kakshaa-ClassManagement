/** @format */

import React, { useEffect, useState } from "react";
import { getCourses } from "../../actions/courseAction";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import CourseCard from "../../components/cards/StudentCourseCard";
import Paginate from "../../components/Paginate";
import Meta from "../../components/Meta";
import online from "../../images/online.svg";
import Loading from "../../components/Loading";

const Dashboard = () => {
  const dispatch = useDispatch();

  const [paginatePage, setPaginatePage] = useState(1);
  const { courses, page, pages, loading } = useSelector(
    (state) => state.courseGetAll
  );

  const value = "student";
  useEffect(() => {
    dispatch(getCourses(value, paginatePage));
  }, [dispatch, paginatePage]);

  return (
    <>
      <Meta title={`Student Dashboard`} />
      {loading ? (
        <Loading />
      ) : (
        <div>
          {courses && courses.length > 0 && (
            <h3 className="text-center text-success">Courses</h3>
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
                    src={online}
                    alt="not Authorize"
                    style={{ width: "100%", height: "300px" }}
                  />

                  <p className="mt-5" style={{ letterSpacing: ".75px" }}>
                    You are not enrolled in any course yet 😥
                  </p>
                </div>
              </>
            )}
          </Row>

          {courses && courses.length > 0 && (
            <Paginate
              pages={pages}
              page={page}
              setPaginatePage={setPaginatePage}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Dashboard;
