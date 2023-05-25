import { useState } from 'react'
import { Text, View, TextInput, TouchableOpacity, FlatList, ScrollView, Alert } from 'react-native'

import { Participant } from '../../components/Participant';
import { styles } from './styles'

export function Home() {
  const [participants, setParticipants] = useState<string[]>([])
  const [participantName, setParticipantName] = useState('')

  function handleParticipantAdd() {
    if(participants.includes(participantName)){
      return Alert.alert('Participante Existe', 'Já existe um participante na lista com esse nome.')
    }

    setParticipants(prevState =>  [...prevState, participantName])
    setParticipantName('')
  }

  function handleParticipantRemove(name: string) {
    Alert.alert('Remover', `Remover o participante ${name}?`, [
      {
        text: 'Sim',
        onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name)),
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ])
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Primeiro App IMHERE</Text>
      <Text style={styles.eventDate}>Quinta, 25 de maio de 2023.</Text>

      <View style={styles.form}>
        <TextInput
          value={participantName}
          onChangeText={setParticipantName}
          placeholder='Nome do participante'
          placeholderTextColor={'#6b6b6b'}
          style={styles.input}
        />
        <TouchableOpacity
          onPress={handleParticipantAdd}
          style={styles.button}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Participant
            name={item}
            onRemove={handleParticipantRemove}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguem chegou no evento ainda? Adicione participantes a sua lista de presença.
          </Text>
        )}
      />

      {/* <ScrollView>
        {participants.map((participant, index) => (
          <Participant
            key={`${participant}#${index}`}
            name={participant}
            onRemove={handleParticipantRemove}
          />
        ))}
      </ScrollView> */}
    </View>
  )
}