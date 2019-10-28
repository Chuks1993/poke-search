import React, { Component } from 'react';
import axios from "axios";
import { MainLayout } from 'modules/layouts';
import LandingPageLayout from './Layout';
import { PokemonCard, Pokemon } from 'modules/types';

const API = 'https://pokeapi.co/api/v2/pokemon/';
// const offSet = Math.floor(Math.random() * (200 - 1)) + 1;


interface LandingPageProps {}

interface LandingPageState {
  pokemons: PokemonCard[],
  pokemonDetails?: Pokemon
}

class LandingPage extends Component<LandingPageProps, LandingPageState> {
  constructor(props: LandingPageProps) {
    super(props);
    this.state = {
      pokemons: [],
      pokemonDetails: undefined
    };
    this.getPokemonDetails = this.getPokemonDetails.bind(this);
    this.searchPokemons = this.searchPokemons.bind(this);
  }

  // componentDidMount() {
  //   this.getPokemons();
  // }

  // async getPokemons() {
  //   const res = await axios.get(`${API}?limit=50&offset=${offSet}`);
  //   const pokemons = res.data.results;
  //   this.setState({ pokemons });
  // }

  async searchPokemons(pokemon: string) {
    const res = await axios.get(`${API}${pokemon}`);
    const searchedPokemon = res.data;
    this.setState({ pokemons: [searchedPokemon, ...this.state.pokemons] });
    console.log(searchedPokemon)
  }

  async getPokemonDetails(name: string) {
    const res = await axios.get(`${API}${name}`);
    const data = res.data;
    this.setState({
      pokemonDetails: {
        id: data.id,
        name: data.name,
        type: data.types[0].type.name,
        moves: data.moves,
        sprite: data.sprites.front_default
      }
    });
  }

  render() {
    return (
      <MainLayout>
        <LandingPageLayout
          pokemons={this.state.pokemons}
          // offSet={offSet}
          getPokemonDetails={this.getPokemonDetails}
          searchPokemons={this.searchPokemons}
          pokemonDetails={this.state.pokemonDetails}
        />
      </MainLayout>
    );
  }
}


export default LandingPage;