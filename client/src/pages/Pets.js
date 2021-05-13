import React, {useState} from 'react'
import { useQuery, useMutation, gql } from '@apollo/client'
import PetsList from '../components/PetsList'
import NewPetModal from '../components/NewPetModal'
import Loader from '../components/Loader'




export default function Pets() {
  
  const ALL_PETS = gql`
  query AllPets {
    pets {
      id
      name
      type
      img
    }
  }
  `

  const CREATE_PET = gql`
  mutation CreateAPet($newPet: NewPetInput!) {
    addPet(input: $newPet) {
  	  id
      name
      type 
      img
	  } 
  }
  `

  const [modal, setModal] = useState(false)
  const { data, loading, error } = useQuery(ALL_PETS)
  const [createPet, newPet] = useMutation(CREATE_PET, {
    update(cache, { data: { addPet } }) {
      const { pets } = cache.readQuery({ query: ALL_PETS })
      cache.writeQuery({
        query: ALL_PETS,
        data: { pets: [addPet, ...pets]}
      })
    }
  })
    
  
  const onSubmit = input => {
    console.log(input)
    setModal(false)
    createPet({
      variables: {
        "newPet": input
      }
    })
  }
  
  if (loading || newPet.loading) {
    return <Loader />
  }

  if (error || newPet.error) {
    console.error(error)
    return <p>Error!</p>
  }
  
  if (modal) {
    return <NewPetModal onSubmit={onSubmit} onCancel={() => setModal(false)} />
  }

  return data ? (
    <div className="page pets-page">
      <section>
        <div className="row betwee-xs middle-xs">
          <div className="col-xs-10">
            <h1>Pets</h1>
          </div>

          <div className="col-xs-2">
            <button onClick={() => setModal(true)}>new pet</button>
          </div>
        </div>
      </section>
      <section>
        <PetsList pets={data.pets}/>
      </section>
    </div>
  ) : null
}
