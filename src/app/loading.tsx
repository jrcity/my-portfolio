import Image from "next/image";

export default function Loading() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-900">
			<div className="relative w-32 h-32">
				<Image
					className="animate-pulse object-contain"
					fill
					priority
					src="/brand-logo.png"
					alt="Loading"
				/>
			</div>
		</div>
	);
}
