import React from "react";

export default function UserCard({ name }: { name: string }) {
	return (
		<article className="text-deep text-center lg:text-[18px] font-semibold rounded-lg w-[15%] bg-white/95 flex items-center justify-center drop-shadow-md">
			{name}
		</article>
	);
}
