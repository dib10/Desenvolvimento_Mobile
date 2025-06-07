import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import { getPokemons, getPokemonDetails } from '../services/api';
import { Pokemon } from '../types/Pokemon';
import { PokemonCard } from '../components/PokemonCard';

const POKEMON_PAGE_LIMIT = 20;

export const PokedexScreen = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [offset, setOffset] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError('');
      const list = await getPokemons(POKEMON_PAGE_LIMIT, 0);
      const details = await Promise.all(list.map(p => getPokemonDetails(p.url)));
      setPokemons(details);
      setOffset(POKEMON_PAGE_LIMIT); 
    } catch (err) {
      setError('Falha ao carregar Pokémons. Verifique sua conexão.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadMorePokemons = async () => {
    if (isLoadingMore || search.length > 0) return; //  não carrega mais se estiver buscando
    try {
      setIsLoadingMore(true);
      const list = await getPokemons(POKEMON_PAGE_LIMIT, offset);
      const details = await Promise.all(list.map(p => getPokemonDetails(p.url)));
      setPokemons(prevPokemons => [...prevPokemons, ...details]);
      setOffset(prevOffset => prevOffset + POKEMON_PAGE_LIMIT);
    } catch (err) {
      console.error("Failed to load more pokemons", err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filtered = pokemons.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando Pokémons...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokédex</Text>
      <TextInput
        placeholder="Buscar pokémon..."
        style={styles.input}
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        ListEmptyComponent={() => (
          <View style={styles.centered}>
            <Text>
              {search 
                ? `Nenhum Pokémon encontrado para "${search}"`
                : 'Nenhum Pokémon para exibir no momento.'
              }
            </Text>
          </View>
        )}
        onEndReached={loadMorePokemons}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => isLoadingMore && <ActivityIndicator style={{ marginVertical: 20 }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 16 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 12 },
  input: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
});