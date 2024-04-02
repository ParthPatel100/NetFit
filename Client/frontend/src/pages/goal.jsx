import React, {useState} from "react";
import {BedDouble, Weight, UtensilsCrossed, Dumbbell, Heart} from "lucide-react";

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


    const [editNutritionState, setNutritionState] = useState(true)
    const [editFitnessState, setEditFitnessState] = useState(true)
    const [editHealthState, setEditHealthState] = useState(true)

    return(
        <div className={"flex md:mt-14 md:ml-[12rem] mb-24 md:mb-16 p-2 gap-4 flex-col mx-4" }>

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

                    <div className={"text-sm bg-neutral-200 mt-2"}>
                        <div
                            className={"flex bg-inherit border-b border-black rounded-t-2xl p-3"}>
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
                        <div className={"flex justify-between bg-inherit p-3 border-b border-black"}>
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
                        <div className={"flex justify-between bg-inherit p-3 border-b border-black"}>
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
                        <div className={"flex justify-between bg-inherit p-3 border-b border-black"}>
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
                        <div className={"flex justify-between bg-inherit p-3 "}>
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

                    <div className={"text-sm bg-neutral-200 mt-2"}>
                        <div
                            className={"flex bg-inherit border-b border-black rounded-t-2xl p-3 text-neutral-600"}>
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
                            className={"flex bg-inherit border-b border-black rounded-t-2xl p-3 text-neutral-600"}>
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
                            className={"flex bg-inherit rounded-t-2xl p-3 text-neutral-600"}>
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
                                    <span>{workoutDuration}</span>
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

                    <div className={"text-sm bg-neutral-200 mt-2"}>
                        <div
                            className={"flex bg-inherit border-b border-black rounded-t-2xl p-3 text-neutral-600"}>
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
                            className={"flex bg-inherit border-b border-black rounded-t-2xl p-3 text-neutral-600"}>
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
                            className={"flex bg-inherit rounded-t-2xl p-3 text-neutral-600"}>
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