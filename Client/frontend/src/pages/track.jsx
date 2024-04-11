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
        { name: "Chicken Breast", amount: "100", measurement: "g", protein: "31", carbs: "0", fat: "3.6", calories: "165", meal: "lunch" },
        { name: "Broccoli", amount: "100", measurement: "cup", protein: "2.8", carbs: "6", fat: "0.4", calories: "34", meal: "dinner" },
        { name: "Oatmeal", amount: "100", measurement: "g", protein: "2.4", carbs: "12", fat: "1.6", calories: "68", meal: "breakfast" },
        { name: "Greek Yogurt", amount: "100", measurement: "g", protein: "10", carbs: "3.6", fat: "0.4", calories: "59", meal: "snack" },
        { name: "Avocado", amount: "1", measurement: "each", protein: "2", carbs: "12", fat: "15", calories: "120", meal: "breakfast" },
        { name: "Turkey", amount: "100", measurement: "g", protein: "25", carbs: "0", fat: "1", calories: "110", meal: "lunch" },
        { name: "Salmon", amount: "300", measurement: "g", protein: "25", carbs: "0", fat: "10", calories: "200", meal: "dinner" },
        { name: "Almonds", amount: "0.25", measurement: "cup", protein: "6", carbs: "3", fat: "14", calories: "160", meal: "snack" },
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
            setShowSavedWorkouts(false);
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
    const [editingWeightId, setEditingWeightId] = useState(null);

const handleWeightSubmit = async () => {
    if (!weight) {
        console.error('No weight specified');
        return;
    }

    const newWeightData = {
        date: date,
        measurement: unit,
        amount: weight,
    };
    const editedWeightData = {
        weightId: editingWeightId,
        measurement: unit,
        amount: weight,
    };

    try {
        let response;
        if (editingWeightId) {
            response = await axios.put('/track/weightEdit', editedWeightData, { withCredentials: true });
            console.log('Weight updated:', response.data);
        } else {
            response = await axios.post('/track/weightCreate', newWeightData, { withCredentials: true });
            console.log('Weight saved:', response.data);
        }

        setWeight('');
        setUnit('kg'); 
        setEditingWeightId(null);
        setShowWeightInputs(false);
    } catch (error) {
        console.error('Error saving weight data:', error);
    }
};
 const handleWeightEdit = (index) => {
    const weightEntryToEdit = weightEntries[index];
    setWeight(String(weightEntryToEdit.amount));
    setUnit(weightEntryToEdit.measurement);
    setDate(weightEntryToEdit.date); 
    setEditingWeightId(weightEntryToEdit._id);
    setShowWeightInputs(true);
};


const handleWeightDelete = async (index) => {
    const weightEntryToDelete = weightEntries[index];
    try {
        await axios.delete('/track/weightDelete', { 
            data: { weightEntryId: weightEntryToDelete._id },
            withCredentials: true
        });
        console.log('Weight entry deleted successfully');
        // Remove the entry from the local state to update the UI
        const newWeightEntries = weightEntries.filter((_, idx) => idx !== index);
        setWeightEntries(newWeightEntries);
    } catch (error) {
        console.error('Error deleting weight data:', error);
    }
};


  


    const [showWaterInputs, setShowWaterInputs] = useState(false);
    const [waterAmount, setWaterAmount] = useState("");
    const [sleepAmount, setSleepAmount] = useState("");
    const [waterMeasurement, setWaterMeasurement] = useState("ml"); // Default to milliliters
    const [submittedWaterData, setSubmittedWaterData] = useState([]);
    const [submittedSleepData, setSubmittedSleepData] = useState([]);
   // const [displaySleepData, setDisplaySleepData] = useState([]);
