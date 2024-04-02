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

    return (
        <div className="bg-gray-100 h-screen md:mt-14 mt-0 md:ml-[12rem]">
            <div className='flex flex-col items-center pt-6'>
                <div className="flex flex-col w-3/4 shadow-xl">
                    <div className="bg-white p-2 rounded-t-2xl text-xl text-left pl-4 border-b border-gray-300">New Post</div>
                   
                    {/*inner grid of card */}
                    <div className="bg-white p-2 flex-1">
                        <div className='flex flex-col gap-3 p-3'>
                            <div className="border-2 border-gray-300 rounded-xl p-2.5 text-left">
                                
                            {/* Title and caption inside grid cell*/}
                                <div className="flex flex-col">
                                    <label className="ml-1 text-sm">Title</label>
                                    <input type="text"
                                        className="block w-full bg-neutral-100 border-gray-300 rounded-[5px] p-2 mt-1 mb-3 focus:outline-none focus:border-purple-500"
                                        placeholder="Enter Post Title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                    <label className="ml-1 text-sm">Caption</label>
                                    <textarea
                                        className="w-full resize-y bg-neutral-100 border-gray-300 rounded-[5px] p-2 mt-1 focus:outline-none focus:border-purple-500"
                                        placeholder="Enter Caption"
                                        value={caption}
                                        onChange={(e) => setCaption(e.target.value)}
                                    />
                                </div>
                            </div>
                            


                            {/* add images card */}


                            <div className="border-2 border-gray-300 rounded-xl p-2 text-left">
                                <label className="ml-1 text-sm">Add Images</label>
                                <div className="flex flex-wrap justify-start items-center h-auto">
                                    {images.map((imageUrl, index) => (
                                        <div
                                            key={index}
                                            className="relative m-1.5 border rounded-xl text-center bg-cover bg-center"
                                            style={{
                                                backgroundImage: `url(${imageUrl})`,
                                                width: 'calc(33% - 12px)',
                                                paddingBottom: 'calc(33% - 12px)',
                                            }}
                                        >
                                            <button
                                                className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
                                                onClick={() => handleRemoveImage(index)}
                                                style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                                            >
                                                <Trash2 className="text-white" />
                                            </button>
                                        </div>
                                    ))}
                                    {images.length < 4 && (
                                        <button
                                            className="m-1.5 border border-gray-300 rounded-xl text-center flex justify-center items-center"
                                            onClick={() => document.getElementById("imageUpload").click()}
                                            style={{ width: 'calc(33% - 12px)', height: 'calc(33% - 12px)' , minWidth: '100px', minHeight: '100px' }}
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

                            <div className="border-2 border-gray-300 rounded-xl p-2 text-left">Fitness Data</div>
                        </div>
                    </div>
                    <div className="bg-white p-2 rounded-b-2xl ">
                        <button className="bg-gradient-to-br from-purple-500 to-pink-500 w-full text-white rounded-[10px] p-2">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}




