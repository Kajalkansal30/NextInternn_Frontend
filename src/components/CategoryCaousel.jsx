import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "Fullstack Developer"
]

const CategoryCaousel = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }
    return (
        <div>
            <Carousel className="w-full max-w-xl mx-auto my-20">
                <CarouselContent className="flex gap-4 overflow-hidden">
                    {
                        category.map((cat, index) => (
                            <CarouselItem
                                key={index}
                                className="md:basis-1/2 lg:basis-1/3 flex justify-center transition-transform duration-300 ease-in-out hover:scale-105"
                            >
                                <button
                                    onClick={() => searchJobHandler(cat)}
                                    className="px-6 py-2 text-lg font-semibold border-2 border-[#5ce1e6] text-gray-800 rounded-full shadow-md hover:bg-[#5ce1e6] hover:text-white transition-all duration-300 ease-in-out active:scale-95"
                                >
                                    {cat}
                                </button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious className="text-[#5ce1e6] hover:text-white hover:bg-[#5ce1e6] transition duration-300" />
                <CarouselNext className="text-[#5ce1e6] hover:text-white hover:bg-[#5ce1e6] transition duration-300" />
            </Carousel>
        </div>

    );
};

export default CategoryCaousel