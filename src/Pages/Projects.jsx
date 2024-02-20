import { Link, Button } from "@nextui-org/react"
import { useState, useEffect } from "react"
import {Input} from "@nextui-org/react";
import axios from "axios";
import {Pagination} from "@nextui-org/react";

const Projects = () => {
const [search, setSearch] = useState('');
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);
const [filter, setFilter] = useState('');
const [page, setPage] = useState(0);
const [total, setTotal] = useState(0);
const [perPage, setPerPage] = useState(6);
const perPageOptions = [6, 20, 50, 100, 500];
const money = (amount) => {
  return Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
  }).format(amount);
}


useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axios.get('https://api.edostateocds.cloudware.ng/api/v1/releases/releases', {
        params: {
            search: search,
            filter: filter,
            page: page,
            limit: perPage,
        },
      });
      setData(res.data.releases);
      let resTotal = res.data.releases.total;
        setTotal(Math.ceil(resTotal/setPage));
    } catch (error) {
      console.log('Error Fetching data', error);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, [search, filter, page, perPage]);

useEffect(() => {
}, [data]); 

  return (
    <div className="py-32">
          <div className="bg-[url('./assets/project.png')] bg-cover bg-center bg-no-repeat py-20">
              <h1 className="text-gray-50 pl-16 text-3xl">All Projects</h1>
          </div>
        <div className="p-4 sm:max-w-6xl mx-auto">
          <div>
            <Input
                radius="lg"
                classNames={{
                  label: "text-black/50 dark:text-white/90",
                  input: [
                    "bg-transparent",
                    "text-black/90 dark:text-white/90",
                    "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                  ],
                  innerWrapper: "bg-transparent",
                  inputWrapper: [
                    "shadow-md",
                    "bg-default-200/50",
                    "dark:bg-default/60",
                    "backdrop-blur-xl",
                    "backdrop-saturate-200",
                    "hover:bg-default-200/70",
                    "dark:hover:bg-default/70",
                    "group-data-[focused=true]:bg-default-200/50",
                    "dark:group-data-[focused=true]:bg-default/60",
                    "!cursor-text",
                    "w-[340px] rounded-2xl flex justify-center items-center my-6 max-w-sm"
                  ],
                  
                }}
                placeholder="Search here ..."
                onChange={(e)=>setSearch(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:grid grid-cols-3 gap-4">
                {data.map((release) => (
                <div key={release.id} className="bg-gray-50 shadow-xl rounded-xl p-6">
                    <div className="font-bold">
                      {release.title}
                    </div>
                      <div className="py-4 italic">
                        {release.title}
                      </div>
                      <Link href={`/project/${release.id}`} passHref>
                          <Button as="a" variant="contained" className='bg-green-900 rounded-lg text-gray-50 my-4 font-semibold hover:bg-green-800'>
                              Check More
                          </Button>
                      </Link>
                    <div className="flex flex-row gap-4 py-4 font-semibold">
                      <div className="flex flex-col">
                        <label>Year</label> 
                        {release.year}
                      </div>
                      <div className="flex flex-col">
                        <label>Tender Amount</label> 
                        {money(release.tender_amount)}
                      </div>
                      <div className="flex flex-col">
                        <label>Award Value</label> 
                        {money(release.award_amount)}
                      </div>
                  </div>
                </div>
                ))}
            </div>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-7 items-center">
        <div className="col-start-4 col-span-3 py-4">
            <Pagination
                isCompact
                showControls
                total={total}
                initialPage={1}
                onChange={setPage}
                color='danger'
                className='text-white'
            />   
        </div>

        

            <div className="cols-end text-end">
            <select
                            id='perPage'
                            className='py-2 px-3 rounded-xl bg-gray-100 border'
                            value={perPage}
                            onChange={(e) => setPerPage(e.target.value)}
                        >
                            {
                                perPageOptions.map((option) => (
                                    <option
                                        key={option}
                                        value={option}
                                    >
                                        {option}
                                    </option>
                                ))
                            }
                        </select>
            </div>
      </div> 
    </div>
  )
}

export default Projects