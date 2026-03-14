'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Avatar, AvatarImage } from './avatar'
import { ChevronDown, ChevronUp, Ellipsis, SquarePen, Search, ArrowLeft, Phone, Video, Info, Send, Smile, Image, Paperclip } from 'lucide-react'

interface Conversation {
    id: number
    name: string
    avatar?: string
    initials?: string
    message: string
    time: string
    unread: number
    online: boolean
}

interface Message {
    id: number
    text: string
    sender: 'me' | 'them'
    time: string
}

const conversations: Conversation[] = [
    {
        id: 1,
        name: 'Sarah Chen',
        avatar: 'morty.jfif',
        message: "That sounds great! Let's connect next week.",
        time: '2m',
        unread: 2,
        online: true,
    },
    {
        id: 2,
        name: 'Marcus Johnson',
        initials: 'MJ',
        message: 'Thanks for sharing that article, really insightful!',
        time: '1h',
        unread: 0,
        online: false,
    },
    {
        id: 3,
        name: 'Priya Patel',
        initials: 'PP',
        message: 'Would love to hear more about your experience at...',
        time: '3h',
        unread: 1,
        online: true,
    },
    {
        id: 4,
        name: 'David Kim',
        initials: 'DK',
        message: 'Congratulations on the new role! 🎉',
        time: '1d',
        unread: 0,
        online: false,
    },
    {
        id: 5,
        name: 'Emma Wilson',
        initials: 'EW',
        message: 'I saw your post about React — totally agree with...',
        time: '2d',
        unread: 0,
        online: false,
    },
    {
        id: 6,
        name: 'James Rodriguez',
        initials: 'JR',
        message: 'Can we schedule a quick call this week?',
        time: '3d',
        unread: 0,
        online: true,
    },
]

const MOCK_MESSAGES: Record<number, Message[]> = {
    1: [
        { id: 1, text: "Hey! I saw your post about the new project. Really impressive work!", sender: 'them', time: '10:02 AM' },
        { id: 2, text: "Thank you so much! It was quite a journey to get there.", sender: 'me', time: '10:04 AM' },
        { id: 3, text: "That sounds great! Let's connect next week.", sender: 'them', time: '10:05 AM' },
    ],
    2: [
        { id: 1, text: "Did you read that article on distributed systems?", sender: 'me', time: 'Yesterday' },
        { id: 2, text: "Thanks for sharing that article, really insightful!", sender: 'them', time: 'Yesterday' },
    ],
    3: [
        { id: 1, text: "Hi! I noticed we both worked at similar companies.", sender: 'them', time: '3h ago' },
        { id: 2, text: "Would love to hear more about your experience at...", sender: 'them', time: '3h ago' },
    ],
    4: [
        { id: 1, text: "Just saw your announcement!", sender: 'them', time: '1d ago' },
        { id: 2, text: "Congratulations on the new role! 🎉", sender: 'them', time: '1d ago' },
    ],
    5: [
        { id: 1, text: "I saw your post about React — totally agree with your take on server components!", sender: 'them', time: '2d ago' },
    ],
    6: [
        { id: 1, text: "Hey, hope you're doing well!", sender: 'them', time: '3d ago' },
        { id: 2, text: "Can we schedule a quick call this week?", sender: 'them', time: '3d ago' },
    ],
}

const AVATAR_COLORS: string[] = [
    'bg-blue-500',
    'bg-emerald-500',
    'bg-violet-500',
    'bg-amber-500',
    'bg-rose-500',
    'bg-cyan-500',
]

interface UserAvatarProps {
    conversation: Conversation
    size?: 'sm' | 'md'
}

function UserAvatar({ conversation, size = 'md' }: UserAvatarProps) {
    const sizeClass = size === 'sm' ? 'h-8 w-8 text-xs' : 'h-12 w-12 text-sm'
    const dotClass = size === 'sm' ? 'h-2.5 w-2.5 bottom-0 right-0' : 'h-3 w-3 bottom-0 right-0'

    return (
        <div className="relative flex-shrink-0">
            {conversation.avatar ? (
                <Avatar className={sizeClass}>
                    <AvatarImage src={conversation.avatar} alt={conversation.name} />
                </Avatar>
            ) : (
                <div className={`${sizeClass} ${AVATAR_COLORS[conversation.id % AVATAR_COLORS.length]} rounded-full flex items-center justify-center text-white font-semibold`}>
                    {conversation.initials}
                </div>
            )}
            {conversation.online && (
                <span className={`absolute ${dotClass} bg-green-500 rounded-full border-2 border-white`} />
            )}
        </div>
    )
}

