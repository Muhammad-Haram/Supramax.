import { useEffect, useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../firebase";
import { addProducts } from "../redux/apiCallsForDashBoard";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Topbar from "../components/topbar/Topbar";
import Sidebar from "../components/sidebar/Sidebar";
import TextEditor from "../components/TextEditor";
import toast from 'react-hot-toast';

const categoriesList = [
  "Solution",
  "Copper Data Cable",
  "Copper Multipair Cables",
  "Copper Coaxial Special Cables",
  "Copper Voice Termination Solution",
  "Copper Patch Cord",
  "Copper Patch Panel",
  "Copper Information Outlet Connector",
  "Face Plate Floor Socket",
  "Fiber Accessories",
  "Fiber Cable",
  "Fiber Patch Cord",
  "Cabinets",
  "Cabinets Tray Accessories",
  "Power Distribution Unit",
];

export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [table, setTable] = useState({})
  const [file, setFile] = useState(null);
  const [descriptionFiles, setDescriptionFiles] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedUnit, setSelectedUnit] = useState("");
  const [categories, setCategories] = useState([]);
  const [dataSheet, setDataSheet] = useState(null);
  const [certificate, setCertificate] = useState(null);

  const admin = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).auth).currentUser?.isAdmin;

  useEffect(() => {
    if (!admin) {
      navigate("/");
    }
  }, [admin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleTable = (e) => {
    const { name, value } = e.target;
    setTable((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (content) => {
    setInputs((prev) => ({ ...prev, desc: content }));
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setCategories((prev) => (checked ? [...prev, value] : prev.filter((cat) => cat !== value)));
  };

  const handleUnitChange = (e) => {
    setSelectedUnit(e.target.value);
  };

  const handleDescriptionFilesChange = (e) => {
    setDescriptionFiles(Array.from(e.target.files));
  };

  const handleDataSheetChange = (e) => {
    setDataSheet(e.target.files[0]);
  };

  const handleCertificateChange = (e) => {
    setCertificate(e.target.files[0]);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    let validationErrors = [];
    if (!inputs.title) validationErrors.push("Title is required");
    if (!inputs.partNumber) validationErrors.push("Part Number is required");
    if (!inputs.desc) validationErrors.push("Description is required");
    if (!selectedUnit) validationErrors.push("Unit is required");
    if (categories.length === 0) validationErrors.push("At least one category must be selected");
    if (!file) validationErrors.push("Main image is required");
    if (descriptionFiles.length === 0) validationErrors.push("At least one product description image is required");
    if (validationErrors.length > 0) {
      toast.error(validationErrors.join(", "));
      return;
    }

    const fileTitle = inputs.title || "default";
    const sanitizedTitle = fileTitle.replace(/[^a-z0-9]/gi, "_").toLowerCase();
    const toastId = toast.loading("Uploading..."); // Start single toast notification

    try {
      const storage = getStorage(app);
      const mainImageUrl = await uploadFileToFirebase(file, `${sanitizedTitle}_${new Date().getTime()}.jpg`, toastId);

      // Upload description images
      const descImageUploadPromises = descriptionFiles.map((descFile) => {
        const descFileName = `${sanitizedTitle}_${new Date().getTime()}_${descFile.name}`;
        return uploadFileToFirebase(descFile, descFileName, toastId);
      });

      const descImageUrls = await Promise.all(descImageUploadPromises);
      const dataSheetUrl = await uploadFileToFirebase(dataSheet, `dataSheet_${sanitizedTitle}_${Date.now()}`, toastId);
      const certificateUrl = await uploadFileToFirebase(certificate, `certificate_${sanitizedTitle}_${Date.now()}`, toastId);

      const product = {
        ...inputs,
        img: mainImageUrl,
        categories,
        unit: selectedUnit,
        productDescImg: descImageUrls,
        table: table.table,
        dataSheet: dataSheetUrl,
        certificate: certificateUrl,
      };

      await addProducts(product, dispatch);
      toast.dismiss(toastId);
      toast.success("Product added successfully");
      navigate("/dashboard");
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Failed to add product");
    }
  };

  // Updated upload function
  const uploadFileToFirebase = async (file, fileName, toastId) => {
    const storageRef = ref(getStorage(app), fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          toast.loading(`Upload is ${progress.toFixed(0)}% done`, { id: toastId }); // Update progress in the same toast
        },
        (error) => {
          reject(error);
          toast.dismiss(toastId);
          toast.error("Upload failed");
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
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
              <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} required />
            </div>
            <div className="addProductItem">
              <label>Title</label>
              <input name="title" type="text" placeholder="Product Title" onChange={handleChange} required />
            </div>
            <div className="addProductItem">
              <label>Description</label>
              <TextEditor onContentChange={handleEditorChange} />
            </div>
            <div className="addProductItem">
              <label>Part Number</label>
              <input name="partNumber" type="text" placeholder="Part Number" onChange={handleChange} required />
            </div>
            <div className="addProductItem">
              <label>Type</label>
              <input name="type" type="text" placeholder="Type" onChange={handleChange} />
            </div>
            <div className="addProductItem">
              <label>Categories</label>
              <div className="checkbox-container">
                {categoriesList.map((category) => (
                  <label key={category} className="checkbox-label">
                    <input type="checkbox" className="checkbox-input" value={category.toLowerCase().replace(/ /g, '-')} onChange={handleCategoryChange} />
                    {category}
                  </label>
                ))}
              </div>
              <div className="selected">
                Selected Categories:
                {categories.length > 0 ? (
                  categories.map((e, key) => (
                    <p key={key} className="category-seleted">{e.toLowerCase().replace(/ /g, '-')}</p>
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
                    <input type="radio" name="unit" value={unit} onChange={handleUnitChange} required />
                    {unit.charAt(0).toUpperCase() + unit.slice(1)}
                  </label>
                ))}
              </div>
            </div>
            <div className="productDesImg">
              <label>Product Description Images</label>
              <input type="file" onChange={handleDescriptionFilesChange} multiple required />
            </div>
            <div className="addProductItem">
              <label>Table</label>
              <textarea name="table" placeholder="Enter HTML structure for the table" onChange={handleTable} />
            </div>

            <div className="addProductItem">
              <label>Product Data Sheet</label>
              <input type="file" onChange={handleDataSheetChange} required />
            </div>
            <div className="addProductItem">
              <label>Certificates</label>
              <input type="file" onChange={handleCertificateChange} required />
            </div>


            <button onClick={handleClick} className="addProductButton">Create</button>
          </form>
        </div>
      </div>
    </>
  );
}
