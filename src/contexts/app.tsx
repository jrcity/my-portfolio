"use client";
import { Farro, Farsan } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import {
	LayoutDashboard,
	SquareCode,
	BrainCog,
	MessageSquare,
	Github,
	Linkedin,
	Twitter,
	MessageCircle,
} from "lucide-react";

import React from "react";
import NavBar from "@/(components)/navbar";
import Footer from "@/(components)/footer";

const farsan = Farsan({ subsets: ["latin"], weight: ["400"] });
const farro = Farro({ subsets: ["latin"], weight: ["400"] });

interface IAppContext { }

const AppContext = React.createContext<IAppContext | null>(null);

export default function AppProvider(props: React.PropsWithChildren) {
	const value = {};
	return (
		<AppContext.Provider value={value}>
			<section className="md:h-[90vh] flex flex-col items-center">
				<Image
					alt="logo"
					width={100}
					height={100}
					src={"/logo.svg"}
					className="relative md:block top-10 mx-auto"
				/>
				<h1 className={`${farsan.className} text-3xl mt-12 uppercase`}>
					@Crakton
				</h1>
				<p
					className={`${farro.className} text-center mb-4 mt-16 text-6xl text-aurora-green`}
				>
					Software Engineer
				</p>
				<div className="flex items-center space-x-3">
					<Link
						className="p-2 hover:bg-aurora-blue/30 text-star transition-all border border-aurora-blue rounded-xl"
						href=""
					>
						<MessageCircle />
					</Link>
					<Link
						className="p-2 hover:bg-aurora-blue/30 text-star transition-all border border-aurora-blue rounded-xl"
						href=""
					>
						<Github />
					</Link>
					<Link
						className="p-2 hover:bg-aurora-blue/30 text-star transition-all border border-aurora-blue rounded-xl"
						href=""
					>
						<Linkedin />
					</Link>
					<Link
						className="p-2 hover:bg-aurora-blue/30 text-star transition-all border border-aurora-blue rounded-xl"
						href=""
					>
						<Twitter />
					</Link>
				</div>
			</section>
			<div className="absolute w-[90%] mx-auto xs:hidden md:block inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
			<div className="md:hidden flex justify-around items-center fixed w-full z-20 top-0 overflow-hidden left-0 text-aurora-green bg-aurora-black/70 p-3">
				<Link href="/#intro">
					<LayoutDashboard />
				</Link>
				<Link href="/#skills">
					<BrainCog />
				</Link>
				<Link href="/#projects">
					<SquareCode />
				</Link>
				<Link href="/#contact">
					<MessageSquare />
				</Link>
			</div>
			<NavBar />
			{props.children}
			<Footer />
		</AppContext.Provider>
	);
}
