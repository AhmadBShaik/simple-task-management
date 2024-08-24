import Tasks from "@/components/Tasks";

export const revalidate = 0

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <Tasks />
    </main>
  );
}
