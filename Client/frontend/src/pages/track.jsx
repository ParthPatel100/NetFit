import {useLocation } from "react-router-dom";
import {UserContext} from "../../context/userContext.jsx";
import React, {useState, useEffect} from "react";
import {useContext} from "react";
import {Trash2, CirclePlus, Plus, CookingPot, Apple, Pencil} from "lucide-react";
import axios from 'axios';





export default function Track(){

    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    //populate entries based on date



    const [showFoodInputs, setShowFoodInputs] = useState(false);
    const [showEditFoodInputs, setShowEditFoodInputs] = useState(false);
    const [foodData, setFoodData] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState(false);
    const [showSavedRecipes, setShowSavedRecipes] = useState(false);
    const mealTypeOptions = ['breakfast', 'lunch', 'dinner', 'snack'];
    const measurementOptions = ['cup', 'L', 'ml', 'tsp', 'tbsp', 'oz', 'lb', 'g', 'kg', 'each'];
    const [name, setName] = useState("");
    const [meal, setMeal] = useState("");
    const [amount, setAmount] = useState("");
    const [measurement, setMeasurement] = useState("");
    const [protein, setProtein] = useState("");
    const [carb, setCarb] = useState("");
    const [calories, setCalories] = useState("");
    const [fat, setFat] = useState("");
    const [sodium, setSodium] = useState("");
    const [sugar, setSugar] = useState("");
    const [fibre, setFibre] = useState("");
    const [satFat, setSatFat] = useState("");
    const [transFat, setTransFat] = useState("");
    const [cholesterol, setCholesterol] = useState("");
    const [potassium, setPotassium] = useState("");
    const [iron, setIron] = useState("");
    const [vitA, setVitA] = useState("");
    const [vitC, setVitC] = useState("");
    const [calcium, setCalcium] = useState("");
    const [vitD, setVitD] = useState("");
    const [vitK, setVitK] = useState("");
    const [vitB6, setVitB6] = useState("");
    const [vitB12, setVitB12] = useState("");

    /*
    const [foodData, setFoodData] = useState([
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

    */



    const handleFoodButtonClick = () => {
        setShowFoodInputs(!showFoodInputs);
        if (showSavedRecipes) {
            setShowSavedRecipes(false);
            setShowFoodInputs(false);
        }
    };

    const toggleFoodButtonClick = () => {
        setShowFoodInputs(true);
        setShowSavedRecipes(false);
    };

    const toggleSavedRecipesClick = () => {
        setShowFoodInputs(false);
        setShowSavedRecipes(true);
    };


    const handleFoodSubmit = () => {
        const newFoodData = {
            name: name,
            date: date,
            meal_type: meal,
            amount: amount,
            measurement: measurement,
            protein: protein,
            carb: carb,
            calories: calories,
            fat: fat,
            sodium: sodium,
            sugar: sugar,
            fibre: fibre,
            satFat: satFat,
            transFat: transFat,
            cholesterol: cholesterol,
            potassium: potassium,
            iron: iron,
            vitA: vitA,
            vitC: vitC,
            calcium: calcium,
            vitD: vitD,
            vitK: vitK,
            vitB6: vitB6,
            vitB12: vitB12
        };
        
        handleAddFood(newFoodData);
        
        // Reset form fields after submission
        setName("");
        setMeal("");
        setAmount("");
        setMeasurement("");
        setProtein("");
        setCarb("");
        setCalories("");
        setFat("");
        setSodium("");
        setSugar("");
        setFibre("");
        setSatFat("");
        setTransFat("");
        setCholesterol("");
        setPotassium("");
        setIron("");
        setVitA("");
        setVitC("");
        setCalcium("");
        setVitD("");
        setVitK("");
        setVitB6("");
        setVitB12("");
    };

    // Handle form submission to add a new workout
    const handleAddFood = async (newFoodData) => {
        try {
            
            
            const response = await axios.post("/track/postFood", newFoodData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log('Food added successfully:', response.data);
            
            // Update the workout data state with the new workout
            setFoodData([...foodData, response.data]);
            console.log("response ", response.data);
            console.log("foodData for fe ", foodData);
            setShowFoodInputs(false);
        } catch (error) {
            console.error('Error adding workout:', error);
        }
    };


    const handleRecipeClick = (recipe) => {
        const newEntry = {
            name: recipe.name,
            protein: recipe.protein,
            carb: recipe.carb,
            fat: recipe.fat,
            calories: recipe.calories,
        };

        setFoodData([...foodData, newEntry]);
    };

    const handleFoodEdit = (index) => {
        // Create a copy of the submittedData array without the item to delete
        const updatedFoodData = foodData[index];

        // Set the state with the values of the selected food item
        setName(updatedFoodData.name || "");
        setMeal(updatedFoodData.meal || "");
        setAmount(updatedFoodData.amount || "");
        setMeasurement(updatedFoodData.measurement || "");
        setProtein(updatedFoodData.protein || "");
        setCarb(updatedFoodData.carb || "");
        setCalories(updatedFoodData.calories || "");
        setFat(updatedFoodData.fat || "");
        setSodium(updatedFoodData.sodium || 0);
        setSugar(updatedFoodData.sugar || 0);
        setFibre(updatedFoodData.fibre || 0);
        setSatFat(updatedFoodData.satFat || 0);
        setTransFat(updatedFoodData.transFat || 0);
        setCholesterol(updatedFoodData.cholesterol || 0);
        setPotassium(updatedFoodData.potassium || 0);
        setIron(updatedFoodData.iron || 0);
        setVitA(updatedFoodData.vitA || 0);
        setVitC(updatedFoodData.vitC || 0);
        setCalcium(updatedFoodData.calcium || 0);
        setVitD(updatedFoodData.vitD || 0);
        setVitK(updatedFoodData.vitK || 0);
        setVitB6(updatedFoodData.vitB6 || 0);
        setVitB12(updatedFoodData.vitB12 || 0);

        setEditIndex(index);
        setShowEditFoodInputs(true);
    };

    const handleFoodEditSubmit = async () => {
        try {
            console.log(editIndex);
            console.log(foodData[editIndex]);
            
            const foodId = foodData[editIndex]._id;
            console.log(foodId);
    
            const updatedFoodData = {
                _id: foodId,
                name: name,
                date: date,
                meal: meal,
                amount: amount,
                measurement: measurement,
                protein: protein,
                carb: carb,
                calories: calories,
                fat: fat,
                sodium: sodium,
                sugar: sugar,
                fibre: fibre,
                satFat: satFat,
                transFat: transFat,
                cholesterol: cholesterol,
                potassium: potassium,
                iron: iron,
                vitA: vitA,
                vitC: vitC,
                calcium: calcium,
                vitD: vitD,
                vitK: vitK,
                vitB6: vitB6,
                vitB12: vitB12
            };
    
            const responseFood = await axios.put("/track/editFood", updatedFoodData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            console.log('Food updated successfully:', responseFood.data);
            
            // Update the food data state with the updated food item
            const updatedFoodList = [...foodData];
            updatedFoodList[editIndex] = responseFood.data;
            setFoodData(updatedFoodList);
            setShowEditFoodInputs(false);
            
        } catch (error) {
            console.error('Error updating food:', error);
        }
    };

    const handleFoodDelete = async (index) => {
        try {
            const foodId = foodData[index]._id;
            const responseFood = await axios.delete("/track/deleteFood", {
                params: { _id: foodId },
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            console.log('Food deleted successfully:', responseFood.data);
    
            // Update the food data state by removing the deleted food item
            const updatedFoodList = [...foodData];
            updatedFoodList.splice(index, 1);
            setFoodData(updatedFoodList);
        } catch (error) {
            console.error('Error deleting food:', error);
        }
    };

    //workout backend
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

    const [workoutData, setWorkoutData] = useState([]);
    const [showWorkoutInputs, setShowWorkoutInputs] = useState(false);
    const [showSavedWorkouts, setShowSavedWorkouts] = useState(false);
    const [showEditWorkoutInputs, setShowEditWorkoutInputs] = useState(false);
    const [editIndex, setEditIndex] = useState("");
    const [wname, setWName] = useState("");
    const [reps, setReps] = useState("");
    const [sets, setSets] = useState("");
    const [resistance, setResistance] = useState("");
    const [resMeasure, setResMeasure] = useState("");
    const [duration, setDuration] = useState("");
    const [calBurn, setCalBurn] = useState("");


    // Handle form submission to add a new workout
    const handleAddWorkout = async (newWorkoutData) => {
        try {
            
            
            const responseWorkout = await axios.post("/track/postWorkout", newWorkoutData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log('Workout added successfully:', responseWorkout.data);
            
            // Update the workout data state with the new workout
            setWorkoutData([...workoutData, responseWorkout.data]);
            setShowWorkoutInputs(false);
        } catch (error) {
            console.error('Error adding workout:', error);
        }
    };


    const handleWorkoutEdit = (index) => {

        const updatedWorkoutData = workoutData[index];
    
            // Set the state with the values of the selected food item
            console.log(workoutData);
            console.log(workoutData[index]);
            console.log(updatedWorkoutData);
            setWName(updatedWorkoutData.name || "");
            setSets(updatedWorkoutData.sets || "");
            setReps(updatedWorkoutData.reps || "");
            setResistance(updatedWorkoutData.resistance || "");
            setResMeasure(updatedWorkoutData.resMeasure || "");
            setDuration(updatedWorkoutData.duration || "");

            setEditIndex(index);
        
            // Set the showInputs state to true to display the input fields for editing
            setShowEditWorkoutInputs(true);
        
            // Update the submittedData array without the deleted item
            //setWorkoutData(updatedWorkoutData);

    }

    // Handle workout editing
    const handleWorkoutEditSubmit = async () => {
        try {
            console.log(editIndex);
            console.log(workoutData[editIndex]);
            
            const workoutId = workoutData[editIndex]._id;
            console.log(workoutId);
            const newWorkoutData = {
                _id: workoutId,
                name: wname,
                date: date,
                reps: reps,
                sets: sets,
                resistance: resistance,
                resMeasure: resMeasure,
                duration: duration,
                calories: calBurn,
            };
            

            const responseWorkout = await axios.put("/track/editWorkout", newWorkoutData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log('Workout updated successfully:', responseWorkout.data);
            
            // Update the workout data state with the updated workout
            const updatedData = [...workoutData];
            updatedData[editIndex] = responseWorkout.data;
            setWorkoutData(updatedData);
            setShowEditWorkoutInputs(false);
            
        } catch (error) {
            console.error('Error updating workout:', error);
        }
    };

    // Handle workout deletion
    const handleWorkoutDelete = async (index) => {
        try {
            
            const workoutId = workoutData[index]._id;
            const responseWorkout = await axios.delete("/track/deleteWorkout", { params: { _id: workoutId } }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            
            
            console.log('Workout deleted successfully:', responseWorkout.data);
            
            // Update the workout data state by removing the deleted workout
            const updatedData = [...workoutData];
            updatedData.splice(index, 1);
            setWorkoutData(updatedData);
        } catch (error) {
            console.error('Error deleting workout:', error);
        }
    };

    // Handle form submit
    const handleWorkoutSubmit = () => {
        
        const newWorkoutData = {
            name: wname,
            date: date,
            reps: reps,
            sets: sets,
            resistance: resistance,
            resMeasure: resMeasure,
            duration: duration,
            calories: calBurn,
            
        };
        handleAddWorkout(newWorkoutData);

        // Reset form fields after submission
        setWName("");
        setReps("");
        setSets("");
        setResistance("");
        setResMeasure("");
        setDuration("");
    };

    const handleSubmitSavedWorkout = () => {
        
    };

    
    useEffect(() => {
        const fetchWorkoutData = async () => {
            try {
                const responseWorkout = await axios.get("/track/getAllWorkouts", {
                    params: { date: date },
                    headers: { "Content-Type": "application/json" },
                });
                setWorkoutData(responseWorkout.data);
            } catch (error) {
                console.error('Error fetching workout data:', error);
            }
        };
    
        fetchWorkoutData();
    }, [date]);
    
    useEffect(() => {
        const fetchFoodData = async () => {
            try {
                const response = await axios.get("/track/getAllFoods", {
                    params: { date: date },
                    headers: { "Content-Type": "application/json" },
                });
                
                setFoodData(response.data);
            } catch (error) {
                console.error('Error fetching food data:', error);
            }
        };
    
        fetchFoodData();
    }, [date]);
      


    
    const [showWeightInputs, setShowWeightInputs] = useState(false);
    const [weightEntries, setWeightEntries] = useState([]);
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('kg'); // Default unit is kilograms
    //const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Default to today's date
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
    const [showSleepInputs, setShowSleepInputs] = useState(false);
    const [waterMeasurement, setWaterMeasurement] = useState("ml"); // Default to milliliters
    const [submittedWaterData, setSubmittedWaterData] = useState([]);
    const [submittedSleepData, setSubmittedSleepData] = useState([]);

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

    const handleSleepSubmit = () => {
        const newSleepData = {
            amount: sleepAmount,
        };

        setSubmittedSleepData([...submittedSleepData, newSleepData]);

        setSleepAmount("");

        setShowSleepInputs(false);
    };


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

        // Show the input fields for editing
        setShowWaterInputs(true);
    };

    const handleSleepEdit = (index) => {
        const sleepEntryToEdit = submittedSleepData[index];
        setSleepAmount(sleepEntryToEdit.amount);

        // Remove the entry from the list
        const newSleepData = submittedSleepData.filter((_, idx) => idx !== index);
        setSubmittedSleepData(newSleepData);

        // Show the input fields for editing
        setShowSleepInputs(true);
    };

    // Function to handle deletion of a water intake entry
    const handleWaterDelete = (index) => {
        const newWaterData = submittedWaterData.filter((_, idx) => idx !== index);
        setSubmittedWaterData(newWaterData);
    };
    const handleSleepDelete = (index) => {
        const newSleepData = submittedSleepData.filter((_, idx) => idx !== index);
        setSubmittedSleepData(newSleepData);
    };
    return(
        <div className="bg-gray-100 md:ml-[12rem] md:mt-14 p-4 h-screen">
            <div className=" flex justify-end mb-2.5">
                <input
                                        type="date"
                                        value={date}
                                        onChange={(e) => {
                                            const newDate = e.target.value;
                                            setDate(newDate);
                                            // Fetch food data for the new date here
                                        }}
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
                            onClick={handleFoodButtonClick}
                        >
                            <CirclePlus
                                style={{color: '#a855f7', cursor: 'pointer'}}
                            />
                        </button>


                    </div>
                    {showFoodInputs && (
                        <div className="flex-1 md:flex-col border-t border-gray-300 justify-between">
                            <div className="flex flex-wrap">

                                {/* toggle here */}

                                <p className="text-xs md:text-sm mt-3">Enter Nutritional Data</p>
                                <div className="flex md:flex-row flex-col text-sm justify-around w-full ">

                                    <input
                                        type="text"
                                        placeholder="Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                    />
                                    <select
                                        value={meal}
                                        onChange={(e) => setMeal(e.target.value)}
                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none md:pr-9 m-1 md:m-2"
                                        
                                    >
                                        <option value="">Select Meal Type </option>
                                        {mealTypeOptions.map((option) => (
                                            <option key={option} value={option} >{option.charAt(0).toUpperCase() + option.slice(1)}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex md:flex-row flex-col text-sm justify-around w-full ">
                                    <select
                                        value={measurement}
                                        placeholder="Measurement"
                                        onChange={(e) => setMeasurement(e.target.value)}
                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:pr-2 md:m-2  "
                                    >
                                        <option value="">Select Measurement</option>
                                        {measurementOptions.map((option, index) => (
                                            <option key={index} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
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
                                        value={carb}
                                        onChange={(e) => setCarb(e.target.value)}
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
                                        value={sugar}
                                        onChange={(e) => setSugar(e.target.value)}
                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Fibre"
                                        value={fibre}
                                        onChange={(e) => setFibre(e.target.value)}
                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                    />
                                </div>

                                <div className="flex md:flex-row flex-col text-sm justify-around w-full ">
                                    <input
                                        type="text"
                                        placeholder="Saturated Fat"
                                        value={satFat}
                                        onChange={(e) => setSatFat(e.target.value)}
                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Trans Fat"
                                        value={transFat}
                                        onChange={(e) => setTransFat(e.target.value)}
                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                    />
                                </div>

                                <div className="flex md:flex-row flex-col text-sm justify-around w-full ">
                                    <input
                                        type="text"
                                        placeholder="Sodium"
                                        value={sodium}
                                        onChange={(e) => setSodium(e.target.value)}
                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Cholesterol"
                                        value={cholesterol}
                                        onChange={(e) => setCholesterol(e.target.value)}
                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                    />
                                </div>

                                <div className="flex md:flex-row flex-col text-sm justify-around w-full ">
                                    <input
                                        type="text"
                                        placeholder="Iron"
                                        value={iron}
                                        onChange={(e) => setIron(e.target.value)}
                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Potassium"
                                        value={potassium}
                                        onChange={(e) => setPotassium(e.target.value)}
                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                    />
                                </div>

                                <div className="flex md:flex-row flex-col text-sm justify-around w-full ">
                                    <input
                                        type="text"
                                        placeholder="Vitamin A"
                                        value={vitA}
                                        onChange={(e) => setVitA(e.target.value)}
                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Vitamin C"
                                        value={vitC}
                                        onChange={(e) => setVitC(e.target.value)}
                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                    />
                                </div>

                                <div className="flex md:flex-row flex-col text-sm justify-around w-full">
                                    <input
                                        type="text"
                                        placeholder="Calcium"
                                        value={calcium}
                                        onChange={(e) => setCalcium(e.target.value)}
                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Vitamin D"
                                        value={vitD}
                                        onChange={(e) => setVitD(e.target.value)}
                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                    />
                                </div>

                                <div className="flex md:flex-row flex-col text-sm justify-around w-full">
                                    <input
                                        type="text"
                                        placeholder="Vitamin B6"
                                        value={vitB6}
                                        onChange={(e) => setVitB6(e.target.value)}
                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Vitamin B12"
                                        value={vitB12}
                                        onChange={(e) => setVitB12(e.target.value)}
                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                    />
                                </div>

                                <div className="flex lg:flex-row justify-center w-full gap-4">
                                    <button
                                        className="bg-gradient-to-tr from-purple-500 to-pink-500 hover:bg-purple-700 text-white text-sm font-bold py-1 px-4 rounded-lg mt-4 justify-center"
                                        onClick={handleFoodSubmit}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {showEditFoodInputs && (
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
                                        value={carb}
                                        onChange={(e) => setCarb(e.target.value)}
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
                                        value={sugar}
                                        onChange={(e) => setSugar(e.target.value)}
                                        className="border-b-2 border-gray-300 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Fibre"
                                        value={fibre}
                                        onChange={(e) => setFibre(e.target.value)}
                                        className="border-b-2 border-gray-300 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                    />
                                </div>

                                <div className="flex md:flex-row flex-col text-sm justify-around w-full ">
                                    <input
                                        type="text"
                                        placeholder="Saturated Fat"
                                        value={satFat}
                                        onChange={(e) => setSatFat(e.target.value)}
                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Trans Fat"
                                        value={transFat}
                                        onChange={(e) => setTransFat(e.target.value)}
                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                    />
                                </div>

                                <div className="flex md:flex-row flex-col text-sm justify-around w-full ">
                                    <input
                                        type="text"
                                        placeholder="Sodium"
                                        value={sodium}
                                        onChange={(e) => setSodium(e.target.value)}
                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Cholesterol"
                                        value={cholesterol}
                                        onChange={(e) => setCholesterol(e.target.value)}
                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                    />
                                </div>

                                <div className="flex md:flex-row flex-col text-sm justify-around w-full ">
                                    <input
                                        type="text"
                                        placeholder="Iron"
                                        value={iron}
                                        onChange={(e) => setIron(e.target.value)}
                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Potassium"
                                        value={potassium}
                                        onChange={(e) => setPotassium(e.target.value)}
                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                    />
                                </div>

                                <div className="flex md:flex-row flex-col text-sm justify-around w-full ">
                                    <input
                                        type="text"
                                        placeholder="Vitamin A"
                                        value={vitA}
                                        onChange={(e) => setVitA(e.target.value)}
                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Vitamin C"
                                        value={vitC}
                                        onChange={(e) => setVitC(e.target.value)}
                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                    />
                                </div>

                                <div className="flex md:flex-row flex-col text-sm justify-around w-full">
                                    <input
                                        type="text"
                                        placeholder="Calcium"
                                        value={calcium}
                                        onChange={(e) => setCalcium(e.target.value)}
                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Vitamin D"
                                        value={vitD}
                                        onChange={(e) => setVitD(e.target.value)}
                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                    />
                                </div>

                                <div className="flex md:flex-row flex-col text-sm justify-around w-full">
                                    <input
                                        type="text"
                                        placeholder="Vitamin B6"
                                        value={vitB6}
                                        onChange={(e) => setVitB6(e.target.value)}
                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Vitamin B12"
                                        value={vitB12}
                                        onChange={(e) => setVitB12(e.target.value)}
                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                    />
                                </div>

                                <div className="flex lg:flex-row justify-center w-full gap-4">
                                    <button
                                        className="bg-gradient-to-tr from-purple-500 to-pink-500 hover:bg-purple-700 text-white text-sm font-bold py-1 px-4 rounded-lg mt-4 justify-center"
                                        onClick={handleFoodEditSubmit}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}


                    {foodData.length > 0 && (
                        <div className="ml-1 mr-1 mt-5">
                            {/* Filter Data by Meal Type */}
                            {['breakfast', 'lunch', 'dinner', 'snack'].map((meal) => {
                                const filteredFoods = foodData.filter((data) => data.meal_type === meal);
                                if (filteredFoods.length > 0) {
                                    return (
                                        <div key={meal}>
                                            <h2 className="text-md font-semibold">{meal.charAt(0).toUpperCase() + meal.slice(1)}</h2>
                                            <div className="flex flex-wrap border-t border-purple-300">
                                                {filteredFoods.map((data, index) => (
                                                    <div key={index} className="w-full flex justify-between border-t border-gray-300">
                                                        <div className="flex mt-2 items-center"> {/* Added ml-4 for indentation */}
                                                            {/* Edit Button */}
                                                            <button
                                                                className="focus:outline-none mr-2 mb-2"
                                                                onClick={() => handleFoodEdit(index)}
                                                                style={{ color: '#000', transition: 'color 0.3s' }}
                                                            >
                                                                <Pencil
                                                                    style={{ width:'1em', height:'1em', color: '#000', cursor: 'pointer' }}
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
                                                                    <span className="font-semibold">{data.carb}g</span> Carbs
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
                                                                onClick={() => handleFoodDelete(index)}
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
                                    );
                                }
                                return null; // If no foods for this meal, return null
                            })}
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
                                </div>

                                <div className="flex md:flex-row flex-col text-sm justify-around w-full">
                                <input
                                        type="text"
                                        placeholder="Reps"
                                        value={reps}
                                        
                                        onChange={(e) => setReps(e.target.value)}
                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Sets"
                                        value={sets}
                                       
                                        onChange={(e) => setSets(e.target.value)}
                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                    />
                                </div>
                                <div className="flex md:flex-row flex-col text-sm justify-around w-full">
                                <input
                                        type="text"
                                        placeholder="Resistance"
                                        value={resistance}
                                        
                                        onChange={(e) => setResistance(e.target.value)}
                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1  md:m-2"
                                    />
                                    <select
                                        value={resMeasure}
                                        onChange={(e) => setResMeasure(e.target.value)}
                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:pr-10 md:m-2"
                                    >
                                        <option value="">Select Measure</option>
                                        <option value="">lb</option>
                                        <option value="">kg</option>
                                    </select>
                                </div>
                                <div className="flex md:flex-row flex-col text-sm justify-around w-full">
                                <input
                                        type="text"
                                        placeholder="Duration (min)"
                                        value={duration}
                                    
                                        onChange={(e) => setDuration(e.target.value)}
                                        className="border-b-2 border-gray-600 focus:border-purple-500 focus:outline-none m-1 md:m-2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Cals Burned"
                                        value={calBurn}
                                    
                                        onChange={(e) => setCalBurn(e.target.value)}
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

                    {showEditWorkoutInputs && (
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
                                        onClick={handleWorkoutEditSubmit}
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
                                {showSavedWorkouts.map((workout, index) => (
                                    <div
                                        key={index}
                                        className="w-full flex justify-center rounded-md mb-2 cursor-pointer"
                                        onClick={() => handleSubmitSavedWorkout(workout)}
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
                    {workoutData.length > 0 && (
                        <div className="ml-1 mr-1 mt-5">
                            <div className="flex flex-wrap border-t border-gray-300">
                                {workoutData.map((workout, index) => (
                                    <div key={index} className="w-full flex justify-between border-t border-gray-300">
                                        <div className="flex mt-2 items-center">
                                            {/* Edit Button */}
                                            <button
                                                className="focus:outline-none mr-2 mb-2"
                                                onClick={() => handleWorkoutEdit(index)}
                                                style={{ color: '#000', transition: 'color 0.3s' }}
                                            >
                                                <Pencil
                                                    style={{ width:'1em', height:'1em', color: '#000', cursor: 'pointer' }}
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
                                            <p className="mr-1 mb-2 text-s md:text-m font-semibold">{sleep.amount} Hrs</p>


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