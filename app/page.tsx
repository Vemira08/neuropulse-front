"use client"
import Landing from "@/components/home/landing";
import Left from "@/components/home/left";
import Right from "@/components/home/right";
import { Button } from "@/components/ui/button";
import Link from "next/link"; 

export default function Home() {
  
  return (
    <div className="w-full h-screen  flex items-center px-32">
    <div className="h-full w-full  flex items-center ">
      <div>
          <div className="text-3xl font-semibold w-3/4">Welcome to <span className="text-orange-500">Parkinson ’ s Detection using</span> EEG Data</div>
          <div className="mt-2">A cutting-edge platform that uses machine learning to analyze EEG signals and detect Parkinson’s disease early.</div>
          <div className="w-full flex gap-4 mt-4">
          <Link href="/upload" >
          <Button className="w-64" >
            Get start
          </Button>
      
      </Link>
            </div>
        </div>
        </div>

  
  </div>
  );
}
