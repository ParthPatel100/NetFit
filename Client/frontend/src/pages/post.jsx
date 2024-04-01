import {useLocation } from "react-router-dom";
import {UserContext} from "../../context/userContext.jsx";
import React, {useState} from "react";
import {useContext} from "react";
import {Trash2} from "lucide-react";
import axios from 'axios';

{/* 
const getImageBufferFromUrl = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const buffer = await new Response(blob).arrayBuffer();
      return buffer;
    } catch (error) {
      console.error('Error fetching image:', error);
      throw new Error('Error fetching image');
    }
};
*/}

export default function PostPage(){
    const { user } = useContext(UserContext)
    console.log(user)


    
    //image handling
    const [title, setTitle] = useState();
    const [caption, setCaption] = useState('');
    const [images, setImages] = useState([]);
  
    const handleImageUpload = (imageDataUrl) => {
      setImages((prevImages) => [...prevImages, imageDataUrl]);
    };
  
    const handleRemoveImage = (index) => {
      setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const handleInputChange = (e) => {
        const selectedImage = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
          const imageDataUrl = reader.result;
          handleImageUpload(imageDataUrl);
        };
        reader.readAsDataURL(selectedImage);
    };

    {/*
    const handleSubmitPost = async () => {
        try {

            const imageBuffers = await Promise.all(
                images.map(async (imageUrl) => {
                    const imageBuffer = await getImageBufferFromUrl(imageUrl);
                    return imageBuffer;
                })
            );

            const postData = {
                title,
                caption,
                images: imageBuffers,
                userId: user._id, // Use user._id as the userId for the post
            };


            const response = await axios.post('/posts', postData);
            console.log('Post submitted successfully:', response.data);
        } catch (error) {
            console.error('Error posting:', error);
            // Handle error (e.g., show error message to user)
        }
    };

    */}

    return(

        <div className="bg-gray-100 h-screen">
            {/* */}
            {/*Card */}
            <div className='grid'>
                <div className="flex-1 grid grid-rows-12 text-center ml-60 mr-10 mt-20 shadow-xl">
                    <div className="bg-white p-2 rounded-t-2xl text-xl text-left pl-4 border-b border-gray-300 border-opacity-70">New Post</div>
                    <div className="bg-white p-2 row-span-10">
                            {/*inner grid of card */}
                            <div className='grid'>
                                <div className="flex-1 grid grid-rows-10 grid-child gap-3 text-center ">
                                    <div className="border-2 border-gray-300 border-opacity-70 rounded-xl row-span-5 ml-3 mr-3 mt-2 p-2.5 text-left">
                                        {/* Title and caption inside grid cell*/}
                                        <div className={"flex flex-col"}>
                                            <p className="ml-1 text-left text-sm">Title</p>
                                            <input type="title"
                                                rows = "2"
                                                className={"block w-full border-[1px] bg-neutral-100 border-gray-300 rounded-[5px] p-2 mt-1 mb-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-xs"}
                                                placeholder={"Enter Post Title"}
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}>
                                            </input>
                                            <p className="ml-1.5 text-left text-sm">Caption</p>
                                            <textarea
                                                className={"w-full resize-y border-[1px] bg-neutral-100 border-gray-300 rounded-[5px] p-2 mt-1 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-xs"}
                                                style={{ boxSizing: "border-box" }}
                                                placeholder={"Enter Caption Title"}
                                                value={caption}
                                                onChange={(e) => setCaption(e.target.value)}>
                                            </textarea>
                                        </div>
                        
                                    </div>
                                    {/* add images card */}
                                    <div className="border-2 border-gray-300 border-opacity-70 p-2 rounded-xl row-span-4 ml-3 mr-3 text-left pl-4">
                                        <p className="ml-1.5 text-left text-sm">Add Images</p>
                                        <div className="flex h-5/6">
                                        {images.map((imageUrl, index) => (
                                            <div
                                            key={index}
                                            className="relative w-1/3 m-1.5 border border-gray-300 rounded-xl text-center"
                                            style={{ 
                                                backgroundImage: `url(${imageUrl})`,
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                            }}
                                            >
                                            <button
                                                className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-300"
                                                onClick={() => handleRemoveImage(index)}
                                            >
                                                <Trash2 
                                                
                                                    style={{color: "#fff" }}
                                                
                                                />
                                            </button>
                                            </div>
                                        ))}
                                        {images.length < 6 && (
                                            <button
                                            className="w-1/3 m-1.5 border border-gray-300 rounded-xl text-center"
                                            onClick={() => document.getElementById("imageUpload").click()}
                                            >
                                            +
                                            </button>
                                        )}
                                        <input
                                            id="imageUpload"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleInputChange}
                                        />
                                        </div>
                                    </div>
                                    
                                    {/* fitness card*/}
                                    <div className="border-2 border-gray-300 border-opacity-70 p-2 rounded-xl row-span-1 ml-3 mr-3 text-left pl-4">Fitness Data</div>
                                </div>
                            </div>
                        </div>
                    
                    <div className="bg-white p-2 rounded-b-2xl ">
                        <button
                            className="bg-gradient-to-br from-purple-500 to-pink-500 w-full text-white border-gray-500 rounded-[10px] p-2 mr-15 ml-15 mt-1"
                        >

                        </button>
                        
                    </div>
                </div>
            </div>
        </div>
        
    )
}




