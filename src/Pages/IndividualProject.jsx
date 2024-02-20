import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import works from '../assets/works-1.png'
import goods from '../assets/goods-1.png'
import services from '../assets/services-1.png'
import { Progress } from "@nextui-org/react";
import {Tabs, Tab, Card, CardBody, CardHeader} from "@nextui-org/react";
import { HiAcademicCap } from 'react-icons/hi';
import { IoIosCloudDownload } from "react-icons/io";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
import {Input, Textarea} from "@nextui-org/react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { FaAward } from "react-icons/fa";
import { SiMicrostrategy } from "react-icons/si";
import { FaFileContract } from "react-icons/fa6";
import { TbIdBadge2 } from "react-icons/tb";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


const IndividualProject = () => {
const { releaseId } = useParams();
const [release, setRelease] = useState(null);
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

const [formData, setFormData] = useState({
  name: '',
  email: '',
  phonenumber: '',
  message: '',
});

const handleChange = (e) => {
      const { name, email, message, value } = e.target;
      setFormData({
      ...formData,
  [name]: value,
  [email]: value,
  [message]: value,
  });
}
const handleSubmit = (e) => {
  e.preventDefault();
  console.log(formData);
};

useEffect(() => {
  const fetchData = async () => {
    try {
      let headers = {'Content-Type': 'application/json'};
      const res = await axios.get(`https://api.edostateocds.cloudware.ng/api/v1/releases/releases/${releaseId}`, {
        params: {
          header: headers
        }
      })
      setRelease(res.data.release);
    } catch (error) {
      console.log('Error Fetching Data', error)
    }
    console.log(release);
  };

  fetchData();
}, [releaseId,]);


const handleDownload = async (format) => {
  try {
    // Fetch the JSON data from the link
    const response = await fetch(`https://api.edostateocds.cloudware.ng/api/v1/releases/releases/${releaseId}`);
    const jsonData = await response.json();

    let data, filename;

      if (format === 'excel') {
        data = XLSX.utils.json_to_sheet(jsonData);
        filename = 'downloaded-file.xlsx';
      } else if (format === 'csv') {
        const csvContent = XLSX.utils.json_to_csv(jsonData);
        data = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
        filename = 'downloaded-file.csv';
      } else if (format === 'json') {
        const jsonContent = JSON.stringify(jsonData, null, 2);
        data = new Blob([jsonContent], { type: 'application/json;charset=utf-8' });
        filename = 'downloaded-file.json';
      }

    // Save the file
    saveAs(data, filename);
  } catch (error) {
    console.error('Error fetching or processing data', error);
  }
};


  return (
    <div className="py-32">
      <div className="bg-[url('./assets/IndividualProject.png')] bg-cover bg-center bg-no-repeat py-20">
        <div className='max-w-6xl mx-4 sm:mx-auto'>
          <div className="text-gray-50 text-3xl font-bold">Project Details</div>
          <div className="max-w-3xl text-gray-50 text-lg pt-4" >{release?.project.title}</div> 
        </div>
      </div>

      <div className='max-w-6xl mx-4 sm:mx-auto'>
        <div className='text-2xl font-bold py-6'>Summary</div>
            <div className='flex flex-row gap-4 items-center'>
              <div>
                    {
                        release?.project.category == 'works' && 
                        <div className='w-16 p-2'>
                            <img src={works} alt='Works' />
                        </div>
                    }
                    {
                        release?.project.category == 'goods' && 
                        <div className='w-16 p-2'>
                            <img src={goods} alt='Goods' />
                        </div>
                    }
                    {
                        release?.project.category == 'services' && 
                        <div className='w-16 p-2'>
                            <img src={services} alt='Services' />
                        </div>
                    }
                </div>
                
                    <div className='w-full max-w-sm'>
                      <div>Progress:</div>
                      {
                        release?.project.status == 'awarded' &&

                        <Progress
                          isStriped
                          aria-label="Loading..."
                          color="primary"
                          value={80}
                          className="max-w-md"
                        />
                      }

                      {
                        release?.project.status == 'completed' &&
                        
                        <Progress
                          isStriped
                          aria-label="Loading..."
                          color="success"
                          value={100}
                          className="max-w-md"
                        />
                      }

                      {
                        release?.project.status == 'in progress' &&
                        
                        <Progress
                          isStriped
                          aria-label="Loading..."
                          color="warning"
                          value={60}
                          className="max-w-md"
                        />
                      }
                    </div>
            </div>
            <div className='py-4'>{release?.project.description}</div>
            <div className='flex flex-col gap-4 sm:flex sm:flex-row justify-between pb-8'>
                  <div>
                    <div className='font-semibold'>
                      Value:
                    </div>
                    <div className='font-semibold'>
                      {money(release?.project.contract_amount)}
                    </div>
                  </div>

                  <div>
                    <div className='font-semibold'>
                      Status:
                    </div>
                    <div>
                      {release?.project.status}
                    </div>
                  </div>

                  <div>
                    <div className='font-semibold'>
                      Award date:
                    </div>
                    <div>
                      {date(release?.project.award_date)}
                    </div>
                  </div>

                  <div>
                    <div className='font-semibold'>
                      Download Project File
                    </div>
                    <div>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button 
                          variant=""
                          className='bg-green-800 hover:bg-green-900 text-gray-50'
                        >
                          Download <IoIosCloudDownload />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu 
                        aria-label="Action event example" 
                      >
                        <DropdownItem onClick={() => handleDownload('csv')}>CSV</DropdownItem>
                        <DropdownItem type="button" onClick={() => handleDownload('excel')}>Excel</DropdownItem>
                        <DropdownItem onClick={() => handleDownload('json')}>JSON</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                    </div>
                  </div>
            </div>                   
      </div>

      <div className='max-w-6xl mx-auto'>
          <div>
            <div className="flex flex-col">
                <Tabs disabledKeys={["music"]} aria-label="Disabled Options" className='py-10'>
                <Tab key="planning" title={
                    <div className="flex items-center px-14 space-x-2">
                      <SiMicrostrategy />
                      <span>Planning</span>
                    </div>
                    }>
                    <Card>
                      <CardBody>
                        <Table isStriped aria-label="tatic collection table">
                          <TableHeader>
                            <TableColumn>Rationale</TableColumn>
                            <TableColumn>Project ID</TableColumn>
                            <TableColumn>Project Title</TableColumn>
                            <TableColumn>Year</TableColumn>
                            <TableColumn>Budget Title</TableColumn>
                            <TableColumn>Budget Description</TableColumn>
                            <TableColumn>Budget uri</TableColumn>
                            <TableColumn>Amount</TableColumn>
                          </TableHeader>
                          <TableBody>     
                              <TableRow>
                                <TableCell>{release?.planning.rationale}</TableCell>
                                <TableCell>{release?.planning.budget.projectID}</TableCell>
                                <TableCell>{release?.planning.budget.project}</TableCell>
                                <TableCell>{release?.planning.budget.year}</TableCell>
                                <TableCell>{release?.planning.budget.title}</TableCell>
                                <TableCell>{release?.planning.budget.description}</TableCell>
                                <TableCell>{release?.planning.budget.uri}</TableCell>
                                <TableCell>{money(release?.planning.budget.amountt)}</TableCell>
                              </TableRow>
                          </TableBody>
                        </Table>
                      </CardBody>
                    </Card>  
                  </Tab>
                  <Tab key="tender" title={
                    <div className="flex items-center space-x-2 px-14">
                      <TbIdBadge2 />
                      <span>Tender</span>
                    </div>
                    }>
                    <Card>
                      <CardBody>
                        <div className='flex flex-row gap-4'>
                          <div className='flex flex-col bg-gray-50 shadow-md rounded-xl p-4'>
                            <div className='font-bold'>Title</div>
                            <div>{release?.project.title}</div>
                          </div>

                          <div className='flex flex-col bg-gray-50 shadow-md rounded-xl p-4'>
                            <div className='font-bold'>Amount</div>
                            <div>{money(release?.project.tender_amount)}</div>
                          </div>
                        </div>
                    
                        <div className='flex flex-row gap-4 my-6'>
                          <div className='flex flex-col bg-gray-50 shadow-md rounded-xl p-4'>
                            <div className='font-bold'>Award Criteria</div>
                            <div>{release?.tender.awardCriteria}</div>
                          </div>

                          <div className='flex flex-col bg-gray-50 shadow-md rounded-xl p-4'>
                            <div className='font-bold'>Procurement Category</div>
                            <div>{release?.tender.mainProcurementCategory}</div>
                          </div>

                          <div className='flex flex-col bg-gray-50 shadow-md rounded-xl p-4'>
                            <div className='font-bold'>Submission Method</div>
                            <div>{release?.tender.submissionMethod}</div>
                          </div>
                        </div>

                        <div className='flex flex-row gap-4'>
                          <div className=' bg-gray-50 shadow-md rounded-xl p-4'>
                            <div className='font-bold'>No. of Tenderers</div>
                            <div>{release?.tender.numberOfTenderers}</div>
                          </div>

                          <div className=' bg-gray-50 shadow-md rounded-xl p-4'>
                            <div className='font-bold'>Has Enquiries</div>
                            <div>{release?.tender.hasEnquiries}</div>
                          </div>

                          <div className=' bg-gray-50 shadow-md rounded-xl p-4'>
                            <div className='font-bold'>Tender Status</div>
                            <div>{release?.tender.status}</div>
                          </div>
                        </div>

                        <div className='flex flex-row gap-4'>
                            <div className='flex flex-col bg-gray-50 shadow-md rounded-xl p-4 my-4'>
                                <div className='font-bold'>Tender Period</div>
                                <div><span className='font-semibold'>Start date: </span>{date(release?.tender.tenderPeriod.startDate)}</div>
                                <div><span className='font-semibold'>End date: </span>{date(release?.tender.tenderPeriod.endDate)}</div>
                                <div><span className='font-semibold'>Max Extension date: </span>{date(release?.tender.tenderPeriod.maxExtentDate)}</div>
                                <div><span className='font-semibold'>Duration: </span>{release?.tender.tenderPeriod.duration}</div>
                            </div> 

                            <div className='flex flex-col bg-gray-50 shadow-md rounded-xl p-4 my-4'>
                              <div className='font-bold'>Award Period</div>
                              <div><span className='font-semibold'>Start date: </span>{release?.tender.awardPeriod.startDate}</div>
                              <div><span className='font-semibold'>End date: </span>{release?.tender.awardPeriod.endDate}</div>

                              <div className='font-bold'>Contract Period</div>
                              <div><span className='font-semibold'>Start date: </span>{release?.tender.contractPeriod.startDate}</div>
                              <div><span className='font-semibold'>End date: </span>{release?.tender.contractPeriod.endDate}</div>

                              <div className='font-bold'>Enquiry Period</div>
                              <div><span className='font-semibold'>Start date: </span>{release?.tender.enquiryPeriod.startDate}</div>
                              <div><span className='font-semibold'>End date: </span>{release?.tender.enquiryPeriod.endDate}</div>
                            </div> 
                        </div>

                      </CardBody>
                    </Card>  
                  </Tab>
                  <Tab key="award" title={
                    <div className="flex items-center space-x-2 px-14">
                      <FaAward />
                      <span>Award</span>
                    </div>
                    }>
                    <Card>
                      <CardBody>
                      <Table isStriped aria-label="tatic collection table">
                          <TableHeader>
                            <TableColumn>Title</TableColumn>
                            <TableColumn>Description</TableColumn>
                            <TableColumn>Status</TableColumn>
                            <TableColumn>Date</TableColumn>
                            <TableColumn>Amount</TableColumn>
                            <TableColumn>Supplier</TableColumn>
                          </TableHeader>
                          <TableBody>     
                                  {release?.awards.map((award) => (
                                  <TableRow key={award.id}>
                                    <TableCell>{award?.title}</TableCell>
                                    <TableCell>{award?.description}</TableCell>
                                    <TableCell>{award?.status}</TableCell>
                                    <TableCell>{date(award?.date)}</TableCell>
                                    <TableCell>{money(award?.value.amount)}</TableCell>
                                    <TableCell>{award?.suppliers.map((supplier) => (supplier.name))}</TableCell>
                                  </TableRow>
                                ))}
                          </TableBody>
                        </Table>
                      </CardBody>
                    </Card>  
                  </Tab>

                  <Tab key="contract" title={
                    <div className="flex items-center space-x-2 px-14">
                      <FaFileContract />
                      <span>Contract</span>
                    </div>
                    }>
                    <Card>
                      <CardBody>
                      <Table isStriped aria-label="tatic collection table">
                          <TableHeader>
                            <TableColumn>AwardID</TableColumn>
                            <TableColumn>Title</TableColumn>
                            <TableColumn>Description</TableColumn>
                            <TableColumn>Status</TableColumn>
                            <TableColumn>Amount</TableColumn>
                          </TableHeader>
                          <TableBody>     
                                  {release?.contracts.map((contract) => (
                                  <TableRow key={contract.id}>
                                    <TableCell>{contract?.awardID}</TableCell>
                                    <TableCell>{contract?.title}</TableCell>
                                    <TableCell>{contract?.description}</TableCell>
                                    <TableCell>{contract?.status}</TableCell>
                                    <TableCell>{money(contract?.value.amount)}</TableCell>
                                  </TableRow>
                                ))}
                          </TableBody>
                        </Table>
                      </CardBody>
                    </Card>  
                  </Tab>

                  <Tab key="implementation" title={
                    <div className="flex items-center space-x-2 px-14">
                      <HiAcademicCap/>
                      <span>Implementation</span>
                    </div>
                    }>
                    <Card>
                      <CardBody>
                      <Table isStriped aria-label="tatic collection table">
                          <TableHeader>
                            <TableColumn>Title</TableColumn>
                            <TableColumn>Type</TableColumn>
                            <TableColumn>Status</TableColumn>
                            <TableColumn>Value</TableColumn>
                            <TableColumn>Year</TableColumn>
                          </TableHeader>
                          <TableBody>     
                                  <TableRow>
                                    <TableCell>{release?.implementation?.title}</TableCell>
                                    <TableCell>{release?.implementation?.type}</TableCell>
                                    <TableCell>{release?.implementation?.status}</TableCell>
                                    <TableCell>{money(release?.implementation?.value.amount)}</TableCell>
                                    <TableCell>{release?.implementation?.year}</TableCell>
                                  </TableRow>
                          </TableBody>
                        </Table>
                      </CardBody>
                    </Card>  
                  </Tab>
                </Tabs>
              </div>
            
            <div>
              <div>
                <div className='flex flex-col py-8'>
                    <div className='text-2xl font-semibold pb-2'>Tender description</div>
                    <div>{release?.tender.description}</div>
                </div>
                <div>
                  <Table isStriped aria-label="tatic collection table">
                    <TableHeader>
                      <TableColumn>Tenderers Name</TableColumn>
                      <TableColumn>Address</TableColumn>
                      <TableColumn>Locality</TableColumn>
                      <TableColumn>Region</TableColumn>
                      <TableColumn>Country Name</TableColumn>
                    </TableHeader>
                    <TableBody>
                              {release?.tender.tenderers.map((tenderer) => (
                          <TableRow key={tenderer.id}>
                            <TableCell>{tenderer.identifier.legalName}</TableCell>
                            <TableCell>{tenderer.address.streetAddress}</TableCell>
                            <TableCell>{tenderer.address.locality}</TableCell>
                            <TableCell>{tenderer.address.region}</TableCell>
                            <TableCell>{tenderer.address.countryName}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div>
                  <div>
                    <div className='flex flex-col py-8'>
                        <div className='text-2xl font-semibold pb-2'>Document description</div>
                        <div>
                            {release?.planning.documents.map((document) => (
                              <div key={document.id}>
                                <div>{document.description}</div>
                                <Table isStriped aria-label="tatic collection table">
                                  <TableHeader>
                                    <TableColumn>Document Type</TableColumn>
                                    <TableColumn>Document Title</TableColumn>
                                    <TableColumn>Url</TableColumn>
                                    <TableColumn>Date Published</TableColumn>
                                    <TableColumn>Date Modified</TableColumn>
                                  </TableHeader>
                                  <TableBody>
                                        <TableRow>
                                          <TableCell>{document.documentType}</TableCell>
                                          <TableCell>{document.title}</TableCell>
                                          <TableCell>{document.url}</TableCell>
                                          <TableCell>{document.datePublished}</TableCell>
                                          <TableCell>{document.dateModified}</TableCell>
                                        </TableRow>
                                  </TableBody>
                                </Table>
                              </div>
                            ))}

                        </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
      </div>

      <div className='mx-4 sm:max-w-3xl sm:mx-auto w-50 bg-white shadow-xl rounded-xl py-4 px-4 sm:px-0 mt-16 '>
                <h1 className='text-2xl text-center text-green-900 font-bold'>Send Feedback</h1>
                <p className='py-4 text-center font-semibold'>For questions and remarks about this project, use the form below.</p>
                <form onSubmit={handleSubmit} className='flex flex-col space-y-2 mx-14 py-4'>                   
                    <div className='flex flex-col sm:flex sm:flex-row gap-4'>
                        <Input
                          isRequired
                          type="Full name"
                          label="Full Name"
                          variant='bordered'
                          labelPlacement="outside"
                          placeholder='Full Name'
                          value={formData.name} onChange={handleChange}
                          className="font-semibold rounded-lg w-full"
                        />

                      
                        <Input
                          isRequired
                          type="email"
                          label="Email"
                          variant='bordered'
                          labelPlacement="outside"
                          placeholder='example@sample.com'
                          value={formData.email} onChange={handleChange}
                          className="max-w-xs font-semibold rounded-lg"
                        />
                   
                    </div>   

                    <Textarea type="text"
                           label="Enter Message"
                           variant="bordered"
                           labelPlacement="outside"
                           placeholder='Describe your comments in at most 250 characters'
                           value={formData.message} onChange={handleChange}
                           className='py-4 font-semibold'
                           minRows={6}
                    />

                    <div className='flex justify-center py-2'>
                        <button type='submit'
                                className='bg-green-900 text-gray-50 text-sm rounded-md py-2 px-14 hover:bg-gray-50 hover:text-green-900 hover:border-2 border-green-900'
                        >                            
                            Submit
                        </button>
                    </div>
                </form>
            </div>
    </div>
  )
}



export default IndividualProject