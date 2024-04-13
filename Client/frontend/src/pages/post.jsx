import {UserContext} from "../../context/userContext.jsx";
import React, {useState, useEffect} from "react";
import {useContext} from "react";
import {Trash2, ChevronLeft, Pencil, CirclePlus} from "lucide-react";
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';


export default function PostPage(){
    const { user } = useContext(UserContext)
    const navigate = useNavigate();
    console.log(user)

    //image handling
    const [title, setTitle] = useState();
    const [caption, setCaption] = useState('');
    const [images, setImages] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);
    const [showEditPostInputs, setShowEditPostInputs] = useState(false);
    const [showPostInputs, setPostInputs] = useState(true);


    const location = useLocation();

    
    

    useEffect(() => {


        const {editPost} = location.state
        console.log("Edit :", editPost);
        if(editPost){
            setTitle(editPost.title)
            setCaption(editPost.description)


            // setImages(editPost.images)
            
        }

    }, []);


  
    const handleImageUpload = (imageDataUrl) => {
      setImages((prevImages) => [...prevImages, imageDataUrl]);
    };
  
    const handleRemoveImage = (index) => {
      setImages((prevImages) => prevImages.filter((_, i) => i !== index));
      setImageFiles((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const handleInputChange = (e) => {
        const selectedImage = e.target.files[0];

        
        //add image file
        setImageFiles((prevImages) => [...prevImages, selectedImage]);

        const reader = new FileReader();
        reader.onload = () => {
          const imageDataUrl = reader.result;
          handleImageUpload(imageDataUrl);
        };
        reader.readAsDataURL(selectedImage);
    };


    const getWorkoutID = async (workoutData) => {
        try{
            const responseWorkout = await axios.post("/post/postWorkout", workoutData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return responseWorkout.data._id;
        }catch (error) {
            console.error("Error workout:", error);
            // Handle error (e.g., show error message to user)
        }
    }

    

    
    const handleSubmitPost = async () => {
        try {

            const promises = submittedWorkoutData.map(async (workout) => {

                console.log(workout.name);
                const workoutData = {
                    date: workout.date,
                    name: workout.name,
                    reps: workout.reps,
                    sets: workout.sets,
                    resistance: workout.resistance,
                    ResMeasure: workout.resMeasure,
                    duration: workout.duration,


                }

                const workoutID = await getWorkoutID(workoutData);

                return workoutID;

            });

            const workoutIDs = await Promise.all(promises);

            console.log("Workout IDs:", workoutIDs);


            const formData = new FormData();
            formData.append("title", title);
            formData.append("caption", caption);
            formData.append("date", new Date());
            workoutIDs.forEach((workoutId) => {
                formData.append("workoutId", workoutId);
            });


            var i;
            for(i=0; i < imageFiles.length; i++){
                formData.append('image', imageFiles[i]);
            }

            //formData.append("workoutId", workoutId)

            const response = await axios.post("/post/uploadPost", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("Post submitted successfully:", response.data, imageFiles[i]);
            //window.open('/landing');
            navigate('/landing');
            
        } catch (error) {
            console.error("Error posting:", error);
            // Handle error (e.g., show error message to user)
        }
    };

    //workout input
    const [showWorkoutInputs, setShowWorkoutInputs] = useState(false);
    const [name, setName] = useState("");
    const [reps, setReps] = useState("");
    const [sets, setSets] = useState("");
    const [resistance, setResistance] = useState("");
    const [resMeasure, setResMeasure] = useState("");
    const [duration, setDuration] = useState("");
    const [calories, setCalories] = useState("");
    const [submittedWorkoutData, setSubmittedWorkoutData] = useState([]);
    const [workoutId, setWorkoutId] = useState([]);

    const handleWorkoutButtonClick = () => {
        setShowWorkoutInputs(!showWorkoutInputs);
    };


    const handleWorkoutSubmit = () => {

        const currDate = new Date();
        const newWorkoutData = {
            date: currDate,
            name: name,
            reps: reps,
            sets: sets,
            resistance: resistance,
            resMeasure: resMeasure,
            duration: duration,
        };

        setSubmittedWorkoutData([...submittedWorkoutData, newWorkoutData]);


        // Clear input fields
        setName("");
        setReps("");
        setSets("");
        setResistance("");
        setResMeasure("");
        setDuration("");

        // Close the input fields
        setShowWorkoutInputs(false);
    };

    const handleWorkoutEdit = (index) => {
        // Create a copy of the submittedWorkoutData array without the item to edit
        const updatedWorkoutData = submittedWorkoutData.filter((_, idx) => idx !== index);

        // Set the state with the values of the selected workout item
        setName(submittedWorkoutData[index].wname);
        setReps(submittedWorkoutData[index].reps);
        setSets(submittedWorkoutData[index].sets);
        setResistance(submittedWorkoutData[index].resistance);
        setResMeasure(submittedWorkoutData[index].resMeasure);
        setDuration(submittedWorkoutData[index].duration);

        // Set the showInputs state to true to display the input fields for editing
        setShowWorkoutInputs(true);

        // Update the submittedWorkoutData array without the deleted item
        setSubmittedWorkoutData(updatedWorkoutData);
    };

    const handleWorkoutDelete = (index) => {
        const updatedWorkoutData = submittedWorkoutData.filter((_, idx) => idx !== index);
        setSubmittedWorkoutData(updatedWorkoutData);
    };

    return (
        <div className="bg-gray-100 h-screen md:mt-14 mt-0 md:ml-[12rem]">
            
                <button className=" text-sm bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-[10px] p-2 ml-3 mt-3 justify-center"
                    onClick={() => {navigate('/landing')}}
                >
                    <div className="flex flex-row items-center justify-start">
                        <ChevronLeft className="text-white" />
                        <span className="">Back</span>
                    </div>
                </button>
            
            <div className='flex flex-col items-center pt-6'>
                
                {showPostInputs && (
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
                    
                                            className="hidden"
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div className="border-2 border-gray-300 rounded-xl p-2 text-left">
                                    <div className="flex flex-row text-md md:text-lg mb-2 justify-between">
                                        <div className="text-l font-bold">Workout Data</div>
                                        <button className="focus:outline-none" onClick={handleWorkoutButtonClick}>
                                            <CirclePlus style={{ color: '#a855f7', cursor: 'pointer' }} />
                                        </button>
                                    </div>
                                    {showWorkoutInputs && (
                                        <div className="flex-1 md:flex-col border-t border-gray-300 justify-between">
                                            <div className="flex flex-wrap">

                                                <p className="text-xs md:text-sm mt-3">Enter Workout Data</p>
                                                <div className="flex md:flex-row flex-col text-sm justify-around w-full">
                                                    <input
                                                        type="text"
                                                        placeholder="Workout Name"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="Reps"
                                                        value={reps}
                                                        onChange={(e) => setReps(e.target.value)}
                                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                                    />
                                                </div>
                                                <div className="flex md:flex-row flex-col text-sm justify-around w-full">
                                                    <input
                                                        type="text"
                                                        placeholder="Sets"
                                                        value={sets}
                                                        onChange={(e) => setSets(e.target.value)}
                                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="Resistance"
                                                        value={resistance}
                                                        onChange={(e) => setResistance(e.target.value)}
                                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                                    />
                                                </div>
                                                <div className="flex md:flex-row flex-col text-sm justify-around w-full">
                                                    <input
                                                        type="text"
                                                        placeholder="Resistance Measure (lb/kg)"
                                                        value={resMeasure}
                                                        onChange={(e) => setResMeasure(e.target.value)}
                                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="Duration (min)"
                                                        value={duration}
                                                        onChange={(e) => setDuration(e.target.value)}
                                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                                    />
                                                </div>
                                                <div className="flex lg:flex-row justify-center w-full gap-4">
                                                    <button
                                                        className="bg-gradient-to-tr from-purple-500 to-pink-500 hover:bg-purple-700 text-white text-sm font-bold py-1 px-4 rounded-lg mt-4 justify-center"
                                                        onClick={handleWorkoutSubmit}
                                                    >
                                                        Add
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Display Submitted Workouts */}
                                    {submittedWorkoutData.length > 0 && (
                                        <div className="ml-1 mr-1 mt-5">
                                            <div className="flex flex-wrap border-t border-gray-300">
                                                {submittedWorkoutData.map((workout, index) => (
                                                    <div key={index} className="w-full flex justify-between border-t border-gray-300">
                                                        <div className="flex mt-2 items-center">
                                                            {/* Edit Button */}
                                                            <button
                                                                className="focus:outline-none mr-2"
                                                                onClick={() => handleWorkoutEdit(index)}
                                                                style={{ color: '#000', transition: 'color 0.3s' }}
                                                            >
                                                                <Pencil
                                                                    style={{ color: '#000', cursor: 'pointer' }}
                                                                    onMouseEnter={(e) => {
                                                                        e.target.style.color = '#a855f7';
                                                                    }}
                                                                    onMouseLeave={(e) => {
                                                                        e.target.style.color = '#000';
                                                                    }}
                                                                />
                                                            </button>
                                                            <p className="mr-1 mb-2 text-xs md:text-sm font-semibold">{workout.name}</p>
                                                        </div>
                                                        <div className="flex text-xs md:text-sm mt-2 mb-2 items-center">
                                                            {workout.reps && (
                                                                <p className="ml-1">
                                                                    <span className="font-semibold">{workout.reps}</span> Reps
                                                                </p>
                                                            )}
                                                            {workout.sets && (
                                                                <p className="ml-1">
                                                                    <span className="font-semibold">{workout.sets}</span> Sets
                                                                </p>
                                                            )}
                                                            {workout.resistance && workout.resMeasure && (
                                                                <p className="ml-1">
                                                                    <span className="font-semibold">{workout.resistance}{workout.resMeasure}</span> Resistance
                                                                </p>
                                                            )}
                                                            {workout.duration && (
                                                                <p className="ml-1">  
                                                                    <span className="font-semibold"> {workout.duration}</span> min Duration
                                                                </p>
                                                            )}
                                                            {/* Delete Button */}
                                                            <button
                                                                className="focus:outline-none ml-2"
                                                                onClick={() => handleWorkoutDelete(index)}
                                                                style={{ color: '#000', transition: 'color 0.3s' }}
                                                            >
                                                                <Trash2
                                                                    style={{ color: '#000', cursor: 'pointer' }}
                                                                    onMouseEnter={(e) => {
                                                                        e.target.style.color = '#a855f7';
                                                                    }}
                                                                    onMouseLeave={(e) => {
                                                                        e.target.style.color = '#000';
                                                                    }}
                                                                />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end bg-white p-2 rounded-b-2xl ">
                            <button className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-[10px] p-2 px-6"
                            onClick={handleSubmitPost}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                )}

                {showEditPostInputs && (
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
                    
                                            className="hidden"
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div className="border-2 border-gray-300 rounded-xl p-2 text-left">
                                    <div className="flex flex-row text-md md:text-lg mb-2 justify-between">
                                        <div className="text-l font-bold">Workout Data</div>
                                        <button className="focus:outline-none" onClick={handleWorkoutButtonClick}>
                                            <CirclePlus style={{ color: '#a855f7', cursor: 'pointer' }} />
                                        </button>
                                    </div>
                                    {showWorkoutInputs && (
                                        <div className="flex-1 md:flex-col border-t border-gray-300 justify-between">
                                            <div className="flex flex-wrap">

                                                <p className="text-xs md:text-sm mt-3">Enter Workout Data</p>
                                                <div className="flex md:flex-row flex-col text-sm justify-around w-full">
                                                    <input
                                                        type="text"
                                                        placeholder="Workout Name"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="Reps"
                                                        value={reps}
                                                        onChange={(e) => setReps(e.target.value)}
                                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                                    />
                                                </div>
                                                <div className="flex md:flex-row flex-col text-sm justify-around w-full">
                                                    <input
                                                        type="text"
                                                        placeholder="Sets"
                                                        value={sets}
                                                        onChange={(e) => setSets(e.target.value)}
                                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="Resistance"
                                                        value={resistance}
                                                        onChange={(e) => setResistance(e.target.value)}
                                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                                    />
                                                </div>
                                                <div className="flex md:flex-row flex-col text-sm justify-around w-full">
                                                    <input
                                                        type="text"
                                                        placeholder="Resistance Measure (lb/kg)"
                                                        value={resMeasure}
                                                        onChange={(e) => setResMeasure(e.target.value)}
                                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="Duration (min)"
                                                        value={duration}
                                                        onChange={(e) => setDuration(e.target.value)}
                                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                                    />
                                                </div>
                                                <div className="flex lg:flex-row justify-center w-full gap-4">
                                                    <button
                                                        className="bg-gradient-to-tr from-purple-500 to-pink-500 hover:bg-purple-700 text-white text-sm font-bold py-1 px-4 rounded-lg mt-4 justify-center"
                                                        onClick={handleWorkoutSubmit}
                                                    >
                                                        Add
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Display Submitted Workouts */}
                                    {submittedWorkoutData.length > 0 && (
                                        <div className="ml-1 mr-1 mt-5">
                                            <div className="flex flex-wrap border-t border-gray-300">
                                                {submittedWorkoutData.map((workout, index) => (
                                                    <div key={index} className="w-full flex justify-between border-t border-gray-300">
                                                        <div className="flex mt-2 items-center">
                                                            {/* Edit Button */}
                                                            <button
                                                                className="focus:outline-none mr-2"
                                                                onClick={() => handleWorkoutEdit(index)}
                                                                style={{ color: '#000', transition: 'color 0.3s' }}
                                                            >
                                                                <Pencil
                                                                    style={{ color: '#000', cursor: 'pointer' }}
                                                                    onMouseEnter={(e) => {
                                                                        e.target.style.color = '#a855f7';
                                                                    }}
                                                                    onMouseLeave={(e) => {
                                                                        e.target.style.color = '#000';
                                                                    }}
                                                                />
                                                            </button>
                                                            <p className="mr-1 mb-2 text-xs md:text-sm font-semibold">{workout.name}</p>
                                                        </div>
                                                        <div className="flex text-xs md:text-sm mt-2 mb-2 items-center">
                                                            {workout.reps && (
                                                                <p className="ml-1">
                                                                    <span className="font-semibold">{workout.reps}</span> Reps
                                                                </p>
                                                            )}
                                                            {workout.sets && (
                                                                <p className="ml-1">
                                                                    <span className="font-semibold">{workout.sets}</span> Sets
                                                                </p>
                                                            )}
                                                            {workout.resistance && workout.resMeasure && (
                                                                <p className="ml-1">
                                                                    <span className="font-semibold">{workout.resistance}{workout.resMeasure}</span> Resistance
                                                                </p>
                                                            )}
                                                            {workout.duration && (
                                                                <p className="ml-1">  
                                                                    <span className="font-semibold"> {workout.duration}</span> min Duration
                                                                </p>
                                                            )}
                                                            {/* Delete Button */}
                                                            <button
                                                                className="focus:outline-none ml-2"
                                                                onClick={() => handleWorkoutDelete(index)}
                                                                style={{ color: '#000', transition: 'color 0.3s' }}
                                                            >
                                                                <Trash2
                                                                    style={{ color: '#000', cursor: 'pointer' }}
                                                                    onMouseEnter={(e) => {
                                                                        e.target.style.color = '#a855f7';
                                                                    }}
                                                                    onMouseLeave={(e) => {
                                                                        e.target.style.color = '#000';
                                                                    }}
                                                                />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end bg-white p-2 rounded-b-2xl ">
                            <button className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-[10px] p-2 px-6"
                            onClick={handleSubmitPost}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                )}



            </div>
        </div>
    )
}




