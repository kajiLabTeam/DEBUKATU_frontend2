import React from "react";
import type { User } from "../types/user";


export const ListItem = (props: User) => {
	const { id, name } = props
	return (
		<p>
			{id}:{name}
		</p>
	);
};