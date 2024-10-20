import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
	{
		filterType: "Location",
		array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
	},
	{
		filterType: "Industry",
		array: [
			"Frontend Developer",
			"Backend Developer",
			"Full Stack Developer",
		],
	},
	{
		filterType: "Salary",
		array: ["0-40k", "42-1lakh", "1lakh to 5lakh"],
	},
];

const FilterCard = () => {
	const dispatch: Dispatch = useDispatch();
	const [selectedValue, setSelectedValue] = useState<string>("");

	const changeHandler = (value: string) => {
		setSelectedValue(value);
	};

	useEffect(() => {
		dispatch(setSearchedQuery(selectedValue));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedValue]);

	return (
		<div className="w-full bg-white p-3 rounded-md">
			<h1 className="font-bold text-lg">Filter Jobs</h1>
			<hr className="mt-3" />
			<RadioGroup value={selectedValue} onValueChange={changeHandler}>
				{filterData?.map((data, index) => (
					<React.Fragment key={index + 1}>
						<div>
							<h1 className="font-bold text-lg">
								{data?.filterType}
							</h1>
							{data?.array?.map((item, idx) => {
								const itemId = `id${index}-${idx}`;
								return (
									<React.Fragment key={idx + 1}>
										<div className="flex items-center space-x-2 my-2">
											<RadioGroupItem
												value={item}
												id={itemId}
											/>
											<Label htmlFor={itemId}>
												{item}
											</Label>
										</div>
									</React.Fragment>
								);
							})}
						</div>
					</React.Fragment>
				))}
			</RadioGroup>
		</div>
	);
};

export default FilterCard;