export default function Messaging() {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [searchFocused, setSearchFocused] = useState<boolean>(false)
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [activeConv, setActiveConv] = useState<Conversation | null>(null)
    const [messages, setMessages] = useState<Record<number, Message[]>>(MOCK_MESSAGES)
    const [inputValue, setInputValue] = useState<string>('')
    const [unreadMap, setUnreadMap] = useState<Record<number, number>>(
        Object.fromEntries(conversations.map(c => [c.id, c.unread]))
    )

    const messagesEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const totalUnread = Object.values(unreadMap).reduce((a, b) => a + b, 0)

    const filtered = conversations.filter(
        (c) =>
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.message.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    useEffect(() => {
        if (activeConv) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
            inputRef.current?.focus()
        }
    }, [activeConv, messages])

    function openConversation(conv: Conversation) {
        setActiveConv(conv)
        setUnreadMap(prev => ({ ...prev, [conv.id]: 0 }))
    }

    function closeChat() {
        setActiveConv(null)
    }

    function sendMessage() {
        if (!inputValue.trim() || !activeConv) return
        const newMsg: Message = {
            id: Date.now(),
            text: inputValue.trim(),
            sender: 'me',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
        setMessages(prev => ({
            ...prev,
            [activeConv.id]: [...(prev[activeConv.id] ?? []), newMsg],
        }))
        setInputValue('')
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            sendMessage()
        }
    }

    const panelHeight = isOpen ? (activeConv ? '480px' : '480px') : '48px'

    return (
        <div className="fixed right-4 bottom-0 z-50" style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
            <div
                className="bg-white rounded-t-xl overflow-hidden"
                style={{
                    width: '320px',
                    boxShadow: '0 0 0 1px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.16)',
                    maxHeight: panelHeight,
                    transition: 'max-height 0.28s cubic-bezier(0.4,0,0.2,1)',
                }}
            >
                {/* ── Header ── */}
                <div
                    onClick={() => {
                        if (activeConv) { closeChat(); return }
                        setIsOpen(prev => !prev)
                    }}
                    className="flex items-center justify-between gap-2 px-4 h-12 cursor-pointer select-none bg-white hover:bg-gray-100 duration-100 flex-shrink-0"
                    style={{ boxShadow: '0 1px 0 rgba(0,0,0,0.08)' }}
                >
                    <div className="flex items-center gap-2">
                        {activeConv ? (
                            <>
                                <button
                                    onClick={(e) => { e.stopPropagation(); closeChat() }}
                                    className="hover:bg-black/[0.06] rounded-full p-1 -ml-1 transition-colors text-black/60 hover:text-black/80"
                                >
                                    <ArrowLeft size={15} />
                                </button>
                                <UserAvatar conversation={activeConv} size="sm" />
                                <div className="flex flex-col leading-tight">
                                    <span className="font-semibold text-xs text-black/80">{activeConv.name}</span>
                                    {activeConv.online && (
                                        <span className="text-[10px] text-green-600 font-medium">Active now</span>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                <Avatar className="h-7 w-7">
                                    <AvatarImage src="morty.jfif" alt="user" />
                                </Avatar>
                                <span className="font-semibold text-sm text-black/80">Messaging</span>
                                {totalUnread > 0 && !isOpen && (
                                    <span className="h-4 w-4 bg-[#0a66c2] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                        {totalUnread}
                                    </span>
                                )}
                            </>
                        )}
                    </div>

                    <div className="flex items-center gap-1 text-black/50">
                        {activeConv ? (
                            <>
                                <button onClick={(e) => e.stopPropagation()} className="hover:text-black/80 hover:bg-black/[0.06] rounded-full p-1.5 transition-colors">
                                    <Phone size={15} />
                                </button>
                                <button onClick={(e) => e.stopPropagation()} className="hover:text-black/80 hover:bg-black/[0.06] rounded-full p-1.5 transition-colors">
                                    <Video size={15} />
                                </button>
                                <button onClick={(e) => e.stopPropagation()} className="hover:text-black/80 hover:bg-black/[0.06] rounded-full p-1.5 transition-colors">
                                    <Info size={15} />
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); setIsOpen(prev => !prev) }}
                                    className="hover:text-black/80 hover:bg-black/[0.06] rounded-full p-1.5 transition-colors"
                                >
                                    {isOpen ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                                </button>
                            </>
                        ) : (
                            <>
                                <button onClick={(e: React.MouseEvent) => e.stopPropagation()} className="hover:text-black/80 hover:bg-black/[0.06] rounded-full p-1.5 transition-colors">
                                    <Ellipsis size={16} />
                                </button>
                                <button onClick={(e: React.MouseEvent) => e.stopPropagation()} className="hover:text-black/80 hover:bg-black/[0.06] rounded-full p-1.5 transition-colors">
                                    <SquarePen size={16} />
                                </button>
                                <button className="hover:text-black/80 hover:bg-black/[0.06] rounded-full p-1.5 transition-colors">
                                    {isOpen ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* ── Chat view ── */}
                {activeConv && (
                    <div className="flex flex-col" style={{ height: '430px' }}>
                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2" style={{ background: '#f9f9f9' }}>
                            {(messages[activeConv.id] ?? []).map((msg) => (
                                <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} items-end gap-2`}>
                                    {msg.sender === 'them' && (
                                        <div className="flex-shrink-0 mb-0.5">
                                            <UserAvatar conversation={activeConv} size="sm" />
                                        </div>
                                    )}
                                    <div className="flex flex-col gap-0.5 max-w-[75%]">
                                        <div
                                            className={`px-3 py-2 rounded-2xl text-sm leading-snug ${
                                                msg.sender === 'me'
                                                    ? 'bg-[#0a66c2] text-white rounded-br-sm'
                                                    : 'bg-white text-black/80 rounded-bl-sm shadow-sm border border-black/[0.06]'
                                            }`}
                                        >
                                            {msg.text}
                                        </div>
                                        <span className={`text-[10px] text-black/30 ${msg.sender === 'me' ? 'text-right' : 'text-left'}`}>
                                            {msg.time}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="border-t border-black/[0.08] bg-white px-3 pt-2 pb-3">
                            <div className="flex items-center gap-2 rounded-2xl border border-black/[0.15] px-3 py-1.5 focus-within:border-[#0a66c2] transition-colors bg-white">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    placeholder="Write a message…"
                                    value={inputValue}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="flex-1 text-sm bg-transparent outline-none text-black/80 placeholder-black/30"
                                />
                                <div className="flex items-center gap-1 text-black/30">
                                    <button className="hover:text-black/50 transition-colors p-0.5">
                                        <Smile size={15} />
                                    </button>
                                    <button className="hover:text-black/50 transition-colors p-0.5">
                                        <Image size={15} />
                                    </button>
                                    <button className="hover:text-black/50 transition-colors p-0.5">
                                        <Paperclip size={15} />
                                    </button>
                                    <button
                                        onClick={sendMessage}
                                        disabled={!inputValue.trim()}
                                        className={`p-0.5 transition-colors ${inputValue.trim() ? 'text-[#0a66c2] hover:text-[#004182]' : 'text-black/20 cursor-not-allowed'}`}
                                    >
                                        <Send size={15} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── Conversation list view ── */}
                {!activeConv && (
                    <>
                        {/* Search */}
                        <div className="px-3 pt-3 pb-2 border-b border-black/[0.08]">
                            <div
                                className="flex items-center gap-2 rounded-md px-3 py-1.5 transition-colors"
                                style={{
                                    background: searchFocused ? '#fff' : '#f3f2ef',
                                    border: searchFocused ? '2px solid #0a66c2' : '2px solid transparent',
                                }}
                            >
                                <Search size={14} className="text-black/40 flex-shrink-0" />
                                <input
                                    type="text"
                                    placeholder="Search messages"
                                    value={searchQuery}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                                    onFocus={() => setSearchFocused(true)}
                                    onBlur={() => setSearchFocused(false)}
                                    className="w-full text-sm bg-transparent outline-none text-black/80 placeholder-black/40"
                                />
                            </div>
                        </div>

                        {/* List */}
                        <div className="overflow-y-auto pb-2" style={{ height: '380px' }}>
                            {filtered.length === 0 ? (
                                <div className="py-8 text-center text-sm text-black/40">No conversations found</div>
                            ) : (
                                filtered.map((conv) => (
                                    <div
                                        key={conv.id}
                                        onClick={() => openConversation(conv)}
                                        className="flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-black/[0.05] transition-colors"
                                    >
                                        <UserAvatar conversation={conv} size="md" />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-1">
                                                <span className={`text-sm truncate ${unreadMap[conv.id] ? 'font-semibold text-black' : 'font-medium text-black/80'}`}>
                                                    {conv.name}
                                                </span>
                                                <span className="text-xs text-black/40 flex-shrink-0">{conv.time}</span>
                                            </div>
                                            <div className="flex items-center justify-between gap-1 mt-0.5">
                                                <span className={`text-xs truncate ${unreadMap[conv.id] ? 'text-black/70 font-medium' : 'text-black/40'}`}>
                                                    {conv.message}
                                                </span>
                                                {unreadMap[conv.id] > 0 && (
                                                    <span className="flex-shrink-0 h-4 w-4 bg-[#0a66c2] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                                        {unreadMap[conv.id]}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}