const [editingSleepId, setEditingSleepId] = useState(null);
const [editingWaterId, setEditingWaterId] = useState(null);

    // Function to toggle water input form visibility
    const handleWaterButtonClick = () => {
        setShowWaterInputs(!showWaterInputs);
    };

 const handleWaterSubmit = async () => {
    if (!waterAmount) {
        console.error('No water amount specified');
        return;
    }

    const newWaterData = {
        date: date, 
        measurement: waterMeasurement,
        amount: waterAmount,
    };
    const editedWaterData = {
        waterId: editingWaterId,
        measurement: waterMeasurement,
        amount: waterAmount,
    };

    try {
        let response;
        if (editingWaterId) {

            response = await axios.put(`/track/waterEdit`, editedWaterData, { withCredentials: true });
            console.log('Water updated:', response.data);
        } else {

            response = await axios.post('/track/waterCreate', newWaterData, { withCredentials: true });
            console.log('Water saved:', response.data);
        }

        
        setWaterAmount("");
        setWaterMeasurement("ml");
        setEditingWaterId(null); 
        setShowWaterInputs(false);
    } catch (error) {
        console.error('Error saving water data:', error);
    }
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
            const response = await axios.get(`/track/sleepGet?date=${date}`, { withCredentials: true }); 
            setSubmittedSleepData(response.data);
        } catch (error) {
            console.error('Error fetching sleep data:', error);
        }
    };

    fetchSleepData();
    const fetchWaterData = async () => {
        try {
            const response = await axios.get(`/track/waterGet?date=${date}`, { withCredentials: true }); 
            setSubmittedWaterData(response.data);
            console.log('did it work')
        } catch (error) {
            console.error('Error fetching water data:', error);
        }
    };

    fetchWaterData();


    const fetchWeightData = async () => {
        try {
            const response = await axios.get(`/track/weightGet?date=${date}`, { withCredentials: true });
            setWeightEntries(response.data);
        } catch (error) {
            console.error('Error fetching weight data:', error);
        }
    };

    fetchWeightData();

}, [waterAmount, sleepAmount, weight, date]); 



const handleSleepButtonClick = () => {
        setShowSleepInputs(!showSleepInputs);
    };

 const handleWaterEdit = (index) => {
    const waterEntryToEdit = submittedWaterData[index];
    setWaterAmount(String(waterEntryToEdit.amount));
    setWaterMeasurement(waterEntryToEdit.measurement);
    setEditingWaterId(waterEntryToEdit._id);
    setShowWaterInputs(true);
};

const handleSleepEdit = (index) => {
    const sleepEntryToEdit = submittedSleepData[index];
    setSleepAmount(String(sleepEntryToEdit.duration)); 
    setEditingSleepId(sleepEntryToEdit._id);
    setShowSleepInputs(true);
};

const handleWaterDelete = async (index) => {
    const waterEntryToDelete = submittedWaterData[index];
    try {
        await axios.delete('/track/waterDelete', { data: { waterEntryId: waterEntryToDelete._id } }, { withCredentials: true });
        const newWaterData = submittedWaterData.filter((_, idx) => idx !== index);
        setSubmittedWaterData(newWaterData);
    } catch (error) {
        console.error('Error deleting water data:', error);
    }
};

const handleSleepDelete = async (index) => {
    const sleepEntryToDelete = submittedSleepData[index];
    try {
        await axios.delete('/track/sleepDelete', { data: { sleepEntryId: sleepEntryToDelete._id } }, { withCredentials: true }); 
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
                        <div className="ml-1 mr-1 mt-5">
                            {/* Filter Data by Meal Type */}
                            {['breakfast', 'lunch', 'dinner', 'snack'].map((meal) => (
                                <div key={meal}>
                                    <h2 className="text-md font-semibold">{meal.charAt(0).toUpperCase() + meal.slice(1)}</h2>
                                    <div className="flex flex-wrap border-t border-purple-300">
                                        {submittedData.filter((data) => data.meal === meal).map((data, index) => (
                                            <div key={index} className="w-full flex justify-between border-t border-gray-300">
                                                <div className="flex mt-2 items-center ml-4"> {/* Added ml-4 for indentation */}
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
                                                <div className="flex text-xs md:text-sm mt-2 mb-2 items-center ">
                                                    <div className="flex justify-between">
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
                                                    </div>
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
                            ))}
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
                            <div className="flex flex-wrap">
                                <p className="text-xs md:text-sm mt-3">Enter Weight Data</p>
                                <div className="flex flex-col text-md justify-around w-full ">
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
                                </div>
                                <div className="flex lg:flex-row justify-center w-full gap-4">
                                    <button
                                        className="bg-gradient-to-tr from-purple-500 to-pink-500 hover:bg-purple-700 text-white text-sm font-bold py-1 px-4 rounded-lg mt-4 justify-center"
                                        onClick={handleWeightSubmit}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* List of weight entries */}
                {/* Display Submitted Weight Data */}
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
                                        <p className="mr-1 mb-2 text-s md:text-m font-semibold">{entry.amount} {entry.measurement}</p>
                                    </div>
                                    <div>
                                        {/* Delete Button */}
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