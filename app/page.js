"use client"
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, GitGraph, User2Icon, Users, Users2Icon } from "lucide-react";
import Image from "next/image";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/auth');
  };

  return (
    <div>
      <div className='gap-auto sticky top-0 z-50 p-4 shadow-sm flex justify-between bg-white'>
        <Image src={'/logo.png'} alt='logo' width={100} height={60}
          className='w-[100px]'
        />

        <div className="flex items-center space-x-8">
          <nav className="flex items-center space-x-6">
            <a href="#home" className="inline-block text-sm font-medium text-gray-700 border-b-2 border-transparent hover:border-blue-600 transition-all duration-400">Home</a>
            <a href="#features" className="inline-block text-sm font-medium text-gray-700 border-b-2 border-transparent hover:border-blue-600 transition-all duration-400">Features</a>
            <a href="#how-it-works" className="inline-block text-sm font-medium text-gray-700 border-b-2 border-transparent hover:border-blue-600 transition-all duration-400">How It Works</a>
            <a href="#cta" className="inline-block text-sm font-medium text-gray-700 border-b-2 border-transparent hover:border-blue-600 transition-all duration-400">Get Started</a>
          </nav>
        </div>

        <Button onClick={handleClick} className={'w-[160px]'}> <User2Icon /> Create Account</Button>
      </div>

      <div id="home" className="flex justify-between gap-2 px-40 py-30 bg-gradient-to-b from-blue-100 to-white">

        <div className="flex flex-col px-10 py-10 w-[700px]">
          <h1 className="text-5xl font-bold mb-6">
            AI-Powered <a className=" text-blue-800">Interview Assistant</a> for Modern Recruiters</h1>
          <p className="text-gray-400 text-xl font-medium mb-10"> Let our AI voice agent conduct candidate interviews while you focus on finding the perfect match. Save time, reduce bias, and improve your hiring process.</p>
          <Button onClick={handleClick} className={'font-bold hover:text-white hover:bg-gray-400 w-[140px] '}> Get Started <ArrowRight /> </Button>
        </div>

        <div>
          <Image src={'/image.png'} alt="app" width={400} height={400}
            className='w-[800px] rounded-xl'
          />
        </div>

      </div>

      <div id="features" className="text-center py-20">
        <div className="flex flex-col text-center">
          <h2 className="text-4xl font-bold mb-4"> Streamline Your Hiring Process </h2>
          <p> AiRecruiter helps you save time and find better candidates with our advanced AI interview technology.</p>
        </div>

        <div className="flex justify-between gap-20 px-100 py-20">
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">

            <Clock />

            <h3 className="font-medium">Save Time</h3>
            <p className="text-center text-gray-500">Automate initial screening interviews and focus on final candidates.</p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <GitGraph />
            <h3 className="font-medium"> Data-Driven Insights</h3>
            <p className="text-center text-gray-500">Get detailed analytics and candidate comparisons based on interview responses.</p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <Users2Icon />
            <h3 className="font-medium"> Reduce Bias</h3>
            <p className="text-center text-gray-500">Standardized interviews help eliminate unconscious bias in the hiring process.</p>
          </div>

        </div>
      </div>

      <div  id="how-it-works" className="text-center bg-gray-50 px-40 py-30">
        <div className="flex flex-col text-center mb-20">
          <h2 className="text-4xl font-bold mb-4"> How AiRec ruiter Works </h2>
          <p> Three simple steps to transform your recruitment process.</p>
        </div>

        <div className="flex justify-between gap-4 ">

          <div className="flex flex-col items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-900 mb-8">
              <span className="text-xl font-bold">

                1

              </span>
            </div>

            <h3 className="font-medium"> Create Interview </h3>
            <p className="text-center text-gray-500 px-20" > Set up your job requirements and customize interview questions. </p>

          </div>

          <div className="flex flex-col items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-900 mb-8">
              <span className="text-xl font-bold">

                2

              </span>
            </div>

            <h3 className="font-medium"> Share with Candidates </h3>
            <p className="text-center text-gray-500 px-20" > Send interview links to candidates to complete at their convenience. </p>

          </div>


          <div className="flex flex-col items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-900 mb-8">
              <span className="text-xl font-bold">

                3

              </span>
            </div>

            <h3 className="font-medium"> Review Results </h3>
            <p className="text-center text-gray-500 px-20" > Get AI-analyzed results, transcripts, and candidate comparisons. </p>

          </div>
        </div>
      </div>

      <div id="cta" className="text-center px-40 py-30">
        <div className="flex flex-col text-center mb-14">
          <h2 className="text-4xl font-bold mb-4"> Ready to Transform Your Hiring Process? </h2>
          <p> Join hundreds of companies already using AiCruiter to find the best talent. </p>
        </div>


        <div className="flex justify-center">
          <div className=" flex flex-row gap-x-4 items-center ">

            <Button>
              Get started for free
            </Button>

            <Button className={'bg-white border text-primary hover:text-white'}>
              Request a Demo
            </Button>

          </div>
        </div>
      </div>

      <footer className="border-t flex items-center justify-center bg-gray-50">
        <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12">
          <div className="flex items-center gap-2">
            <Image src={'/logo.png'} alt="logo" width={100} height={60}
              className='w-[100px]' />
          </div>
          <nav className="flex flex-wrap gap-4 md:gap-6">
            <a className="text-sm hover:underline" href="#">Terms</a>
            <a className="text-sm hover:underline" href="#">Privacy</a>
            <a className="text-sm hover:underline" href="#">Contact</a>
          </nav>
          <div className="text-sm text-gray-500">
            © 2025 AiRecruiter. All rights reserved.
          </div>
        </div>
      </footer>


    </div>

  );
}
