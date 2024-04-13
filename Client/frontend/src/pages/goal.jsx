import React, {useContext, useEffect, useState} from "react";
import {UtensilsCrossed, Dumbbell, Heart} from "lucide-react";
import axios from "axios";
import {GoalAndTrackContext} from "../../context/goalAndTrackContextProvider.jsx";

export default function GoalPage(){
    const {caloriesGoals, setCaloriesGoals, carbsGoals, setCarbsGoals,fatsGoals, setFatsGoals,proteinGoals, setProteinGoals,sugarGoals, setSugarGoals,
        sleepGoals, setSleepGoals,weightGoals, setWeightGoals,waterGoals, setWaterGoals,caloriesBurnGoals, setCaloriesBurnGoals,workoutSessionsGoals,
        setWorkoutSessionsGoals,workoutDurationGoals, setWorkoutDurationGoals} = useContext(GoalAndTrackContext)

    const [editNutritionState, setNutritionState] = useState(false)
    const [editFitnessState, setEditFitnessState] = useState(false)
    const [editHealthState, setEditHealthState] = useState(false)


    useEffect(() => {
        getCurrentGoals().then()
    }, []);


    function setAllInfo(data){
        setCaloriesGoals(data.calories)
        setCarbsGoals(data.carbohydrates)
        setFatsGoals(data.fat)
        setProteinGoals(data.protein)
        setSugarGoals(data.sugar)
        setSleepGoals(data.sleep)
        setWeightGoals(data.weight)
        setWaterGoals(data.water)
        setCaloriesBurnGoals(data.calories_burn)
        setWorkoutSessionsGoals(data.workouts)
        setWorkoutDurationGoals(data.workout_duration)
    }

    async function updateCurrentGoals(){
        console.log("Updating")
        const updatedGoalsData = {
            calories: caloriesGoals,
            carbohydrates: carbsGoals, // we need references
            fat: fatsGoals, // we need references
            protein: proteinGoals, // we need references
            sugar: sugarGoals,
            calories_burn: caloriesBurnGoals,
            workouts: workoutSessionsGoals,
            workout_duration: workoutDurationGoals,
            sleep: sleepGoals,
            weight: weightGoals,
            water: waterGoals
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
        <div className={"bg-gray-100 min-h-screen"}>

        <div className={" flex md:mt-14 md:ml-[12rem] pb-24 md:pb-16 p-2 gap-4 flex-col mx-4" }>
            <div className="flex md:m-4 m-1">
                <span className={"text-3xl text-neutral-600 font-bold"}>
                    Your Fitness <span className={"text-purple-600"}>Goals</span>
                </span>
            </div>
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
                                        value={caloriesGoals > 0 ? caloriesGoals: null}
                                        onChange={(e) => setCaloriesGoals(e.target.value)}
                                        onBlur={updateCurrentGoals}
                                        className={"outline outline-purple-500 w-1/2 self-end ml-auto rounded-full px-2 text-right"}
                                    />
                                ) : (
                                    <span>{caloriesGoals > 0 ? caloriesGoals: "-"}</span>
                                )}

                                <span className={"ml-1"}> Cal</span>
                            </div>
                        </div>
                        <div className={"flex justify-center content-center items-center border-b border-gray-600 p-3 "}>
                            <span>
                                Carbohydrates
                            </span>
                            <div className={"flex ml-auto text-purple-500 font-bold"}>

                                {editNutritionState ? (
                                    <input
                                        type="number"
                                        value={carbsGoals > 0 ? carbsGoals : null}
                                        onChange={(e) => setCarbsGoals(e.target.value)}
                                        onBlur={updateCurrentGoals}
                                        className={"outline outline-purple-500 w-1/2 self-end ml-auto rounded-full px-2 text-right"}
                                    />
                                ) : (
                                    <span>{carbsGoals > 0 ? carbsGoals : "-"}</span>
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
                                        value={fatsGoals > 0 ? fatsGoals: null}
                                        onChange={(e) => setFatsGoals(e.target.value)}
                                        onBlur={updateCurrentGoals}
                                        className={"outline outline-purple-500 w-1/2 self-end ml-auto rounded-full px-2 text-right"}
                                    />
                                ) : (
                                    <span>{fatsGoals > 0 ? fatsGoals: "-"}</span>
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
                                        value={proteinGoals > 0 ? proteinGoals: null}
                                        onChange={(e) => setProteinGoals(e.target.value)}
                                        onBlur={updateCurrentGoals}
                                        className={"outline outline-purple-500 w-1/2 self-end ml-auto rounded-full px-2 text-right"}
                                    />
                                ) : (
                                    <span>{proteinGoals > 0 ? proteinGoals: "-"}</span>
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
                                        value={sugarGoals > 0 ? sugarGoals: null}
                                        onChange={(e) => setSugarGoals(e.target.value)}
                                        onBlur={updateCurrentGoals}
                                        className={"outline outline-purple-500 w-1/2 self-end ml-auto rounded-full px-2 text-right"}
                                    />
                                ) : (
                                    <span>{sugarGoals > 0 ? sugarGoals: "-"}</span>
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
                                        value={caloriesBurnGoals > 0 ? caloriesBurnGoals: null}
                                        onChange={(e) => setCaloriesBurnGoals(e.target.value)}
                                        onBlur={updateCurrentGoals}
                                        className={"outline outline-purple-500 w-1/2 self-end ml-auto rounded-full px-2 text-right"}
                                    />
                                ) : (
                                    <span>{caloriesBurnGoals > 0 ? caloriesBurnGoals: "-"}</span>
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
                                        value={workoutSessionsGoals > 0 ? workoutSessionsGoals: null}
                                        onChange={(e) => setWorkoutSessionsGoals(e.target.value)}
                                        onBlur={updateCurrentGoals}
                                        className={"outline outline-purple-500 w-1/2 self-end ml-auto rounded-full px-2 text-right"}
                                    />
                                ) : (
                                    <span>{workoutSessionsGoals > 0 ? workoutSessionsGoals: "-"}</span>
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
                                        value={workoutDurationGoals > 0 ? workoutDurationGoals : null}
                                        onChange={(e) => setWorkoutDurationGoals(e.target.value)}
                                        onBlur={updateCurrentGoals}
                                        className={"outline outline-purple-500 w-1/2 self-end ml-auto rounded-full px-2 text-right"}
                                    />
                                ) : (
                                    <span>{workoutDurationGoals > 0 ? workoutDurationGoals : "-"}</span>
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
                                        value={sleepGoals > 0 ? sleepGoals: null}
                                        onChange={(e) => setSleepGoals(e.target.value)}
                                        onBlur={updateCurrentGoals}
                                        className={"outline outline-purple-500 w-1/2 self-end ml-auto rounded-full px-2 text-right"}
                                    />
                                ) : (
                                    <span>{sleepGoals > 0 ? sleepGoals: "-"}</span>
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
                                        value={weightGoals > 0 ? weightGoals: null}
                                        onChange={(e) => setWeightGoals(e.target.value)}
                                        onBlur={updateCurrentGoals}
                                        className={"outline outline-purple-500 w-1/2 self-end ml-auto rounded-full px-2 text-right"}
                                    />
                                ) : (
                                    <span>{weightGoals > 0 ? weightGoals: "-"}</span>
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
                                        value={waterGoals > 0 ? waterGoals: null}
                                        onChange={(e) => setWaterGoals(e.target.value)}
                                        onBlur={updateCurrentGoals}
                                        className={"outline outline-purple-500 w-1/2 self-end ml-auto rounded-full px-2 text-right"}
                                    />
                                ) : (
                                    <span>{waterGoals > 0 ? waterGoals: "-"}</span>
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