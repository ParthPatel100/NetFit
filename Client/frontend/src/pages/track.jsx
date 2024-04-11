import {useLocation } from "react-router-dom";
import {UserContext} from "../../context/userContext.jsx";
import React, {useState, useEffect} from "react";
import {useContext} from "react";
import {Trash2, CirclePlus, Plus, CookingPot, Apple, Pencil} from "lucide-react";
import axios from 'axios';





export default function Track(){

    

    const [showInputs, setShowInputs] = useState(false);

    const [showSavedRecipes, setShowSavedRecipes] = useState(false);
    const [name, setName] = useState("");
    const [meal, setMeal] = useState("");
    const [amount, setAmount] = useState("");
    const [measurement, setMeasurement] = useState("");
    const [protein, setProtein] = useState("");
    const [carbs, setCarbs] = useState("");
    const [calories, setCalories] = useState("");
    const [fat, setFat] = useState("");
    const [sleep, setSleep] = useState("")
    const [submittedData, setSubmittedData] = useState([
        { name: "Chicken Breast", amount: "100", measurement: "g", protein: "31", carbs: "0", fat: "3.6", calories: "165" },
        { name: "Broccoli", amount: "100", measurement: "cup", protein: "2.8", carbs: "6", fat: "0.4", calories: "34" },
        { name: "Brown Rice", amount: "100", measurement: "g", protein: "2.6", carbs: "23", fat: "0.9", calories: "112" }
    ]);
    const [savedRecipes] = useState([
        { name: "Dairy-Free Protein Pancakes", description: "The Best Dairy-Free Protein Pancakes You've Ever Had.", trainerUsername: "trainerJD", protein: "2.6", carbs: "23", fat: "0.9", calories: "112"},
        { name: "STupid Stupid recipe", description: "ugh description", trainerUsername: "im a trainer", protein: "2.6", carbs: "23", fat: "0.9", calories: "112"},
        { name: "help me name", description: "crying description", trainerUsername: "i cant do a push up", protein: "2.6", carbs: "23", fat: "0.9", calories: "112"},
    ]);



    const handleButtonClick = () => {
        setShowInputs(!showInputs);
        if (showSavedRecipes) {
            setShowSavedRecipes(false);
            setShowInputs(false);
        }
    };

    const toggleFoodButtonClick = () => {
        setShowInputs(true);
        setShowSavedRecipes(false);
    };

    const toggleSavedRecipesClick = () => {
        setShowInputs(false);
        setShowSavedRecipes(true);
    };


    const handleSubmit = () => {
        const newData = {
            
            name,
            meal,
            amount,
            measurement,
            protein,
            carbs,
            calories,
            fat,
        };

        setSubmittedData([...submittedData, newData]);

        // Clear input fields
        setName("");
        setMeal("");
        setAmount("");
        setMeasurement("");
        setProtein("");
        setCarbs("");
        setFat("");
        setCalories("");

        // Close the input fields
        setShowInputs(false);
    };

    

    const handleRecipeClick = (recipe) => {
        const newEntry = {
            name: recipe.name,
            protein: recipe.protein,
            carbs: recipe.carbs,
            fat: recipe.fat,
            calories: recipe.calories,
        };

        setSubmittedData([...submittedData, newEntry]);
    };

    const handleEdit = (index) => {
        // Create a copy of the submittedData array without the item to delete
        const updatedData = submittedData.filter((_, idx) => idx !== index);
    
        // Set the state with the values of the selected food item
        setName(submittedData[index].name);
        setMeal(submittedData[index].meal);
        setAmount(submittedData[index].amount);
        setMeasurement(submittedData[index].measurement);
        setProtein(submittedData[index].protein);
        setCarbs(submittedData[index].carbs);
        setCalories(submittedData[index].calories);
        setFat(submittedData[index].fat);
    
        // Set the showInputs state to true to display the input fields for editing
        setShowInputs(true);
    
        // Update the submittedData array without the deleted item
        setSubmittedData(updatedData);
    };

    const handleDelete = (index) => {
        const updatedData = submittedData.filter((_, idx) => idx !== index);
        setSubmittedData(updatedData);
    };

    const [showWorkoutInputs, setShowWorkoutInputs] = useState(false);
    const [showSavedWorkouts, setShowSavedWorkouts] = useState(false);
    const [showSleepInputs, setShowSleepInputs] = useState(false);
    const [wname, setWName] = useState("");
    const [reps, setReps] = useState("");
    const [sets, setSets] = useState("");
    const [resistance, setResistance] = useState("");
    const [resMeasure, setResMeasure] = useState("");
    const [duration, setDuration] = useState("");
    const [submittedWorkoutData, setSubmittedWorkoutData] = useState([
        { wname: "Push-ups", reps: "10", sets: "3", resistance: "", resMeasure: "", duration: "" },
        { wname: "Squats", reps: "15", sets: "3", resistance: "", resMeasure: "", duration: "" },
        { wname: "Plank", reps: "", sets: "", resistance: "", resMeasure: "", duration: "1" },
    ]);
    const [savedWorkouts] = useState([
        { wname: "Leg Day", description: "A collection of leg workouts", trainerUsername: "trainerJD", reps: "10", sets: "3", resistance: "", resMeasure: "", duration: "" },
        { wname: "Core Workout", description: "Strengthen your core muscles", trainerUsername: "im a trainer", reps: "15", sets: "3", resistance: "", resMeasure: "", duration: "" },
        { wname: "Upper Body Blast", description: "Build upper body strength", trainerUsername: "i cant do a push up", reps: "", sets: "", resistance: "", resMeasure: "", duration: "1" },
    ]);

    const [workoutsForSelectedDate, setWorkoutsForSelectedDate] = useState([]); // New state for storing fetched workouts
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Default to today's date



const fetchWorkoutsForDate = async (selectedDate) => {
    try {
        const response = await axios.get(`/track/workoutsByDate?date=${selectedDate}`, { withCredentials: true });
        if (response.data && Array.isArray(response.data)) {
            // Assuming the backend directly returns an array of workouts for the date
            setWorkoutsForSelectedDate(response.data);
        } else {
            console.log("No workouts found for the selected date");
            setWorkoutsForSelectedDate([]);
        }
    } catch (error) {
        console.error('Failed to fetch workouts:', error);
        setWorkoutsForSelectedDate([]); // Reset or handle errors as appropriate
    }
};
    useEffect(() => {
        if (date) {
            fetchWorkoutsForDate(date);
        }
    }, [date]); // Depend on the date, refetch when it changes

    const handleWorkoutButtonClick = () => {
        setShowWorkoutInputs(!showWorkoutInputs);
        if (showSavedWorkouts) {
            setShowSavedRecipes(false);
            setShowWorkoutInputs(false);
        }
    };

    const toggleWorkoutsClick = () => {
        setShowWorkoutInputs(true);
        setShowSavedWorkouts(false);
    };

    const toggleSavedWorkoutsClick = () => {
        setShowWorkoutInputs(false);
        setShowSavedWorkouts(true);
    };

const handleWorkoutSubmit = async () => {
    const newWorkoutData = {
        date: new Date().toISOString().slice(0, 10), // Assuming YYYY-MM-DD format
        name: wname,
        reps,
        sets,
        resistance,
        resMeasure,
        duration,
        calories: '', // Add input for calories if needed
    };

    try {
        // Replace 'axios' with your HTTP client if different
        const response = await axios.post('/track/workout', newWorkoutData, { withCredentials: true });
        console.log('Workout saved:', response.data);

        // Update local state with the new workout
        setSubmittedWorkoutData([...submittedWorkoutData, response.data]);

    } catch (error) {
        console.error('Error saving workout:', error);
    }

    // Clear input fields and close the inputs
    setWName("");
    setReps("");
    setSets("");
    setResistance("");
    setResMeasure("");
    setDuration("");
    setShowWorkoutInputs(false);
};


    const handleWorkoutClick = (workout) => {
        const newEntry = {
            wname: workout.wname,
            reps: workout.reps,
            sets: workout.sets,
            resistance: workout.resistance,
            resMeasure: workout.resMeasure,
            duration: workout.duration,
        };

        setSubmittedWorkoutData([...submittedWorkoutData, newEntry]);
    };

    const handleWorkoutEdit = (index) => {
        // Create a copy of the submittedWorkoutData array without the item to edit
        const updatedWorkoutData = submittedWorkoutData.filter((_, idx) => idx !== index);

        // Set the state with the values of the selected workout item
        setWName(submittedWorkoutData[index].wname);
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
    
    const [showWeightInputs, setShowWeightInputs] = useState(false);
    const [weightEntries, setWeightEntries] = useState([]);
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('kg'); // Default unit is kilograms
    const [weightImages, setWeightImages] = useState([]);


    const handleWeightSubmit = () => {
        const newEntry = { weight, unit, date };
        setWeightEntries([...weightEntries, newEntry]);

        // Clear input fields
        setWeight('');
        setUnit('kg'); // Reset to default unit
        setDate(new Date().toISOString().split('T')[0]); // Reset to today's date

        // Close the input fields
        setShowWeightInputs(false);
    };

    const handleWeightEdit = (index) => {
        const entryToEdit = weightEntries[index];
        setWeight(entryToEdit.weight);
        setUnit(entryToEdit.unit);
        setDate(entryToEdit.date);

        // Remove the entry from the list
        const newEntries = weightEntries.filter((_, idx) => idx !== index);
        setWeightEntries(newEntries);

        // Show the input fields for editing
        setShowWeightInputs(true);
    };

    const handleWeightDelete = (index) => {
        const newEntries = weightEntries.filter((_, idx) => idx !== index);
        setWeightEntries(newEntries);
    };

    const handleWeightImageUpload = (imageDataUrl) => {
        setWeightImages((prevImages) => [...prevImages, imageDataUrl]);
    };

    // Function to remove an image
    const handleRemoveWeightImage = (index) => {
        setWeightImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    // Function to process selected image
    const handleWeightInputChange = (e) => {
        const selectedImage = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            const imageDataUrl = reader.result;
            handleWeightImageUpload(imageDataUrl);
        };
        reader.readAsDataURL(selectedImage);
    };


    const [showWaterInputs, setShowWaterInputs] = useState(false);
    const [waterAmount, setWaterAmount] = useState("");
    const [sleepAmount, setSleepAmount] = useState("");
    const [waterMeasurement, setWaterMeasurement] = useState("ml"); // Default to milliliters
    const [submittedWaterData, setSubmittedWaterData] = useState([]);
    const [submittedSleepData, setSubmittedSleepData] = useState([]);
   // const [displaySleepData, setDisplaySleepData] = useState([]);
const [editingSleepId, setEditingSleepId] = useState(null);

    // Function to toggle water input form visibility
    const handleWaterButtonClick = () => {
        setShowWaterInputs(!showWaterInputs);
    };

    // Function to handle submission of new water intake entry
    const handleWaterSubmit = () => {
        const newWaterData = {
            amount: waterAmount,
            measurement: waterMeasurement,
        };

        setSubmittedWaterData([...submittedWaterData, newWaterData]);

        // Clear input fields
        setWaterAmount("");
        setWaterMeasurement("ml"); // Reset to default measurement

        // Optionally close the input fields
        setShowWaterInputs(false);
    };

const handleSleepSubmit = async () => {
    if (!sleepAmount) {
        console.error('No sleep amount specified');
        return;
    }

    const newSleepData = {
        
        date: date,
        duration: sleepAmount, 
    };
    const editedSleepData = {
        sleepId: editingSleepId,
        duration: sleepAmount,
    };
    try {

       let response;
        if (editingSleepId) {

           
            response = await axios.put(`/track/sleepEdit/`, editedSleepData, { withCredentials: true });

        console.log('Sleep updated:', response.data);

        } else {
        const response = await axios.post('/track/sleepCreate', newSleepData, { withCredentials: true });
        console.log('Sleep saved:', response.data);
        }
        

        setSubmittedSleepData([...submittedSleepData]);
        setSleepAmount("");
        setEditingSleepId(null); 
        setShowSleepInputs(false);
    } catch (error) {
        console.error('Error saving sleep data:', error);
    }
};



useEffect(() => {
    const fetchSleepData = async () => {
        console.log("potato")
        try {
            const response = await axios.get('/track/sleepGet', { withCredentials: true }); 
            setSubmittedSleepData(response.data);
        } catch (error) {
            console.error('Error fetching sleep data:', error);
        }
    };

    fetchSleepData();
}, [sleepAmount]); 
    

const handleSleepButtonClick = () => {
        setShowSleepInputs(!showSleepInputs);
    };

    // Function to handle editing of an existing water intake entry
    const handleWaterEdit = (index) => {
        const waterEntryToEdit = submittedWaterData[index];
        setWaterAmount(waterEntryToEdit.amount);
        setWaterMeasurement(waterEntryToEdit.measurement);

        // Remove the entry from the list
        const newWaterData = submittedWaterData.filter((_, idx) => idx !== index);
        setSubmittedWaterData(newWaterData);

        
        setShowWaterInputs(true);
    };

const handleSleepEdit = (index) => {
    const sleepEntryToEdit = submittedSleepData[index];
    setSleepAmount(String(sleepEntryToEdit.duration)); 

    
    setEditingSleepId(sleepEntryToEdit._id);

    
    setShowSleepInputs(true);
};

    // Function to handle deletion of a water intake entry
    const handleWaterDelete = (index) => {
        const newWaterData = submittedWaterData.filter((_, idx) => idx !== index);
        setSubmittedWaterData(newWaterData);
    };
const handleSleepDelete = async (index) => {
    const sleepEntryToDelete = submittedSleepData[index];
    try {
        await axios.delete('/track/sleepDelete', { data: { date: sleepEntryToDelete.date } }, { withCredentials: true }); 
        const newSleepData = submittedSleepData.filter((_, idx) => idx !== index);
        setSubmittedSleepData(newSleepData);
    } catch (error) {
        console.error('Error deleting sleep data:', error);
    }
};
    return(
        <div className="bg-gray-100 md:ml-[12rem] md:mt-14 p-4 h-screen">
            <div className=" flex justify-end mb-2.5">
                <input
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className=" bg-gray-100 border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"


                />
            </div>
            <div className="flex flex-col lg:flex-col gap-4">
                {/* Food  */}
                <div className="bg-white p-4 rounded-md">

                    <div className="flex flex-row text-md md:text-lg mb-2 justify-between">
                        <div className="text-l font-bold">
                            Food
                        </div>

                        <button
                            className="focus:outline-none"
                            onClick={handleButtonClick}
                        >
                            <CirclePlus
                                style={{color: '#a855f7', cursor: 'pointer'}}
                            />
                        </button>


                        {/* Add your food tracking components here */}

                    </div>
                    {showInputs && (
                        <div className="flex-1 md:flex-col border-t border-gray-300 justify-between">
                            <div className="flex flex-wrap">

                                <div className="flex flex-row justify-center w-full gap-3">
                                    <button
                                        className={`focus:outline-none ${
                                            !showSavedRecipes ? "border-b-2 border-purple-500" : ""
                                        }`}
                                        onClick={toggleFoodButtonClick}
                                    >Add Food
                                    </button>
                                    <button
                                        className={`focus:outline-none ${
                                            showSavedRecipes ? "border-b-2 border-purple-500" : ""
                                        }`}
                                        onClick={toggleSavedRecipesClick}
                                    >Saved Recipes
                                    </button>
                                </div>

                                <p className="text-xs md:text-sm mt-3">Enter Nutritional Data</p>
                                <div className="flex md:flex-row flex-col text-sm justify-around w-full ">

                                    <input
                                        type="text"
                                        placeholder="Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Meal Type"
                                        value={meal}
                                        onChange={(e) => setMeal(e.target.value)}
                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                    />
                                </div>

                                <div className="flex md:flex-row flex-col text-sm justify-around w-full ">
                                    <input
                                        type="text"
                                        placeholder="Measurement"
                                        value={measurement}
                                        onChange={(e) => setMeasurement(e.target.value)}
                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Amount"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                    />
                                </div>

                                <p className="text-sm mt-3">Calories and Macronutrients</p>

                                <div className="flex md:flex-row flex-col text-sm justify-around w-full">
                                    <input
                                        type="text"
                                        placeholder="Calories"
                                        value={calories}
                                        onChange={(e) => setCalories(e.target.value)}
                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Protein"
                                        value={protein}
                                        onChange={(e) => setProtein(e.target.value)}
                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                    />
                                </div>

                                <div className="flex md:flex-row flex-col text-sm justify-around w-full">
                                    <input
                                        type="text"
                                        placeholder="Total Carbohydrates"
                                        value={carbs}
                                        onChange={(e) => setCarbs(e.target.value)}
                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Fat"
                                        value={fat}
                                        onChange={(e) => setFat(e.target.value)}
                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                    />
                                </div>

                                <p className="text-sm mt-3">Micronutrients</p>


                                <div className="flex md:flex-row flex-col text-sm justify-around w-full m-1 md:m-2">
                                    <input
                                        type="text"
                                        placeholder="Sugar"

                                        className="border-b-2 border-gray-300 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Fibre"

                                        className="border-b-2 border-gray-300 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                    />
                                </div>

                                <div className="flex md:flex-row flex-col text-sm justify-around w-full ">
                                    <input
                                        type="text"
                                        placeholder="Saturated Fat"
                                        
                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Trans Fat"
                                        
                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                    />
                                </div>

                                <div className="flex md:flex-row flex-col text-sm justify-around w-full ">
                                    <input
                                        type="text"
                                        placeholder="Sodium"
                                        
                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Cholesterol"
                                        
                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                    />
                                </div>

                                <div className="flex md:flex-row flex-col text-sm justify-around w-full ">
                                    <input
                                        type="text"
                                        placeholder="Iron"
                                        
                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Potassium"
                                        
                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                    />
                                </div>

                                <div className="flex md:flex-row flex-col text-sm justify-around w-full ">
                                    <input
                                        type="text"
                                        placeholder="Vitamin A"
                                        
                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Vitamin C"
                                        
                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                    />
                                </div>

                                <div className="flex md:flex-row flex-col text-sm justify-around w-full">
                                    <input
                                        type="text"
                                        placeholder="Calcium"
                                        
                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Vitamin D"
                                        
                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                    />
                                </div>

                                <div className="flex md:flex-row flex-col text-sm justify-around w-full">
                                    <input
                                        type="text"
                                        placeholder="Vitamin B6"

                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Vitamin B12"

                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                    />
                                </div>

                                <div className="flex lg:flex-row justify-center w-full gap-4">
                                    <button
                                        className="bg-gradient-to-tr from-purple-500 to-pink-500 hover:bg-purple-700 text-white text-sm font-bold py-1 px-4 rounded-lg mt-4 justify-center"
                                        onClick={handleSubmit}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Display Saved Recipes Section */}
                    {showSavedRecipes && (
                        <div className="flex flex-col border-2 rounded-lg border-gray-300">
                            <div className="flex flex-wrap">
                                <div className="flex flex-row justify-center w-full text-xs md:text-sm mb-2 gap-4">
                                    <button
                                        className={`focus:outline-none ${
                                            !showSavedRecipes ? "border-b-2 border-purple-500" : ""
                                        }`}
                                        onClick={toggleFoodButtonClick}
                                    >
                                        Add Food
                                    </button>
                                    <button
                                        className={`focus:outline-none ${
                                            showSavedRecipes ? "border-b-2 border-purple-500" : ""
                                        }`}
                                        onClick={toggleSavedRecipesClick}
                                    >
                                        Saved Recipes
                                    </button>
                                </div>
                                {savedRecipes.map((recipe, index) => (
                                    <div
                                        key={index}
                                        className="w-full flex justify-center rounded-md mb-2 cursor-pointer"
                                        onClick={() => handleRecipeClick(recipe)}
                                        style={{ transition: "background-color 0.3s ease" }}
                                        onMouseEnter={(e) => {
                                            e.target.style.backgroundColor = "purple";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.backgroundColor = "white";
                                        }}
                                    >
                                        <div className="flex mt-2 items-center gap-2 text-xs md:text-sm mb-2 font-semibold">
                                            {recipe.trainerUsername}- {recipe.name}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Display Submitted Data */}
                    {submittedData.length > 0 && (
                        <div className=" ml-1 mr-1 mt-5">
                            <div className="flex flex-wrap border-t border-gray-300">
                                {submittedData.map((data, index) => (
                                    <div key={index} className="w-full flex justify-between border-t border-gray-300">
                                        <div className="flex mt-2 items-center">
                                            {/* Edit Button */}
                                            <button
                                                className="focus:outline-none mr-2"
                                                onClick={() => handleEdit(index)}
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
                                            <p className="mr-1 mb-2 text-xs md:text-sm font-semibold">{data.name}</p>
                                            <p className="text-xs mb-2">- {data.amount}</p>
                                            <p className="text-xs mb-2">{data.measurement}</p>
                                        </div>
                                        <div className="flex text-xs md:text-sm mt-2 mb-2 items-center">
                                            <p className="ml-1">
                                                <span className="font-semibold">{data.protein}g</span> Protein
                                            </p>
                                            <p className="ml-1">
                                                <span className="font-semibold">{data.carbs}g</span> Carbs
                                            </p>
                                            <p className="ml-1">
                                                <span className="font-semibold">{data.fat}g</span> Fat
                                            </p>
                                            <p className="ml-1">
                                                <span className="font-semibold">{data.calories}</span> Cals
                                            </p>
                                            {/* Delete Button */}
                                            <button
                                                className="focus:outline-none ml-2"
                                                onClick={() => handleDelete(index)}
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

                {/* Workout  */}
                <div className="bg-white p-4 rounded-md">
                    <div className="flex flex-row text-md md:text-lg mb-2 justify-between">
                        <div className="text-l font-bold">Workouts</div>
                        <button className="focus:outline-none" onClick={handleWorkoutButtonClick}>
                            <CirclePlus style={{ color: '#a855f7', cursor: 'pointer' }} />
                        </button>
                    </div>
                    {showWorkoutInputs && (
                        <div className="flex-1 md:flex-col border-t border-gray-300 justify-between">
                            <div className="flex flex-wrap">

                                <div className="flex flex-row justify-center w-full gap-3">
                                    <button
                                        className={`focus:outline-none ${
                                            !showSavedWorkouts ? "border-b-2 border-purple-500" : ""
                                        }`}
                                        onClick={toggleWorkoutsClick}
                                    >Add Workout</button>
                                    <button
                                        className={`focus:outline-none ${
                                            showSavedWorkouts ? "border-b-2 border-purple-500" : ""
                                        }`}
                                        onClick={toggleSavedWorkoutsClick}
                                    >Saved Workouts</button>
                                </div>


                                <p className="text-xs md:text-sm mt-3">Enter Workout Data</p>
                                <div className="flex md:flex-row flex-col text-sm justify-around w-full">
                                    <input
                                        type="text"
                                        placeholder="Workout Name"
                                        value={wname}
                                        onChange={(e) => setWName(e.target.value)}
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
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Display Saved Workouts Section */}
                    {showSavedWorkouts && (
                        <div className="flex flex-col border-2 rounded-lg border-gray-300">
                            <div className="flex flex-wrap">
                                <div className="flex flex-row justify-center w-full text-xs md:text-sm mb-2 gap-4">
                                    <button
                                        className={`focus:outline-none ${
                                            !showSavedWorkouts ? "border-b-2 border-purple-500" : ""
                                        }`}
                                        onClick={toggleWorkoutsClick}
                                    >
                                        Add Workout
                                    </button>
                                    <button
                                        className={`focus:outline-none ${
                                            showSavedWorkouts ? "border-b-2 border-purple-500" : ""
                                        }`}
                                        onClick={toggleSavedWorkoutsClick}
                                    >
                                        Saved Workouts
                                    </button>
                                </div>
                                {savedWorkouts.map((workout, index) => (
                                    <div
                                        key={index}
                                        className="w-full flex justify-center rounded-md mb-2 cursor-pointer"
                                        onClick={() => handleWorkoutClick(workout)}
                                        style={{ transition: "background-color 0.3s ease" }}
                                        onMouseEnter={(e) => {
                                            e.target.style.backgroundColor = "purple";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.backgroundColor = "white";
                                        }}
                                    >
                                        <div className="flex mt-2 items-center gap-2 text-xs md:text-sm mb-2 font-semibold">
                                            {workout.trainerUsername}- {workout.wname}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Display Submitted Workouts */}
                    {workoutsForSelectedDate.length > 0 && (
                        <div className="ml-1 mr-1 mt-5">
                            <div className="flex flex-wrap border-t border-gray-300">
                                {workoutsForSelectedDate.map((workout, index) => (
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

{/* Weight Section */}
<div className="bg-white p-4 rounded-md">
    <div className="flex flex-row text-md md:text-lg mb-2 justify-between">
        <div className="text-l font-bold">Weight</div>
        <button className="focus:outline-none" onClick={() => setShowWeightInputs(!showWeightInputs)}>
            <CirclePlus style={{ color: '#a855f7', cursor: 'pointer' }} />
        </button>
    </div>
    {showWeightInputs && (
        <div className="flex-1 md:flex-col border-t border-gray-300 justify-between mt-4">
            <div className="flex flex-wrap justify-around">
                <input
                    type="text"
                    placeholder="Weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                />
                <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                >
                    <option value="kg">kg</option>
                    <option value="lb">lb</option>
                </select>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                />
                <div className="flex lg:flex-row justify-center w-full gap-4">
                    <button
                        className="bg-gradient-to-tr from-purple-500 to-pink-500 hover:bg-purple-700 text-white text-sm font-bold py-1 px-4 rounded-lg mt-4 justify-center"
                        onClick={handleWeightSubmit}
                    >
                        Submit
                    </button>
                </div>
           <div className="border-2 border-gray-300 rounded-xl p-2 text-left mt-4">
                <label className="ml-1 text-sm">Add Progress Photo</label>
                <div className="flex flex-wrap justify-start items-center h-auto">
                    {weightImages.map((imageUrl, index) => (
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
                                onClick={() => handleRemoveWeightImage(index)}
                                style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                            >
                                <Trash2 className="text-white" />
                            </button>
                        </div>
                    ))}
                    {weightImages.length < 4 && (
                        <button
                            className="m-1.5 border border-gray-300 rounded-xl text-center flex justify-center items-center"
                            onClick={() => document.getElementById("weightImageUpload").click()}
                            style={{ width: 'calc(33% - 12px)', height: 'calc(33% - 12px)', minWidth: '100px', minHeight: '100px' }}
                        >
                            +
                        </button>
                    )}
                    <input
                        id="weightImageUpload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleWeightInputChange}
                    />
                </div>
            </div>
            </div>
        </div>
    )}
    {/* List of weight entries */}
    {weightEntries.length > 0 && (
        <div className="ml-1 mr-1 mt-5">
            <div className="flex flex-wrap border-t border-gray-300">
                {weightEntries.map((entry, index) => (
                    <div key={index} className="w-full flex justify-between border-t border-gray-300">

                                                    <div className="flex mt-2 items-center">
                                                            {/* Edit Button */}
                                                            <button
                                                                className="focus:outline-none mr-2"
                                                                onClick={() => handleWeightEdit(index)}
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


                                            <span className="font-bold">{entry.weight}</span>  {entry.unit}, {entry.date}
                                        </div>
                                        <div className="flex">

                                            <button
                                                className="focus:outline-none"
                                                onClick={() => handleWeightDelete(index)}
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


                {/* Sleep Section */}
                <div className="bg-white p-4 rounded-md">

                    <div className="flex flex-row text-md md:text-lg mb-2 justify-between">
                        <div className="text-l font-bold">
                            Sleep
                        </div>

                        <button
                            className="focus:outline-none"
                            onClick={handleSleepButtonClick}
                        >
                            <CirclePlus
                                style={{color: '#a855f7', cursor: 'pointer'}}
                            />
                        </button>

                    </div>
                    {/* Water Inputs */}
                    {showSleepInputs && (
                        <div className="flex-1 md:flex-col border-t border-gray-300 justify-between">
                            <div className="flex flex-wrap">

                                <p className="text-xs md:text-sm mt-3">Enter Sleep Data</p>
                                <div className="flex flex-col text-md justify-around w-full ">

                                    <input
                                        type="text"
                                        placeholder="Hours"
                                        value={sleepAmount}
                                        onChange={(e) => setSleepAmount(e.target.value)}
                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                    />
                                </div>

                                <div className="flex lg:flex-row justify-center w-full gap-4">
                                    <button
                                        className="bg-gradient-to-tr from-purple-500 to-pink-500 hover:bg-purple-700 text-white text-sm font-bold py-1 px-4 rounded-lg mt-4 justify-center"
                                        onClick={handleSleepSubmit}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Display Submitted Data */}
                    {submittedSleepData.length > 0 && (
                        <div className=" ml-1 mr-1 mt-5">
                            <div className="flex flex-wrap border-t border-gray-300">
                                {submittedSleepData.map((sleep, index) => (
                                    <div key={index} className="w-full flex justify-between border-t border-gray-300">
                                        <div className="flex mt-2 items-center">
                                            {/* Edit Button */}
                                            <button
                                                className="focus:outline-none mr-2"
                                                onClick={() => handleSleepEdit(index)}
                                                style={{color: '#000', transition: 'color 0.3s'}}
                                            >
                                                <Pencil
                                                    style={{color: '#000', cursor: 'pointer'}}
                                                    onMouseEnter={(e) => {
                                                        e.target.style.color = '#a855f7';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.target.style.color = '#000';
                                                    }}
                                                />
                                            </button>
                                        </div>
                                        <div>
                                            <p className="mr-1 mb-2 text-s md:text-m font-semibold">{sleep.duration} Hrs</p>


                                        </div>
                                        <div>

                                            {/* Delete Button */}
                                            <button
                                                className="focus:outline-none ml-2"
                                                onClick={() => handleSleepDelete(index)}
                                                style={{color: '#000', transition: 'color 0.3s'}}
                                            >
                                                <Trash2
                                                    style={{color: '#000', cursor: 'pointer'}}
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

                {/* Water Section */}
                <div className="bg-white p-4 rounded-md">

                    <div className="flex flex-row text-md md:text-lg mb-2 justify-between">
                        <div className="text-l font-bold">
                            Water
                        </div>

                        <button
                            className="focus:outline-none"
                            onClick={handleWaterButtonClick}
                        >
                            <CirclePlus
                                style={{ color: '#a855f7', cursor: 'pointer' }}
                            />
                        </button>

                    </div>
                    {/* Water Inputs */}
                    {showWaterInputs && (
                        <div className="flex-1 md:flex-col border-t border-gray-300 justify-between">
                            <div className="flex flex-wrap">

                                <p className="text-xs md:text-sm mt-3">Enter Water Data</p>
                                <div className="flex flex-col text-md justify-around w-full ">

                                    <input
                                        type="text"
                                        placeholder="Amount"
                                        value={waterAmount}
                                        onChange={(e) => setWaterAmount(e.target.value)}
                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Measurement"
                                        value={waterMeasurement}
                                        onChange={(e) => setWaterMeasurement(e.target.value)}
                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                    />
                                </div>

                                <div className="flex lg:flex-row justify-center w-full gap-4">
                                    <button
                                        className="bg-gradient-to-tr from-purple-500 to-pink-500 hover:bg-purple-700 text-white text-sm font-bold py-1 px-4 rounded-lg mt-4 justify-center"
                                        onClick={handleWaterSubmit}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Display Submitted Data */}
                    {submittedWaterData.length > 0 && (
                        <div className=" ml-1 mr-1 mt-5">
                            <div className="flex flex-wrap border-t border-gray-300">
                                {submittedWaterData.map((water, index) => (
                                    <div key={index} className="w-full flex justify-between border-t border-gray-300">
                                        <div className="flex mt-2 items-center">
                                            {/* Edit Button */}
                                            <button
                                                className="focus:outline-none mr-2"
                                                onClick={() => handleWaterEdit(index)}
                                                style={{color: '#000', transition: 'color 0.3s'}}
                                            >
                                                <Pencil
                                                    style={{color: '#000', cursor: 'pointer'}}
                                                    onMouseEnter={(e) => {
                                                        e.target.style.color = '#a855f7';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.target.style.color = '#000';
                                                    }}
                                                />
                                            </button>
                                        </div>
                                        <div>
                                            <p className="mr-1 mb-2 text-s md:text-m font-semibold">{water.amount} {water.measurement}</p>


                                        </div>
                                        <div>

                                            {/* Delete Button */}
                                            <button
                                                className="focus:outline-none ml-2"
                                                onClick={() => handleWaterDelete(index)}
                                                style={{color: '#000', transition: 'color 0.3s'}}
                                            >
                                                <Trash2
                                                    style={{color: '#000', cursor: 'pointer'}}
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
    )
}