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
        type: ""
    });
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedUnit, setSelectedUnit] = useState("");
    const [file, setFile] = useState(null);
    const [descriptionFiles, setDescriptionFiles] = useState([]);
    const [existingDescImages, setExistingDescImages] = useState([]);
    const [imagePreview, setImagePreview] = useState(productData?.img || '');
    const [table, setTable] = useState("");
    const [dataSheetFile, setDataSheetFile] = useState(null);
    const [certificateFile, setCertificateFile] = useState(null);
    const [existingImages, setExistingImages] = useState(productData?.img || []);
    const [newImages, setNewImages] = useState([]);

    console.log(existingImages, "exist")
    console.log(newImages, "new")

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
            setExistingDescImages(productData.productDescImg || []);
            setImagePreview(productData.img);
            setTable(productData.table || "");
        }
    }, []);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);

        const newImagePreviews = selectedFiles.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));

        setNewImages((prev) => [...prev, ...newImagePreviews]);
    };

    let isUpdating = false;

    const handleDeleteExistingImage = (index) => {
        if (isUpdating) return;

        setExistingImages((prevImages) => {
            const updatedImages = [
                ...prevImages.slice(0, index),
                ...prevImages.slice(index + 1),
            ];
            console.log("After Deletion: ", updatedImages);
            return updatedImages;
        });

        toast.success("Image deleted locally.");
    };


    const handleDeleteExistingDescImage = (index) => {
        setExistingDescImages((prevImages) => {
            const updatedImages = [
                ...prevImages.slice(0, index),
                ...prevImages.slice(index + 1),
            ];
            return updatedImages;
        });
    };

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

    const handleTableChange = (e) => {
        setTable(e.target.value);
    };

    const handleDataSheetChange = (e) => {
        setDataSheetFile(e.target.files[0]);
    };

    const handleCertificateChange = (e) => {
        setCertificateFile(e.target.files[0]);
    };

    const handleClick = async (e) => {
        e.preventDefault();
        console.log("Submit Clicked");

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
            table: table,
            _id: productData._id,
            img: existingImages,
            productDescImg: existingDescImages,
            createdAt: productData.createdAt,
            updatedAt: new Date().toISOString(),
            __v: productData.__v,
            dataSheet: "",
            certificate: ""
        };

        const storage = getStorage(app);

        try {
            if (!newImages.length && !file) {
                productUpdate.img = [...existingImages];
            }

            if (file) {
                await uploadImage(file, productUpdate, storage);
            } else if (newImages.length > 0) {
                await uploadMultipleImages(newImages, productUpdate, storage);
            } else {
                productUpdate.img = existingImages;
            }

            if (descriptionFiles.length > 0) {
                await uploadDescriptionImages(descriptionFiles, productUpdate, storage);
            } else {
                productUpdate.productDescImg = existingDescImages.length > 0 ? existingDescImages : []; // Use existing or empty array
            }

            if (dataSheetFile) {
                await uploadFile(dataSheetFile, "dataSheet", productUpdate, storage);
            } else {
                productUpdate.dataSheet = productData.dataSheet;
            }

            if (certificateFile) {
                await uploadFile(certificateFile, "certificate", productUpdate, storage);
            } else {
                productUpdate.certificate = productData.certificate;
            }

            await updateProducts(productId, productUpdate, dispatch);
            toast.success("Product updated successfully!");
            navigate("/dashboard");

        } catch (error) {
            toast.error("Failed to update product. Please try again.");
        }
    };

    console.log("Updated Images: ", existingImages);

    const uploadImage = async (file, productUpdate, storage) => {
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
                        setImagePreview(downloadURL);
                        toast.dismiss(toastId);
                        resolve();
                    });
                }
            );
        });
    };

    const uploadMultipleImages = async (newImages, productUpdate, storage) => {
        const uploadPromises = newImages.map(({ file }) => {
            const fileName = `${inputs.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_${Date.now()}_${file.name}`;
            const storageRef = ref(storage, fileName);

            return new Promise((resolve, reject) => {
                const uploadTask = uploadBytesResumable(storageRef, file);
                uploadTask.on(
                    "state_changed",
                    null,
                    reject,
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(resolve);
                    }
                );
            });
        });

        const newImageUrls = await Promise.all(uploadPromises);
        productUpdate.img = [...existingImages, ...newImageUrls];
    };

    const uploadDescriptionImages = async (descriptionFiles, productUpdate, storage) => {
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
                            toast.dismiss(toastId);
                            resolve(downloadURL);
                        });
                    }
                );
            });
        });

        const descImageUrls = await Promise.all(descImageUploadPromises);
        productUpdate.productDescImg = descImageUrls;
    };

    const uploadFile = async (file, type, productUpdate, storage) => {
        const fileName = `${type}_${inputs.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_${Date.now()}.pdf`;
        const fileRef = ref(storage, fileName);
        const toastId = toast.loading(`Uploading ${type}...`);

        await uploadBytesResumable(fileRef, file).then(() => {
            return getDownloadURL(fileRef);
        }).then((downloadURL) => {
            productUpdate[type] = downloadURL;
            toast.dismiss(toastId);
        }).catch((error) => {
            toast.dismiss(toastId);
            toast.error(`Failed to upload ${type}.`);
            throw error;
        });
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
                                    <label>Update Product Image</label>
                                    <input type="file" multiple accept="image/*" onChange={handleFileChange} />
                                </div>

                                <div>
                                    <div className="image-gallery">
                                        {existingImages.map((url, index) => (
                                            <div key={index} style={{ display: "inline-block", position: "relative", margin: "5px" }}>
                                                <img src={url} alt={`Existing ${index + 1}`} style={{ width: "100px" }} />
                                                <button
                                                    style={{
                                                        position: "absolute",
                                                        top: 0,
                                                        right: 0,
                                                        backgroundColor: "red",
                                                        color: "white",
                                                        border: "none",
                                                        borderRadius: "20%",
                                                        width: "20px",
                                                        height: "20px",
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() => handleDeleteExistingImage(index)}
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="productFormLeft-input">
                                    <label>Update New Product Description Images</label>
                                    <input type="file" multiple onChange={handleDescriptionFilesChange} />
                                </div>

                                <div>
                                    <div className="product-page-desc-img">
                                        <div className="image-gallery">
                                            {existingDescImages.map((imgUrl, index) => (
                                                <div key={index} style={{ display: "inline-block", position: "relative", margin: "5px" }}>
                                                    <img src={imgUrl} alt={`Description ${index + 1}`} className="product-page-desc-img-tag" style={{ width: "100px" }} />
                                                    <button
                                                        style={{
                                                            position: "absolute",
                                                            top: 0,
                                                            right: 0,
                                                            backgroundColor: "red",
                                                            color: "white",
                                                            border: "none",
                                                            borderRadius: "20%",
                                                            width: "20px",
                                                            height: "20px",
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() => handleDeleteExistingDescImage(index)}
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="productFormLeft-input">
                                    <label>Table Content</label>
                                    <textarea
                                        value={table}
                                        onChange={handleTableChange}
                                        rows="5"
                                        placeholder="Enter table content here..."
                                    />
                                </div>

                                <div className="productFormLeft-input">
                                    <label>Update Product Data Sheet</label>
                                    <input type="file" onChange={handleDataSheetChange} />
                                </div>

                                <div className="productFormLeft-input">
                                    <label>Update Certificates</label>
                                    <input type="file" onChange={handleCertificateChange} />
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
