import { Injectable, NotFoundException } from "@nestjs/common";
import { Task } from "./task.model";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks
  }

  getTaskById(id: string): Task {
      const task = this.tasks.find(task => task.id === id);
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task

  }

  createTask(task: Task): Task {
    const newTask = {id:String(this.tasks.length), ...task}
    this.tasks.push(newTask)
    return newTask
  }

  updateTask(id: string, update: Task): Task {
  const findTask = this.getTaskById(id)
      const taskIndex = this.tasks.findIndex(task => task.id === id);
    
     this.tasks[taskIndex] = {
      ...findTask,
      ...update,
    };
     return this.getTaskById(id)

  }

  deleteTask(id: string): Task {
    const findTask = this.getTaskById(id)

    this.tasks = this.tasks.filter(task =>task.id !== id)
    return findTask
  }
}
