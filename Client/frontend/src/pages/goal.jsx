import React, {useState} from "react";
import {Weight} from "lucide-react";

export default function GoalPage(){

    const [weightGoal, setWeightGoal] = useState()


    return(
        <div className={"flex md:mt-14 md:ml-[12rem] mb-16 md:mb-0 p-4 gap-4"}>
            <div className={"flex rounded-xl p-2 bg-slate-200 w-[45%]"}>
                <span className={"text-lg flex flex-row gap-2"}>
                    <Weight/>
                    Weight
                </span>
            </div>


        </div>
    )
}