import { Link, useLocation } from "react-router-dom";
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

    const [inputs, setInputs] = useState({
        title: "",
        desc: "",
        partNumber: "",
        type: "",
    });
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedUnit, setSelectedUnit] = useState("");
    const [file, setFile] = useState(null);
    const [descriptionFiles, setDescriptionFiles] = useState([]);
    const [existingDescImages, setExistingDescImages] = useState([]);
    const [imagePreview, setImagePreview] = useState(productData?.img || ''); // State for image preview
    const [table, setTable] = useState(""); // State for table content
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!admin) {
            navigate("/");
        }
    }, [admin]);

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
            setExistingDescImages(productData.productDescImg || []); // Load existing description images
            setImagePreview(productData.img); // Set initial image preview
            setTable(productData.table || ""); // Load existing table content
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

    const handleDescriptionFilesChange = (e) => {
        setDescriptionFiles(Array.from(e.target.files));
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        // Create a local URL for previewing the selected image
        if (selectedFile) {
            const url = URL.createObjectURL(selectedFile);
            setImagePreview(url);
        } else {
            setImagePreview(productData?.img || ''); // Reset to existing image if no file is selected
        }
    };

    const handleTableChange = (e) => {
        setTable(e.target.value); // Update table state when the input changes
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
            table: table, // Include the table content in the update
            _id: productData._id,
            createdAt: productData.createdAt,
            updatedAt: new Date().toISOString(),
            __v: productData.__v,
        };

        const storage = getStorage(app);

        try {
            // Update main product image
            if (file) {
                const fileTitle = inputs.title || "default";
                const sanitizedTitle = fileTitle.replace(/[^a-z0-9]/gi, "_").toLowerCase();
                const fileName = `${sanitizedTitle}_${new Date().getTime()}.jpg`;
                const storageRef = ref(storage, fileName);
                const uploadTask = uploadBytesResumable(storageRef, file);

                const toastId = toast.loading("Uploading product image...");

                await new Promise((resolve, reject) => {
                    uploadTask.on(
                        "state_changed",
                        (snapshot) => {
                            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            toast.loading(`Product image upload is ${progress}% done`, { id: toastId });
                        },
                        (error) => {
                            toast.dismiss(toastId);
                            toast.error("Failed to upload product image.");
                            reject(error);
                        },
                        () => {
                            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                productUpdate.img = downloadURL;
                                setImagePreview(downloadURL); // Update preview with new image URL
                                toast.dismiss(toastId); // Dismiss after successful upload
                                resolve();
                            });
                        }
                    );
                });
            } else {
                productUpdate.img = productData.img; // Retain the existing image if no new upload
            }

            // Update description images
            if (descriptionFiles.length > 0) {
                const descImageUploadPromises = descriptionFiles.map((descFile) => {
                    const descFileName = `${inputs.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_${new Date().getTime()}_${descFile.name}`;
                    const descStorageRef = ref(storage, descFileName);
                    return new Promise((resolve, reject) => {
                        const descUploadTask = uploadBytesResumable(descStorageRef, descFile);
                        const toastId = toast.loading("Uploading description image...");

                        descUploadTask.on(
                            "state_changed",
                            (snapshot) => {
                                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                toast.loading(`Description image upload is ${progress}% done`, { id: toastId });
                            },
                            (error) => {
                                toast.dismiss(toastId);
                                toast.error("Description image upload failed");
                                reject(error);
                            },
                            () => {
                                getDownloadURL(descUploadTask.snapshot.ref).then((downloadURL) => {
                                    toast.dismiss(toastId); // Dismiss toast after successful upload
                                    resolve(downloadURL);
                                });
                            }
                        );
                    });
                });

                const descImageUrls = await Promise.all(descImageUploadPromises);
                productUpdate.productDescImg = descImageUrls; // Update with new description images only
            } else {
                productUpdate.productDescImg = existingDescImages; // Keep existing if no new uploads
            }

            await updateProducts(productId, productUpdate, dispatch);
            toast.success("Product updated successfully!");
            navigate("/dashboard");
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
                                <img src={imagePreview} alt="Product" className="productInfoImg" />
                                <span className="productName">{inputs.title || productData.title}</span>
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
                                                    value={category.toLowerCase().replace(/ /g, '-')}
                                                    checked={selectedCategories.includes(category.toLowerCase().replace(/ /g, '-'))}
                                                    onChange={handleCategoryChange}
                                                />
                                                {category}
                                            </label>
                                        ))}
                                    </div>
                                    <div className="selected">
                                        Selected Categories:
                                        {selectedCategories.join(", ") || " None"}
                                    </div>
                                </div>

                                <div className="productFormLeft-input">
                                    <label>Unit</label>
                                    <select value={selectedUnit} onChange={handleUnitChange}>
                                        <option value="">Select Unit</option>
                                        {allUnits.map((unit) => (
                                            <option key={unit} value={unit}>
                                                {unit}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="productFormLeft-input">
                                    <label>Upload Product Image</label>
                                    <input type="file" onChange={handleFileChange} />
                                    {imagePreview && (
                                        <img src={imagePreview} alt="Product Preview" className="productImagePreview" />
                                    )}
                                </div>

                                <label>Existing Product Description Images:</label>
                                <div className="product-page-desc-img">
                                    <div className="image-gallery">
                                        {existingDescImages.map((imgUrl, index) => (
                                            <img key={index} src={imgUrl} alt={`Description ${index + 1}`} className="product-page-desc-img-tag" />
                                        ))}
                                    </div>
                                </div>

                                <div className="productFormLeft-input">
                                    <label>Upload New Product Description Images</label>
                                    <input type="file" multiple onChange={handleDescriptionFilesChange} />
                                </div>

                                {/* New Section for Table */}
                                <div className="productFormLeft-input">
                                    <label>Table Content</label>
                                    <textarea
                                        value={table}
                                        onChange={handleTableChange}
                                        rows="5"
                                        placeholder="Enter table content here..."
                                    />
                                </div>

                                <button className="productButton" type="submit">
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
