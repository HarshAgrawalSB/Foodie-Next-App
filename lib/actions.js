"use server";

import { revalidatePath } from "next/cache";
import { saveMeal } from "./meals";
import { redirect } from "next/navigation";

const isValidInput = (text) => {
  return !text || text.trim() === "";
};

export const shareMeal = async (prevState, formData) => {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (
    isValidInput(meal.title) ||
    isValidInput(meal.summary) ||
    isValidInput(meal.instructions) ||
    isValidInput(meal.creator) ||
    isValidInput(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  )
    return {
      message: "Invalid Input",
    };
  await saveMeal(meal);
  revalidatePath("/meals");
  redirect("/meals");
};
