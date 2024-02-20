// import gridImage from './gridImages'
import edoHos from './assets/edo-hos.png'
import edoBuild from './assets/edo-build.png'
import edoPlant from './assets/edo-plant.png'
import edoSeaside from './assets/edo-seaside.png'
import edoSec from './assets/edo-sec.png'
import secretariate from './assets/secretariate.png'
import podcasts from './assets/podcast.png'
import { HiMap, HiUser } from 'react-icons/hi'
import { IoAlarm } from "react-icons/io5";
import { MdRocketLaunch } from "react-icons/md";
import { FaBriefcase } from "react-icons/fa6";
import { Link, Button } from "@nextui-org/react";
import { useState, useEffect } from 'react';
import axios from 'axios'
import works from './assets/works-1.png'
import goods from './assets/goods-1.png'
import services from './assets/services-1.png'

// import { useEffect, useState } from 'react'


const Home = () => {
const [data, setData] = useState([]);
const [perPage, setPerPage] = useState(3);
const [selectedPage, setSelectedPage] = useState(null)
const money = (amount) => {
    return Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        notation: 'compact',
        compactDisplay: 'short'
    }).format(amount);
  }
const date = (d = null) => {
    if (d == undefined){
        return null;
    }
    let dd = new Date(d);

    return dd.toLocaleDateString().replace(/\//g, '/');
}

useEffect(() => {
    const fetchData = async () => {
        try {
            const res = await axios.get('https://api.edostateocds.cloudware.ng/api/v1/releases/releases', {
                params: {
                    limit: perPage,
                },
            });
            setData(res.data.releases)
        } catch (error) {
            console.log('Error Fetching data', error);
        }
    };
    fetchData();
}, [perPage])

useEffect(() => {
}, [data]); 



  return (
    <>
    <div className='max-w-6xl mx-auto'>
         <div className='flex flex-col items-center sm:flex sm:flex-row gap-14 pt-40 sm:pt-48'>
                <div className='py-0 sm:py-8 text-center sm:text-left max-w-lg mx-auto md:max-w-none'>
                    <h1 className='text-gray-700 text-6xl text-center sm:text-start font-bold transition ease-in-out duration-200'>Open Contracting<br /> Portal </h1>
                    <p className='py-6 text-sm sm:text-lg'>Contracting Data for all Public Procurement across the state.
                    </p>
                    <a href='#' className='rounded-md text-gray-50 btn bg-green-900 px-10 sm:px-20 py-3 transition duration-700 ease-in-out'>
                    View all Projects
                    </a>
                </div>
            
                <div className='pt-0 sm:pt-24 hidden sm:block'>
                    <img src={edoHos} className='rounded-3xl' alt='Edo-Hos' />
                </div>

                <div className=''>
                <div className='grid grid-cols-3 gap-4 mx-4 sm:mx-0'>
                    <div className=''>
                        <img src={edoPlant} className='rounded-3xl ' alt='Edo-Plant' />
                    </div>
                    <div className=''>
                        <img src={edoBuild} className='rounded-3xl' alt='Edo-Build' />
                    </div>
                    <div className=''>
                        <img src={edoHos} className='rounded-3xl' alt='Edo-Hos' />
                    </div>
                    <div>
                        <img src={edoSeaside} className='rounded-3xl' alt='Edo-Seaside' />
                    </div>
                    <div>
                        <img src={edoSec} className='rounded-3xl' alt='Edo-Sec' />
                    </div>
                    <div>
                        <img src={secretariate} className='rounded-3xl ' alt='Secretariate' />
                    </div>
                </div>
                </div>
            </div>


            <div className='text-center'>
                <div className='py-4'>
                    <h6 className='text-green-900 text-xl sm:text-4xl'> Access Procurement </h6>
                    <h1 className='text-4xl sm:text-5xl font-bold py-2'> Data for all public <br/> procurement </h1>
                    <p className='text-2xl'>across Edo State</p>
                </div>

                <div className='flex flex-col px-10 sm:flex sm:flex-row sm:px-0 justify-between gap-8'>
                <div className='flex flex-col items-center'>
                    <div>
                        <div className='bg-gradient-to-r from-pink-500 to-purple-800 p-4 rounded-xl'>
                            <HiUser className=' text-gray-50'/>
                        </div>   
                    </div>
                    <div className='text-2xl font-bold py-4'>
                        E-procurement
                    </div>
                    <div>
                        The E-procurement platform has a Planning template which enables procurement officers to develop the annual procurement plan directly on the portal.
                    </div>

                    <div className='py-8'>
                        <Button
                            href="http://eprocurement.edostate.gov.ng/"
                            as={Link}
                            color="primary"
                            showAnchorIcon
                            variant="solid"
                            >
                            Learn more
                        </Button>
                    </div>
                </div>

                <div className='flex flex-col items-center'>
                        <div className='bg-gradient-to-r from-sky-500 to-blue-800 p-4 rounded-xl'>
                            <HiUser className='text-gray-50'/>
                        </div>   
                    <div className='text-2xl font-bold py-4'>
                        Edo Monitor Me
                    </div>
                    <div>
                        Edo Monitor Me Portal is a portal development deliberately to house details of ongoing projects and to display monitoring report of the different stages of the project at any point in time.
                    </div>
                    <div className='py-8'>
                        <Button
                            href="http://edpms.edostate.gov.ng/pubfeed/"
                            as={Link}
                            color="primary"
                            showAnchorIcon
                            variant="solid"
                            >
                            Learn more
                        </Button>
                    </div>
                </div>

                <div className='flex flex-col items-center'>
                    <div>
                        <div className='bg-gradient-to-r from-yellow-500 to-orange-800 p-4 rounded-xl'>
                            <HiUser className='text-gray-50'/>
                        </div>   
                    </div>
                    <div className='text-2xl font-bold py-4'>
                        Price Intelligence
                    </div>
                    <div>
                    We are aware of market price, its intricacies and impact on economic development, so, we take our time to always have a routinely updated price list for products.
                    </div>

                    <div className='py-8'>
                        <Button
                            href="https://www.edoppa.org.ng/price-list-as-at-september-2019/"
                            as={Link}
                            color="primary"
                            showAnchorIcon
                            variant="solid"
                            >
                            Learn more
                        </Button>
                    </div>
                </div>
                </div>
            </div>

            <div className='text-center'>
                <div className='py-4'>
                    <h1 className='text-4xl font-bold py-2'> Most Recent Projects </h1>
                </div>
                <div className='max-w-6xl mx-auto flex flex-col'>
                    {data.map((release) => (
                        <div key={release.id} className=''>
                            <div className='max-w-3xl mx-auto flex flex-col'>
                                <div className='flex flex-col sm:flex sm:flex-row sm:p-4 p-0'>
                                    <div className='flex flex-col sm:flex sm:flex-row items-center sm:items-start'>
                                        <div>
                                            {
                                                release.category == 'works' && 
                                                <div className='w-16 p-2'>
                                                    <img src={works} alt='Works' />
                                                </div>
                                            }
                                            {
                                                release.category == 'goods' && 
                                                <div className='w-16 p-2'>
                                                    <img src={goods} alt='Works' />
                                                </div>
                                            }
                                            {
                                                release.category == 'services' && 
                                                <div className='w-16 p-2'>
                                                    <img src={services} alt='Works' />
                                                </div>
                                            }
                                        </div>
                                        <div className='flex flex-col items-center sm:items-start text-center sm:text-start'>
                                            <div className='font-semibold text-xl  py-2'><span className='bg-green-200 rounded-lg text-xs text-green-900 font-bold p-2'>PROJECT TITLE:</span> {release.title}
                                            </div>

                                            <div className='flex flex-row gap-2 items-center '>
                                            <div className='font-semibold text-sm text-center sm:text-start'> <span className='bg-green-200 rounded-md text-xs text-green-900 font-bold p-1 '>Amount:</span> {money(release.contract_amount)}
                                            </div>
                                                <div className='font-semibold text-sm'> <span className='bg-green-200 rounded-md text-xs text-green-900 font-bold p-1'>Award date:</span> {date(release.award_date)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <Link href={`/project/${release.id}`} passHref>
                                            <Button as="a" variant="contained" className='bg-green-800 rounded-full text-gray-50 my-4 font-semibold hover:bg-green-900 transform hover:scale-110 transition duration-300'>
                                                View Details
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
                
                <div className='py-8'>
                        <Button
                            href="https://edostateocds.cloudware.ng/pages/all_projects.php"
                            as={Link}
                            className='bg-green-800 text-gray-50 font-semibold'
                            showAnchorIcon
                            variant="solid"
                            >
                            See all Projects
                        </Button>
                    </div>
            </div>  
    </div>
            <div>
                <div className='py-4'>
                    <h1 className='text-4xl font-bold py-2 text-center'> Platform Features </h1>
                </div>
                <div className='clip w-full bg-gradient-to-r from-green-800 to-green-500'>
                    <div className="bg-[url('./assets/waves-white.svg')]">
                    <div>
                    <svg className="wave-top" viewBox="0 0 1439 147" version="1.1" xmlns="http://www.w3.org/2000 svg">
                        <g className="wave" fill="#f8fafc">
                            <path d="M1440,84 C1383.555,64.3 1342.555,51.3 1317,45 C1259.5,30.824 1206.707,25.526 1169,22 C1129.711,18.326 1044.426,18.475 980,22 C954.25,23.409 922.25,26.742 884,32 C845.122,37.787 818.455,42.121 804,45 C776.833,50.41 728.136,61.77 713,65 C660.023,76.309 621.544,87.729 584,94 C517.525,105.104 484.525,106.438 429,108 C379.49,106.484 342.823,104.484 319,102 C278.571,97.783 231.737,88.736 205,84 C154.629,75.076 86.296,57.743 0,32 L0,0 L1440,0 L1440,84 Z"></path>
                        </g>
                    </svg>
                    </div>                   
                    <div className='flex flex-col sm:flex sm:flex-row'>
                        <div className='grid sm:grid sm:grid-cols-2 gap-4 text-start m-16 text-white'>
                            <div className='flex flex-col text-lg'>
                                <MdRocketLaunch size={30}/>
                                <h1 className='font-bold py-3'>Fully integrated</h1>
                                <p>Access to contracting data accross all stages of procurement</p>
                            </div>

                            <div className='flex flex-col text-lg'>
                                <FaBriefcase size={30}/>
                                <h1 className='font-bold py-3'>Structured Dataset</h1>
                                <p>Projects arranged in Tabular forrmat for easy analysis and reading</p>
                            </div>

                            <div className='flex flex-col text-lg'>
                                <HiMap size={30}/>
                                <h1 className='font-bold py-3'>Timely Publications</h1>
                                <p>Publishing timely and accessble procurement information in order to engage the public in identifying and fixing problems around procurement.</p>
                            </div>

                            <div className='flex flex-col text-lg'>
                                <IoAlarm size={30}/>
                                <h1 className='font-bold py-3'>Improved Platforms</h1>
                                <p>Analyse data on this platform several different MDAs and Ministries, Plot different types of charts and export or embed them into your designs and info graphics.</p>
                            </div>
                        </div>

                        <div className='bg-gray-50 m-10 rounded-xl'>
                            <div>
                                <img src={podcasts} className='rounded-xl' alt='Popdcast' />
                            </div> 
                            <div className='text-start p-6'>
                                <h1 className='font-semibold text-2xl py-2'>Features</h1>
                                <p className='text-xl'>Publishing timely and accessble procurement information in order to engage the public in identifying and fixing problems around procurement.</p>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
    </>
  )
}

export default Home