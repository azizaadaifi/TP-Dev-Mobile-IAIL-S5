import { View, Text, StyleSheet, FlatList } from 'react-native';
type Evenement = {
  id: string;
  titre: string;
  categorie: string;
  capacite: number;
  inscrits: number;
};

const evenements: Evenement[] = [
  {
    id: 'E01',
    titre: 'Atelier React',
    categorie: 'Atelier',
    capacite: 25,
    inscrits: 25,
  },
  {
    id: 'E02',
    titre: 'Conférence IA',
    categorie: 'Conférence',
    capacite: 70,
    inscrits: 52,
  },
  {
    id: 'E03',
    titre: 'Sécurité mobile',
    categorie: 'Atelier',
    capacite: 20,
    inscrits: 17,
  },
  {
    id: 'E04',
    titre: 'Design UI',
    categorie: 'Atelier',
    capacite: 18,
    inscrits: 9,
  },
  {
    id: 'E05',
    titre: 'Forum projets',
    categorie: 'Rencontre',
    capacite: 50,
    inscrits: 49,
  },
  {
    id: 'E06',
    titre: 'Découverte Git',
    categorie: 'Atelier',
    capacite: 24,
    inscrits: 24,
  },
];
function placesRestantes(e: Evenement) {
  return Math.max(0, e.capacite - e.inscrits);
}
function statutEvenement(e: Evenement) {
  const places = placesRestantes(e);

  if (places === 0) {
    return 'Complet';
  } else if (places <= 3) {
    return 'Presque complet';
  } else {
    return 'Ouvert';
  }
}
const nombreTotal = evenements.length;

const nombreComplets = evenements.filter(
  (e) => placesRestantes(e) === 0
).length;

const nombreAvecPlaces = evenements.filter(
  (e) => placesRestantes(e) > 0
).length;

const totalPlaces = evenements.reduce(
  (total, e) => total + placesRestantes(e),
  0
);
const ateliersDisponibles = evenements.filter(
  (e) => e.categorie === 'Atelier' && placesRestantes(e) > 0
);
type BadgeProps = {
  statut: string;
};

function BadgeEtat({ statut }: BadgeProps) {
  let couleur = '#d1fae5';

  if (statut === 'Complet') {
    couleur = '#fecaca';
  } else if (statut === 'Presque complet') {
    couleur = '#fed7aa';
  }

  return (
    <View style={{
      backgroundColor: couleur,
      padding: 8,
      borderRadius: 10,
    }}>
      <Text>{statut}</Text>
    </View>
  );
}
type CarteProps = {
  evenement: Evenement;
};

function CarteEvenement({ evenement }: CarteProps) {
  return (
    <View style={{
      backgroundColor: 'white',
      padding: 15,
      marginBottom: 10,
      borderRadius: 10,
    }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
        {evenement.titre}
      </Text>

      <Text>
        Catégorie : {evenement.categorie}
      </Text>

      <Text>
        {placesRestantes(evenement)} places restantes
      </Text>

      <BadgeEtat statut={statutEvenement(evenement)} />
    </View>
  );
}
type StatistiqueProps = {
  libelle: string;
  nombre: number;
};

function BlocStatistique({ libelle, nombre }: StatistiqueProps) {
  return (
    <View style={{
      backgroundColor: 'white',
      padding: 15,
      margin: 5,
      borderRadius: 10,
    }}>
      <Text>{libelle}</Text>

      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
        {nombre}
      </Text>
    </View>
  );
}

function App() {
  const mode = 'Tous les événements';

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>
        CampusAgenda
      </Text>
      <Text style={styles.sousTitre}>
        Découvrez les événements de votre campus
      </Text>
      <View style={styles.statistiques}>
        <BlocStatistique
          libelle="Total événements"
          nombre={nombreTotal}
        />
        <BlocStatistique
          libelle="Événements complets"
          nombre={nombreComplets}
        />
        <BlocStatistique
          libelle="Avec des places"
          nombre={nombreAvecPlaces}
        />
        <BlocStatistique
          libelle="Places restantes"
          nombre={totalPlaces}
        />
      </View>
      
      <Text style={styles.titreMode}>
        Mode affiché : {mode}
      </Text>
<FlatList
  data={evenementsAffiches}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <CarteEvenement evenement={item} />
  )}
  ListEmptyComponent={
    <Text style={styles.messageVide}>
      Aucun événement à afficher.
    </Text>
  }
/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 15,
  },

  titre: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 5,
  },

  sousTitre: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },

  statistiques: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 15,
  },

  titreMode: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  messageVide: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    marginTop: 20,
  },
});
export default App;
const mode = 'tous';
const evenementsAffiches = mode === 'tous'
  ? evenements
  : evenements.filter(
      (e) => e.categorie === 'Atelier' && placesRestantes(e) > 0
    );
    