import {useLocation } from "react-router-dom";
import {UserContext} from "../../context/userContext.jsx";
import {useContext} from "react";
import FeedCard from '../components/FeedCard';
import React, { useState, useEffect } from 'react'; 
import {Link, NavLink} from 'react-router-dom'
import '../Landing.css';
import axios from "axios";
import {Bookmark, Flame, User, Users} from 'lucide-react';
import ProfilePic from "../assets/profilePic.png";

export default function LandingPage() {
    const [postType, setPostType] = useState('Following');
    const [posts, setPosts] = useState([]);
    const [postData, setPostData] = useState([]);
    const [allPost, setAllPostData] = useState([]);
    const [savedWorkout, setSavedWorkout] = useState([]);
    const [role, setRole] = useState('');
    const [myPost, setMyPosts] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [dict, setDict] = useState({});
    const [followingList, setFollow] = useState([]);
    const [searchList, setSearchList] = useState([])
    const [myID, setMyID] = useState('');



    async function getMyID(){
        try {
            const myIDResponse = await axios.get('/landing/getMyID', {}, { withCredentials: true });
            const myID = myIDResponse.data;

            if (myID.error) {
                console.log(myID.error);
            } else {
                setMyID(myID);
            }

        } catch (error) {
            console.error('Error Getting Data', error);
        }
    }


    async function handleFollow(trainerUsername){
      console.log("searching this: ", trainerUsername);
      console.log("searching From: ", followingList);
        try {
            if (followingList.includes(trainerUsername)) {
                //console.log("following already");
                await axios.put(`/landing/removeFollow/${trainerUsername}`);
                setFollow(followingList.filter(id => id !== trainerUsername));

                //setSavedWorkout(savedWorkout.filter(id => id !== _id));
            } else {
                //console.log("not following yet");
                await axios.put(`/landing/addFollow/${trainerUsername}`);
                setFollow([...followingList, trainerUsername]);
            }
        } catch (error) {
            console.error('Error Getting Data', error);
        }
        //window.location.reload();
    }

    useEffect(() => {
        getFollower();
        getMyPosts();
        getTrainerDict();
        getMyID();
    }, []);


    useEffect(() => {
        getFollower();
    }, []);

    async function getTrainerDict(){
        try {

            const userResponse = await axios.get('/landing/getTrainerDict/', {}, { withCredentials: true });
            const userData = await userResponse.data;
            if (userData.error) {
                console.log(userData.error);
                return null;
            } else {
                const dict = {};
                userData.forEach(user => {
                    dict[user._id] = user.username;
                });
                console.log("Search possiblities",dict)
                setDict(dict);
            }

        } catch (error) {
            console.error('Error Getting Username', error);
        }
    }

    async function returnResults(partialString) {
        try {
            console.log("DICt_array", dict);

            console.log("Follwrs:", followingList);
            const results = [];
            for (const key in dict) {
                if (Object.hasOwnProperty.call(dict, key)) {
                    const word = dict[key];
                    const isFollowing = followingList.includes(key)
                    if (word.includes(partialString)) {
                        results.push([key,word,isFollowing]);
                    }
                }
            }
            console.log("resu: ", results)
            return results;
        } catch (error) {
            console.error('Error returning results:', error);
            return [];
        }
    }

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
                setFollow(followingData.following_list);
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
    const toggleDropdown = () => {

      setShowDropdown(!showDropdown);
    };

    const searchUsers = (user) => {
        returnResults(user).then((data) => setSearchList(data))
    }

    return (
      <div className={"min-h-screen"} style={{ backgroundColor: 'whitesmoke', paddingBottom: '100px' }}>

          <div className="flex justify-center content-center items-center mb-4 mt-0 sm:mt-14 gap-2">
              <button
                  onClick={() => {
                      setPostType('Following');
                      getFollower();
                  }}

                  className={`hover:outline hover:outline-purple-500 rounded-b-xl ${postType === "Following" ? "bg-gray-200 text-purple-600" : ""}`}
              >
                  <div
                      className={`flex justify-center content-center items-center rounded-lg p-3 pt-1 flex-col sm:flex-row`}>
                      <Users/>
                      <div>Following</div>
                  </div>
              </button>
              <button
                  onClick={() => {
                      setPostType('Trending');
                      getFollower();
                  }}
                  className={`hover:outline hover:outline-purple-500 rounded-b-xl ${postType === "Trending" ? "bg-gray-200 text-purple-600" : ""}`}
              >
                  <div
                      className={`flex justify-center content-center items-center rounded-lg p-3 pt-1 flex-col sm:flex-row`}>
                      <Flame/>
                      <div>Trending</div>
                  </div>
              </button>

              <button
                  onClick={() => {
                      getFollower();
                      setPostType('Saved');

                  }}
                  className={`hover:outline hover:outline-purple-500 rounded-b-xl ${postType === "Saved" ? "bg-gray-200 text-purple-600" : ""}`}
              >
                  <div
                      className={`flex justify-center content-center items-center rounded-lg p-3 pt-1 flex-col sm:flex-row`}>
                      <Bookmark/>
                      <div>Saved</div>
                  </div>
              </button>

              {role !== 'user' && (
                  <button
                      onClick={() => {
                          getFollower();
                          setPostType('My Posts');
                      }}
                      className={`hover:outline hover:outline-purple-500 rounded-b-xl ${postType === "My Posts" ? "bg-gray-200 text-purple-600" : ""}`}
                  >

                      <div
                          className={`flex justify-center content-center items-center rounded-lg p-3 pt-1 flex-col sm:flex-row`}>
                          <User/>
                          <div>My Posts</div>
                      </div>
                  </button>
              )}

          </div>
        
        <div className={"min-h-screen"}>
        
        <div className="relative" style={{ display: 'flex', justifyContent: 'center', marginBottom:'10px' }}>
          <input type="text" placeholder=" Search .." className={"rounded-xl p-2 w-[30%] focus:outline focus:outline-purple-500"} onChange={(e) => {searchUsers(e.target.value)}}></input>
          <button onClick={toggleDropdown}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                style={{ width: '2em', height: '1.3em', alignItems:'center', marginTop: '2px'}}
                
                >  
                <path
                fill="#8204bd"

                d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                />
              </svg>

          </button>
          {showDropdown && (
            <div className={"flex flex-col absolute bg-gray-300 top-0 mt-10 px-6 rounded-lg"}>
                
                {searchList.map((trainer) => {
                    console.log("trainer thisS: ", trainer[0])
                    
                    
                    if(trainer[0] !== myID){
                        return (
                            <div>
                                {(() => {
                                    if (!trainer[2]) {
                                        return (
                                            <div className={"flex flex-row"}>
                                                <div>
                                                    {trainer[1]}
                                                </div>
                                                <button onClick={() => {
                                                    console.log("Sending this arg 0!: ", trainer[0])
                                                    console.log("Sending this arg 1!: ", trainer[2])
                                                    handleFollow(trainer[0])
                                                }} style={{
                                                    color: '#9045d6',
                                                    fontSize: '11px',
                                                    cursor: 'pointer',
                                                    marginLeft: '10px',
                                                    display: 'flex',
                                                    alignItems: 'center'
                                                }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                                                         style={{width: '2em', height: '1em'}}>
                                                        <path fill="currentColor"
                                                              d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/>
                                                    </svg>
                                                    <div> Follow</div>
                                                </button>
                                            </div>

                                        );

                                    } else {
                                        return (
                                            <div className={"flex flex-row"}>
                                                <div>
                                                    {trainer[1]}
                                                </div>
                                                <button onClick={() => {
                                                    console.log("Sending this arg 0!: ", trainer[0])
                                                    console.log("Sending this arg 1!: ", trainer[2])
                                                    handleFollow(trainer[0]).then()
                                                }} style={{
                                                    color: '#9045d6',
                                                    fontSize: '11px',
                                                    cursor: 'pointer',
                                                    marginLeft: '10px',
                                                    display: 'flex',
                                                    alignItems: 'center'
                                                }}>
                                                    <div><u>Unfollow</u></div>
                                                </button>
                                            </div>
                                        );
                                    }
                                })()}
                            </div>
                        )
                    }
                    else {
                        return (<div></div>)
                    }

                })}
            </div>
          )}

        </div>

            <div className={"flex justify-center items-center"}>

                {role !== 'user' && (
                    <div className="card">
                        <div style={{
                            fontSize: '14px',
                            fontWeight: 'bold',
                            borderBottom: '1px solid #e1e3e6',
                            marginLeft: '5px'
                        }}>Post Something...
                        </div>
                        <div className="flex" style={{alignItems: 'center', justifyContent: 'space-between'}}>
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
            {postData.length > 0 ? (
              postData.map((post, index) => (
                <FeedCard key={index} post={post} style={{ marginBottom: '20px' }} />
              ))
            ) : (
              <div className={"flex justify-center items-center"}>
                <div className="card" style={{display: 'flex'}} >
                    <div style={{ textAlign: 'left', fontSize: "20px", color: '#5c5c5c'}}> No followed users...</div> 

                </div>
                

              </div>
              
            )}
          </div>
        )}

        {postType === 'Trending' && (
          <div style={{ paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {allPost
              .sort((a, b) => b.likes - a.likes) 
              .map((post, index) => (
                <FeedCard key={index} post={post} style={{ marginBottom: '20px' }} />
              ))}
          </div>
        )}

        {postType === 'Saved' && (
            <div style={{ paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {savedWorkout.length > 0 ? (
              savedWorkout.map((post, index) => (
                <FeedCard key={index} post={post} style={{ marginBottom: '20px' }} />
              ))
            ) : (
              <div className={"flex justify-center items-center"}>
                <div className="card" style={{display: 'flex'}} >
                    <div style={{ textAlign: 'left', fontSize: "20px", color: '#5c5c5c'}}> No saved posts...</div> 
                </div>
              </div>
              
            )}
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