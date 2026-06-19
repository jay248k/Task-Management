// app/page.tsx
import TaskList from "@/components/TaskList";
import ToastProvider from "@/components/ToastProvider";

export default function Page() {
  return (
    <>
      <ToastProvider />
      <TaskList />
    </>
  );
}