import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const [files, setFiles] = useState([]); // Changed to array
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

    // Ensure you are creating an array to store download URLs
    const downloadURLs = [];

    // Use Promise.all to wait for all uploads to finish
    await Promise.all(files.map(async (file) => {
      const filetitle = inputs.title || "default";
      const sanitizedTitle = filetitle.replace(/[^a-z0-9]/gi, "_").toLowerCase();
      const fileName = `${sanitizedTitle}_${new Date().getTime()}_${file.name}`;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      return new Promise((resolve, reject) => {
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
            toast.error("Error uploading file.");
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              downloadURLs.push(downloadURL);
              resolve();
            });
          }
        );
      });
    }));

    // After all files are uploaded, create the product
    const product = {
      ...inputs,
      img: downloadURLs, // Store all download URLs in the product object
      categories: categories,
      unit: selectedUnit,
    };

    addProducts(product, dispatch)
      .then(() => {
        toast.success("Product created successfully!");
        navigate("/dashboard/products");
      })
      .catch((err) => {
        toast.error("Error creating product: " + err.message);
      });
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
              <label>Images</label>
              <input
                type="file"
                id="file"
                multiple
                onChange={(e) => setFiles(Array.from(e.target.files))}
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
                    value="solution"
                    onChange={handleCategoryChange}
                  />
                  Solution
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    value="copper-data-cable"
                    onChange={handleCategoryChange}
                  />
                  Copper Data Cable
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    value="copper-multipair-cables"
                    onChange={handleCategoryChange}
                  />
                  Copper Multipair Cables
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    value="copper-coaxial-&-special-cables"
                    onChange={handleCategoryChange}
                  />
                  Copper Coaxial & Special Cables
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    value="copper-voice-termination-solution"
                    onChange={handleCategoryChange}
                  />
                  Copper Voice Termination Solution
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    value="copper-patch-cord"
                    onChange={handleCategoryChange}
                  />
                  Copper Patch Cord
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    value="copper-patch-panel"
                    onChange={handleCategoryChange}
                  />
                  Copper Patch Panel
                </label>


                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    value="information-outlet-&-connector"
                    onChange={handleCategoryChange}
                  />
                  Copper Information Outlet (IO) & Connector (Male Plug)
                </label>


                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    value="face-plate-&-floor-socket"
                    onChange={handleCategoryChange}
                  />
                  Face Plate & Floor Socket
                </label>


                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    value="fiber-accessories"
                    onChange={handleCategoryChange}
                  />
                  Fiber Accessories
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    value="fiber-cable"
                    onChange={handleCategoryChange}
                  />
                  Fiber Cable
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    value="fiber-patch-cord"
                    onChange={handleCategoryChange}
                  />
                  Fiber Patch Cord
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    value="cabinets"
                    onChange={handleCategoryChange}
                  />
                  Cabinets
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    value="cabinets-tray"
                    onChange={handleCategoryChange}
                  />
                  Cabinets Tray  / Accessories
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    value="PDU"
                    onChange={handleCategoryChange}
                  />
                  PDU (Power Distribution Unit)
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
      <ToastContainer />
    </>
  );
}