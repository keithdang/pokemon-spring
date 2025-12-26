import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik'

import { useAuth } from '../todo/security/AuthContext'
import {
  retrieveUserPokemonMoves,
  retrieveUserPokemon,
  heal,
  updatePokemon,
} from '../todo/api/PokemonApiService'

import BasePokemonInfo from './BasePokemonInfo'
import MovesComponent from './MovesComponent'

import { BasePokemon, Move, RouteParams, NameFormValues } from './types'

export default function TrainerPokemonDetailComponent() {
  const { id } = useParams<RouteParams>()
  const { username } = useAuth()

  const [moves, setMoves] = useState<Move[]>([])
  const [pokemon, setPokemon] = useState<BasePokemon | null>(null)
  const [name, setName] = useState<string>('')
  const [showForm, setShowForm] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!username || !id) return
    const pokemonId = Number(id)

    setLoading(true)

    retrieveUserPokemonMoves(username, pokemonId)
      .then((response) => {
        console.log("retrieveUserPokemonMoves")
        console.log(response.data)
        setMoves(response.data)
      })
      .catch(console.error)

    retrieveUserPokemon(username, pokemonId)
      .then((response) => {
        setPokemon(response.data)
        setName(response.data.name)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [id, username])

  /* ---------- Form Submit ---------- */
  function onSubmit(
    values: NameFormValues,
    { setSubmitting }: FormikHelpers<NameFormValues>
  ) {
    if (!pokemon || !username) return

    const updatedPokemon = {
      ...pokemon,
      name: values.name,
    }

    updatePokemon(username, pokemon.id, updatedPokemon)
      .then((response) => {
        setPokemon(response.data)
        setName(response.data.name)
        setShowForm(false)
      })
      .catch(console.error)
      .finally(() => setSubmitting(false))
  }

  /* ---------- Form Validation ---------- */
  function validate(values: NameFormValues) {
    const errors: Partial<NameFormValues> = {}

    if (!values.name || values.name.length < 5) {
      errors.name = 'Enter at least 5 characters'
    }

    return errors
  }

  if (loading || !pokemon) {
    return <div className="container">Loading...</div>
  }

  return (
    <div className="container">
      <h2>Info</h2>

      <BasePokemonInfo pokemon={pokemon} />

      <h2>Moves</h2>
      <MovesComponent moves={moves} />

      <div className="mt-3">
        <button
          className="btn btn-info me-2"
          onClick={() => {
            if (!username) return

            heal(username, pokemon.id)
              .then((response) => setPokemon(response.data))
              .catch(console.error)
          }}
        >
          Heal
        </button>

        <button
          className="btn btn-warning"
          onClick={() => setShowForm(true)}
        >
          Change Name
        </button>
      </div>

      {showForm && (
        <Formik<NameFormValues>
          initialValues={{ name }}
          enableReinitialize
          onSubmit={onSubmit}
          validate={validate}
          validateOnChange={false}
          validateOnBlur={false}
        >
          <Form>
            <ErrorMessage
              name="name"
              component="div"
              className="alert alert-warning"
            />

            <fieldset className="form-group">
              <label>Name</label>
              <Field
                type="text"
                className="form-control"
                name="name"
              />
            </fieldset>

            <button className="btn btn-success m-5" type="submit">
              Save
            </button>
          </Form>
        </Formik>
      )}
    </div>
  )
}