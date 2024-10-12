import { Link, useLocation } from "react-router-dom";
import Publish from "@mui/icons-material/Publish";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../firebase";
import { updateProducts } from "../redux/apiCallsForDashBoard";
import { useNavigate } from "react-router-dom";
import Topbar from "../components/topbar/Topbar";
import Sidebar from "../components/sidebar/Sidebar";
import TextEditor from "../components/TextEditor";
import toast from 'react-hot-toast';



const allCategories = [
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

const allUnits = ["Reel", "Box", "Mtr.", "Pcs", "Per Meter"];

export default function UpdateProduct() {
    const location = useLocation();
    const productId = location.pathname.split("/")[3];
    const productData = useSelector((store) =>
        store.product.products.find((product) => product._id === productId)
    );

    const admin = JSON.parse(
        JSON.parse(localStorage.getItem("persist:root")).auth
    ).currentUser?.isAdmin;

    console.log(admin)

    useEffect(() => {
        if (!admin) {
          navigate("/");
          toast.error("You are not an admin");
        }
      }, [admin])

    const [inputs, setInputs] = useState({
        title: "",
        desc: "",
        partNumber: "",
        type: "",
    });
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedUnit, setSelectedUnit] = useState("");
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (productData) {
            setInputs({
                title: productData.title,
                desc: productData.desc,
                partNumber: productData.partNumber,
                type: productData.type,
            });
            setSelectedCategories(productData.categories || []);
            setSelectedUnit(productData.unit || "");
        }
    }, [productData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prev) => ({ ...prev, [name]: value }));
    };

    const handleCategoryChange = (e) => {
        const { value } = e.target;
        setSelectedCategories((prev) =>
            prev.includes(value) ? prev.filter((cat) => cat !== value) : [...prev, value]
        );
    };

    const handleUnitChange = (e) => {
        setSelectedUnit(e.target.value);
    };

    const handleEditorChange = (content) => {
        setInputs((prev) => ({ ...prev, desc: content }));
    };

    const handleClick = async (e) => {
        e.preventDefault();

        // Client-side validation
        let validationErrors = [];
        if (!inputs.title) validationErrors.push("Title is required");
        if (!inputs.partNumber) validationErrors.push("Part Number is required");
        if (!selectedCategories.length) validationErrors.push("At least one category must be selected");
        if (!selectedUnit) validationErrors.push("Unit is required");

        if (validationErrors.length > 0) {
            toast.error(validationErrors.join(", "));
            return;
        }

        const productUpdate = {
            ...inputs,
            categories: selectedCategories,
            unit: selectedUnit,
            _id: productData._id,
            createdAt: productData.createdAt,
            updatedAt: new Date().toISOString(),
            __v: productData.__v,
        };

        try {
            if (file) {
                const filetitle = inputs.title || "default";
                const sanitizedTitle = filetitle.replace(/[^a-z0-9]/gi, "_").toLowerCase();
                const fileName = `${sanitizedTitle}_${new Date().getTime()}.jpg`;
                const storage = getStorage(app);
                const storageRef = ref(storage, fileName);
                const uploadTask = uploadBytesResumable(storageRef, file);

                const toastId = toast.loading("Uploading image...");

                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        toast.loading(`Upload is ${progress}% done`, { id: toastId });
                    },
                    (error) => {
                        toast.dismiss(toastId);
                        toast.error("Failed to upload image.");
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            productUpdate.img = downloadURL;
                            updateProducts(productId, productUpdate, dispatch);
                            toast.success("Product updated successfully!");
                            navigate("/dashboard");
                        });
                    }
                );
            } else {
                await updateProducts(productId, productUpdate, dispatch);
                toast.success("Product updated successfully!");
                navigate("/dashboard");
            }
        } catch (error) {
            toast.error("Failed to update product. Please try again.");
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
                                    <span className="productInfoKey">ID:</span>
                                    <span className="productInfoValue">{productData._id}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="productBottom">
                        <form className="productForm" onSubmit={handleClick}>
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
                                    <input name="partNumber" type="text" value={inputs.partNumber} onChange={handleChange} />
                                </div>

                                <div className="productFormLeft-input">
                                    <label>Type</label>
                                    <input name="type" type="text" value={inputs.type} onChange={handleChange} />
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

                                <div className="addProductItem">
                                    <label>Unit</label>
                                    <div>
                                        {allUnits.map((unit) => (
                                            <label key={unit} className="checkbox-label">
                                                <input
                                                    type="radio"
                                                    name="unit"
                                                    value={unit}
                                                    checked={selectedUnit === unit.toLowerCase()}
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
                                    <input
                                        type="file"
                                        id="file"
                                        onChange={(e) => setFile(e.target.files[0])}
                                        style={{ display: "none" }}
                                    />
                                </div>
                                <button type="submit" className="productButton">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}