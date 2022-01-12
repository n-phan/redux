import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadAuthors } from '../../redux/actions/authorActions';
import { loadCourses } from '../../redux/actions/courseActions';
import PropTypes from 'prop-types';

// React functional component
function ManageCoursePage({ authors, courses, loadAuthors, loadCourses }) {
  useEffect(() => {
    if (authors.length === 0) {
      loadAuthors().catch((error) => {
        alert('Loading authors failed: ' + error);
      });
    }
    if (courses.length === 0) {
      loadCourses().catch((error) => {
        alert('Loading courses failed: ' + error);
      });
    }
  }, []);

  return (
    <>
      <h2>Manage Course</h2>
    </>
  );
}

// PropTypes
ManageCoursePage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  loadCourses: PropTypes.func.isRequired,
};

// Redux mapping
function mapStateToProps(state) {
  return {
    authors: state.authors,
    courses: state.courses,
  };
}

const mapDispatchToProps = {
  loadAuthors,
  loadCourses,
};

// Redux connect
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
