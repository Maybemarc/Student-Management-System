import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents, deleteStudent } from "../redux/studentSlice";
import StudentSearch from "./StudentSearch"
import StudentResults from "./StudentResults"

function StudentList() {
  const dispatch = useDispatch();
  const { list, isLoading, total, page, pages } = useSelector(
    (state) => state.students
  );

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchStudents({ search, page: 1 }));
  }, [dispatch, search]);

  const handleSearch = (searchQuery) => {
    setSearch(searchQuery);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      dispatch(deleteStudent(id));
    }
  };

  const handleNextPage = () => {
    if (page < pages) dispatch(fetchStudents({ search, page: page + 1 }));
  };

  const handlePrevPage = () => {
    if (page > 1) dispatch(fetchStudents({ search, page: page - 1 }));
  };

  if (isLoading) return <div>Loading students...</div>;
  if (!list || list.length === 0) return <div>No students found.</div>;

  return (
    <div>
        <p>Number of Students found - {total}</p>
      <StudentSearch onSearch={handleSearch} />
      <StudentResults students={list} onDelete={handleDelete}  />

      <div className="pagination">
  <button disabled={page <= 1} onClick={handlePrevPage}>
    Previous
  </button>
  <span>
    Page {page} of {pages}
  </span>
  <button disabled={page >= pages} onClick={handleNextPage}>
    Next
  </button>
</div>
    </div>
  );
}

export default StudentList;
