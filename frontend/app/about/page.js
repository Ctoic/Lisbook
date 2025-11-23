"use client";
import { Target, Users, Clock, PlayCircle } from 'lucide-react';
import Image from 'next/image';

export default function About() {
    return (
        <div className="container mx-auto px-4 py-12">
            {/* HERO */}
            <section className="grid md:grid-cols-2 gap-10 items-center mb-24">
                <div>
                    <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-500 to-white bg-clip-text text-transparent">
                        LisBook - A Simple Audio Book Player
                    </h1>
                    <p className="text-gray-300 mb-4 leading-relaxed">
                        LisBook is a straightforward audiobook player designed for simplicity and ease of use.
                        With LisBook, you can listen to your favorite books in MP3 format. The app provides
                        essential playback features such as play, pause, stop, and the ability to skip chapters.
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                        You can also adjust playback speed and volume to suit your listening preferences,
                        making your audiobook experience truly personalized.
                    </p>
                </div>
                <div className="relative glow">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 blur-3xl opacity-20 rounded-2xl"></div>
                    <Image
                        src="https://images.pexels.com/photos/4491881/pexels-photo-4491881.jpeg?auto=compress&cs=tinysrgb&w=1200"
                        alt="Audiobook listening"
                        width={600}
                        height={400}
                        className="relative rounded-2xl object-cover w-full h-[400px]"
                    />
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="mb-24">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4 text-white">Our Mission & Vision</h2>
                    <div className="h-1 w-32 bg-gradient-to-r from-green-500 to-blue-600 mx-auto rounded-full"></div>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 hover:border-green-500 transition-all duration-300 hover:scale-[1.02]">
                        <Target className="w-12 h-12 text-green-500 mb-4" />
                        <h3 className="text-2xl font-bold mb-4 text-white">Our Mission</h3>
                        <p className="text-gray-400">
                            To make audiobook listening accessible, simple, and enjoyable for everyone.
                            We believe that great stories should be available to all, without complicated
                            interfaces or unnecessary features getting in the way.
                        </p>
                    </div>
                    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 hover:border-green-500 transition-all duration-300 hover:scale-[1.02]">
                        <Users className="w-12 h-12 text-green-500 mb-4" />
                        <h3 className="text-2xl font-bold mb-4 text-white">Our Vision</h3>
                        <p className="text-gray-400">
                            To create a global community of audiobook enthusiasts who contribute to and
                            benefit from an open-source platform that continuously evolves with user needs
                            while maintaining simplicity at its core.
                        </p>
                    </div>
                </div>
            </section>

            {/* Journey / Timeline */}
            <section className="mb-24 relative">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4 text-white">Why Choose LisBook?</h2>
                    <div className="h-1 w-32 bg-gradient-to-r from-green-500 to-blue-600 mx-auto rounded-full mb-4"></div>
                    <p className="text-gray-400">Immerse yourself in stories like never before with simplicity, beauty, and control.</p>
                </div>

                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-green-400 via-blue-500 to-purple-500 hidden md:block"></div>

                    <div className="space-y-12">
                        {/* Item 1 */}
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-1 text-right md:pr-8">
                                <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-green-500 transition-colors">
                                    <div className="flex items-center justify-end gap-3 mb-2">
                                        <Clock className="w-5 h-5 text-green-400" />
                                        <span className="text-green-400 font-bold">Elegant Design</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">Simplicity Meets Style</h3>
                                    <p className="text-gray-400">Enjoy a minimal, distraction-free interface designed for pure audiobook immersion.</p>
                                </div>
                            </div>
                            <div className="relative hidden md:block">
                                <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"></div>
                            </div>
                            <div className="flex-1 md:pl-8"></div>
                        </div>

                        {/* Item 2 */}
                        <div className="flex flex-col md:flex-row-reverse items-center gap-8">
                            <div className="flex-1 text-left md:pl-8">
                                <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-green-500 transition-colors">
                                    <div className="flex items-center justify-start gap-3 mb-2">
                                        <PlayCircle className="w-5 h-5 text-green-400" />
                                        <span className="text-green-400 font-bold">Seamless Playback</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">Smart Audio Control</h3>
                                    <p className="text-gray-400">Play, pause, stop, or skip chapters with smooth transitions. LisBook makes audio navigation effortless.</p>
                                </div>
                            </div>
                            <div className="relative hidden md:block">
                                <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"></div>
                            </div>
                            <div className="flex-1 md:pr-8"></div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
