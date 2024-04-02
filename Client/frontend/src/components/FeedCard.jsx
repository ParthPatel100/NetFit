import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import '../Landing.css';

const FeedCard = ({ post }) => {
  const { name, date, comments, likes, type, content } = post;

  return (
    <div className={"flex justify-center items-center"}>
      <div className="card">
        <div style={{ padding: '5px' }}>
          <div className="top">
            <div className="header">
                <div className="profile_pic"></div>
                <div style={{ padding: '5px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{name}</div>
                  <div style={{ color: '#999', fontSize: '11px' }}>{date}</div>
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