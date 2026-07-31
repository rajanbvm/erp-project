import PageBanner from '@/components/common/PageBanner'
import React from 'react'
import { FaRegEye } from 'react-icons/fa6';
import Image from "next/image";
import UploadIcon from "@/images/UploadIcon.svg";
import { FaRegFileLines } from "react-icons/fa6";
import { BsFillSendFill } from "react-icons/bs";

const add = () => {


    return (
        <>
            <PageBanner title="Leads" />

            <div className="bg-box">
                <div className="table-header">
                    <div>
                        <h3>New Lead</h3>
                        <p>Capture prospect details manually</p>
                    </div>
                </div>

               
            </div>

        </>
    )
}

export default add