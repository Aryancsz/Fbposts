import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const KEY = "IH3SKtYJbMZp4IQ2N1tEZMbvBcVAyVDf";

const Message = () => {
  const dispatch = useDispatch();
  const [tog, setTog] = useState(false);
  let drower = "";

  let loadGif;
  const searchGif = async () => {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    await axios
      .get("https://api.giphy.com/v1/gifs/trending", {
        params: {
          limit: 5,
          api_key: KEY,
        },
        headers,
      })
      .then((response) => {
        dispatch({ type: "RESULTS", payload: response.data.data });
      });
  };
  useEffect(() => {
    searchGif();
  }, []);

  const { results } = useSelector((state) => state.gifReducer);

  console.log(results);
  const openDrow = () => {
    tog ? setTog(false) : setTog(true);
  };
  let gifJsx = results.map((el) => {
    console.log(el.embed_url);
    return (
      <div key={el.id}>
        <div>
          <img
            src={el.embed_url}
            alt={el.id}
            className='w-80 h-80'
            type='image'
          />
        </div>
      </div>
    );
  });

  drower = (
    <div className='> state.resultsbg-gray-200 ml-10 border-2 border-gray-400 w-1/4'>
      <input
        type='text'
        autoFocus
        placeholder='Search a Gif across apps'
        className='m-2   bg-gray-200 outline-none border-gray-300 border-2'
      />
      <div>{gifJsx}</div>
    </div>
  );

  return (
    <div>
      <div>
        <div>
          <div className='grid grid-flow-col p-2 bg-gray-100 border-b-2 border-gray-300'>
            <div className='px-2 font-semibold'>
              <i className='fas fa-pen px-2'></i>Compose Post
            </div>
            <div className='px-2 border-l-2 border-gray-300 text-indigo-500 font-semibold'>
              <i className='far fa-images px-2 text-black'></i>Photo/video Album
            </div>
            <div className='px-2 border-l-2 border-gray-300 text-indigo-500 font-semibold'>
              <i className='fas fa-video px-2 text-black'></i>Live Video
            </div>
            <div className='col-end-13'>
              <i className='fas fa-times text-gray-400'></i>
            </div>
          </div>
          <div className='flex m-3'>
            <img
              className='rounded-full ml-2 h-10 w-11'
              src='https://www.marismith.com/wp-content/uploads/2014/07/facebook-profile-blank-face.jpeg'
              alt='fbprof'
            />
            <input type='text' className='w-full  outline-none ml-3' />
          </div>
        </div>
        <div className='grid grid-flow-col grid-cols-2 grid-rows-2'>
          <div className='m-1 p-1 rounded-2xl hover:bg-gray-100 cursor-pointer'>
            <i className='fas fa-user-tag mr-2 text-blue-400'></i>
            Tag friends
          </div>
          <div
            onClick={openDrow}
            className='m-1 p-1 rounded-2xl hover:bg-gray-100 cursor-pointer'
          >
            <i className='fas fa-image mr-2 text-gray-500 '></i>
            GIF
          </div>
          <div className='m-1 p-1 rounded-2xl hover:bg-gray-100 cursor-pointer'>
            <i className='fas fa-map-marker-alt mr-2 text-pink-500'></i>
            Check in
          </div>
          <div className='m-1 p-1 rounded-2xl hover:bg-gray-100 cursor-pointer'>
            <i className='fas fa-calendar-alt mr-2 text-pink-500'></i>
            Tag Event
          </div>
        </div>
        {<div>{tog ? drower : null}</div>}
      </div>
    </div>
  );
};

export default Message;
