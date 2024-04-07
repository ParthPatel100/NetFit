import React, {useContext, useEffect, useState} from "react";
import {BedDouble, Weight, UtensilsCrossed, Dumbbell, Heart} from "lucide-react";
import {UserContext} from "../../context/userContext.jsx";
import axios from "axios";

export default function GoalPage(){


    const [calories, setCaloriesGoal] = useState(2000)
    const [carbs, setCarbsGoal] = useState(20)
    const [fats, setFats] = useState(20)
    const [protein, setProtein] = useState(20)
    const [sugar, setSugar] = useState(20)

    const [sleep, setSleep] = useState(8)
    const [weight, setWeight] = useState(70)
    const [water, setWater] = useState(2000)

    const [caloriesBurn, setCaloriesBurn] = useState(800)
    const [workoutSessions, setWorkoutSessions] = useState(7)
    const [workoutDuration, setWorkoutDuration] = useState(75)


    const [editNutritionState, setNutritionState] = useState(false)
    const [editFitnessState, setEditFitnessState] = useState(false)
    const [editHealthState, setEditHealthState] = useState(false)

    const {user} = useContext(UserContext)

    console.log(user.id)

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
        <div className={"bg-gray-100 flex md:mt-14 md:ml-[12rem] pb-24 md:pb-16 p-2 gap-4 flex-col mx-4" }>

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
                            className={"flex border-b border-gray-600 rounded-t-2xl p-3"}>
                            <span>
                                Calories
                            </span>
                            <div className={"flex ml-auto text-purple-500 font-bold"}>

                                {editNutritionState ? (
                                    <input
                                        type="number"
                                        value={calories}
                                        onChange={(e) => setCaloriesGoal(e.target.value)}
                                        className={"outline outline-purple-500 w-1/2 self-end ml-auto rounded-full px-2 text-right"}
                                    />
                                ) : (
                                    <span>{calories}</span>
                                )}

                                <span className={"ml-1"}> Cal</span>
                            </div>
                        </div>
                        <div className={"flex justify-between border-b border-gray-600 p-3 "}>
                            <span>
                                Carbohydrates
                            </span>
                            <div className={"flex ml-auto text-purple-500 font-bold"}>

                                {editNutritionState ? (
                                    <input
                                        type="number"
                                        value={carbs}
                                        onChange={(e) => setCarbsGoal(e.target.value)}
                                        className={"outline outline-purple-500 w-1/2 self-end ml-auto rounded-full px-2 text-right"}
                                    />
                                ) : (
                                    <span>{carbs}</span>
                                )}

                                <span className={"ml-1"}> %</span>
                            </div>
                        </div>
                        <div className={"flex justify-between border-b border-gray-600 p-3 "}>
                            <span>
                                Fat
                            </span>
                            <div className={"flex ml-auto text-purple-500 font-bold"}>

                                {editNutritionState ? (
                                    <input
                                        type="number"
                                        value={fats}
                                        onChange={(e) => setFats(e.target.value)}
                                        className={"outline outline-purple-500 w-1/2 self-end ml-auto rounded-full px-2 text-right"}
                                    />
                                ) : (
                                    <span>{fats}</span>
                                )}

                                <span className={"ml-1"}> %</span>
                            </div>
                        </div>
                        <div className={"flex justify-between border-b border-gray-600 p-3 "}>
                            <span>
                                Protein
                            </span>
                            <div className={"flex ml-auto text-purple-500 font-bold"}>

                                {editNutritionState ? (
                                    <input
                                        type="number"
                                        value={protein}
                                        onChange={(e) => setProtein(e.target.value)}
                                        className={"outline outline-purple-500 w-1/2 self-end ml-auto rounded-full px-2 text-right"}
                                    />
                                ) : (
                                    <span>{protein}</span>
                                )}

                                <span className={"ml-1"}> %</span>
                            </div>
                        </div>
                        <div className={"flex justify-between p-3 "}>
                            <span>
                                Sugar
                            </span>
                            <div className={"flex ml-auto text-purple-500 font-bold"}>

                                {editNutritionState ? (
                                    <input
                                        type="number"
                                        value={sugar}
                                        onChange={(e) => setSugar(e.target.value)}
                                        className={"outline outline-purple-500 w-1/2 self-end ml-auto rounded-full px-2 text-right"}
                                    />
                                ) : (
                                    <span>{sugar}</span>
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
                            className={"flex border-b border-black p-3 "}>
                            <span>
                                Calories Burn
                            </span>
                            <div className={"flex ml-auto text-purple-500 font-bold"}>

                                {editFitnessState ? (
                                    <input
                                        type="number"
                                        value={caloriesBurn}
                                        onChange={(e) => setCaloriesBurn(e.target.value)}
                                        className={"outline outline-purple-500 w-1/2 self-end ml-auto rounded-full px-2 text-right"}
                                    />
                                ) : (
                                    <span>{caloriesBurn}</span>
                                )}

                                <span className={"ml-1"}> Cal</span>
                            </div>
                        </div>

                        <div
                            className={"flex border-b border-black p-3"}>
                            <span>
                                Workouts
                            </span>
                            <div className={"flex ml-auto text-purple-500 font-bold"}>

                                {editFitnessState ? (
                                    <input
                                        type="number"
                                        value={workoutSessions}
                                        onChange={(e) => setWorkoutSessions(e.target.value)}
                                        className={"outline outline-purple-500 w-1/2 self-end ml-auto rounded-full px-2 text-right"}
                                    />
                                ) : (
                                    <span>{workoutSessions}</span>
                                )}

                            </div>
                        </div>

                        <div
                            className={"flex p-3"}>
                            <span>
                                Workout Duration
                            </span>
                            <div className={"flex ml-auto text-purple-500 font-bold"}>

                                {editFitnessState ? (
                                    <input
                                        type="number"
                                        value={workoutDuration}
                                        onChange={(e) => setWorkoutDuration(e.target.value)}
                                        className={"outline outline-purple-500 w-1/2 self-end ml-auto rounded-full px-2 text-right"}
                                    />
                                ) : (
                                    <span>{workoutDuration} Min</span>
                                )}

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
                            className={"flex border-b border-black p-3"}>
                            <span>
                                Sleep
                            </span>
                            <div className={"flex ml-auto text-purple-500 font-bold"}>

                                {editHealthState ? (
                                    <input
                                        type="number"
                                        value={sleep}
                                        onChange={(e) => setSleep(e.target.value)}
                                        className={"outline outline-purple-500 w-1/2 self-end ml-auto rounded-full px-2 text-right"}
                                    />
                                ) : (
                                    <span>{sleep}</span>
                                )}

                                <span className={"ml-1"}> Hrs</span>
                            </div>
                        </div>

                        <div
                            className={"flex border-b border-black p-3 "}>
                            <span>
                                Weight
                            </span>
                            <div className={"flex ml-auto text-purple-500 font-bold"}>

                                {editHealthState ? (
                                    <input
                                        type="number"
                                        value={weight}
                                        onChange={(e) => setWeight(e.target.value)}
                                        className={"outline outline-purple-500 w-1/2 self-end ml-auto rounded-full px-2 text-right"}
                                    />
                                ) : (
                                    <span>{weight}</span>
                                )}
                                <span className={"ml-1"}> Kg</span>

                            </div>
                        </div>

                        <div
                            className={"flex p-3"}>
                            <span>
                                Water
                            </span>
                            <div className={"flex ml-auto text-purple-500 font-bold"}>

                                {editHealthState ? (
                                    <input
                                        type="number"
                                        value={water}
                                        onChange={(e) => setWater(e.target.value)}
                                        className={"outline outline-purple-500 w-1/2 self-end ml-auto rounded-full px-2 text-right"}
                                    />
                                ) : (
                                    <span>{water}</span>
                                )}

                                <span className={"ml-1"}> mL</span>
                            </div>
                        </div>

                    </div>
                </div>

            </div>


        </div>
    )
}