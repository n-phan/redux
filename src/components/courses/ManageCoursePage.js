import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { loadAuthors } from '../../redux/actions/authorActions';
import { loadCourses, saveCourse } from '../../redux/actions/courseActions';
import { newCourse } from '../../../tools/mockData';
import CourseForm from './CourseForm';
import PropTypes from 'prop-types';

// React functional component
function ManageCoursePage({
  authors,
  courses,
  loadAuthors,
  loadCourses,
  saveCourse,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course });
  /* eslint-disable no-unused-vars */
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (authors.length === 0) {
      loadAuthors().catch((error) => {
        alert('Loading authors failed: ' + error);
      });
    } else {
      setCourse({ ...props.course });
    }
    if (courses.length === 0) {
      loadCourses().catch((error) => {
        alert('Loading courses failed: ' + error);
      });
    }
  }, [props.course]);

  function handleChange(event) {
    const { name, value } = event.target;

    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: name === 'authorId' ? parseInt(value, 10) : value,
    }));
  }

  function handleSave(event) {
    event.preventDefault();
    saveCourse(course).then(() => navigate('/courses'));
  }

  return (
    <CourseForm
      authors={authors}
      course={course}
      errors={errors}
      onChange={handleChange}
      onSave={handleSave}
    />
  );
}

// PropTypes
ManageCoursePage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  course: PropTypes.object.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  loadCourses: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
};

// Redux mapping
export function getCourseBySlug(courses, slug) {
  return courses.find((course) => course.slug === slug) || null;
}

function mapStateToProps(state) {
  const { slug } = useParams();
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;

  return {
    authors: state.authors,
    courses: state.courses,
    course,
  };
}

const mapDispatchToProps = {
  loadAuthors,
  loadCourses,
  saveCourse,
};

// Redux connect
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);

// TLDR there is an issue with the current setup - can't refresh or load pages directly
// The issue is described here: https://stackoverflow.com/questions/27928372/react-router-urls-dont-work-when-refreshing-or-writing-manually
// Need to find a way to pass params to mapStateToProps or
// replace mapStateToProps and mapDispatchToProps https://egghead.io/lessons/react-replacing-mapstatetoprops-with-the-useselector-hook
// consolidate with useSelector
