import React, { useState } from "react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import axios from "axios";
import Result from "./Result";
import Failed from "./Failed";

const Home = () => {
  // states
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [checkSuccess, setCheckSuccess] = useState(false);
  const [checkTypeError, setCheckTypeError] = useState(false);

  // browse file
  const fileUploader = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    const type = e.target.files[0].name.split(".")[1];
    console.log(type);
    if (type === "xlsx" || type === "xls") {
      setCheckTypeError(false);
    } else {
      setCheckTypeError(true);
    }
  };

  // post the file to the mongoDB
  const handleSubmit = () => {
    console.log("clicked");
    setCheckSuccess(true);
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post("http://localhost:5000/api/submit", formData)
      .then((res) => {
        console.log("res");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="main">
      {checkSuccess ? (
        <Result />
      ) : checkTypeError ? (
        <Failed />
      ) : (
        <>
          <div className="image-upload">
            <label htmlFor="file-input">
              <FileUploadIcon className="icon" />
            </label>

            <input
              id="file-input"
              type="file"
              className="form-control input_btn "
              name="excel"
              required
              onChange={fileUploader}
            />
          </div>
          {fileName}
          {file ? (
            <button className="btn" onClick={handleSubmit}>
              Submit
            </button>
          ) : (
            "Upload a .xlsx or .xls file here"
          )}
        </>
      )}
    </div>
  );
};

export default Home;
