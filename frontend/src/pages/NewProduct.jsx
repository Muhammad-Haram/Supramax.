import { useState } from "react";
// import "./newProduct.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import { addProducts } from "../redux/apiCallsForDashBoard";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Topbar from "../components/topbar/Topbar";
import Sidebar from "../components/sidebar/Sidebar";
import TextEditor from "../components/TextEditor";

export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState("");
  const [category, setCategory] = useState([]);
  const [points, setPoints] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedUnit, setSelectedUnit] = useState("");
  const [categories, setCategories] = useState([]);

  // Handle input change
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  // Handle TextEditor content change
  const handleEditorChange = (content) => {
    setInputs((prev) => ({ ...prev, desc: content }));
  };

  // Handle category checkbox change
  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCategories((prev) => [...prev, value]);
    } else {
      setCategories((prev) => prev.filter((category) => category !== value));
    }
  };

  const handleUnitChange = (e) => {
    setSelectedUnit(e.target.value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const filetitle = inputs.title || "default"; // Agar title nahi hai to default naam rakh lo
    const sanitizedTitle = filetitle.replace(/[^a-z0-9]/gi, "_").toLowerCase();
    const fileName = `${sanitizedTitle}_${new Date().getTime()}.jpg`;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = {
            ...inputs,
            img: downloadURL,
            categories: categories,
            unit: selectedUnit,
          };
          addProducts(product, dispatch);
          console.log(product, dispatch)
          navigate("/dashboard/products");
        });
      }
    );
  };

  console.log(inputs);

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />

        <div className="newProduct">
          <h1 className="addProductTitle">New Product</h1>
          <form className="addProductForm">
            <div className="addProductItem">
              <label>Image</label>
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>

            <div className="addProductItem">
              <label>Title</label>
              <input
                name="title"
                type="text"
                placeholder="Product Title"
                onChange={handleChange}
              />
            </div>

            <div className="addProductItem">
              <label>Description</label>
              <TextEditor onContentChange={handleEditorChange} />
            </div>

            <div className="addProductItem">
              <label>Part Number</label>
              <input
                name="partNumber"
                type="text"
                placeholder="Part Number"
                onChange={handleChange}
              />
            </div>

            <div className="addProductItem">
              <label>Type</label>
              <input
                name="type"
                type="text"
                placeholder="Type"
                onChange={handleChange}
              />
            </div>

            <div className="addProductItem">
              <label>Categories</label>
              <div className="checkbox-container">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    value="category1"
                    onChange={handleCategoryChange}
                  />
                  Category 1
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    value="category2"
                    onChange={handleCategoryChange}
                  />
                  Category 2
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    value="category3"
                    onChange={handleCategoryChange}
                  />
                  Category 3
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    value="category4"
                    onChange={handleCategoryChange}
                  />
                  Category 4
                </label>
              </div>

              <div className="selected">
                Selected Categories:
                {categories.map((e, key) => (
                  <p key={key} className="category-seleted">{e || "None"}</p>
                ))}
              </div>
            </div>

            <div className="addProductItem">
              <label>Unit</label>
              <div>
                <label className="checkbox-label">
                  <input
                    type="radio"
                    name="unit"
                    value="unit1"
                    onChange={handleUnitChange}
                  />
                  Unit 1
                </label>

                <label className="checkbox-label">
                  <input
                    type="radio"
                    name="unit"
                    value="unit2"
                    onChange={handleUnitChange}
                  />
                  Unit 2
                </label>

                <label className="checkbox-label">
                  <input
                    type="radio"
                    name="unit"
                    value="unit3"
                    onChange={handleUnitChange}
                  />
                  Unit 3
                </label>

                <label className="checkbox-label">
                  <input
                    type="radio"
                    name="unit"
                    value="unit4"
                    onChange={handleUnitChange}
                  />
                  Unit 4
                </label>
              </div>
            </div>

            <button onClick={handleClick} className="addProductButton">
              Create
            </button>
          </form>
        </div>
      </div>

    </>
  );
}