import { useState, useEffect } from 'react';
import { FlatList, View, Text } from 'react-native';
import PostListItems from './components/PostListItems';
import Seperator from './components/Seperator';
import Slider from './components/Slider';
import { getFeaturedPost, getLatestPosts } from './API/post'
import Constants from 'expo-constants';
// import { Icon } from 'react-native-vector-icons/FontAwesome';// <Icon name="rocket" size={30} color="#900" />


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

const limit = 5;
let pageNo = 0;

export default function App() {

  const [featuerdPosts, setFeaturedPosts] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [reachedToEnd, setReachedToEnd] = useState(false);
  const [busy, setBusy] = useState(false);

  const fetchFeaturedPost = async () => {
    const { error, posts } = await getFeaturedPost();
    if (error) return console.log(error);

    //console.log(posts);
    setFeaturedPosts(posts);
  }

  const fetchLatestPost = async () => {
    const { error, posts } = await getLatestPosts(limit, pageNo);
    if (error) return console.log(error);

    //console.log(posts);
    setLatestPosts(posts);
  }

  const fetchMorePosts = async () => {
    if (reachedToEnd || busy) return;
    pageNo += 1;
    setBusy(true);
    const { error, posts, postCount } = await getLatestPosts(limit, pageNo);
    setBusy(false);
    if (error) return console.log(error);

    if (postCount === latestPosts.length) return setReachedToEnd(true);

    //console.log(posts);
    setLatestPosts([...latestPosts, ...posts]);
  }

  useEffect(() => {
    fetchFeaturedPost();
    fetchLatestPost();
  }, [])

  const Carousel = () => {
    return (<View style={{ paddingTop: Constants.statusBarHeight }}>
      {featuerdPosts.length ? <Slider data={featuerdPosts} title="Featured Posts" /> : null}
      <View style={{ marginTop: 15 }}>
        <Seperator width='100%' />
        <Text style={{ fontWeight: "700", color: "#383838", fontSize: 22, marginTop: 15 }}>Latest Posts</Text>
      </View>
    </View>)
  }

  const renderItem = ({ item }) => {
    return (
      <View style={{ marginTop: 15 }}>
        <PostListItems post={item} />
      </View>
    )
  }

  const itemSeparatorComponent = () => <Seperator width='90%' style={{ marginTop: 15 }} />

  return <FlatList
    data={latestPosts}
    keyExtractor={(item) => item.id}
    contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}
    ListHeaderComponent={Carousel}
    ItemSeparatorComponent={itemSeparatorComponent}
    renderItem={renderItem}
    onEndReached={async () => await fetchMorePosts()}
    onEndReachedThreshold={0}
    ListFooterComponent={() => {
      return reachedToEnd ? (
        <View>
          <Text style={{
            fontWeight: "bold",
            color: "#383838",
            textAlign: "center",
            paddingVertical: 15,
          }}>

            You Reached the End!
          </Text>
          {/* <Icon name="rocket" size={30} color="#900" /> */}
        </View>
      ) : null;
    }}
  />
  //
}

