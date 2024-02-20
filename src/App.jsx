import edoLogos from './assets/edo-logos.png'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Link,} from 'react-router-dom'
import Home from "./Home.jsx"
import { useState } from 'react'
import { HiMenuAlt1, HiX } from 'react-icons/hi'
import Tables from './Pages/Tables.jsx'
import Projects from './Pages/Projects.jsx'
import Visualizations from './Pages/Visualizations.jsx'
import { IoIosCloudDownload } from "react-icons/io";
import { Button } from '@nextui-org/react'
import IndividualProject from './Pages/IndividualProject.jsx'

// import {Link} from "@nextui-org/react";

function App() {
  const [ToggleMenus, SetToggleMenus] = useState(false);
  // const handleToggle = () => {
  //   SetToggleMenus(!ToggleMenus)
  // }

  const handleDownload = async () => {
    try {
      const response = await fetch('https://api.edostateocds.cloudware.ng/api/v1/releases/releases');
      const jsonData = await response.json();

      const jsonString = JSON.stringify(jsonData, null, 2);

      const blob = new Blob([jsonString], { type: 'application/json' });

      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = 'downloaded-file.json';

      document.body.appendChild(downloadLink);
      downloadLink.click();

      document.body.removeChild(downloadLink);
    } catch (error) {
      console.error('Error fetching JSON data', error);
    }
  }

  return (
    <>
    <Router>
      <div className='max-w-6xl mx-auto my-4 flex flex-row fixed top-o left-0 right-0 justify-between shadow-md bg-gray-50 z-40 text-gray-900 items-center p-5 rounded-full'>
        <div>
          <a href="#" target="_blank">
            <img src={edoLogos} className="logo" alt="Edo logo" />
          </a>
        </div>

              <div>
                  <div className='hidden sm:inline-flex'>
                        <ul className='flex md:flex-row space-x-6'>
                          <li>
                              <Link to="/" title="Home" className="py-2 block px-3 hover:bg-gray-100 rounded-md transition ease-in-out duration-200">Home</Link>
                          </li>

                          <li>
                              <Link to="project" title="All Projects" className="py-2 block px-3 hover:bg-gray-100 rounded-md transition ease-in-out duration-200">Projects</Link>
                          </li>

                          <li>
                              <Link to="tables" title="Projects Table" className="py-2 block px-3 hover:bg-gray-100 rounded-md transition ease-in-out duration-200">Tables</Link>
                          </li>

                          <li>
                              <Link to="visualizations" title="Visualizations" className="py-2 block px-3 hover:bg-gray-100 rounded-md transition ease-in-out duration-200">Visualization</Link>
                          </li>
                      </ul>
                  </div>
                </div>
                <div className='hidden sm:inline-flex'>
                      <Button title="Download BulkJSON" className="flex rounded-full bg-green-800 text-gray-50 py-3 gap-2 items-center px-6 hover:bg-green-900 transform hover:scale-110 transition duration-300 font-semibold" type='button' onClick={handleDownload}>DOWNLOAD BULK JSON <span><IoIosCloudDownload /></span></Button>
                </div>

              {/* Mobile view */}

            <button className="py-4 px-3 transition ease-in-out duration-200 flex items-center justify-between md:hidden z-40" onClick={() => SetToggleMenus(ToggleMenus ? false : true)}>
              {
                !ToggleMenus && <HiMenuAlt1 className='sm:hidden text-green-900' size={20}/>  
              }
              {
                ToggleMenus && <HiX className='sm:hidden text-green-900 z-10' size={20} />  
              }
              {
                ToggleMenus && <div className='relative'>
                    <ul className='flex flex-col absolute bg-gray-200 right-0 rounded-xl px-4 pb-2'>
                      <li>
                          <Link to="/" title="Home" className="py-4 block px-3 hover:bg-gray-100 rounded-md transition ease-in-out duration-200">Home</Link>
                      </li>

                    <li>
                        <Link to="project" title="All Projects" className="py-2 block px-3 hover:bg-gray-100 rounded-md transition ease-in-out duration-200">Projects</Link>                          
                    </li>

                    <li>
                        <Link to="tables" title="Projects Table" className="py-2 block px-3 hover:bg-gray-100 rounded-md transition ease-in-out duration-200">Tables</Link>     
                    </li>

                    <li>
                        <Link to="visualizations" title="Visualizations" className="py-4 block px-3 hover:bg-gray-100 rounded-md transition ease-in-out duration-200">Visualization</Link>
                    </li>

                    <div>
                    <button>
                      <Link to="https://api.edostateocds.gov.ng/api/v1/releases/bulk?download=json" title="Download" className="flex gap-2 items-center rounded-full bg-green-800 text-xs text-gray-50 py-1 px-6 hover:bg-green-900 transform hover:scale-110 transition duration-300">DOWNLOAD BULK JSON <span><IoIosCloudDownload /></span></Link>
                    </button>
                    </div>
                  </ul>
                </div>
              }
          </button>
  

      </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project" element={<Projects />}/>
          <Route path="/tables" element={<Tables />}/>
          <Route path="/visualizations" element={<Visualizations />}/>
          <Route path="/project/:releaseId" element={<IndividualProject />}/>
        </Routes>
      </Router>


      <div className='bg-gray-900'>
          <div className='flex flex-col gap-4 px-8 sm:flex sm:flex-row sm:justify-between text-gray-100 max-w-7xl mx-auto py-10 '>
              <div className='flex flex-col'>
                  <ul>
                    <li>
                      <p>Copyright © 2024 Edo Public Procurement.</p>
                    </li>
                    <li>
                      <a href="https://api.edostateocds.gov.ng/api/v1/releases/bulk">View Bulk JSON</a>
                    </li>
                    <li>
                      <a href="https://api.edostateocds.gov.ng/api/v1/releases/bulk?download=json" target='blank' download>Download Bulk JSON</a>
                    </li>
                    <li>
                      <a href="https://edostateocds.gov.ng/assets/pdf/Edo%20state%20Publication%20Policy.pdf" target='blank' download>Publication Policy</a>
                    </li>
                  </ul>
              </div>

              <div className='flex flex-col'>
                  <ul>
                    <li>
                      <a href="/">Home</a>
                    </li>
                    <li>
                      <a href="/projects">All Projects</a>
                    </li>
                    <li>
                      <a href="/tables" target='blank'>Tables</a>
                    </li>
                    <li>
                      <a href="/visualizations" target='blank'>Visualizations</a>
                    </li>
                  </ul>
              </div>

              <div className='flex flex-col'>
                  <ul>
                    <li>
                      <a href="#" target='blank'>EDPMS</a>
                    </li>
                    <li>
                      <a href="#" target='blank' download>Edo Monitor Me</a>
                    </li>
                    <li>
                      <a href="#" target='blank' download>Price Intelligence</a>
                    </li>
                  </ul>
              </div>

              <a href='mailto:info@gmail.com'>
              <Button>
                Get in Touch
              </Button>
              </a>
          </div>  
      </div>
    </>
  )
}




export default App
