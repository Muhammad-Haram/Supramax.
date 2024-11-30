import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const ProductGallery = ({ product }) => {
    const images = product.img.map((imageUrl) => ({
        original: imageUrl,
        thumbnail: imageUrl,
    }));

    return (
        <div>
            <ImageGallery
                items={images}
                showThumbnails={true}
                showPlayButton={false}
                showFullscreenButton={false}
            />
        </div>
    );
};

export default ProductGallery;
