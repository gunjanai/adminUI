import React from "react";
import "../css/table.css";

function EditableRow({ editRowData, handleEditRowData, handleCancel, rowKey }) {
  return (
    <tr key={rowKey}>
      <td>
        <input type="checkbox" value={editRowData.id}></input>
      </td>
      <td>
        <input
          className="input-box"
          type="text"
          required="required"
          placeholder="enter name"
          name="name"
          value={editRowData.name}
          onChange={handleEditRowData}
        ></input>
      </td>
      <td>
        <input
          className="input-box"
          type="text"
          required="required"
          placeholder="enter email"
          name="email"
          value={editRowData.email}
          onChange={handleEditRowData}
        ></input>
      </td>
      <td>
        <input
          className="input-box"
          type="text"
          required="required"
          placeholder="enter role"
          name="role"
          value={editRowData.role}
          onChange={handleEditRowData}
        ></input>
      </td>
      <td>
        <button className="form-button" type="submit">
          Save
        </button>
        <button className="form-button" type="button" onClick={handleCancel}>
          Cancel
        </button>
      </td>
    </tr>
  );
}

export default EditableRow;
