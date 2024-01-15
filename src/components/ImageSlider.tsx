import React, { useState, useEffect } from 'react'
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs'
import '../App.css';


type ImageSliderProps = {
  url: string,
  limit: string,
  page: string
}
 

function ImageSlider({ url, limit = '5', page = '1' }: ImageSliderProps) {

  const [images, setImages] = useState([]);
  const [current_slide, setCurrentSlide] = useState<number>(0);
  const [errMsg, setErrMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  function handlePrev() {
    setCurrentSlide(current_slide === 0 ? images.length - 1 : current_slide - 1);
  }

  function handleNext() {
    setCurrentSlide(current_slide == images.length - 1 ? 0 : current_slide + 1);
  }

  async function fetchUrl(url: string) {

    try {
      setIsLoading(true);
      const response = await fetch(`${url}?page=${page}&limit=${limit}`);
      const data = await response.json();

      if (data) {
        setImages(data);
        setIsLoading(false);
      }

    }

    catch (e) {
      setErrMsg(e);
      setIsLoading(false);
    }


  }


  useEffect(() => {

    if (url !== '') {
      fetchUrl(url);
    }
  }, [url])


  console.log(images);

  if (isLoading) {
    return <div>
      Loading images , please wait
    </div>
  } 

  
  return (
    <div className='container'>
      <BsArrowLeftCircleFill onClick={handlePrev} className="arrow arrow-left" />

      {images && images.length ? (
        images.map((imageItem,index) => (
          <img
          key={imageItem.id}
          src={imageItem.download_url}
          alt={imageItem.download_url}
          className={current_slide == index ? "current-image" : "current-image hide-current-image"}
          />
          
        ))
      ) : (
        null
      )}

      <BsArrowRightCircleFill onClick={handleNext} className="arrow arrow-right" />

      <span className='circle-indicators'>

        {images && images.length ? images.map((item, index) => (
          <button key={index}
          className={current_slide === index ? "current-indicator" : "current-indicator inactive-indicator"}
          onClick={()=> setCurrentSlide(index)}
          ></button>
        )) : null}


      </span>


    </div>
  );

}

export default ImageSlider;



