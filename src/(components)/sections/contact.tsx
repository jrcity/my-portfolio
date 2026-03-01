'use client'

import { motion } from 'framer-motion'
import { Mail, MapPin, Send } from 'lucide-react'
import { useState } from 'react'
import ContactForm from '../ui/contact-form'
import SocialLinks from '../ui/social-links'

export default function Contact() {
	return (
		<section id="contact" className="py-20">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
					<p className="text-xl text-muted-foreground">Let's discuss your next project</p>
				</motion.div>

				<div className="max-w-4xl mx-auto">
					<div className="grid lg:grid-cols-2 gap-12">
						<motion.div
							initial={{ opacity: 0, x: -50 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							className="space-y-8"
						>
							<h3 className="text-2xl font-bold text-purple-400">Let's Connect</h3>
							<p className="text-lg text-muted-foreground">
								I'm always interested in new opportunities and exciting projects.
								Whether you have a question or just want to say hi, feel free to reach out!
							</p>

							<div className="space-y-4">
								<div className="flex items-center space-x-4">
									<div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
										<Mail className="w-6 h-6 text-white" />
									</div>
									<div>
										<p className="font-semibold">Email</p>
										<p className="text-muted-foreground">redemptionjonathan1@gmail.com</p>
									</div>
								</div>

								<div className="flex items-center space-x-4">
									<div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
										<MapPin className="w-6 h-6 text-white" />
									</div>
									<div>
										<p className="font-semibold">Location</p>
										<p className="text-muted-foreground">Remote / Available Worldwide</p>
									</div>
								</div>
							</div>

							<SocialLinks />
						</motion.div>

						<motion.div
							initial={{ opacity: 0, x: 50 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
						>
							<ContactForm />
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	)
}
