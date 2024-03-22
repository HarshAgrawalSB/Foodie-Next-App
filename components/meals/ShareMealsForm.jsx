"use client";
import { useFormStatus } from "react-dom";

const ShareMealsForm = () => {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending}>
      {pending ? "Submitting..." : "Share Meal"}
    </button>
  );
};

export default ShareMealsForm;
