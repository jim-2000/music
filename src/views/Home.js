import React,{useState, useRef,useEffect} from 'react'
import { SafeAreaView, StyleSheet, Image, View , Dimensions, TouchableOpacity, Text, FlatList, Animated} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Slider from '@react-native-community/slider';
import { 
    Capability,Event,
    RepeatMode,State,
    usePlaybackState,
    useProgress,
    useTrackPlayerEvents,
 } from 'react-native-track-player'
import songs from '../model/data'

//
const {width, height } = Dimensions.get('window')

const Home = () => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const songSlider = useRef(null);
const [songIndex, setSongIndex] = useState(0)
//
    useEffect(() => {
        scrollX.addListener(({value})=>{
            const index = Math.round(value / width);
            setSongIndex(index);
            // console.log('index', index);
        });
        return()=>{
            scrollX.removeAllListeners();
        }
    }, [])
//

const skipForward =()=>{
    songSlider.current.scrollToOffset({
        offset:(songIndex + 1 ) *width,
    })
}
//
const skipPrev =()=>{
    songSlider.current.scrollToOffset({
        offset:(songIndex - 1 ) *width,
    })
}

    //
    const renderSong=({id,item})=>{     
        return (
        <Animated.View style={{width:width,justifyContent:'center',alignItems:"center"}}>
            <View style={styles.artworWrapper}>
                <Image source={item.image} style={styles.artworkImg} />
            </View>
            {/* <View style={{marginTop:25}}>
                   <Text style={styles.title}>{item.title}</Text>
                   <Text style={styles.artist}>{item.artist}</Text>
                   <Text style={{fontSize:50,color:"white"}}>{id}</Text>
            </View> */}
           
        </Animated.View>
        )
    }


    //
    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.maincontainer}>
                <View
                style={{
                    width:width,
                }}
                >
                    <Animated.FlatList 
                    ref={songSlider}
                    data={songs}
                    renderItem={(id,item)=>renderSong(id,item)}
                    keyExtractor={(item)=>item.id}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [{nativeEvent:{
                            contentOffset:{x:scrollX}
                        }}],
                        {useNativeDriver:true}
                    )}
                    />
                </View>
            
               <View>
                   <Text style={styles.title}>{songs[songIndex].title}</Text>
                   <Text style={styles.artist}>{songs[songIndex].artist}</Text>
               </View>
               <View>
                   <Slider style={styles.progressContainer}
                   value={10}
                    minimumValue={0}
                    maximumValue={100}
                    thumbTintColor="#ffd369"
                    minimumTrackTintColor="#ffd369"
                    maximumTrackTintColor="#fff"
                    onSlidingComplete={()=>{}}               
                   />
                   <View style={styles.progresLabelContainer}>
                    <Text style={styles.progresslabelText}>0:00</Text>
                    <Text style={styles.progresslabelText}>3:50</Text>
                    </View>                
               </View>
               <View style={styles.musicControl}>
                    <TouchableOpacity
                    onPress={skipPrev}
                    >
                        <Ionicons
                                name="play-skip-back-outline"
                                size={35}
                                color="#ffd369"
                                style={{marginTop:25}}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={()=>{console.log("Clicked play");}}
                    >
                        <Ionicons
                                name="pause-circle"
                                size={75}
                                color="#ffd369"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={ skipForward }
                    >
                        <Ionicons
                                name="play-skip-forward-outline"
                                size={35}
                                color="#ffd369"
                                style={{marginTop:25}}

                        />
                    </TouchableOpacity>
               </View>
            </View>
            <View style={styles.bottomContainer}>
               <View style={styles.bottomControls}>
                <TouchableOpacity
                 onPress={()=>{console.log("Clicked repait");}}
                >
                <Ionicons
                        name="heart-outline"
                        size={30}
                        color="#777777"
                />
                </TouchableOpacity>
                <TouchableOpacity
                 onPress={()=>{console.log("Clicked repait");}}
                >
                <Ionicons
                        name="share-outline"
                        size={30}
                        color="#777777"
                />
                </TouchableOpacity>

                <TouchableOpacity
                onPress={()=>{console.log("Clicked repait");}}
                >
                <Ionicons
                        name="repeat"
                        size={30}
                        color="#777777"
                />
                </TouchableOpacity>
                <TouchableOpacity
                onPress={()=>{console.log("Clicked repait");}}
                >
                <Ionicons
                        name="ellipsis-horizontal"
                        size={30}
                        color="#777777"
                />
                </TouchableOpacity>
               </View>

            </View>
          
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#222831"

    },
    maincontainer:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",    

    },
    artworWrapper:{
        width:300,
        height:340,
        marginBottom:25,
        elevation:25,        
    },

    artworkImg:{
        width:"100%",
        height:"100%",
    },
    title:{
        color:"#eeeeee",
        fontSize:18,
        fontWeight:'600',        
        textAlign:"center",
    },
    artist:{
        color:"#eeeeee",
        fontSize:16,
        fontWeight:'200',        
        textAlign:"center",
    },
    progressContainer:{
        width:350,
        height:40,
        marginTop:25,
        flexDirection:"row"
    },
    progresLabelContainer:{
        width:340,
        flexDirection:"row",
        justifyContent:"space-between"

    },
    progresslabelText:{
        color:"#fff"
    },
    musicControl:{
        flexDirection:'row',
        width:"60%",
        justifyContent:"space-between",

    },
    bottomContainer:{
        borderColor:"#393e46",
        borderTopWidth:1,
        width:width,
        paddingVertical:15,
        alignItems:"center",
        
    },
    bottomControls:{flexDirection:"row", justifyContent:"space-between",width:"80%"},
   
})
