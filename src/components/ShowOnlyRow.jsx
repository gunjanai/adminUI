import React from "react";

function ShowOnlyRow({
  rowData,
  handleEdit,
  handleDelete,
  handleChecked,
  isCheckedState,
  rowKey,
}) {
  return (
    <tr key={rowKey}>
      <td>
        <input
          type="checkbox"
          value={rowData.id}
          name={rowData.id}
          checked={true ? rowData.isChecked === true : false}
          // checked={false ? rowData.isChecked === false : true}
          onChange={handleChecked}
        ></input>
      </td>
      <td>{rowData.name}</td>
      <td>{rowData.email}</td>
      <td>{rowData.role}</td>
      <td>
        <button
          type="button"
          className="form-button"
          onClick={(event) => handleEdit(event, rowData)}
        >
          Edit
        </button>
        <button
          type="button"
          className="form-button"
          onClick={() => {
            handleDelete(rowData.id);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default ShowOnlyRow;
