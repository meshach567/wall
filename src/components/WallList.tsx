import WallPost from "./WallPost";

const posts = [
  { author: "Anna", text: "Hey Greg, did you debug your coffee maker yet? Last cup tasted like JavaScript errors." },
  { author: "Adelaida", text: "Greg, saw your last coding session—pretty sure you broke Stack Overflow again! 🧱" },
  { author: "Juho", text: "Greg, are you still coding in pajamas, or have you upgraded to full-time sweatpants mode?" },
  { author: "Maija", text: "Greg, rumor has it your computer has more stickers than code running on it. Confirm?" },
  { author: "Alex", text: "Yo Greg, just pulled an all-nighter on the assignment. Turns out sleep deprivation doesn’t improve coding skills. Weird!" },
  { author: "Sheryl", text: "Greg, when are we gonna deploy your latest dance moves to production? #AgileDancer" },
];

export default function WallList() {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      {posts.map((post, idx) => (
        <WallPost key={idx} author={post.author} text={post.text} />
      ))}
    </div>
  );
}
