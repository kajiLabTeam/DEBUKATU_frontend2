import React from "react";
type ListItemProps = {
	id: number;
	name: string;
};
export const ListItem = (props: ListItemProps) => {
	const { id, name } = props
	return (
		<p>
			{id}:{name}
		</p>
	);
};