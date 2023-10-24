import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Contato from "../../models/Contato";

type ContatosState = {
  itens: Contato[];
};

const initialState: ContatosState = {
  itens: [
    {
      id: 1,
      name: "Carvalho",
      email: "Carvalho@gmail.com",
      tell: '51997053422',
    },
    {
      id: 2,
      name: "Rafaela",
      email: "Rafaela@gmail.com",
      tell: '51912705344',
    },
    {
      id: 3,
      name: "Luiza",
      email: "Luiza@gmail.com",
      tell: '51993215321',
    },
    {
      id: 4,
      name: "Guilherme",
      email: "Guilherme@gmail.com",
      tell: '51994573215',
    }
  ]
}

const contatosSlice = createSlice({
  name: "Contatos",
  initialState,
  reducers: {
    remover: (state: { itens: any[]; }, action: PayloadAction<number>) => {
        state.itens = state.itens.filter((contato) => contato.id !== action.payload)
    },
    editar: (state: { itens: any[]; }, action: PayloadAction<Contato>) => {
        const indexContato = state.itens.findIndex((contato) => contato.id === action.payload.id) 

        if(indexContato >= 0) {
            state.itens[indexContato] = action.payload
        }
    },
    cadastrar: (state: { itens: any[]; }, action: PayloadAction<Omit<Contato, 'id'>>) => {
      const contatoExistente = state.itens.find(contato => contato.name.toLowerCase() === action.payload.name.toLowerCase()) 

      if(contatoExistente) {
        alert('Já existe um contato com este nome na agenda :D')
      } else {
        const ultimoContato = state.itens[state.itens.length - 1]
        
        const novaTarefa = {
          ...action.payload,
          id: ultimoContato ? ultimoContato.id + 1 : 1
        }

        state.itens.push(novaTarefa)
      }
    }
  },
})

export const { remover, editar, cadastrar } = contatosSlice.actions

export default contatosSlice.reducer
