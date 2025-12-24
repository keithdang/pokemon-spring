import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../todo/security/AuthContext'
import { retrieveUserPokemonMoves, 
    retrieveUserPokemon,
    heal,
    updatePokemon
} from '../todo/api/PokemonApiService'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import BasePokemonInfo from './BasePokemonInfo'

export default function TrainerPokemonDetailComponent() {

    const { id } = useParams()
    const authContext = useAuth()
    const username = authContext.username

    const [moves, setMoves] = useState([])
    const [name, setName] = useState('')
    const [showForm, setShowForm] = useState(false)
    const [pokemon, setPokemon] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        retrieveUserPokemonMoves(username, id)
            .then(response => {
                setMoves(response.data)
                setLoading(false)
            })
            .catch(error => console.log(error))
        
        retrieveUserPokemon(username, id)
        .then(response => {
            setPokemon(response.data)
            setName(response.data.name)
            setLoading(false)
        })
        .catch(error => console.log(error))
    }, [id, username])
    function onSubmit(values) {
        const updatedPokemon = {
            ...pokemon,
            name: values.name
        }

        updatePokemon(username, pokemon.id, updatedPokemon)
            .then(response => {
                setPokemon(response.data)
                setName(response.data.name)
                setShowForm(false)
            })
            .catch(error => console.log(error))
    }
    function validate(values) {
        let errors = {
            // description: 'Enter a valid description',
        }

        if(values.name.length<5) {
            errors.name = 'Enter at least 5 characters'
        }

        return errors
    }
    if (loading) {
        return <div className="container">Loading...</div>
    }

    return (
        <div className="container">
            <h2>Info</h2>
            <BasePokemonInfo pokemon={pokemon} ifUser ={true}/>
            <h2>Moves</h2>

            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Power</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {moves.map(move => (
                        <tr key={move.id}>
                            <td>{move.name}</td>
                            <td>{move.damage}</td>
                            <td>{move.type}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <button
                    className="btn btn-info me-2"
                    onClick={() => {
                        heal(username, pokemon.id)
                            .then(response => {
                                setPokemon(response.data)
                            })
                            .catch(error => console.log(error))
                    }}
                >
                    Heal
                </button> 
                <button
                    className="btn btn-warning"
                    onClick={() => {setShowForm(true)}}
                >
                                Change Name</button> 
            </div>
            {showForm && 
                <Formik initialValues={ { name } } 
                    enableReinitialize = {true}
                    onSubmit = {onSubmit}
                    validate = {validate}
                    validateOnChange = {false}
                    validateOnBlur = {false}
                >
                {
                    (props) => (
                        <Form>
                            <ErrorMessage 
                                name="name"
                                component="div"
                                className = "alert alert-warning"
                            />
                            <fieldset className="form-group">
                                <label>Name</label>
                                <Field type="text" className="form-control" name="name" />
                            </fieldset>
                            <div>
                                <button className="btn btn-success m-5" type="submit">Save</button>
                            </div>
                        </Form>
                    )
                }
                </Formik>
            }
        </div>
    )
}
