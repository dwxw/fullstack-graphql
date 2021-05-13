import React, {useState} from 'react'
import { useQuery, useMutation, gql } from '@apollo/client'
import PetsList from '../components/PetsList'
import NewPetModal from '../components/NewPetModal'
import Loader from '../components/Loader'




export default function Pets() {
  
  const query = gql`
  query Pets {
    pets {
      id
      name
      img
    }
  }
  `

  const [modal, setModal] = useState(false)
  const { data, loading, error } = useQuery(query)
  
  console.log(data, loading, error)


  const onSubmit = input => {
    setModal(false)
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
