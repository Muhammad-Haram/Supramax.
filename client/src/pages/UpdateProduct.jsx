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

export default function UpdateProduct() {
    const location = useLocation();
    const productId = location.pathname.split("/")[3];
    const productData = useSelector((store) => store.product.products.find((product) => product._id === productId));

    const [inputs, setInputs] = useState({
        title: productData.title,
        desc: productData.desc,
        inStock: productData.inStock,
        categories: productData.categories.join(","),
        points: productData.points.join(","),
    });
    const [file, setFile] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleCategory = (e) => {
        setInputs((prev) => ({
            ...prev,
            categories: e.target.value,
        }));
    };

    const handlePoints = (e) => {
        setInputs((prev) => ({
            ...prev,
            points: e.target.value,
        }));
    };

    const handleClick = async (e) => {
        e.preventDefault();

        const productUpdate = {
            ...inputs,
            categories: inputs.categories.split(","),
            points: inputs.points.split(","),
            _id: productData._id,
            createdAt: productData.createdAt,
            updatedAt: new Date().toISOString(),
            __v: productData.__v,
        };

        if (file) {
            const filetitle = inputs.title || "default"; // Agar title nahi hai to default naam rakh lo
            const sanitizedTitle = filetitle.replace(/[^a-z0-9]/gi, "_").toLowerCase();
            const fileName = `${sanitizedTitle}_${new Date().getTime()}.jpg`
            console.log(fileName)
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
                        productUpdate.img = downloadURL; // Add image URL to product update
                        updateProducts(productId, productUpdate, dispatch);
                        navigate("/dashboard/products");
                    });
                }
            );
        } else {
            // If no new file, just update without changing the image
            updateProducts(productId, productUpdate, dispatch);
            navigate("/dashboard/products");
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
                                <div className="productInfoItem">
                                    <span className="productInfoKey">in stock:</span>
                                    <span className="productInfoValue">{productData.inStock}</span>
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
                                    <textarea name="desc" value={inputs.desc} onChange={handleChange}></textarea>
                                </div>

                                <div className="productFormLeft-input">
                                    <label>Product Points</label>
                                    <input type="text" value={inputs.points} onChange={handlePoints} />
                                </div>

                                <div className="productFormLeft-input">
                                    <label>Categories</label>
                                    <input type="text" value={inputs.categories} onChange={handleCategory} />
                                </div>

                                <div className="productFormLeft-input">
                                    <label>In Stock</label>
                                    <input name="inStock" type="number" value={inputs.inStock} onChange={handleChange} />
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
