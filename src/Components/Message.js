import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const KEY = process.env.REACT_APP_GIPHY_KEY;

const Message = () => {
  // for redux reducers to send data
  const dispatch = useDispatch();

  // text value to search for a div
  const [postTextValue, setPostTextValue] = useState("");

  // afetr selecting a gif to post store its url to send it to redux store
  const [insetGifUrl, setInsetGifUrl] = useState("");

  // to show or hide open and close the gif popup, works as a toggle switch
  const [tog, setTog] = useState(false);

  // to store a keyword for searching a gif via API
  const [searchTerm, setSearchTerm] = useState("trending");

  // Searching a GIF using Axios package for its simplicity
  const searchGif = async () => {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    await axios
      .get(`https://api.giphy.com/v1/gifs/${searchTerm}`, {
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

  // Use Effect used to featch data initially 1 time when page loads to make a default trending gifs call. and only run when  function inside called and render page.
  useEffect(() => {
    searchGif();
    // below comment is for disabling warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // loading data from redux store destructuring results from it
  const { results } = useSelector((state) => state.gifReducer);

  // to open or close gif popup
  const openDrow = () => {
    tog ? setTog(false) : setTog(true);
  };

  // this function close the popup after selecting gif and store its url url state defined above to ultimatly pass it to store
  const addImage = (e) => {
    tog ? setTog(false) : setTog(true);
    const clickedGif = results.filter((id) => id.id === e.target.classList[0]);
    setInsetGifUrl(clickedGif[0].images.original.url);
  };

  // the text field to write something to post is storing in a state hook
  const userInputText = (e) => {
    setPostTextValue(e.target.value);
  };

  // after typing on search field push the text to state so it can trigger API call
  const userSearched = (e) => {
    setSearchTerm(`search?q=${e.target.value}`);
  };

  // making less requests if user types below 7miliseconds to save API calls requests and reduce trafic/data
  useEffect(() => {
    // Throttling search optimization
    const timeId = setTimeout(() => {
      searchGif();
    }, 700);
    return () => {
      // clearing timer key press
      clearTimeout(timeId);
    };
    // below comment is for disabling warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  // once post button is pressed storing the gif information and message body text in redux store
  // and auto clearing the mes and gif field for next post
  const makeAPost = () => {
    if (postTextValue || insetGifUrl) {
      dispatch({
        type: "ALL_POSTS_GIF",
        payload: { insetGifUrl, postTextValue },
      });
    }
    setTog(false);
    setPostTextValue("");
    setInsetGifUrl("");
  };

  // a small helping jsx component to insert jsx in the gif popup menu
  let gifJsx = results.map((el) => {
    return (
      <div key={el.id}>
        <div className='m-1'>
          <img
            onClick={addImage}
            src={el.images.downsized.url}
            alt={el.id}
            className={`${el.id} w-80 h-80 `}
            type='image'
          />
        </div>
      </div>
    );
  });
  //
  //
  // craeting jsx to make a popup to clicking Gif button
  let drower = "";
  drower = (
    <div className='overflow-hidden'>
      <div className=' ml-10 h-96 border-2 bg-white border-gray-400 w-80 overflow-y-scroll rounded'>
        <input
          type='text'
          autoFocus
          placeholder='Search a Gif across apps'
          className='m-2 outline-none border-gray-300 border-2 w-72 px-2'
          onChange={userSearched}
        />
        <div>{gifJsx}</div>
      </div>
    </div>
  );

  // accessing the store for user selected gif and text to display
  const storePosts = useSelector((state) => state.allPostsReducer);
  // destructuring
  const { PostList } = storePosts;
  //
  //
  // craeting jsx to render posts that user has clicked to post

  const renderPosts = PostList.slice(0)
    .reverse()
    .map((el, ind) => {
      return (
        <div
          key={ind}
          className='m-10 rounded p-4 bg-white w-1/2 '
          id='shadow4141'
        >
          <div className=' flex relative'>
            <img
              className='rounded-full ml-2 h-10 w-11'
              src='https://www.marismith.com/wp-content/uploads/2014/07/facebook-profile-blank-face.jpeg'
              alt='fbprofilepic'
            />
            <div>
              <span className='ml-3 h-5 font-semibold'> Username</span>
              <span className='ml-2 h-5 text-gray-500'>
                has updated a post.
              </span>
            </div>
            <div className='absolute ml-16 mt-5 text-sm'>
              1min ago • <i className='fas fa-cog text-gray-500 ml-1'></i>
            </div>
          </div>
          <div className='ml-20 mb-3'>{el.postTextValue}</div>
          <div className='flex items-center justify-center'>
            <div className='px-2 bg-black w-1/2'>
              {el.insetGifUrl ? (
                <img
                  src={el.insetGifUrl}
                  alt='giphy'
                  className='block ml-auto mr-auto'
                />
              ) : null}
            </div>
          </div>
        </div>
      );
    });

  //  main body of components starts here
  return (
    <div className='bg-white'>
      <div className='bg-gray-100'>
        <div className='bg-white'>
          <div>
            <div className='grid grid-flow-col p-2 bg-gray-100 border-b-2 border-r-2 border-gray-300'>
              <div className='px-2 font-semibold'>
                <i className='fas fa-pen px-2'></i>Compose Post
              </div>
              <div className='px-2 border-l-2 border-gray-300 text-indigo-500 font-semibold'>
                <i className='far fa-images px-2 text-black'></i>Photo/video
                Album
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
              <input
                type='text'
                placeholder='Write something here... ಇಲ್ಲಿ ಏನನ್ನಾದರೂ ಬರೆಯಿರಿ...'
                className='w-full  outline-none ml-3 h-12'
                onChange={userInputText}
                value={postTextValue}
              />
            </div>
            <div>
              {!insetGifUrl ? null : (
                <div className='flex justify-center'>
                  <img
                    src={insetGifUrl}
                    type='image'
                    className='w-96 h-96'
                    alt='giphy'
                  />
                </div>
              )}
            </div>
          </div>
          <div className='grid grid-flow-col grid-cols-2 grid-rows-2'>
            <div className='m-1 px-3 p-1 rounded-2xl bg-gray-100 hover:bg-gray-200 cursor-pointer'>
              <i className='fas fa-user-tag mr-2 text-blue-400'></i>
              Tag friends
            </div>
            <div
              onClick={openDrow}
              className='m-1 px-3 p-1 rounded-2xl bg-gray-100 hover:bg-gray-200 cursor-pointer'
            >
              <i className='fas fa-image mr-2 text-gray-500 '></i>
              GIF
            </div>
            <div className='m-1 px-3 p-1 rounded-2xl bg-gray-100 hover:bg-gray-200 cursor-pointer'>
              <i className='fas fa-map-marker-alt mr-2 text-pink-500'></i>
              Check in
            </div>
            <div className='m-1 px-3 p-1 rounded-2xl bg-gray-100 hover:bg-gray-200 cursor-pointer'>
              <i className='fas fa-calendar-alt mr-2 text-pink-500'></i>
              Tag Event
            </div>
          </div>
          {<div className='absolute z-20'>{tog ? drower : null}</div>}
          <div className='bg-gray-200 border-t-2 border-gray-300 p-2 flex flex-row-reverse'>
            <div
              onClick={makeAPost}
              className='  bg-blue-600 text-center text-white font-bold rounded px-4 mx-2 cursor-pointer'
            >
              Post
            </div>
            <div className=''>
              <div className='border-2 text-center border-gray-400 px-3 rounded cursor-not-allowed font-semibold'>
                <span className='pr-2'>
                  <i className='fas fa-lock text-gray-600'></i>
                </span>
                Only me
                <span className='pl-1'>
                  <i className='fas fa-caret-down text-gray-600'></i>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col items-center'>{renderPosts}</div>
      </div>
    </div>
  );
};

export default Message;
