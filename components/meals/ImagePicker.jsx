"use client";

import { useRef, useState } from "react";
import classes from "./ImagePicker.module.css";
import Image from "next/image";

const ImagePicker = ({ label, name }) => {
  const [pickedImg, setPickedImg] = useState();

  const inputRef = useRef();
  const handleClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    if (!image) {
      setPickedImg(null);
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImg(fileReader.result);
    };
    fileReader.readAsDataURL(image);
  };

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImg && <p>No Image Picked yet</p>}
          {pickedImg && (
            <Image src={pickedImg} alt="Image Selected by user" fill />
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          name={name}
          accept="image/png image/jpeg"
          ref={inputRef}
          onChange={handleImageChange}
          required
        />
        <button className={classes.button} type="button" onClick={handleClick}>
          Pick An Image
        </button>
      </div>
    </div>
  );
};

export default ImagePicker;
