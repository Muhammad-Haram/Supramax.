import { Link, useLocation } from "react-router-dom";
import Publish from "@mui/icons-material/Publish";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../firebase";
import { updateProducts } from "../redux/apiCallsForDashBoard";
import { useNavigate } from "react-router-dom";
import Topbar from "../components/topbar/Topbar";
import Sidebar from "../components/sidebar/Sidebar";
import TextEditor from "../components/TextEditor";

const allCategories = ["category1", "category2", "category3", "category4"]; // Sab categories define karen
const allUnits = ["unit1", "unit2", "unit3", "unit4"]; // Sab units define karen

export default function UpdateProduct() {
    const location = useLocation();
    const productId = location.pathname.split("/")[3];
    const productData = useSelector((store) => store.product.products.find((product) => product._id === productId));

    const [inputs, setInputs] = useState({
        title: productData.title,
        desc: productData.desc,
        inStock: productData.inStock,
    });

    const [selectedCategories, setSelectedCategories] = useState(productData.categories || []);
    const [selectedUnit, setSelectedUnit] = useState(productData.unit || ""); // Unit ka state
    const [file, setFile] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        setSelectedCategories((prev) => {
            if (prev.includes(value)) {
                return prev.filter((cat) => cat !== value); // Agar category pehle se selected hai, to remove karen
            } else {
                return [...prev, value]; // Nayi category add karen
            }
        });
    };

    const handleUnitChange = (e) => {
        setSelectedUnit(e.target.value); // Selected unit ko update karen
    };

    const handleEditorChange = (content) => {
        setInputs((prev) => ({
            ...prev,
            desc: content,
        }));
    };

    const handleClick = async (e) => {
        e.preventDefault();

        const productUpdate = {
            ...inputs,
            categories: selectedCategories,
            unit: selectedUnit, // Yahan selected unit ko include karen
            _id: productData._id,
            createdAt: productData.createdAt,
            updatedAt: new Date().toISOString(),
            __v: productData.__v,
        };

        if (file) {
            const filetitle = inputs.title || "default";
            const sanitizedTitle = filetitle.replace(/[^a-z0-9]/gi, "_").toLowerCase();
            const fileName = `${sanitizedTitle}_${new Date().getTime()}.jpg`;
            const storage = getStorage(app);
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        productUpdate.img = downloadURL;
                        updateProducts(productId, productUpdate, dispatch);
                        navigate("/dashboard");
                    });
                }
            );
        } else {
            updateProducts(productId, productUpdate, dispatch);
            navigate("/dashboard");
        }
    };

    return (
        <>
            <Topbar />
            <div className="container">
                <Sidebar />
                <div className="product">
                    <div className="productTitleContainer">
                        <h1 className="productTitle">Product</h1>
                        <Link to="/newproduct">
                            <button className="productAddButton">Create</button>
                        </Link>
                    </div>
                    <div className="productTop">
                        <div className="productTopRight">
                            <div className="productInfoTop">
                                <img src={productData.img} alt="" className="productInfoImg" />
                                <span className="productName">{productData.title}</span>
                            </div>
                            <div className="productInfoBottom">
                                <div className="productInfoItem">
                                    <span className="productInfoKey">id:</span>
                                    <span className="productInfoValue">{productData._id}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="productBottom">
                        <form className="productForm">
                            <div className="productFormLeft">
                                <div className="productFormLeft-input">
                                    <label>Product Name</label>
                                    <input name="title" type="text" value={inputs.title} onChange={handleChange} />
                                </div>

                                <div className="productFormLeft-input">
                                    <label>Product Description</label>
                                    <TextEditor
                                        onContentChange={handleEditorChange}
                                        initialContent={inputs.desc}
                                    />
                                </div>

                                <div className="productFormLeft-input">
                                    <label>Part Number</label>
                                    <input name="title" type="text" value={inputs.partNumber} onChange={handleChange} />
                                </div>

                                <div className="productFormLeft-input">
                                    <label>Type</label>
                                    <input name="title" type="text" value={inputs.type} onChange={handleChange} />
                                </div>

                                <div className="addProductItem">
                                    <label>Categories</label>
                                    <div className="checkbox-container">
                                        {allCategories.map((category) => (
                                            <label key={category} className="checkbox-label">
                                                <input
                                                    type="checkbox"
                                                    className="checkbox-input"
                                                    value={category}
                                                    checked={selectedCategories.includes(category)}
                                                    onChange={handleCategoryChange}
                                                />
                                                {category}
                                            </label>
                                        ))}
                                    </div>
                                    <div className="selected">
                                        Selected Categories:
                                        {selectedCategories.length > 0 ? (
                                            selectedCategories.map((e, key) => (
                                                <p key={key} className="category-seleted">{e}</p>
                                            ))
                                        ) : (
                                            <p className="category-seleted">None</p>
                                        )}
                                    </div>
                                </div>

                                {/* Radio buttons for units */}
                                <div className="addProductItem">
                                    <label>Unit</label>
                                    <div>
                                        {allUnits.map((unit) => (
                                            <label key={unit} className="checkbox-label">
                                                <input
                                                    type="radio"
                                                    name="unit"
                                                    value={unit}
                                                    checked={selectedUnit === unit}
                                                    onChange={handleUnitChange}
                                                />
                                                {unit}
                                            </label>
                                        ))}
                                    </div>
                                </div>

                            </div>
                            <div className="productFormRight">
                                <div className="productUpload">
                                    <img src={productData.img} alt="" className="productUploadImg" />
                                    <label htmlFor="file">
                                        <Publish />
                                    </label>
                                    <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} style={{ display: "none" }} />
                                </div>
                                <button onClick={handleClick} className="productButton">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
