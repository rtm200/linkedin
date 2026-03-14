'use client'
import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import LinkedInIcon from "../icons/LinkedInIcon";
import Image from "next/image";
import { Avatar, AvatarImage } from "../avatar";
import GridIcon from "../icons/GridIcon";
import Puzzle1Icon from "../icons/Puzzle1Icon";
import Puzzle2Icon from "../icons/Puzzle2Icon";
import Puzzle3Icon from "../icons/Puzzle3Icon";
import Puzzle4Icon from "../icons/Puzzle4Icon";
import Puzzle5Icon from "../icons/Puzzle5Icon";

export default function RightAside() {
  const [showAll, setShowAll] = useState(false);

  const games = [
    {
      title: "Zip",
      number: "#360",
      description: "Complete the path",
      svg:<Puzzle3Icon />,
    },
    {
      title: "Mini Sudoku",
      number: "#213",
      description: "The classic game",
      svg:<Puzzle4Icon  />,
    },
    {
      title: "Tango",
      number: "#521",
      description: "Harmonize the grid",
      svg:<Puzzle5Icon />,
    },
    {
      title: "Word Ladder",
      number: "#101",
      description: "Transform the word",
      svg:<Puzzle2Icon />,
    },
    {
      title: "Cross Logic",
      number: "#78",
      description: "Solve the puzzle grid",
      svg:<Puzzle1Icon />,
    },
  ];

  const connections = [
    {
      title: "Rick Sanchez",
      header: "Interdimensional Scientist",
      pfp: "rick.jpg",
    },
    {
      title: "Squanchy",
      header: "Solutions Architect ",
      pfp: "squanchy.jpeg",
    },
    {
      title: "Jerry smith",
      header: "Just jerry",
      pfp: "jerry.jpg",
    },
  ];

  const visibleGames = showAll ? games : games.slice(0, 3);

  return (
    <aside className="relative w-full">
      <div className="bg-white rounded-lg mb-2">
        <h3 className="p-4 text-zinc-700 font-semibold text-lg">Today’s puzzle games</h3>

        <div className="flex flex-col duration-100">
          {visibleGames.map((game, index) => (
            <div
              key={index}
              className="hover:bg-gray-100 cursor-pointer flex items-center justify-between py-2 px-4"
            >
              <div className="flex items-center gap-2">
                <span>{game.svg}</span>

                <div className="flex flex-col gap-0">
                  <h4 className="font-semibold leading-tight">
                    {game.title}{" "}
                    <span className="text-zinc-500 font-normal">
                      {game.number}
                    </span>
                  </h4>
                  <span className="text-xs text-zinc-500 leading-tight">
                    {game.description}
                  </span>
                </div>
              </div>

              <ChevronRight size={22} className="text-black/70" />
            </div>
          ))}

          {games.length > 3 && (
            <div className="p-4">
              <div
                onClick={() => setShowAll(!showAll)}
                className="inline-flex gap-2 cursor-pointer hover:bg-gray-200 text-zinc-700 hover:text-zinc-900 w-auto px-1 rounded"
              >
                <span>{showAll ? "Show less" : "Show more"}</span>
                <ChevronDown
                  size={22}
                  className={`text-zinc-700 transition-transform ${showAll ? "rotate-180" : ""
                    }`}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg mb-2 p-4">
        <h3 className="text-zinc-700 font-semibold text-lg mb-4">Add to your feed</h3>

        <div className="flex flex-col gap-4">
          {connections.map((connection, index) => (
            <div
              key={index}
              className="flex items-center gap-2"
            >
              <Avatar className="h-12 w-12">
                <AvatarImage src={connection.pfp} alt="user" />
              </Avatar>
              <div className="flex flex-col justify-center">
                <h4 className="text-md font-semibold">{connection.title}</h4>
                <span className="text-xs text-zinc-500 mb-1">{connection.header}</span>
                <button className="max-w-25 border border-zinc-700 cursor-pointer flex gap-2 items-center justify-center px-4 h-8 rounded-full hover:border-[rgb(10,102,194)] hover:text-[rgb(10,102,194)] duration-200">
                  <span>Follow</span>
                  <Plus size={16}/>
                </button>
              </div>
            </div>
          ))}
          <div className="">
              <div className="inline-flex gap-1 cursor-pointer hover:bg-gray-200 text-zinc-700 hover:text-zinc-900 w-auto px-1 rounded">
                <span>View all recommendations</span>
                <ChevronRight
                  size={20}
                  className='text-zinc-700'
                />
              </div>
          </div>

        </div>
      </div>

      <div className="sticky top-18">
        <div className="relative w-full aspect-square shadow border border-zinc-300 rounded-lg mb-4">
          <Image
            src='/r3.jpg'
            alt="post"
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <ul className="flex flex-wrap justify-center items-center gap-1 text-[13px] text-zinc-500">
          <li className="mx-1">
            <Link href='/' className="hover:underline hover:text-[rgb(10,102,194)]">About</Link>
          </li>
          <li className="mx-1">
            <Link href='/' className="hover:underline hover:text-[rgb(10,102,194)]">Accessibility</Link>
          </li>
          <li className="mx-1">
            <Link href='/' className="hover:underline hover:text-[rgb(10,102,194)]">Help Center</Link>
          </li>
          <li className="mx-1">
            <Link href='/' className="hover:underline hover:text-[rgb(10,102,194)]">Privacy & Terms</Link>
          </li>
          <li className="mx-1">
            <Link href='/' className="hover:underline hover:text-[rgb(10,102,194)]">Ad Choices</Link>
          </li>
          <li className="mx-1">
            <Link href='/' className="hover:underline hover:text-[rgb(10,102,194)]">Advertising</Link>
          </li>
          <li className="mx-1">
            <Link href='/' className="hover:underline hover:text-[rgb(10,102,194)]">Business Services</Link>
          </li>
          <li className="mx-1">
            <Link href='/' className="hover:underline hover:text-[rgb(10,102,194)]">Get the LinkedIn app</Link>
          </li>
          <li className="mx-1">
            <Link href='/' className="hover:underline hover:text-[rgb(10,102,194)]">More</Link>
          </li>
        </ul>
        <div className="flex items-center gap-1 mt-4 justify-center">
          <LinkedInIcon />
          <span className="text-xs">LinkedIn Corporation © 2026</span>
        </div>
      </div>
    </aside>
  );
}