import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import React, { useState,useEffect } from 'react'; 
import '../Landing.css';
import axios from 'axios';
import ProfilePic from '../assets/profilePic.png'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const FeedCard = ({ post }) => {
  const { _id, trainerUsername, creationDate, comments, likes, workout_id, description, title, images } = post;
  const [followerList, setFollowerList] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [liked, setLiked] = useState(false);
  const [like, setLikes] = useState(likes);
  const [workoutPlan, setWorkout] = useState([]);
  const [savedWorkout, setSavedWorkout] = useState([]);
  const [myID, setMyID] = useState('');
  const [role, setRole] = useState('');
  const [dict, setDict] = useState({});
  const [pict,setPict] = useState({});
  const navigate = useNavigate();

    
  useEffect(() => {
    console.log(images)
    getFollower();
    getComments();
    getWorkout();
    getSavedWorkout();
    getMyID();
    getDict()
    console.log("here: ")
  }, []);

  useEffect(() => {
    console.log("FEED CARD FOLLOWER LIST from mongo DB:", followerList);  
  }, [followerList]);

  useEffect(() => {
    console.log("FEED CARD COMMENTS:", commentList);  
  }, [commentList]);
  
  useEffect(() => {
    console.log("WORKOUT:", workoutPlan);  
  }, [workoutPlan]);

  useEffect(() => {
    console.log("SAVED POSTS:", savedWorkout);  
  }, [savedWorkout]);


  async function getFollower(){
    try {
      
      const followingResponse = await axios.get('/landing/getFollower', {}, { withCredentials: true });
      
      const followingData = followingResponse.data;

      if (followingData.error) {
        console.log(followingData.error);
      } else {
        setRole(followingData.user_role);
        console.log("ROLE: ", followingData.user_role)
        setFollowerList(followingData.following_list);
      }

    } catch (error) {
      console.error('Error Getting Data', error);
    }
  }

  
  async function getComments() {
    try {
      const commentResponse = await axios.get(`/landing/getComments/${comments.join(',')}`, { withCredentials: true });
  
      const commentData = commentResponse.data;
  
      if (commentData.error) {
        console.log("error her",commentData.error);
      } else {
        setCommentList(commentData);
      }
    } catch (error) {
      console.error('Error Getting Data', error);
    }
  }

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  async function handleLikeClick (){
    
    try {
      setLiked(!liked);
      setLikes(like + 1)
      await axios.put(`/landing/updateLikes/${_id}`);
      console.log('Likes count updated successfully');
    } catch (error) {
      console.error('Error updating likes count:', error);
    }
  };

  async function postComment () {
    if (commentInput) {
      const inputValueLength = commentInput.length;
      console.log('Input value length:', inputValueLength);
      
      try {
        console.log("ID IS THIS: ", _id)
        const response = await axios.post('/landing/postComment', {_id ,description: commentInput}, { withCredentials: true });
        console.log('Comment posted successfully:', response.data);
        setCommentInput('');
        //getComments();
        window.location.reload();

      } catch (error) {
        console.error('Error posting comment:', error);
        setCommentInput('');
      }

    }
  };

  async function getWorkout() {
    try {
      console.log("RESPOSNEW!: ",workout_id);
      const workoutResponse = await axios.get(`/landing/getWorkout/${workout_id.join(',')}`, { withCredentials: true });
      
      console.log("REPOSNE!: ",workoutResponse);
      const workout = workoutResponse.data;
  
      if (workout.error) {
        console.log("error here",workout.error);
      } else {
        //console.log("Received this: ", workout);
        setWorkout(workout);
      }
    } catch (error) {
      console.error('Error Getting Workout Data', error);
    }
  }

  
  const [showImage, setShowImage] = useState(true);

  const handleSwipeLeft = () => {
    setShowImage(true);
  };
  
  const handleSwipeRight = () => {
    setShowImage(false);
  };

  function getTimeDifference(date) {
    const currentDate = new Date();
    const postDate = new Date(date);
    const timeDifference = currentDate - postDate;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    
    if (weeks > 0) {
        return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
        return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }
}
async function getSavedWorkout() {
  try {
    const savedResponse = await axios.get('/landing/getSavedWorkouts', {}, { withCredentials: true });
    
    const savedData = savedResponse.data;

    if (savedData === null || savedData.length === 0) {
      console.log("Saved data is null or empty.");
    } else if (savedData.error) {
      console.log(savedData.error);
    } else {
      setSavedWorkout(savedData.post_id);
      console.log("Saving just ID, " ,savedData.post_id)
    }
  } catch (error) {
    console.error('Error Getting Data', error);
  }
}

async function handleSave(){
  try {
    if (savedWorkout.includes(_id)) {
      //console.log("saved already");
      await axios.put(`/landing/removeSavedWorkout/${_id}`);
      setSavedWorkout(savedWorkout.filter(id => id !== _id));
    } else {
      //console.log("not saved yet");
      await axios.put(`/landing/addSavedWorkout/${_id}`);
      setSavedWorkout([...savedWorkout, _id]);
    }
  } catch (error) {
    console.error('Error Getting Data', error);
  }
  //window.location.reload();
}  

async function handleFollow(){
  try {
    if (followerList.includes(trainerUsername)) {
      //console.log("following already");
      await axios.put(`/landing/removeFollow/${trainerUsername}`);
      setFollowerList(followerList.filter(id => id !== trainerUsername));

      //setSavedWorkout(savedWorkout.filter(id => id !== _id));
    } else {
      //console.log("not following yet");
      await axios.put(`/landing/addFollow/${trainerUsername}`);
      setFollowerList([...followerList, trainerUsername]);
    }
  } catch (error) {
    console.error('Error Getting Data', error);
  }
  //window.location.reload();
}  



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


async function getDict(){
  try {
    
    const userResponse = await axios.get('/landing/getDict/', {}, { withCredentials: true });
    
    const userData = await userResponse.data;
    console.log("Heeeeere",userResponse.data)
    if (userData.error) {
      console.log(userData.error);
      return null;
    } else {
      const dict = {};
      const pict ={};
      userData.forEach(user => {

      if(user.profilepic==undefined){
        pict[user._id] = ProfilePic;
      }
      else{
        pict[user._id] = user.profilepic;
      }
      dict[user._id] = user.username;
      });
      console.log("Yeeeeeeeehooooooooooo",dict)
      setDict(dict);
      setPict(pict);
      //console.log("Dictionary: ", dict)
    }

  } catch (error) {
    console.error('Error Getting Username', error);
  }
}


  return (
    <div className={"flex justify-center items-center"}  >
      <div className="card">
        <div style={{ padding: '5px' }}>
          <div className="top">
            <div className="header">
                <div style={{ display: 'flex', alignItems: 'center'}}>
                    <img src={pict[trainerUsername]} alt={"Profile Pic"} className="actPic"/>
                    <div style={{ padding: '5px' }}>
                      <div style={{ display: 'flex'}}>
                          {trainerUsername === myID ? (
                            <div style={{ fontSize: '14px', fontWeight: 'bold'}}>You</div>
                          ) : (
                            <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{dict[trainerUsername]}</div>
                          )}
                          {(() => {
                            if (!followerList.includes(trainerUsername) && !(myID === trainerUsername)) {
                              return (
                                <button onClick={handleFollow} style={{color: '#9045d6', fontSize: '11px', cursor: 'pointer', marginLeft: '10px', display: 'flex', alignItems: 'center'}}>
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={{ width: '2em', height: '1em'}}>
                                    <path fill="currentColor" d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
                                  </svg>
                                  <div> Follow</div>
                                </button>
                              );

                            } else{
                              if ((myID === trainerUsername)){
                                return (null);
                              }
                              else{
                                return (
                                  <button onClick={handleFollow} style={{color: '#9045d6', fontSize: '11px', cursor: 'pointer', marginLeft: '10px', display: 'flex', alignItems: 'center'}}>
                                    <div><u>Unfollow</u></div>
                                  </button>
                                );

                              }
                              
                            }
                          })()}
 
                         </div>
                    
                      <div style={{ color: '#999', fontSize: '11px' }}>{getTimeDifference(creationDate)}</div>
                    </div>
                </div>
                

                
                {(role === 'admin'|| trainerUsername === myID) && (
                // Brooklyn's page connects to this button
                <div>
                  <button 
                    style={{ border: '1px solid #ad54ef', borderRadius: '10px', padding: '5px'}}
                    onClick={() => { 
                      console.log("pot", post)
                      navigate('/post', { state:{editPost : post}});
                    }}
                  
                  >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        style={{ width: '1.5em', height: '1em', verticalAlign: '-.125em', paddingRight: '3px', fill: '#ad54ef'}}
                        >
                        <path
                        d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
                        />
                    </svg>
                  </button>
                </div>
              )}
                
            </div>
            <div style={{ fontSize: '14px', paddingBottom: '5px' }}>{description}</div>
          </div>

        
    <div>      
      {showImage? (
        // IMAGE FRAME
        <div style={{ position: 'relative' }}>
          <div className="image">
            <img src={images} alt="Post" className="iDimensions"/>
            <button
                onClick={handleSwipeRight}
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '0',
                  fontSize: '20px',
                  cursor: 'pointer',
                  color: 'white',
                  borderRadius: '50%',
                  width: '30px',
                  height: '30px',
                  backgroundColor: 'rgba(173, 84, 239, 0.6)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                &#8594;
              </button>
          
          </div>

        </div>
        
      ) : (
        // WORKOUT FRAME
        <div style={{ position: 'relative' }}>
          <div className="image">
            <div className="title">{title}</div>
            {console.log("Values: ", workoutPlan)}
            {workoutPlan.map((exercise, index) => (
              <div key={index} className="exerciseRow">
                <div><b>{exercise.name}</b></div>
                <div>Reps: {exercise.reps}</div>
                <div>Sets: {exercise.sets}</div>
                <div>Weight: {exercise.resistance} {exercise.resMeasure}</div>
              </div>
            ))}
              </div>
              <button
                onClick={handleSwipeLeft}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '0',
                  fontSize: '20px',
                  cursor: 'pointer',
                  color: 'white',
                  borderRadius: '50%',
                  width: '30px',
                  height: '30px',
                  backgroundColor: 'rgba(173, 84, 239, 0.6)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                &#8592;
              </button>
            </div>
      )}

      <div style={{ textAlign: 'center' }}>
      </div>
    </div>
          
          
          <div className="flex" style={{ paddingTop: '10px', paddingBottom: '10px' }}>
            <button onClick={toggleComments}>
              <div className="reaction">
                <FontAwesomeIcon icon={faComment} className="fa-regular" size="lg" style={{ color: '#5c5c5c' }} /> {commentList.length} Comments
              </div>
            </button>
            
            <button onClick={handleLikeClick}>
              <div className="reaction" style={{ paddingLeft: '10px'}}>
                <FontAwesomeIcon icon={faHeart} className="fa-regular" size="lg" style={{ color: liked ? '#e749a1' : '#5c5c5c' }}/> {like} Likes
              </div>
            </button>
            <button onClick={handleSave}>
              <div className="reaction" style={{ paddingLeft: '10px', display: 'flex', alignItems:'center'}}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    style={{ width: '2em', height: '1.2em', verticalAlign: '-.125em', paddingRight: '3px', fill: savedWorkout.includes(_id) ? '#e749a1' : '#5c5c5c'}}
                    >
                    <path
                    d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z"
                    />
                </svg>
                {savedWorkout.includes(_id) ? 'Unsave' : 'Save'}
              </div>
            </button>
            
          </div>
        
          {showComments && (
          <div className="comment">
            {commentList.map((comment, index) => (
              <div className="commentCard" key={index}>
                  {comment.username === myID ? (
                      <div style={{ fontSize: '10px', color: '#3d3d3d', fontWeight: 'bold'}}>You</div>
                  ) : (
                      <div style={{ fontSize: '10px', color: '#3d3d3d', fontWeight: 'bold'}}>{dict[comment.username]}</div>
                  )}
                  <div style={{ fontSize: '12px' }}>{comment.description}</div>
              </div>
            ))}
          </div>
          )}

          <div className="flex" style={{ paddingTop: '15px', borderTop: '1px solid #e1e3e6' }}>
            <img src={pict[myID]} className="my_pic"/>
            <div className="write_comment">
              <input type="text" placeholder=" Write a comment..." style={{ width: '100%', backgroundColor: '#f2f2f2', borderRadius: '20px', padding: '5px', fontSize: '12px' }} maxLength={100} value={commentInput} onChange={(e) => setCommentInput(e.target.value)}/>
            </div>
            <div className="icon-button" style={{ color: '#ad54ef' }}>
            <button className="postComment" onClick={postComment}>
                <FontAwesomeIcon icon={faPaperPlane} className="fa-regular" size="lg" />
            </button>
              
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FeedCard;