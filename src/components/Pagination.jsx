import React from "react";
import "../css/Pagination.css";

function Pagination({ postsPerPage, totalPosts, paginate }) {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <div>
      <ul className="pagination">
        {pageNumber.map((number) => {
          return (
            <li key={number} className="page-item">
              <a href="!#" className="page-link">
                <button
                  className="general-button"
                  type="button"
                  onClick={() => paginate(number)}
                >
                  {number}
                </button>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Pagination;
