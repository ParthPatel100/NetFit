import React, {useContext, useEffect, useState} from "react";
import {UtensilsCrossed, Dumbbell, Heart} from "lucide-react";
import axios from "axios";
import {GoalContext} from "../../context/goalContextProvider.jsx";

export default function GoalPage(){
    const {calories, setCaloriesGoal, carbs, setCarbsGoal,fats, setFats,protein, setProtein,sugar, setSugar,
        sleep, setSleep,weight, setWeight,water, setWater,caloriesBurn, setCaloriesBurn,workoutSessions,
        setWorkoutSessions,workoutDuration, setWorkoutDuration} = useContext(GoalContext)

    const [editNutritionState, setNutritionState] = useState(false)
    const [editFitnessState, setEditFitnessState] = useState(false)
    const [editHealthState, setEditHealthState] = useState(false)


    useEffect(() => {
        getCurrentGoals().then()
    }, []);


    function setAllInfo(data){
        setCaloriesGoal(data.calories)
        setCarbsGoal(data.carbohydrates)
        setFats(data.fat)
        setProtein(data.protein)
        setSugar(data.sugar)
        setSleep(data.sleep)
        setWeight(data.weight)
        setWater(data.water)
        setCaloriesBurn(data.calories_burn)
        setWorkoutSessions(data.workouts)
        setWorkoutDuration(data.workout_duration)
    }

    async function updateCurrentGoals(){
        console.log("Updating")
        const updatedGoalsData = {
            calories: calories,
            carbohydrates: carbs, // we need references
            fat: fats, // we need references
            protein: protein, // we need references
            sugar: sugar,
            calories_burn: caloriesBurn,
            workouts: workoutSessions,
            workout_duration: workoutDuration,
            sleep: sleep,
            weight: weight,
            water: water
        }

        try {
            const { data } = await axios.post('/goal/updateCurrentGoals', updatedGoalsData);
            if (data.error) {
                console.log(data.error);
            } else {
                console.log("Current goals from mongo DB: " , data)
            }
        } catch (error) {
            console.error('Error Getting Data', error);
        }
    }

    async function getCurrentGoals(){
        try {
            const { data } = await axios.get('/goal/getCurrentGoals');
            if (data.error) {
                console.log(data.error);
            } else {
                console.log("Current goals from mongo DB: " , data)
                setAllInfo(data)
            }
        } catch (error) {
            console.error('Error Getting Data', error);
        }
    }

    return(
        <div className={"bg-gray-100"}>

        <div className={" flex md:mt-14 md:ml-[12rem] pb-24 md:pb-16 p-2 gap-4 flex-col mx-4" }>

            <span className={"text-3xl text-neutral-600 font-bold"}>
                Your Fitness <span className={"text-purple-600"}>Goals</span>
            </span>

            <div className={"mt-5 flex gap-4 mx-auto md:w-[50%] w-full flex-col text-neutral-600"}>
                <div className={"flex self-start flex-col w-full"}>
                    <div className={"flex flex-row justify-between"}>
                         <span className={"text-left font-bold flex flex-row gap-1"}>
                            <UtensilsCrossed/> Daily Nutrition Goals
                        </span>
                        <button className={"self-end text-blue-600"} onClick={() => {
                            setNutritionState(!editNutritionState)
                        }}>
                            {editNutritionState ? 'Done' : 'Edit'}
                        </button>
                    </div>

                    <div className={"text-sm mt-2 text-black shadow-2xl rounded-xl bg-white "}>
                        <div
                            className={"flex justify-center content-center items-center border-b border-gray-600 rounded-t-2xl p-3"}>
                            <span>
                                Calories
                            </span>
                            <div className={"flex ml-auto text-purple-500 font-bold"}>

                                {editNutritionState ? (
                                    <input
                                        type="number"
                                        value={calories > 0 ? calories: null}
                                        onChange={(e) => setCaloriesGoal(e.target.value)}
                                        onBlur={updateCurrentGoals}
                                        className={"outline outline-purple-500 w-1/2 self-end ml-auto rounded-full px-2 text-right"}
                                    />
                                ) : (
                                    <span>{calories > 0 ? calories: "-"}</span>
                                )}

                                <span className={"ml-1"}> Cal</span>
                            </div>
                        </div>
                        <div className={"flex justify-center content-center items-center justify-between border-b border-gray-600 p-3 "}>
                            <span>
                                Carbohydrates
                            </span>
                            <div className={"flex ml-auto text-purple-500 font-bold"}>

                                {editNutritionState ? (
                                    <input
                                        type="number"
                                        value={carbs > 0 ? carbs : null}
                                        onChange={(e) => setCarbsGoal(e.target.value)}
                                        onBlur={updateCurrentGoals}
                                        className={"outline outline-purple-500 w-1/2 self-end ml-auto rounded-full px-2 text-right"}
                                    />
                                ) : (
                                    <span>{carbs > 0 ? carbs : "-"}</span>
                                )}

                                <span className={"ml-1"}> %</span>
                            </div>
                        </div>
                        <div className={"flex justify-center content-center items-center border-b border-gray-600 p-3 "}>
                            <span>
                                Fat
                            </span>
                            <div className={"flex ml-auto text-purple-500 font-bold"}>

                                {editNutritionState ? (
                                    <input
                                        type="number"
                                        value={fats > 0 ? fats: null}
                                        onChange={(e) => setFats(e.target.value)}
                                        onBlur={updateCurrentGoals}
                                        className={"outline outline-purple-500 w-1/2 self-end ml-auto rounded-full px-2 text-right"}
                                    />
                                ) : (
                                    <span>{fats > 0 ? fats: "-"}</span>
                                )}

                                <span className={"ml-1"}> %</span>
                            </div>
                        </div>
                        <div className={"flex justify-center content-center items-center border-b border-gray-600 p-3 "}>
                            <span>
                                Protein
                            </span>
                            <div className={"flex ml-auto text-purple-500 font-bold"}>

                                {editNutritionState ? (
                                    <input
                                        type="number"
                                        value={protein > 0 ? protein: null}
                                        onChange={(e) => setProtein(e.target.value)}
                                        onBlur={updateCurrentGoals}
                                        className={"outline outline-purple-500 w-1/2 self-end ml-auto rounded-full px-2 text-right"}
                                    />
                                ) : (
                                    <span>{protein > 0 ? protein: "-"}</span>
                                )}

                                <span className={"ml-1"}> %</span>
                            </div>
                        </div>
                        <div className={"flex justify-center content-center items-center p-3 "}>
                            <span>
                                Sugar
                            </span>
                            <div className={"flex ml-auto text-purple-500 font-bold"}>

                                {editNutritionState ? (
                                    <input
                                        type="number"
                                        value={sugar > 0 ? sugar: null}
                                        onChange={(e) => setSugar(e.target.value)}
                                        onBlur={updateCurrentGoals}
                                        className={"outline outline-purple-500 w-1/2 self-end ml-auto rounded-full px-2 text-right"}
                                    />
                                ) : (
                                    <span>{sugar > 0 ? sugar: "-"}</span>
                                )}

                                <span className={"ml-1"}> %</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"flex self-start flex-col w-full mt-6"}>
                    <div className={"flex flex-row justify-between"}>
                         <span className={"text-left font-bold flex flex-row gap-1"}>
                            <Dumbbell/> Fitness Goals Per Day
                        </span>
                        <button className={"self-end text-blue-600"} onClick={() => {
                            setEditFitnessState(!editFitnessState)
                        }}>
                            {editFitnessState ? 'Done' : 'Edit'}
                        </button>
                    </div>

                    <div className={"text-sm mt-2 text-black shadow-2xl rounded-xl bg-white "}>
                        <div
                            className={"flex justify-center content-center items-center border-b border-black p-3 "}>
                            <span>
                                Calories Burn
                            </span>
                            <div className={"flex ml-auto text-purple-500 font-bold"}>

                                {editFitnessState ? (
                                    <input
                                        type="number"
                                        value={caloriesBurn > 0 ? caloriesBurn: null}
                                        onChange={(e) => setCaloriesBurn(e.target.value)}
                                        onBlur={updateCurrentGoals}
                                        className={"outline outline-purple-500 w-1/2 self-end ml-auto rounded-full px-2 text-right"}
                                    />
                                ) : (
                                    <span>{caloriesBurn > 0 ? caloriesBurn: "-"}</span>
                                )}

                                <span className={"ml-1"}> Cal</span>
                            </div>
                        </div>

                        <div
                            className={"flex justify-center content-center items-center border-b border-black p-3"}>
                            <span>
                                Workouts
                            </span>
                            <div className={"flex ml-auto text-purple-500 font-bold"}>

                                {editFitnessState ? (
                                    <input
                                        type="number"
                                        value={workoutSessions > 0 ? workoutSessions: null}
                                        onChange={(e) => setWorkoutSessions(e.target.value)}
                                        onBlur={updateCurrentGoals}
                                        className={"outline outline-purple-500 w-1/2 self-end ml-auto rounded-full px-2 text-right"}
                                    />
                                ) : (
                                    <span>{workoutSessions > 0 ? workoutSessions: "-"}</span>
                                )}

                            </div>
                        </div>

                        <div
                            className={"flex justify-center content-center items-center p-3"}>
                            <span>
                                Workout Duration
                            </span>
                            <div className={"flex ml-auto text-purple-500 font-bold"}>

                                {editFitnessState ? (
                                    <input
                                        type="number"
                                        value={workoutDuration > 0 ? workoutDuration : null}
                                        onChange={(e) => setWorkoutDuration(e.target.value)}
                                        onBlur={updateCurrentGoals}
                                        className={"outline outline-purple-500 w-1/2 self-end ml-auto rounded-full px-2 text-right"}
                                    />
                                ) : (
                                    <span>{workoutDuration > 0 ? workoutDuration : "-"}</span>
                                )}

                                <span className={"ml-1"}> Min</span>
                            </div>
                        </div>

                    </div>
                </div>

                <div className={"flex self-start flex-col w-full mt-6"}>
                    <div className={"flex flex-row justify-between"}>
                         <span className={"text-left font-bold flex flex-row gap-1"}>
                            <Heart/> General Health Goals
                        </span>
                        <button className={"self-end text-blue-600"} onClick={() => {
                            setEditHealthState(!editHealthState)
                        }}>
                            {editHealthState ? 'Done' : 'Edit'}
                        </button>
                    </div>

                    <div className={"text-sm mt-2 text-black shadow-2xl rounded-xl bg-white"}>
                        <div
                            className={"flex justify-center content-center items-center border-b border-black p-3"}>
                            <span>
                                Sleep
                            </span>
                            <div className={"flex ml-auto text-purple-500 font-bold"}>

                                {editHealthState ? (
                                    <input
                                        type="number"
                                        value={sleep > 0 ? sleep: null}
                                        onChange={(e) => setSleep(e.target.value)}
                                        onBlur={updateCurrentGoals}
                                        className={"outline outline-purple-500 w-1/2 self-end ml-auto rounded-full px-2 text-right"}
                                    />
                                ) : (
                                    <span>{sleep > 0 ? sleep: "-"}</span>
                                )}

                                <span className={"ml-1"}> Hrs</span>
                            </div>
                        </div>

                        <div
                            className={"flex justify-center content-center items-center border-b border-black p-3 "}>
                            <span>
                                Weight
                            </span>
                            <div className={"flex ml-auto text-purple-500 font-bold"}>

                                {editHealthState ? (
                                    <input
                                        type="number"
                                        value={weight > 0 ? weight: null}
                                        onChange={(e) => setWeight(e.target.value)}
                                        onBlur={updateCurrentGoals}
                                        className={"outline outline-purple-500 w-1/2 self-end ml-auto rounded-full px-2 text-right"}
                                    />
                                ) : (
                                    <span>{weight > 0 ? weight: "-"}</span>
                                )}
                                <span className={"ml-1"}> Kg</span>

                            </div>
                        </div>

                        <div
                            className={"flex justify-center content-center items-center p-3"}>
                            <span>
                                Water
                            </span>
                            <div className={"flex ml-auto text-purple-500 font-bold"}>

                                {editHealthState ? (
                                    <input
                                        type="number"
                                        value={water > 0 ? water: null}
                                        onChange={(e) => setWater(e.target.value)}
                                        onBlur={updateCurrentGoals}
                                        className={"outline outline-purple-500 w-1/2 self-end ml-auto rounded-full px-2 text-right"}
                                    />
                                ) : (
                                    <span>{water > 0 ? water: "-"}</span>
                                )}

                                <span className={"ml-1"}> mL</span>
                            </div>
                        </div>

                    </div>
                </div>

            </div>


        </div>
        </div>
    )
}