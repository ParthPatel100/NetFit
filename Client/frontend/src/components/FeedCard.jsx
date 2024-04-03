import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import React, { useState } from 'react'; 
import '../Landing.css';

const FeedCard = ({ post }) => {
  const { name, date, comments, likes, type, content } = post;
  return (
    <div className={"flex justify-center items-center"}>
      <div className="card">
        <div style={{ padding: '5px' }}>
          <div className="top">
            <div className="header">
                <div style={{ display: 'flex', alignItems: 'center'}}>
                    <div className="profile_pic"></div>
                    <div style={{ padding: '5px' }}>
                      <div style={{ display: 'flex'}}>
                          <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{name}</div>
                          <button style={{color: '#9045d6',fontSize: '11px',cursor: 'pointer', marginLeft: '10px', display: 'flex', alignItems: 'center'}}><svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          style={{ width: '2em', height: '1em'}}
                          >
                          <path
                          fill="currentColor"
                          d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
                          />
                          </svg><div> Follow</div></button>
                      </div>
                      <div style={{ color: '#999', fontSize: '11px' }}>{date}</div>
                    </div>
                </div>
  
                <div style={{padding: 'none'}}>
                  ...
                </div>
            </div>
            <div style={{ fontSize: '14px', paddingBottom: '5px' }}>{content}</div>
          </div>

          

          {/* <div className="image">
            <img src="/assets/post1.png" alt="Post"></img>
          </div> */}
          
          <div className="flex" style={{ paddingTop: '10px', paddingBottom: '10px' }}>
            <div className="reaction">
              <FontAwesomeIcon icon={faComment} className="fa-regular" size="lg" /> {comments} Comments
            </div>
            <div className="reaction" style={{ paddingLeft: '10px' }}>
              <FontAwesomeIcon icon={faHeart} className="fa-regular" size="lg" /> {likes} Likes
            </div>
          </div>

          <div className="flex" style={{ paddingTop: '15px', borderTop: '1px solid #e1e3e6' }}>
            <div className="my_pic"></div>
            <div className="write_comment">
              <input type="text" placeholder=" Write a comment..." style={{ width: '100%', backgroundColor: '#f2f2f2', borderRadius: '20px', padding: '5px', fontSize: '12px' }} />
            </div>
            <div className="icon-button" style={{ color: '#575757' }}>
              <FontAwesomeIcon icon={faPaperPlane} className="fa-regular" size="lg" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FeedCard;