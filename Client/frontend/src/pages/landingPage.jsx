import {useLocation } from "react-router-dom";
import {UserContext} from "../../context/userContext.jsx";
import {useContext} from "react";
import FeedCard from '../components/FeedCard';
import React, { useState } from 'react'; 
import {Link, NavLink} from 'react-router-dom'
import '../Landing.css';




export default function LandingPage() {
    const [postType, setPostType] = useState('Following');
  
    const postData = [
        {
          name: 'John Doe',
          date: 'April 1, 2024',
          comments: 10,
          likes: 20,
          type: ['Trending', 'Following'],
          content: 'Completed a 5-mile run today! 🏃‍♂️ Feeling amazing and energized! #running #fitnessgoals'
        },
        {
          name: 'Jane Smith',
          date: 'April 2, 2024',
          comments: 8,
          likes: 15,
          type: ['Following'],
          content: 'Just finished an intense HIIT workout! 💪 My heart rate was through the roof, but it feels so good! #HIIT #workout'
        },
        {
          name: 'David Johnson',
          date: 'April 3, 2024',
          comments: 12,
          likes: 25,
          type: ['Saved'],
          content: 'Great day at the gym today! Hit new PRs on bench press and squats! 🏋️‍♂️ Feeling strong and motivated! #gym #strengthtraining'
        },
        {
          name: 'Emily Brown',
          date: 'April 4, 2024',
          comments: 5,
          likes: 18,
          type: ['Trending'],
          content: 'Just completed my first marathon! 🏅 It was tough, but crossing that finish line made it all worth it! #marathon #achievement'
        },
        {
          name: 'Michael Clark',
          date: 'April 5, 2024',
          comments: 15,
          likes: 30,
          type: ['Following'],
          content: 'Started my journey to a healthier lifestyle today with a nutritious breakfast and a morning yoga session! 🧘‍♂️ Feeling refreshed and ready to conquer the day! #healthyliving #yoga'
        },
        {
          name: 'Sarah Adams',
          date: 'April 6, 2024',
          comments: 20,
          likes: 40,
          type: ['Trending', 'Following'],
          content: 'Embarked on a hiking adventure with friends and explored breathtaking trails and scenic vistas! 🏞️ Nature truly is the best therapy! #hiking #adventure'
        }
      ];
  
    return (
      <div style={{ backgroundColor: 'whitesmoke' }}>
        <div className="page" style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <button
            onClick={() => setPostType('Following')}
            style={{
              padding: '10px 20px',
              marginRight: '10px',
              backgroundColor: postType === 'Following' ? '#ededed' : 'transparent',
              color: postType === 'Following' ? '#8b5cf6' : 'gray',
              outline: 'none',
              borderRadius: '5px',
              boxSizing: 'border-box'
            }}
            onMouseOver={(e) => {
              e.target.style.outline = '2px solid transparent';
              e.target.style.outlineColor = '#8b5cf6';
              e.target.style.boxShadow = '2xl';
            }}
            onMouseOut={(e) => {
              e.target.style.outline = 'none';
              e.target.style.borderRadius = '5px';
              e.target.style.boxShadow = 'none';
              e.target.style.transform = 'none';
            }}
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
            onClick={() => setPostType('Trending')}
            style={{
              padding: '10px 20px',
              marginRight: '10px',
              backgroundColor: postType === 'Trending' ? '#ededed' : 'transparent',
              color: postType === 'Trending' ? '#8b5cf6' : 'gray',
              border: 'none',
              outline: 'none',
              borderRadius: '5px',
            }}
            onMouseOver={(e) => {
              e.target.style.outline = '2px solid transparent';
              e.target.style.outlineOffset = '2px';
              e.target.style.outlineColor = '#8b5cf6';
              e.target.style.boxShadow = '2xl';
  
            }}
            onMouseOut={(e) => {
              e.target.style.outline = 'none';
              e.target.style.borderRadius = '5px';
              e.target.style.boxShadow = 'none';
              e.target.style.transform = 'none';
            }}
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
            onClick={() => setPostType('Saved')}
            style={{
              padding: '10px 20px',
              backgroundColor: postType === 'Saved' ? '#ededed' : 'transparent',
              color: postType === 'Saved' ? '#8b5cf6' : 'gray',
              border: 'none',
              outline: 'none',
              borderRadius: '5px',
            }}
            onMouseOver={(e) => {
              e.target.style.outline = '2px solid transparent';
              e.target.style.outlineOffset = '2px';
              e.target.style.outlineColor = '#8b5cf6';
  
            }}
            onMouseOut={(e) => {
              e.target.style.outline = 'none';
              e.target.style.borderRadius = '5px';
              e.target.style.boxShadow = 'none';
              e.target.style.transform = 'none';
            }}
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
          
        </div>
        
        <div className={"flex justify-center items-center"}>
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
        </div>
        <div style={{ paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {postData.map((post, index) => {
                if (post.type.includes(postType)) {
                return <FeedCard key={index} post={post} style={{ marginBottom: '20px' }} />;
                }
                return null;
            })}
        </div>
      </div>
    );
  }