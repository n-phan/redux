import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import * as authorActions from '../../redux/actions/authorActions';
import * as courseActions from '../../redux/actions/courseActions';
import CourseList from './CourseList';
import PropTypes from 'prop-types';

class CoursesPage extends React.Component {
  state = {
    navigateToAddCoursePage: false,
  };

  componentDidMount() {
    const { actions, authors, courses } = this.props;

    if (authors.length === 0) {
      actions.loadAuthors().catch((error) => {
        alert('Loading authors failed: ' + error);
      });
    }
    if (courses.length === 0) {
      actions.loadCourses().catch((error) => {
        alert('Loading courses failed: ' + error);
      });
    }
  }

  render() {
    return (
      <>
        {this.state.navigateToAddCoursePage && <Navigate to="/course" />}

        <h2>Courses</h2>
        <button
          style={{ marginBotton: 20 }}
          className="btn btn-primary add-course"
          onClick={() => this.setState({ navigateToAddCoursePage: true })}
        >
          Add Course
        </button>
        <CourseList courses={this.props.courses} />
      </>
    );
  }
}

CoursesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  // prettier-ignore
  return {
    authors: state.authors,
    courses:
      state.courses.length === 0
        ? []
        : state.courses.map((course) => {
          return {
            ...course,
            authorName: state.authors.find((a) => a.id === course.authorId).name,
          };
        }),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
