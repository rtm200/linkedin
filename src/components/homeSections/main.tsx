'use client'

import { Earth, Ellipsis, MessageCircleMore, Repeat2, Send, ThumbsUp, X } from "lucide-react"
import { Avatar, AvatarImage } from "../avatar"
import { useState } from "react"
import Image from "next/image"
import HeartLikeIcon from "../icons/HeartLikeIcon"
import LikeLikeIcon from "../icons/LikeLikeIcon"
import LightLikeIcon from "../icons/LightLikeIcon"

const posts = [
  {
    id: 1,
    name: "Squanchy",
    avatar: "squanchy.jpeg",
    connection: "3rd+",
    title: "Principal Solutions Architect | Head of Distributed Squanching Systems",
    time: "1w",
    desc: `It’s rare to find a leader who doesn’t just disrupt the market, but essentially creates new ones from nothing. Working alongside Rick has been a masterclass in high-stakes strategy and aggressive expansion. He’s not here to build a company; he’s here to build a legacy—regardless of who gets in the way.`,
    image: "/rick.jpg",
    likes: 238,
    comments: 28,
    reposts: 49
  },
  {
    id: 2,
    name: "Rick Sanchez",
    avatar: "rick.jpg",
    connection: "1st",
    title: "Interdimensional Scientist | Founder of Rick Industries",
    time: "3d",
    desc: `Science isn’t about WHY, it’s about WHY NOT. If you don't take risks you’ll never discover new universes.`,
    image: "/post2.png",
    likes: 512,
    comments: 92,
    reposts: 133
  },
  {
    id: 3,
    name: "Rick Sanchez",
    avatar: "rick.jpg",
    connection: "1st",
    title: "Interdimensional Scientist | Founder of Rick Industries",
    time: "6d",
    desc: `Lol.`,
    image: "/r4.webp",
    likes: 2720,
    comments: 702,
    reposts: 1033
  }
]

function Main() {

  const [expandedDesc, setExpandedDesc] = useState<{ [key: number]: boolean }>({})

  const toggleDesc = (id: number) => {
    setExpandedDesc((prev) => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  return (
    <main>

      {posts.map((post) => (

        <div key={post.id} className="bg-white rounded-lg mb-4 shadow">

          {/* Top */}
          <div className="px-4 py-3 flex items-center justify-between">
            <span className="text-xs text-black/50">Suggested</span>

            <div className="flex items-center gap-1 text-black/50">
              <Ellipsis size={16} className="cursor-pointer hover:text-black" />
              <X size={16} className="cursor-pointer hover:text-black" />
            </div>
          </div>

          {/* splitter */}
          <div className="h-px w-[calc(100%-2rem)] bg-zinc-200 mx-auto"></div>

          {/* header */}
          <div className="flex items-center gap-3 mt-4 px-4">

            <Avatar className="h-12 w-12">
              <AvatarImage src={post.avatar} alt="user" />
            </Avatar>

            <div className="flex-1 flex flex-col">

              <div className="flex gap-1 items-center">
                <span className="hover:text-[rgb(10,102,194)] hover:underline font-semibold text-lg cursor-pointer leading-tight">
                  {post.name}
                </span>
                <span className="text-xs text-black/50">• {post.connection}</span>
              </div>

              <p className="text-xs text-black/50 line-clamp-1">
                {post.title}
              </p>

              <div className="flex gap-1 items-center">
                <span className="text-xs text-black/50">{post.time} •</span>
                <Earth size={16} color="gray" />
              </div>

            </div>

            <button className="flex items-center gap-1 cursor-pointer p-1 hover:bg-[rgb(232,242,252)] text-[rgb(10,102,194)] rounded-sm font-semibold">
              <span>+</span>
              <span>Follow</span>
            </button>

          </div>

          {/* description */}
          <div className="mt-4 px-4">
            <p
              onClick={() => toggleDesc(post.id)}
              className={`text-sm text-black/80 cursor-pointer ${
                expandedDesc[post.id] ? "" : "line-clamp-2"
              }`}
            >
              {post.desc}
            </p>
          </div>

          {/* image */}
          <div className="relative w-full aspect-square mt-3">
            <Image
              src={post.image}
              alt="post"
              fill
              className="object-cover"
            />
          </div>

          {/* footer */}
          <div className="px-4 py-3 flex flex-col gap-1">

            <div className="flex justify-between items-center">

              <div className="flex items-center gap-1 text-black/50 text-md">
                <div className="flex items-center">
                  <LightLikeIcon />
                  <LikeLikeIcon />
                  <HeartLikeIcon />
                </div>

                <span className="hover:text-[rgb(10,102,194)] hover:underline cursor-pointer">
                  {post.likes}
                </span>
              </div>

              <div className="flex items-center gap-1 text-black/50 text-md">
                <span className="hover:text-[rgb(10,102,194)] hover:underline cursor-pointer">
                  {post.comments} comments
                </span>

                <span>.</span>

                <span className="hover:text-[rgb(10,102,194)] hover:underline cursor-pointer">
                  {post.reposts} reposts
                </span>
              </div>

            </div>

            

            <div className="flex items-center border-t pt-2 border-zinc-200">

              <button className="flex items-center justify-center h-10 gap-1 cursor-pointer hover:bg-gray-100 flex-1 text-black/70 font-semibold text-md rounded duration-200">
                <ThumbsUp size={16} />
                <span>Like</span>
              </button>

              <button className="flex items-center justify-center h-10 gap-1 cursor-pointer hover:bg-gray-100 flex-1 text-black/70 font-semibold text-md rounded duration-200">
                <MessageCircleMore size={16} />
                <span>Comment</span>
              </button>

              <button className="flex items-center justify-center h-10 gap-1 cursor-pointer hover:bg-gray-100 flex-1 text-black/70 font-semibold text-md rounded duration-200">
                <Repeat2 size={16} />
                <span>Repost</span>
              </button>

              <button className="flex items-center justify-center h-10 gap-1 cursor-pointer hover:bg-gray-100 flex-1 text-black/70 font-semibold text-md rounded duration-200">
                <Send size={16} />
                <span>Send</span>
              </button>

            </div>

          </div>

        </div>

      ))}

    </main>
  )
}

export default Main