import { useDispatch } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Dispatch } from "@reduxjs/toolkit";
import { setSearchedQuery } from "@/redux/jobSlice";
import { appendBaseURL } from "@/_helpers/common_functions";

const category: string[] = [
	"Frontend Developer",
	"Backend Developer",
	"Data Science",
	"Graphic Designer",
	"FullStack Developer",
];

const CategoryCarousel = () => {
	const dispatch: Dispatch = useDispatch();
	const navigate: NavigateFunction = useNavigate();

	const searchJobHandler = (query: string) => {
		dispatch(setSearchedQuery(query));
		navigate(appendBaseURL("/browse"));
	};

	return (
		<div>
			<Carousel className="w-full max-w-xl mx-auto my-20">
				<CarouselContent>
					{category?.map((cat: string, index: number) => (
						<CarouselItem
							className="md:basis-1/2 lg-basis-1/3"
							key={index + 1}
						>
							<Button
								onClick={() => searchJobHandler(cat)}
								variant="outline"
								className="rounded-full"
							>
								{cat}
							</Button>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</div>
	);
};

export default CategoryCarousel;
