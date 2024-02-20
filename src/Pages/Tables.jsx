import { useEffect, useState } from "react"
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
import {Input} from "@nextui-org/react";
import {Select, SelectItem} from "@nextui-org/react";
import axios from "axios";
import {Pagination} from "@nextui-org/react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";


const Tables = () => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(0);
  const [mdas, setMda] = useState([]);
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const perPageOptions = [10, 20, 50, 100, 200];
  const money = (amount) => {
    return Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN'
    }).format(amount);
}

const date_time = (d = null) => {
  if (d == undefined){
      return null;
  }

  return (new Date(d)).toLocaleString();
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

  useEffect(() => {
    const fetchMda = async () => {
      try {
        const res = await axios.get('https://api.edostateocds.cloudware.ng/api/v1/stats/projects-mdas')
        setMda(res.data.mdas);
      } catch (error) {
        console.log("Error Fetching data", error);
      }
    };
    fetchMda();
  }, []);
 

  return (
    <div className="py-32">
      <div className="bg-[url('./assets/table.png')] bg-cover bg-center bg-no-repeat py-20">
          <h1 className="text-gray-50 pl-16 text-3xl">Tables</h1>
      </div>
      <div className="max-w-6xl mx-auto">
        <div className="px-6 sm:px-0">
            <Input
                label=""
                isClearable
                onClear={() => console.log("input cleared")}
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
                value={search}
                placeholder="Search here ..."
                onChange={e=>setSearch(e.target.value)}
              />
            </div>

            {/* <div>
              {users.filter((user) => user.firstName.toLowerCase().includes(search)).map(user => <li key={user.id}>{user.firstName}</li>)}
            </div> */}

            <div className="flex flex-col sm:flex sm:flex-row gap-4 my-4 px-6 sm:px-0">

            <Dropdown
                
                scrollShadowProps={{
        isEnabled: true
      }}
    >
              <DropdownTrigger>
                <Button 
                  variant="bordered" 
                  value={filter} 
                onChange={(e) => setFilter(e.target.value)}
                >
                  MDAS
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Dynamic Actions" 
                >
                {
                  mdas.map((mda) => (
                    <DropdownItem key={mda.id}>
                      {mda.name}
                    </DropdownItem>

                  ))
                }
              </DropdownMenu>
            </Dropdown>
              <Select 
                label="Categories" 
                className="max-w-xs w-[250px]"                
              >
                {data.map((release) => (
                        <SelectItem key={release.id}>
                        {release.category}  
                        </SelectItem>
                  ))}

              </Select>
              <Select
                label="MDAS"
                placeholder=""
                className="w-full"
                value={filter} 
                onChange={(e) => setFilter(e.target.value)}
              >
                
                 {mdas.map((mda) => (
                  <SelectItem key={mda.id} className="w-full">
                    {mda.name}
                  </SelectItem>
                  ))}
     
              </Select>

              <Select
                label="Years"
                placeholder=""
                className="max-w-xs w-[200px]"
              >

                  <SelectItem>
                 
                  </SelectItem>
     
              </Select>
              <Select
                label="Status"
                placeholder=""
                className="max-w-xs w-[150px]"
              >
                
                  <SelectItem>
                 
                  </SelectItem>
     
              </Select>
            </div>
          <div>
            <Table isStriped aria-label="tatic collection table">
            <TableHeader>
              <TableColumn>Project Title</TableColumn>
              <TableColumn>Status</TableColumn>
              <TableColumn>Budget Amount</TableColumn>
              <TableColumn>Tender Amount</TableColumn>
              <TableColumn>Contract Amount</TableColumn>
              <TableColumn>Category</TableColumn>
              <TableColumn>Award Date</TableColumn>
              <TableColumn>Year</TableColumn>
            </TableHeader>
            <TableBody>
              {data.map((release) => (
                  <TableRow key={release.id}>
                    <TableCell>{release.title}</TableCell>                 

                    <TableCell>
                    
                      {
                        release.status == 'in progress' && 
                          <span className="bg-gray-200 rounded-xl p-1 text-yellow-900 font-bold">
                            {release.status}
                          </span>
                      }
                      {
                        release.status == 'awarded' && 
                          <span className="bg-gray-200 rounded-xl p-2 text-sky-900 font-bold">
                            {release.status}
                          </span>
                      }
                      {
                        release.status == 'completed' && 
                          <span className="bg-gray-200 rounded-xl p-2 text-green-900 font-bold">
                            {release.status}
                          </span>
                      }
                      </TableCell>
                    <TableCell>{money(release.budget)}</TableCell>
                    <TableCell>{money(release.tender_amount)}</TableCell>
                    <TableCell>{money(release.contract_amount)}</TableCell>
                    <TableCell>{release.category}</TableCell>
                    <TableCell>{date_time(release.award_date)}</TableCell>
                    <TableCell>{release.year}</TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
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

export default Tables