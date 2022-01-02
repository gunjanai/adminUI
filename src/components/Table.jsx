import { React, useState, useEffect, useRef } from "react";
import getApiResponse from "../utils/apiHandler";
import apiURL from "../config/config";
import ShowOnlyRow from "./ShowOnlyRow";
import EditableRow from "./EditableRow";
import Pagination from "./Pagination";
import "../css/table.css";

let tableData = [];
function Table() {
  const [adminData, setadminData] = useState([]);
  const [searchParam, setsearchParam] = useState("");
  const [editID, seteditID] = useState(null);
  const [editRowData, seteditRowData] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [currentPage, setcurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [isCheckedState, setisCheckedState] = useState(false);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = adminData.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setcurrentPage(pageNumber);
  };

  const fetchAdminList = async () => {
    try {
      const response = await getApiResponse(apiURL);
      tableData = response;

      for (let i = 0; i < tableData.length; i++) {
        tableData[i].isChecked = false;
      }
      setadminData(tableData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAdminList();
  }, []);

  useEffect(() => {
    if (searchParam === "") {
      setadminData(adminData);
    } else {
      setadminData(
        tableData.filter(
          (row) =>
            row.name.toLowerCase().indexOf(searchParam.toLowerCase()) > -1 ||
            row.email.toLowerCase().indexOf(searchParam.toLowerCase()) > -1 ||
            row.role.toLowerCase().indexOf(searchParam.toLowerCase()) > -1
        )
      );
    }
  }, [searchParam]);

  const handleEdit = (event, rowData) => {
    event.preventDefault();
    seteditID(rowData.id);

    const rowValues = {
      name: rowData.name,
      email: rowData.email,
      role: rowData.role,
    };

    seteditRowData(rowValues);
  };

  const handleEditRowData = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newRowData = { ...editRowData };
    newRowData[fieldName] = fieldValue;
    seteditRowData(newRowData);
  };

  const handleSaveRowDataSubmit = (event) => {
    event.preventDefault();

    const editedRow = {
      id: editID,
      name: editRowData.name,
      email: editRowData.email,
      role: editRowData.role,
    };

    const newRowData = [...adminData];

    const editedRowIndex = adminData.findIndex((row) => row.id == editID);
    newRowData[editedRowIndex] = editedRow;
    setadminData(newRowData);
    seteditID(null);
  };

  const handleCancel = () => {
    seteditID(null);
  };

  const handleDelete = (selectedRowId) => {
    const newRowData = [...adminData];

    const index = adminData.findIndex((row) => row.id == selectedRowId);

    newRowData.splice(index, 1);

    setadminData(newRowData);
  };

  const handleChecked = (e) => {
    const { name } = e.target;
    if (name === "all-checked") {
      tableData = adminData.map((row, index) => {
        if (index >= indexOfFirstPost && index <= indexOfLastPost) {
          row.isChecked = !isCheckedState;
          setisCheckedState(!isCheckedState);
        }
        return row;
      });
    } else {
      tableData = adminData.map((row) =>
        // row.id == name ? (row.isChecked = true) : row
        {
          if (row.id === name) {
            row.isChecked = true ? row.isChecked === false : true;
            return row;
          } else {
            return row;
          }
        }
      );
    }
    setadminData(tableData);
    console.log(adminData);
  };

  const handleCheckedDelete = (e) => {
    e.preventDefault();
    setadminData(
      adminData.filter((row) => {
        if (row.isChecked === false) {
          return row;
        }
      })
    );
    document.getElementById("all-checked").checked = false;
  };

  return (
    <div className="container">
      <div className="top-search-del-button">
        <button
          className="button"
          type="button"
          onClick={(e) => handleCheckedDelete(e)}
        >
          Delete Selected
        </button>

        <input
          className="search-bar"
          // size="30"
          placeholder="Search table..."
          value={searchParam}
          onChange={(event) => {
            setsearchParam(event.target.value);
          }}
        />
      </div>
      <form onSubmit={handleSaveRowDataSubmit}>
        <table className="table-content">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  defaultChecked={false}
                  name="all-checked"
                  id="all-checked"
                  onChange={handleChecked}
                ></input>
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((rowData) => (
              <>
                {editID == rowData.id ? (
                  <EditableRow
                    editRowData={editRowData}
                    handleEditRowData={handleEditRowData}
                    handleCancel={handleCancel}
                    rowKey={rowData.id}
                  />
                ) : (
                  <ShowOnlyRow
                    rowData={rowData}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    handleChecked={handleChecked}
                    isCheckedState={isCheckedState}
                    rowKey={rowData.id}
                  />
                )}
              </>
            ))}
          </tbody>
        </table>
      </form>

      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={adminData.length}
        paginate={paginate}
      />
    </div>
  );
}

export default Table;
