import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import LogoutComponent from './LogoutComponent'
import HeaderComponent from './HeaderComponent'
import ListTodosComponent from './ListTodosComponent'
import ErrorComponent from './ErrorComponent'
import WelcomeComponent from './WelcomeComponent'
import LoginComponent from './LoginComponent'
import TodoComponent from './TodoComponent'
import AuthProvider, { useAuth } from './security/AuthContext'

import './TodoApp.css'
import PokemonComponent from '../pokemon/PokemonComponent'
import PokemonDetailComponent from '../pokemon/PokemonDetailComponent'
import TrainerPokemonComponent from '../pokemon/TrainerPokemonComponent'
import TrainerPokemonDetailComponent from '../pokemon/TrainerPokemonDetailComponent'
import Battle from '../pokemon/Battle'

function AuthenticatedRoute({children}) {
    const authContext = useAuth()
    
    if(authContext.isAuthenticated)
        return children

    return <Navigate to="/" />
}

export default function TodoApp() {
    return (
        <div className="TodoApp">
            <AuthProvider>
                <BrowserRouter>
                    <HeaderComponent />
                    <Routes>
                        <Route path='/' element={ <LoginComponent /> } />
                        <Route path='/login' element={ <LoginComponent /> } />
                        
                        <Route path='/welcome/:username' element={
                            <AuthenticatedRoute>
                                <WelcomeComponent />
                            </AuthenticatedRoute> 
                        } />
                        
                        <Route path='/todos' element={
                            <AuthenticatedRoute>
                                <ListTodosComponent /> 
                            </AuthenticatedRoute>
                        } />

                        <Route path='/todo/:id' element={
                            <AuthenticatedRoute>
                                <TodoComponent /> 
                            </AuthenticatedRoute>
                        } />
  
                        <Route path='/pokemon' element={
                            <AuthenticatedRoute>
                                <PokemonComponent /> 
                            </AuthenticatedRoute>
                        } />

                        <Route path='/trainerpokemon' element={
                            <AuthenticatedRoute>
                                <TrainerPokemonComponent /> 
                            </AuthenticatedRoute>
                        } />

                        <Route path='/trainerpokemon/:id' element={
                            <AuthenticatedRoute>
                                <TrainerPokemonDetailComponent />
                            </AuthenticatedRoute>
                        } />

                        <Route path='/speciespokemon/:id' element={
                            <AuthenticatedRoute>
                                <PokemonDetailComponent />
                            </AuthenticatedRoute>
                        } />

                        <Route path='/battle' element={
                            <AuthenticatedRoute>
                                <Battle />
                            </AuthenticatedRoute>
                        } />

                        <Route path='/logout' element={
                            <AuthenticatedRoute>
                                <LogoutComponent /> 
                            </AuthenticatedRoute>
                        } />
                        
                        <Route path='*' element={<ErrorComponent /> } />

                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}
