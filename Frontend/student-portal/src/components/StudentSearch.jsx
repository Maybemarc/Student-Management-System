import { useState } from "react";

function StudentSearch({onSearch}) {
 const [details, SetDetails] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(details.trim());
  };

  return (
    <div>
    <form onSubmit={handleSubmit }className="search-container">
      <input
        type="text"
        placeholder="Search by Name, Roll Number, or Class"
        value={details}
        onChange={(e) => SetDetails(e.target.value)}
        className="search-input"
      />
      <button type="submit"
      className="search-button"
      >Search</button>
    </form>
    </div>
  );
}

export default StudentSearch