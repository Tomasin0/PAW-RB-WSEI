import { functionality } from "../models/functionality-model";

const key = 'functionalities';

export const AddFunctionality=async(data:functionality)=>{
    let currentData:any[] = [...await GetFunctionalities()]
    console.log(currentData)
    currentData.push(data)
    SaveFunctionalities(currentData)
}

const GetFunctionalities = async()=>{
    const functionalities = JSON.parse(localStorage.getItem(key) || "[]") || '';
    return functionalities;
}

export const SaveFunctionalities = async(data:functionality[]) =>{
    console.log([...data])
    localStorage.setItem(key, JSON.stringify(data));
}


