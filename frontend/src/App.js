/** @format */

import React, { lazy, Suspense } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

// Components
import Header from "./components/layout/Header";
import Loading from "./components/Loading";

const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

//auth Pages
const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const ForgotPasswordPage = lazy(() =>
  import("./pages/auth/ForgotPasswordPage")
);

//admin pages
const AdminRoute = lazy(() =>
  import("./components/protectedRoutes/AdminRoute")
);
const AdminDashboardPage = lazy(() => import("./pages/admin/Dashboard"));
const InstructorCreatePage = lazy(() =>
  import("./pages/admin/register/InstructorCreatePage")
);
const StudentCreatePage = lazy(() =>
  import("./pages/admin/register/StudentCreatePage")
);
const Institute = lazy(() => import("./pages/admin/create/Institute"));
const Branch = lazy(() => import("./pages/admin/create/Branch"));
const Batch = lazy(() => import("./pages/admin/create/Batch"));
const Student = lazy(() => import("./pages/admin/display/Student"));
const Instructor = lazy(() => import("./pages/admin/display/Instructor"));

//student pages
const StudentRoute = lazy(() =>
  import("./components/protectedRoutes/StudentRoute")
);
const StudentDashboardPage = lazy(() => import("./pages/student/Dashboard"));
const StudentCourseDetails = lazy(() =>
  import("./pages/student/course/CourseDetails")
);

//instructor pages
const InstructorRoute = lazy(() =>
  import("./components/protectedRoutes/InstructorRoute")
);
const InstructorDashboardPage = lazy(() =>
  import("./pages/instructor/Dashboard")
);

const CourseCreate = lazy(() => import("./pages/instructor/course/Create"));
const CourseDetails = lazy(() =>
  import("./pages/instructor/course/CourseDetails")
);

// user pages
const UserRoute = lazy(() => import("./components/protectedRoutes/UserRoute"));
const UserUpdateProfilePage = lazy(() =>
  import("./pages/user/UserUpdateProfilePage")
);

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Header />
        <ToastContainer position="top-center" />

        <main className="py-3">
          <Container>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/login" component={LoginPage} />
              <Route
                exact
                path="/forgot-password"
                component={ForgotPasswordPage}
              />
              <UserRoute
                exact
                path="/update-profile/:id"
                component={UserUpdateProfilePage}
              />
              <AdminRoute
                exact
                path="/admin/dashboard"
                component={AdminDashboardPage}
              />
              <AdminRoute
                exact
                path="/admin/instructor/create"
                component={InstructorCreatePage}
              />
              <AdminRoute
                exact
                path="/admin/student/create"
                component={StudentCreatePage}
              />
              <AdminRoute
                exact
                path="/admin/create/institute"
                component={Institute}
              />
              <AdminRoute
                exact
                path="/admin/create/branch"
                component={Branch}
              />
              <AdminRoute exact path="/admin/create/batch" component={Batch} />
              <AdminRoute
                exact
                path="/admin/display/student"
                component={Student}
              />
              <AdminRoute
                exact
                path="/admin/display/instructor"
                component={Instructor}
              />
              <StudentRoute
                exact
                path="/student/dashboard"
                component={StudentDashboardPage}
              />
              <StudentRoute
                exact
                path="/student/course/:slug"
                component={StudentCourseDetails}
              />
              <InstructorRoute
                exact
                path="/instructor/dashboard"
                component={InstructorDashboardPage}
              />
              <InstructorRoute
                exact
                path="/instructor/course/create"
                component={CourseCreate}
              />

              <InstructorRoute
                exact
                path="/instructor/course/:slug"
                component={CourseDetails}
              />
              <Route exact path="/*" component={NotFoundPage} />
            </Switch>
          </Container>
        </main>
      </Suspense>
    </Router>
  );
};

export default App;
