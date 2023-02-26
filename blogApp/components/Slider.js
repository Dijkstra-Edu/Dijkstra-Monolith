import { useState, useEffect, useRef } from 'react';
import { StyleSheet, FlatList, View, Image, Dimensions, Text } from 'react-native';

const width = Dimensions.get('window').width - 20
let currentSlideIndex = 0;
let intervalId;

export default function Slider({ data, title }) {
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
            //pauseSlider();
        }
    };

    const pauseSlider = () => {
        clearInterval(intervalId);
    };

    useEffect(() => {
        if (dataToRender.length && flatlist.current) {
           // startSlider();
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

    const renderItemMethod = ({ item }) => {
        return (
            <View>
                <Image source={{ uri: item.thumbnail }} style={{ width, height: width / 1.7, borderRadius: 7 }} />
                <View style={{ width }}>
                    <Text numberOfLines={2} style={{ fontWeight: "700", color: "#383838", fontSize: 22, marginTop: 5 }}>{item.title}</Text>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 5 }}>
                <Text style={{ fontWeight: "700", color: "#383838", fontSize: 22 }}>{title}</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {data.map((item, index) => {
                        return (<View key={item.id} style={{ width: 12, height: 12, borderRadius: 6, borderWidth: 2, marginLeft: 4, backgroundColor: activeSlideIndex === index ? "#383838" : "transparent" }}></View>);
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
                renderItem={renderItemMethod}
            />
            {/* End of FlatList COmponent */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: "center",
        width,
        //paddingTop: 50,
    },
});
