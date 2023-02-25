import { FlatList, View, Text } from 'react-native';
import Seperator from './components/Seperator';
import Slider from './components/Slider';

const data = [
  {
    id: "1231",
    thumbnail: "https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg?size=626&ext=jpg",
    title: "Title 1",
    author: "Admin",
  },
  {
    id: "1232",
    thumbnail: "https://img.freepik.com/free-photo/pathway-middle-green-leafed-trees-with-sun-shining-through-branches_181624-4539.jpg?size=626&ext=jpg",
    title: "Title 2",
    author: "Admin",
  },
  {
    id: "1233",
    thumbnail: "https://img.freepik.com/free-photo/landscape-morning-fog-mountains-with-hot-air-balloons-sunrise_335224-794.jpg?size=626&ext=jpg",
    title: "Title 3",
    author: "Admin",
  },
  {
    id: "1234",
    thumbnail: "https://img.freepik.com/free-photo/pink-flowers-with-defocused-background_1259-30.jpg?size=626&ext=jpg",
    title: "Title 4",
    author: "Admin",
  },
  {
    id: "1235",
    thumbnail: "https://img.freepik.com/free-photo/confluence-indus-zanskar-rivers-leh-ladakh-india_1150-11112.jpg?size=626&ext=jpg",
    title: "Title 5",
    author: "Admin",
  },
]

const Carousel = () => {
  return (<View>
    <Slider data={data} title="Featured Posts" />
    <View style={{marginTop: 15}}>
      <Seperator width='100%' />
      <Text style={{ fontWeight: "700", color: "#383838", fontSize: 22, marginTop: 15 }}>Latest Posts</Text>
    </View>
  </View>)
}

export default function App() {
  return <FlatList
    data={data}
    ListHeaderComponent={Carousel} 
    contentContainerStyle={{ paddingHorizontal: 10 }}/>
  //
}

