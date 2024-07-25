import React from "react";

export default function UserCard({ name }: { name: string }) {
	return (
		<article className="text-deep text-center lg:text-[20px] font-semibold tracking-wide rounded-lg w-[20%] bg-white/90 flex items-center justify-center drop-shadow-md">
			{name}
		</article>
	);
}
