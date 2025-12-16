"use client"

import React, {useState} from 'react'
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

function LayoutWrapper({children}) {
    const [collapsed, setcollapsed] = useState(false);
    return (
        <div className="h-screen flex w-full">
            <Sidebar collapsed={collapsed} setcollapsed={setcollapsed} />
            <div className="flex flex-col w-full">
                <Header collapsed={collapsed} setcollapsed={setcollapsed} />
                <main className="h-[calc(100vh-160px)] p-[30px] bg-[#FAFBFC] overflow-auto">
                    {children}
                </main>
                <Footer />
            </div>
        </div>
    )
}

export default LayoutWrapper