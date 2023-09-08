import { task } from "./task-model"

export interface functionality{
    functionalityID: number;
    name: string;
    state: "ToDo" | "Doing" | "Done";
    tasks?: task[];
}