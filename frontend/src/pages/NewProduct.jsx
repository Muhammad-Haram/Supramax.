import { useState } from "react";
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
import toast, { Toaster } from 'react-hot-toast';

const categoriesList = [
  "Solution",
  "Copper Data Cable",
  "Copper Multipair Cables",
  "Copper Coaxial & Special Cables",
  "Copper Voice Termination Solution",
  "Copper Patch Cord",
  "Copper Patch Panel",
  "Copper Information Outlet (IO) & Connector (Male Plug)",
  "Face Plate & Floor Socket",
  "Fiber Accessories",
  "Fiber Cable",
  "Fiber Patch Cord",
  "Cabinets",
  "Cabinets Tray  / Accessories",
  "PDU (Power Distribution Unit)",
];

export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedUnit, setSelectedUnit] = useState("");
  const [categories, setCategories] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (content) => {
    setInputs((prev) => ({ ...prev, desc: content }));
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setCategories((prev) =>
      checked ? [...prev, value] : prev.filter((cat) => cat !== value)
    );
  };

  const handleUnitChange = (e) => {
    setSelectedUnit(e.target.value);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    let validationErrors = [];
    if (!inputs.title) validationErrors.push("Title is required");
    if (!inputs.partNumber) validationErrors.push("Part Number is required");
    if (!inputs.desc) validationErrors.push("Description is required");
    if (!selectedUnit) validationErrors.push("Unit is required");
    if (categories.length === 0) validationErrors.push("At least one category must be selected");
    if (!file) validationErrors.push("Image is required");

    if (validationErrors.length > 0) {
      toast.error(validationErrors.join(", "));
      return;
    }

    // Proceed with file upload if validation passes
    const filetitle = inputs.title || "default";
    const sanitizedTitle = filetitle.replace(/[^a-z0-9]/gi, "_").toLowerCase();
    const fileName = `${sanitizedTitle}_${new Date().getTime()}.jpg`;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    const toastId = toast.loading("Uploading...");

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        toast.loading(`Upload is ${progress}% done`, { id: toastId });
      },
      (error) => {
        toast.dismiss(toastId);
        toast.error("Image upload failed");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = {
            ...inputs,
            img: downloadURL,
            categories,
            unit: selectedUnit,
          };
          addProducts(product, dispatch)
            .then(() => {
              toast.dismiss(toastId);
              toast.success("Product added successfully");
              navigate("/dashboard");
            })
            .catch((err) => {
              toast.dismiss(toastId);
              toast.error("Failed to add product");
            });
        });
      }
    );
  };


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
                required
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
                required
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
                {categoriesList.map((category) => (
                  <label key={category} className="checkbox-label">
                    <input
                      type="checkbox"
                      className="checkbox-input"
                      value={category}
                      onChange={handleCategoryChange}
                    />
                    {category.replace(/-/g, " ").toUpperCase()}
                  </label>
                ))}
              </div>

              <div className="selected">
                Selected Categories:
                {categories.length > 0 ? (
                  categories.map((e, key) => (
                    <p key={key} className="category-seleted">{e.replace(/-/g, " ")}</p>
                  ))
                ) : (
                  <p className="category-seleted">None</p>
                )}
              </div>
            </div>

            <div className="addProductItem">
              <label>Unit</label>
              <div>
                {["Reel", "Box", "Mtr.", "Pcs", "Per Meter"].map((unit) => (
                  <label key={unit} className="checkbox-label">
                    <input
                      type="radio"
                      name="unit"
                      value={unit}
                      onChange={handleUnitChange}
                      required
                    />
                    {unit.charAt(0).toUpperCase() + unit.slice(1)}
                  </label>
                ))}
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
