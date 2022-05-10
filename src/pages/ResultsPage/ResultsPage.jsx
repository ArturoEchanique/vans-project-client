import { Container, Modal, Button, Card } from 'react-bootstrap'
import { useContext, useEffect, useState } from "react"
import vanService from './../../services/van.service'
import { AuthContext } from '../../context/auth.context'
import VanCard from '../../components/VanCard/VanCard'

const ResultsPage = () => {

    const [fetched, setFetched] = useState(false)
    const [Vans, setVans] = useState([])
    const [searchInput, setSearchInput] = useState("");

    // const openModal = () => setShowModal(true)
    // const closeModal = () => setShowModal(false)

    useEffect(() => loadVans(), 
    [])

    const loadVans = () => {
        vanService
            .getVans()
            .then(({ data }) => {
                setFetched(true)
                setVans(data)
            })
            .then(err => console.log(err))
    }

    const loadVansWithQuery = (query) => {
        vanService
            .getVansWithQuery(query)
            .then(({ data }) => {
                setVans(data)
            })
            .then(err => console.log(err))
    }

    const handleSearch = e => {
        if
            (e.target.value === "") {
            loadVans()
        }
        else {
            setSearchInput(e.target.value)
            loadVansWithQuery(searchInput)
        }


    }

    const handleSubmit = e => {
        e.preventDefault()
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Search
                    <input type="text" value={searchInput} name="name" onChange={handleSearch} />
                </label>
            </form>
            {Vans.map(van => {
                return (
                    <VanCard vanDetails={van}/>
                )
            })}
            
        </>
    )
}

export default ResultsPage