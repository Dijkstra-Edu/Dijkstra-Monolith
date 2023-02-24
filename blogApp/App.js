import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useRef } from 'react';
import { StyleSheet, FlatList, View, Image, Dimensions, Text } from 'react-native';

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

const width = Dimensions.get('window').width - 20
let currentSlideIndex = 0;
let intervalId;

export default function App() {
  const [dataToRender, setDataToRender] = useState([]);
  const [visibleSlideIndex, setVisibleSlideIndex] = useState(0);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    currentSlideIndex = viewableItems[0]?.index || 0
    setVisibleSlideIndex(currentSlideIndex);
  });

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  });

  const flatlist = useRef();

  const startSlider = () => {
    if (currentSlideIndex <= dataToRender.length - 2) {
      intervalId = setInterval(() => {
        flatlist.current.scrollToIndex({ animated: true, index: currentSlideIndex + 1 });
      }, 4000);
    }
    else {
      pauseSlider();
    }
  };

  const pauseSlider = () => {
    clearInterval(intervalId);
  };

  useEffect(() => {
    if (dataToRender.length && flatlist.current) {
      startSlider();
    }
  }, [dataToRender.length]);

  useEffect(() => {
    const newData = [[...data].pop(), ...data, [...data].shift()] //Carousel Logic
    setDataToRender([...newData])
  }, [data.length])

  useEffect(() => {
    //Reset Slide to First
    if (visibleSlideIndex === dataToRender.length - 1 && dataToRender.length) {
      flatlist.current.scrollToIndex({ animated: false, index: 1 });
    }

    //Reset Slide to Last
    if (visibleSlideIndex === 0 && dataToRender.length) {
      flatlist.current.scrollToIndex({ animated: false, index: dataToRender.length - 2 });
    }

    const lastSlide = currentSlideIndex === dataToRender.length - 1
    const firstSlide = currentSlideIndex === 0

    if (lastSlide && dataToRender.length) setActiveSlideIndex(0);
    else if (firstSlide && dataToRender.length) setActiveSlideIndex(dataToRender.length - 2);
    else setActiveSlideIndex(currentSlideIndex - 1);

  }, [visibleSlideIndex])

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 5 }}>
        <Text style={{ fontWeight: "700", color: "#383838", fontSize: 22 }}>Featured Posts</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {data.map((item, index) => {
            return <View key={item.id} style={{ width: 12, height: 12, borderRadius: 6, borderWidth: 2, marginLeft: 4, backgroundColor: activeSlideIndex === index ? "#383838" : "transparent" }}></View>
          })}
        </View>

      </View>
      <FlatList
        data={dataToRender}
        ref={flatlist}
        horizontal
        pagingEnabled
        initialScrollIndex={1}
        showsHorizontalScrollIndicator={false}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index
        })}
        keyExtractor={(item, index) => item.id + index}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig.current}
        onScrollBeginDrag={pauseSlider}
        onScrollEndDrag={startSlider}
        renderItem={({ item }) => {
          return (
            <View>
              <Image source={{ uri: item.thumbnail }} style={{ width, height: width / 1.7, borderRadius: 7 }} />
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width,
    paddingTop: 50,
  },
});
