import React, {useState, useEffect} from "react"
import CustomerPopup from "./CustomerPopup"
import CustomerTable from "./CustomerTable"
import RentalTable from "./RentalTable"

export default function Customers() {
    const [customerslist, setCustomerslist] = useState([])
    
    const [customerid, setCustomerid] = useState(0)
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")

    const [pagenum, setPagenum] = useState(1)
    const [totalpages, setTotalpages] = useState(1)

    const [selectedcustomer, setSelectedcustomer] = useState([])
    const [customerpopup, setCustomerpopup] = useState(false)
    const [rentalslist, setRentalslist] = useState([])

    const [submittedfilter, setSubmittedfilter] = useState({
        customerid: 0,
        firstname: "",
        lastname: ""
    })
    
    const retrieveCustomers = (page = 1, filters = submittedfilter) => {
        const { customerid, firstname, lastname } = filters

        fetch(`/customers/all?customer_id=${customerid}&first_name=${firstname}&last_name=${lastname}&page=${page}`)
        .then(res => res.json())
        .then(customerslist => {
            setCustomerslist(customerslist.customers)
            setTotalpages(customerslist.total_pages)
            setPagenum(customerslist.page_num)
        })
    }

    useEffect(() => {
                retrieveCustomers(pagenum)
    },[pagenum])

    const handleFilterClick = (event) => {
        event.preventDefault();

        const newFilters = {
            customerid, firstname, lastname
        }

        setPagenum(1);
        setSubmittedfilter(newFilters)
        retrieveCustomers(1, newFilters)
    }

    const handleCustomerClick =  async (customer_id) => {
        const returned_customer = await fetch(`/customers/${customer_id}`)
        const customer_info = await returned_customer.json()

        const returned_rentals = await fetch(`/customers/${customer_id}/rental_info`)
        const rentals_info = await returned_rentals.json()

        setSelectedcustomer(customer_info)
        setCustomerpopup(true)
        setRentalslist(rentals_info)
    }

    return (
        <div className="customersPage">
            <div className="filter">
                <div>
                    <h2>Filter Options</h2>
                </div>
                <div className='filter-input'>
                    <form onSubmit={handleFilterClick}>
                        <label>Customer ID:</label>
                        <input
                            type='number'
                            min={0}
                            value={customerid}
                            onChange={event => setCustomerid(event.target.value)}
                        />
                        <label htmlFor='firstname'>First Name:{""}</label>
                        <input 
                            type='text'
                            value={firstname}
                            onChange={event => setFirstname(event.target.value)}
                        />
                        <label htmlFor='lastname'>Last Name:{""}</label>
                        <input 
                            type='text'
                            value={lastname}
                            onChange={event => setLastname(event.target.value)}
                        />
                        <button className='filter-btn'>Submit</button>
                        <p><strong>Note:</strong> Submitting on blank fields and ID as 0 will reset the customer list</p>
                    </form> 
                </div>
            </div>
            <div className='divider'></div>
            <div className="table-section">
                <div>
                    <CustomerTable 
                        data={customerslist}
                        onViewDetails={handleCustomerClick}
                    />
                </div>
                <div className='pagination'>
                    <p>Page {pagenum} of {totalpages}</p>
                    <button className="prev-button"
                        onClick={() => setPagenum(prev => (prev === 1 ? 1 : prev-1))}
                        disabled={pagenum <= 1}
                    >
                        Prev
                    </button>
                    <button className="next-button"
                        onClick={() => setPagenum(next => (next === totalpages ? totalpages : next+1))}
                        disabled={pagenum >= totalpages}
                    >
                        Next
                    </button>
                </div>
            </div>
            <CustomerPopup trigger={customerpopup} setTrigger={setCustomerpopup}>
                {selectedcustomer.length === 0 ? (
                    <p>No customer found for this customer ID.</p>
                ) : (
                    <div className='CustomerDetails'>
                        <p><strong>Customer ID:</strong> {selectedcustomer[0].customer_id} - {selectedcustomer[0].first_name} {selectedcustomer[0].last_name}</p>
                        <p><strong>Email:</strong> {selectedcustomer[0].email}<br /><br />
                        <strong>Address:</strong> {selectedcustomer[0].address}, {selectedcustomer[0].district}, {selectedcustomer[0].city}, {selectedcustomer[0].country}<br /></p>
                        <div>
                            <RentalTable
                                data={rentalslist}
                            />
                        </div>
                    </div>
                )}
            </CustomerPopup>
        </div>
    )
}