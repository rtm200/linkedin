import Image from 'next/image'
import Link from 'next/link'
import { Avatar, AvatarImage } from '../avatar'
import { Bookmark, Calendar, Newspaper, Users } from 'lucide-react'

export default function LeftAside() {
    return (
        <aside className='relative w-full'>
            <div className='sticky top-18'>
                <div className='block bg-white rounded-lg border border-[rgba(0,0,0,0.1)] mb-2'>
                    <div className='relative h-15 w-full bg-rose-300 rounded-tl-lg rounded-tr-lg'>
                        <Image src='/r2.jpg' alt='bg' fill className='object-cover bg-center rounded-tl-lg rounded-tr-lg' />
                    </div>
                    <div className='p-4'>
                        <Avatar className="h-18 w-18 border-2 border-white absolute -top-11">
                            <AvatarImage src="morty.jfif" alt="user" />
                        </Avatar>
                        <h3 className='truncate text-[20px] font-semibold -mt-11'>Morty Smith</h3>
                        <p className='line-clamp-2 text-black/90 text-xs tracking-wide'>Anxiety-Driven Development (ADD), Portal Gun Maintenance, Shield Generator Troubleshooting</p>
                        <span className='text-black/50 text-xs'>Earth Dimension C-137</span>
                        <Link href='/' className='flex gap-1 items-center mt-2'>
                            <Image
                                src='/oml.png'
                                alt='company'
                                width={14}
                                height={14}
                            />
                            <span className='font-semibold text-xs text-black/90'>Oh Man LLC</span>
                        </Link>
                    </div>
                </div>
                <div className='block p-4 bg-white rounded-lg border border-[rgba(0,0,0,0.1)] mb-2'>
                    <div className='flex justify-between items-center mb-4 cursor-pointer hover:underline'>
                        <span className='text-xs font-semibold text-[rgba(0,0,0,0.9)]'>Profile views</span>
                        <span className='text-xs font-semibold text-blue-500'>17</span>
                    </div>
                    <div className='flex justify-between items-center cursor-pointer hover:underline'>
                        <span className='text-xs font-semibold text-[rgba(0,0,0,0.9)]'>Post impressions</span>
                        <span className='text-xs font-semibold text-blue-500'>27</span>
                    </div>
                </div>
                <div className='block p-4 bg-white rounded-lg border border-[rgba(0,0,0,0.1)] mb-2'>
                    <div className='flex flex-col gap-2'>
                        <span className='text-xs text-black/50 tracking-wide'>Get hired faster with monthly new features and live career talks</span>
                        <div className='flex items-center gap-1 cursor-pointer text-black/80 text-xs hover:underline hover:text-blue-500'>
                            <Image
                                src='/prem.png'
                                alt='premium'
                                width={14}
                                height={14}
                            />
                            <span className='font-semibold'>Try Premium for free</span>
                        </div>
                    </div>
                </div>
                <div className='block p-4 bg-white rounded-lg border border-[rgba(0,0,0,0.1)] mb-2'>
                    <div className='flex gap-2 items-center mb-5 cursor-pointer hover:underline'>
                        <span className='text-xs font-semibold'><Bookmark size={16} color="#000000" className='fill-black/90' /></span>
                        <span className='text-xs font-semibold text-black/90'>Saved items</span>
                    </div>
                    <div className='flex gap-2 items-center mb-5 cursor-pointer hover:underline'>
                        <span className='text-xs font-semibold'><Users size={16} color="#000000" className='fill-black/90' /></span>
                        <span className='text-xs font-semibold text-black/90'>Groups</span>
                    </div>
                    <div className='flex gap-2 items-center mb-5 cursor-pointer hover:underline'>
                        <span className='text-xs font-semibold'><Newspaper size={16} color="#000000" /></span>
                        <span className='text-xs font-semibold text-black/90'>Newsletters</span>
                    </div>
                    <div className='flex gap-2 items-center cursor-pointer hover:underline'>
                        <span className='text-xs font-semibold'><Calendar size={16} color="#000000" /></span>
                        <span className='text-xs font-semibold text-black/90'>Events</span>
                    </div>
                </div>
            </div>
        </aside>
    )
}