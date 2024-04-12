import {useLocation } from "react-router-dom";
import {UserContext} from "../../context/userContext.jsx";
import {useContext} from "react";
import FeedCard from '../components/FeedCard';
import React, { useState, useEffect } from 'react'; 
import {Link, NavLink} from 'react-router-dom'
import '../Landing.css';
import axios from "axios";




export default function LandingPage() {
    const [postType, setPostType] = useState('Following');
    const [posts, setPosts] = useState([]);
    const [postData, setPostData] = useState([]);
    const [allPost, setAllPostData] = useState([]);
    const [savedWorkout, setSavedWorkout] = useState([]);
    const [role, setRole] = useState('');
    const [myPost, setMyPosts] = useState([]);
    

    
    useEffect(() => {
      getFollower();
      getMyPosts();
      }, []);
    
    async function getFollower(){
      let followingList = [];
      let savedList = [];

      try {
        const followingResponse = await axios.get('/landing/getFollower', {}, { withCredentials: true });
        const allPostsResponse = await axios.get('/landing/getFollowingPosts', {}, { withCredentials: true });
        const savedResponse = await axios.get('/landing/getSavedWorkouts', {}, { withCredentials: true });
        

        const followingData = followingResponse.data;
        const allPostData = allPostsResponse.data;
        const savedData = savedResponse.data;

        if (followingData.error) {
          console.log(followingData.error);
        } else {
          followingList =  followingData.following_list;
          setRole(followingData.user_role);
        }
        if (savedData.error) {
          console.log(savedData.error);
        } else {
          savedList =  savedData.post_id;
        }

        if (allPostData.error) {
          console.log(allPostData.error);
        } else {
          setAllPostData(allPostData);
          const filteredPosts = allPostData.filter(post => followingList.includes(post.trainerUsername));
          setPostData(filteredPosts);

          const savedPosts = allPostData.filter(post => savedList.includes(post._id));
          setSavedWorkout(savedPosts);

        }
      } catch (error) {
        console.error('Error Getting Data', error);
      }
    }  

    async function getMyPosts(){
      try {
        const myPostsResponse = await axios.get('/landing/getMyPosts', {}, { withCredentials: true });
        const myPosts = myPostsResponse.data;

        if (myPosts.error) {
          console.log(myPosts.error);
        } else {
          console.log("THESE ARE MY POSTS", myPosts);
          setMyPosts(myPosts);
        }

      } catch (error) {
        console.error('Error Getting Data', error);
      }
    }  

    

    


    return (
      <div style={{ backgroundColor: 'whitesmoke', paddingBottom: '100px' }}>
        <div className="page" style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <button
            onClick={() => {
              setPostType('Following');
              getFollower();
            }}
            
            style={{
              padding: '10px 20px',
              marginRight: '10px',
              backgroundColor: postType === 'Following' ? '#ededed' : 'transparent',
              color: postType === 'Following' ? '#8b5cf6' : 'gray',
              borderRadius: '5px',
              boxSizing: 'border-box'
            }}
              className={"hover:outline hover:outline-purple-500"}

          >
          <div style={{ display: 'flex', alignItems: 'center'}}>
          <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              style={{ width: '0.9em', height: '1em', verticalAlign: '-.125em', paddingRight: '3px'}}
              >
              <path
              fill="currentColor"
              d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"
              />
            </svg><div>Following</div>

            </div>
          </button>
          <button
            onClick={() => {
              setPostType('Trending');
              getFollower();
            }}
            style={{
              padding: '10px 20px',
              marginRight: '10px',
              backgroundColor: postType === 'Trending' ? '#ededed' : 'transparent',
              color: postType === 'Trending' ? '#8b5cf6' : 'gray',
              border: 'none',
              borderRadius: '5px',
            }}
            className={"hover:outline hover:outline-purple-500"}
          >
            <div style={{ display: 'flex', alignItems: 'center'}}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                style={{ width: '1em', height: '1em', verticalAlign: '-.125em', paddingRight: '3px'}}
                >
                <path
                fill="currentColor"
                d="M159.3 5.4c7.8-7.3 19.9-7.2 27.7 .1c27.6 25.9 53.5 53.8 77.7 84c11-14.4 23.5-30.1 37-42.9c7.9-7.4 20.1-7.4 28 .1c34.6 33 63.9 76.6 84.5 118c20.3 40.8 33.8 82.5 33.8 111.9C448 404.2 348.2 512 224 512C98.4 512 0 404.1 0 276.5c0-38.4 17.8-85.3 45.4-131.7C73.3 97.7 112.7 48.6 159.3 5.4zM225.7 416c25.3 0 47.7-7 68.8-21c42.1-29.4 53.4-88.2 28.1-134.4c-4.5-9-16-9.6-22.5-2l-25.2 29.3c-6.6 7.6-18.5 7.4-24.7-.5c-16.5-21-46-58.5-62.8-79.8c-6.3-8-18.3-8.1-24.7-.1c-33.8 42.5-50.8 69.3-50.8 99.4C112 375.4 162.6 416 225.7 416z"
                />
             </svg><div>Trending</div>

            </div>
          </button>
          <button
            onClick={() => {
              getFollower();
              setPostType('Saved');
      
            }}
            style={{
              padding: '10px 20px',
              backgroundColor: postType === 'Saved' ? '#ededed' : 'transparent',
              color: postType === 'Saved' ? '#8b5cf6' : 'gray',
              border: 'none',
              borderRadius: '5px',
            }}
            className={"hover:outline hover:outline-purple-500"}
          >
            <div style={{ display: 'flex', alignItems: 'center'}}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                style={{ width: '0.9em', height: '1em', verticalAlign: '-.125em', paddingRight: '3px'}}
                >
                <path
                fill="currentColor"
                d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"
                />
            </svg><div>Saved</div>

            </div>
          </button>

        {role !== 'user' && (
            <button
              onClick={() => {
                getFollower();
                setPostType('My Posts');
              }}
              style={{
                padding: '10px 20px',
                backgroundColor: postType === 'My Posts' ? '#ededed' : 'transparent',
                color: postType === 'My Posts' ? '#8b5cf6' : 'gray',
                border: 'none',
                borderRadius: '5px',
              }}
              className={"hover:outline hover:outline-purple-500"}>

              <div style={{ display: 'flex', alignItems: 'center'}}>
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  style={{ width: '0.9em', height: '1em', verticalAlign: '-.125em', paddingRight: '3px'}}
                  >
                  <path
                  fill="currentColor"
                  d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
                  />
              </svg><div>My Posts</div>
              </div>
            </button>
        )}

          
          
        </div>

          <div className={"min-h-screen"}>

        <div className={"flex justify-center items-center"}>
          {role !== 'user' && (
            <div className="card" >
              <div style={{ fontSize: '14px', fontWeight: 'bold', borderBottom: '1px solid #e1e3e6', marginLeft: '5px' }}>Post Something...</div>
              <div className="flex" style={{ alignItems: 'center', justifyContent: 'space-between'}}>
                <div className="flex" style={{marginTop: '5px'}}>
                  <div className="my_pic" style={{ marginLeft: '5px'}}></div>
                  <div style={{ fontSize: '15px', color:'#898b8f', marginLeft: '10px'}}>What's on your mind?</div>
                </div>
                <NavLink to="/post" className={"bg-gradient-to-br from-purple-500 to-pink-500 text-white border-gray-500 rounded-[10px] p-2 mt-2"}>
                      + Create Post 
                </NavLink>
              </div>
            </div>
          )}
        </div>

        {postType === 'Following' && (
          <div style={{ paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {postData.map((post, index) => (
              <FeedCard key={index} post={post} style={{ marginBottom: '20px' }} />
            ))}
          </div>
        )}

        {postType === 'Trending' && (
          <div style={{ paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {allPost
              .sort((a, b) => b.likes - a.likes) // Sort posts based on likes value in descending order
              .map((post, index) => (
                <FeedCard key={index} post={post} style={{ marginBottom: '20px' }} />
              ))}
          </div>
        )}

        {postType === 'Saved' && (
            <div style={{ paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {savedWorkout.map((post, index) => (
                <FeedCard key={index} post={post} style={{ marginBottom: '20px' }} />
              ))}
        </div>
        )}

        {postType === 'My Posts' && (
            <div style={{ paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {myPost.map((post, index) => (
                <FeedCard key={index} post={post} style={{ marginBottom: '20px' }} />
              ))}
        </div>
        )}

          </div>

      </div>
    );
  }