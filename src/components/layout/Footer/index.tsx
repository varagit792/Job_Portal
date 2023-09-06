import React from 'react';
import { Link } from 'react-router-dom';
import EmailSenderIcons from '../../../assets/svg/EmailSenderIcons.svg';
import Instagram from '../../../assets/svg/instagram.svg';
import Facebook from '../../../assets/svg/facebook.svg';
import LinkDin from '../../../assets/svg/linkdin.svg';

const Footer = () => {
    return (
        <div className="h-[50%] bg-[#312E81] px-20 flex items-center">
            <div className="w-full">
                <div className="grid grid-cols-3 gap-5 w-full">
                    <div className="flex flex-col items-start justify-between">
                        <Link className="text-white border border-[#4F46E5] p-1 rounded-md font-semibold" to="/">JOB PORTAL</Link>
                        <div className="text-[#A5B4FC]">
                            <p>Search and find your job now easier than ever, simply browse and find a dream job</p>
                        </div>
                        <div className="flex justify-start items-center text-white">
                            <span className="cursor-pointer">
                                <img src={LinkDin} alt="LinkDin" />
                            </span>
                            <span className="ml-8 cursor-pointer">
                                <img src={Facebook} alt="Facebook" />
                            </span>
                            <span className="ml-8 cursor-pointer">
                                <img src={Instagram} alt="Instagram" />
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center text-white">
                        <div className="flex flex-col items-start">
                            <Link to="/">Home</Link>
                            <Link to="/" className="mt-3">About</Link>
                            <Link to="/" className="mt-3">Jobs</Link>
                            <Link to="/" className="mt-3">Companies</Link>
                            <Link to="/" className="mt-3">Services</Link>
                        </div>
                    </div>
                    <div className="flex flex-col items-start justify-between">
                        <h1 className="text-4xl font-bold  text-white mb-5">
                            <p><span className="text-[#818CF8]">Subscribe</span>to get latest updates</p>
                        </h1>
                        <div className="flex items-center h-10 w-full">
                            <input type="text" className=" w-[90%] h-full rounded-l-lg" />
                            <button className="w-[10%] bg-[#818CF8] h-full flex justify-center items-center rounded-r-lg">
                                <img src={EmailSenderIcons} alt="EmailSenderIcons" />
                            </button>
                        </div>
                    </div>
                </div>
                <hr className="text-[#818CF8] my-10" />
                <div className="text-white text-sm flex justify-between items-center">
                    <span>© 2023 RGT All rights reserved.</span>
                    <div className="flex space-x-6">
                        <span>Terms of Services</span>
                        <span>Privacy Policy</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;