import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, ScrollView, Modal } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { ListingType } from '@/types/listingTypes';
import { Feather, Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import Header from '@/components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import FullscreenVideoPlayer from '@/components/FullscreenVideoPlayer';
import { Video, ResizeMode } from 'expo-av';
import CollapsibleTheoryBlock from "@/components/CollapsibleTheoryBlock";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';
import { useTranslatedContent } from '@/hooks/useTranslatedContent';
import { WebView } from 'react-native-webview';

const { width, height } = Dimensions.get('window');
   
// Your existing imageMapping object here
const imageMapping: Record<string, any> = {
    "blanco.png": require("@/assets/images/blanco.png"),
    "punta-amarilla.png": require("@/assets/images/punta-amarilla.png"),
    "amarillo.png": require("@/assets/images/amarillo.png"),
    "punta-verde.png": require("@/assets/images/punta-verde.png"),
    "verde.png": require("@/assets/images/verde.png"),
    "punta-azul.png": require("@/assets/images/punta-azul.png"),
    "azul.png": require("@/assets/images/azul.png"),
    "punta-roja.png": require("@/assets/images/punta-roja.png"),
    "rojo.png": require("@/assets/images/rojo.png"),
    "punta-negra.png": require("@/assets/images/punta-negra.png"),
    "chariotFeet.png": require("@/assets/images/chariotFeet.png"),
    "default.png": require("@/assets/images/default.png"), // Fallback image
    "annun.png": require("@/assets/images/annun.png"),
    "annunFeet.png": require("@/assets/images/annunFeet.png"),
    "nuinjaFeet.png": require("@/assets/images/nuinjaFeet.png"),
    "nuinja.png": require("@/assets/images/nuinja.png"),
    "chariot.png": require("@/assets/images/chariot.png"),
    "chariotLat.png": require("@/assets/images/chariotLat.png"),    
    "narani.png": require("@/assets/images/narani.png"),    
    "naraniFeet.png": require("@/assets/images/naraniFeet.png"),    
    "gunnun.png": require("@/assets/images/gunnun.png"),    
    "gunnunFeet.png": require("@/assets/images/gunnunFeet.png"),  
    "sajuchiruji.png": require("@/assets/images/sajuchiruji.png"),
    "defensaBaja.png": require("@/assets/images/defensaBaja.png"),
    "defensaMedia.png": require("@/assets/images/defensaMedia.png"),
    "defensaBajaManoAbrierta.png": require("@/assets/images/defensaBajaManoAbrierta.png"),
    "apchagui.png": require("@/assets/images/apchagui.png"),
    "yopchagui.png": require("@/assets/images/yopchagui.png"),
    "1_chonji.png": require("@/assets/images/1_chonji.png"),
    "2_dangun.png": require("@/assets/images/2_dangun.png"),
    "3_dosan.png": require("@/assets/images/3_dosan.png"),
    "1erlogoitf.png": require("@/assets/images/1erlogoitf.png"),
    "4_wonhyo.png": require("@/assets/images/4_wonhyo.png"),
    "shinewavemovement.png": require("@/assets/images/shinewavemovement.png"),
    "5_yulguk.png": require("@/assets/images/5_yulguk.png"),
    "6_joonggun.png": require("@/assets/images/6_joonggun.png"),
    "7_toigye.png": require("@/assets/images/7_toigye.png"),
    "8_hwarang.png": require("@/assets/images/8_hwarang.png"),
    "9_choongmoo.png": require("@/assets/images/9_choongmoo.png"),
    "tkd.png": require("@/assets/images/tkd.png"),
    "courtesy.png": require("@/assets/images/courtesy.png"),
    "integrity.png": require("@/assets/images/integrity.png"),
    "perseverance.png": require("@/assets/images/perseverance.png"),
    "selfcontrol.png": require("@/assets/images/selfcontrol.png"),
    "indomitablespirit.png": require("@/assets/images/indomitablespirit.png"),
    "history.png": require("@/assets/images/history.png"),
    "combate.png": require("@/assets/images/combate.png"),
    "1erDAN.png": require("@/assets/images/1erDAN.png"),
    "2doDAN.png": require("@/assets/images/2doDAN.png"),
    "3erDAN.png": require("@/assets/images/3erDAN.png"),
    "4torDAN.png": require("@/assets/images/4toDAN.png"),
    "5toDAN.png": require("@/assets/images/5toDAN.png"),
    "6toDAN.png": require("@/assets/images/6toDAN.png"),
    "10_kwanggae.png": require("@/assets/images/10_kwanggae.png"),
    "ITF_Patterns_Poster_LowRes.png": require("@/assets/images/ITF_Patterns_Poster_LowRes.png"),
    "powerbrake2.png": require("@/assets/images/powerbrake2.png"),    
    "powerbrake.jpg": require("@/assets/images/powerbrake.jpg"),
    "video1.mp4": require("@/assets/videos/video1.mp4"),
    "tul.png": require("@/assets/images/tul.png"),
    "sparring.jpg": require("@/assets/images/sparring.jpg"),
    "carta.jpg": require("@/assets/images/carta.jpg"),
    "moral3.png": require("@/assets/images/moral3.png"),
    "culturamoral.png": require("@/assets/images/culturamoral.png"),

    
    "escucha1a.png": require("@/assets/images/escucha1a.png"),
    "escucha1b.png": require("@/assets/images/escucha1b.png"),
    "escucha2a.png": require("@/assets/images/escucha2a.png"),
    "escucha2b.png": require("@/assets/images/escucha2b.png"),
    "escucha3a.png": require("@/assets/images/escucha3a.png"),
    "escucha3b.png": require("@/assets/images/escucha3b.png"),
    "escucha4a.png": require("@/assets/images/escucha4a.png"),
    "escucha4b.png": require("@/assets/images/escucha4b.png"),
    "descendente1.png": require("@/assets/images/descendente1.png"),
    "descendente2.png": require("@/assets/images/descendente2.png"),
    "dollyo1.png": require("@/assets/images/dollyo1.png"),
    "dollyo2.png": require("@/assets/images/dollyo2.png"),
    "bandeyopchagui.png": require("@/assets/images/bandeyopchagui.png"),
    "dobledefcantodemano.png": require("@/assets/images/dobledefcantodemano.png"),
    "dobledefalta.png": require("@/assets/images/dobledefalta.png"),
    "defalta1.png": require("@/assets/images/defalta1.png"),
    "defalta2.png": require("@/assets/images/defalta2.png"),
    "defalta3.png": require("@/assets/images/defalta3.png"),
    "cantodemano1.png": require("@/assets/images/cantodemano1.png"),
    "cantodemano2.png": require("@/assets/images/cantodemano2.png"),
    "lineatecnica.png": require("@/assets/images/lineatecnica.png"), 
    "nuevologoitf.png": require("@/assets/images/nuevologoitf.png"), 
    "def1.png": require("@/assets/images/def1.png"), 
    "def2.png": require("@/assets/images/def2.png"), 
    "def3.png": require("@/assets/images/def3.png"), 
    "def4.png": require("@/assets/images/def4.png"), 
    "def5.png": require("@/assets/images/def5.png"), 
    "def6.png": require("@/assets/images/def6.png"), 
    "def7.png": require("@/assets/images/def7.png"), 
    "def8.png": require("@/assets/images/def8.png"), 
    "def9.png": require("@/assets/images/def9.png"), 
    "def10.png": require("@/assets/images/def10.png"), 
    "def11.png": require("@/assets/images/def11.png"), 
    "def12.png": require("@/assets/images/def12.png"), 
    "def13.png": require("@/assets/images/def13.png"), 
    "def14.png": require("@/assets/images/def14.png"), 
    "def15.png": require("@/assets/images/def15.png"), 
    "def16.png": require("@/assets/images/def16.png"), 
    "def17.png": require("@/assets/images/def17.png"), 
    "def18.png": require("@/assets/images/def18.png"), 
    "def19.png": require("@/assets/images/def19.png"), 
    "def20.png": require("@/assets/images/def20.png"), 
    "def21.png": require("@/assets/images/def21.png"), 
    "def22.png": require("@/assets/images/def22.png"), 
    "def23.png": require("@/assets/images/def23.png"), 
    "def24.png": require("@/assets/images/def24.png"), 
    "def25.png": require("@/assets/images/def25.png"), 
    "def26.png": require("@/assets/images/def26.png"), 
    "def27.png": require("@/assets/images/def27.png"), 
    "def28.png": require("@/assets/images/def28.png"), 
    "def29.png": require("@/assets/images/def29.png"), 
    "def30.png": require("@/assets/images/def30.png"), 
    "def31.png": require("@/assets/images/def31.png"), 
    "def32.png": require("@/assets/images/def32.png"), 
    "def33.png": require("@/assets/images/def33.png"), 
    "def34.png": require("@/assets/images/def34.png"),
    "def35.png": require("@/assets/images/def35.png"),
    "def36.png": require("@/assets/images/def36.png"),
    "def37.png": require("@/assets/images/def37.png"),
    "def38.png": require("@/assets/images/def38.png"),
    "def39.png": require("@/assets/images/def39.png"),
    "def40.png": require("@/assets/images/def40.png"),
    "def41.png": require("@/assets/images/def41.png"),
    "def42.png": require("@/assets/images/def42.png"),
    "def43.png": require("@/assets/images/def43.png"),
    "def44.png": require("@/assets/images/def44.png"),
    "def45.png": require("@/assets/images/def45.png"),
    "def46.png": require("@/assets/images/def46.png"),

     

    "golpe1.png": require("@/assets/images/golpe1.png"), 
    "golpe2.png": require("@/assets/images/golpe2.png"), 
    "golpe3.png": require("@/assets/images/golpe3.png"), 
    "golpe4.png": require("@/assets/images/golpe4.png"), 
    "golpe5.png": require("@/assets/images/golpe5.png"), 
    "golpe6.png": require("@/assets/images/golpe6.png"), 
    "golpe7.png": require("@/assets/images/golpe7.png"), 
    "golpe8.png": require("@/assets/images/golpe8.png"), 
    "golpe9.png": require("@/assets/images/golpe9.png"), 
    "golpe10.png": require("@/assets/images/golpe10.png"), 
    "golpe11.png": require("@/assets/images/golpe11.png"), 
    "golpe12.png": require("@/assets/images/golpe12.png"), 
    "golpe13.png": require("@/assets/images/golpe13.png"), 
    "golpe14.png": require("@/assets/images/golpe14.png"), 
    "golpe15.png": require("@/assets/images/golpe15.png"), 
    "golpe16.png": require("@/assets/images/golpe16.png"), 
    "golpe17.png": require("@/assets/images/golpe17.png"), 
    "golpe18.png": require("@/assets/images/golpe18.png"), 
    "golpe19.png": require("@/assets/images/golpe19.png"), 
    "golpe20.png": require("@/assets/images/golpe20.png"), 
    "golpe21.png": require("@/assets/images/golpe21.png"), 
    "golpe22.png": require("@/assets/images/golpe22.png"), 
    "golpe23.png": require("@/assets/images/golpe23.png"), 
    "golpe24.png": require("@/assets/images/golpe24.png"), 
    "golpe25.png": require("@/assets/images/golpe25.png"), 
    "golpe26.png": require("@/assets/images/golpe26.png"), 
    "golpe27.png": require("@/assets/images/golpe27.png"), 
    "golpe28.png": require("@/assets/images/golpe28.png"), 
    "golpe29.png": require("@/assets/images/golpe29.png"), 
    "golpe30.png": require("@/assets/images/golpe30.png"), 
    "golpe31.png": require("@/assets/images/golpe31.png"), 
    "golpe32.png": require("@/assets/images/golpe32.png"), 
    "golpe33.png": require("@/assets/images/golpe33.png"), 
    "golpe34.png": require("@/assets/images/golpe34.png"), 
    "golpe35.png": require("@/assets/images/golpe35.png"), 
    "golpe36.png": require("@/assets/images/golpe36.png"), 
    "golpe37.png": require("@/assets/images/golpe37.png"), 
    "golpe38.png": require("@/assets/images/golpe38.png"), 
    "golpe39.png": require("@/assets/images/golpe39.png"), 
    "golpe40.png": require("@/assets/images/golpe40.png"), 
    "golpe41.png": require("@/assets/images/golpe41.png"), 
    "golpe42.png": require("@/assets/images/golpe42.png"),
    "golpe43.png": require("@/assets/images/golpe43.png"),
    "golpe44.png": require("@/assets/images/golpe44.png"),
    "golpe45.png": require("@/assets/images/golpe45.png"),
    "golpe46.png": require("@/assets/images/golpe46.png"),
    "golpe47.png": require("@/assets/images/golpe47.png"),
    "golpe48.png": require("@/assets/images/golpe48.png"),
    "golpe49.png": require("@/assets/images/golpe49.png"),
    "golpe50.png": require("@/assets/images/golpe50.png"),
    "golpe51.png": require("@/assets/images/golpe51.png"),
    "golpe52.png": require("@/assets/images/golpe52.png"),
    "golpe53.png": require("@/assets/images/golpe53.png"),
    "golpe54.png": require("@/assets/images/golpe54.png"),
    "golpe55.png": require("@/assets/images/golpe55.png"),
    "golpe56.png": require("@/assets/images/golpe56.png"),
    "golpe57.png": require("@/assets/images/golpe57.png"),
    "golpe58.png": require("@/assets/images/golpe58.png"),

    "agarre1.png": require("@/assets/images/agarre1.png"), 
    "agarre2.png": require("@/assets/images/agarre2.png"), 

    "numeros.png": require("@/assets/images/numeros.png"), 
    "maosogui.png": require("@/assets/images/maosogui.png"), 
    "L50-50-1.png": require("@/assets/images/L50-50-1.png"), 
    "L50-50-2.png": require("@/assets/images/L50-50-2.png"), 
    "patada1.png": require("@/assets/images/patada1.png"), 
    "patada2.png": require("@/assets/images/patada2.png"), 

    "p1.png": require("@/assets/images/p1.png"), 
    "p2.png": require("@/assets/images/p2.png"), 
    "p3.png": require("@/assets/images/p3.png"), 
    "p4.png": require("@/assets/images/p4.png"), 
    "p5.png": require("@/assets/images/p5.png"), 
    "p6.png": require("@/assets/images/p6.png"), 
    "p7.png": require("@/assets/images/p7.png"), 
    "p8.png": require("@/assets/images/p8.png"), 
    "p9.png": require("@/assets/images/p9.png"), 
    "p10.png": require("@/assets/images/p10.png"), 
    "p11.png": require("@/assets/images/p11.png"), 
    "p12.png": require("@/assets/images/p12.png"), 
    "p13.png": require("@/assets/images/p13.png"), 

    "maosogic1.png": require("@/assets/images/maosogic1.png"), 
    "maosogic2.png": require("@/assets/images/maosogic2.png"), 
    
    "Lvert1.png": require("@/assets/images/Lvert1.png"), 
    "Lvert2.png": require("@/assets/images/Lvert2.png"), 
    "Lvert3.png": require("@/assets/images/Lvert3.png"), 
    
    "kiochasogi.png": require("@/assets/images/kiochasogi.png"), 
    "kiochasogi2.png": require("@/assets/images/kiochasogi2.png"), 
    "kiochasogi3.png": require("@/assets/images/kiochasogi3.png"), 
    "ordenes.png": require("@/assets/images/ordenes.png"), 
    "composiciontkd.png": require("@/assets/images/composiciontkd.png"), 
    "maosogi1.png": require("@/assets/images/maosogi1.png"), 
    "maosogi2.png": require("@/assets/images/maosogi2.png"), 
    "Lcorta1.png": require("@/assets/images/Lcorta1.png"), 
    "Lcorta2.png": require("@/assets/images/Lcorta2.png"), 
    "Lcorta3.png": require("@/assets/images/Lcorta3.png"), 

    
    
    // ... rest of your image mappings
};

const ListingDetails = () => {
    const { id } = useLocalSearchParams();
    const { t } = useTranslation();
    const { getItem } = useTranslatedContent();
    const listing = getItem(id as string);

    const [selectedMedia, setSelectedMedia] = useState<any>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [bookmark, setBookmark] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isVideo, setIsVideo] = useState<boolean>(false);
    const videoRef = useRef(null);
    const [status, setStatus] = useState({});
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [selectedVideoId, setSelectedVideoId] = useState<string>('');

    // Animation values
    const scale = useSharedValue(1);
    const savedScale = useSharedValue(1);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const savedTranslateX = useSharedValue(0);
    const savedTranslateY = useSharedValue(0);

    // Basic helper functions first
    const handleImagePress = (imageSource: any) => {
        scale.value = 1;
        setSelectedMedia(imageSource);
        setIsVideo(false);
        setIsModalVisible(true);
    };

    const handleMediaPress = (mediaSource: any, fileName: string) => {
        scale.value = 1;
        translateX.value = 0;
        translateY.value = 0;
        
        // Handle YouTube videos
        const isYouTube = fileName.startsWith('youtube:');
        if (isYouTube) {
            const youtubeId = fileName.split(':')[1];
            setSelectedVideoId(youtubeId);
            setSelectedMedia(null); // Set to null for YouTube videos
        } else {
            setSelectedMedia(mediaSource);
            setSelectedVideoId('');
        }
        
        setIsVideo(isYouTube || isVideoFile(fileName));
        setIsModalVisible(true);
    };

    const isVideoFile = (fileName: string) => {
        return fileName.toLowerCase().endsWith('.mp4') || 
               fileName.toLowerCase().endsWith('.mov') || 
               fileName.toLowerCase().endsWith('.avi');
    };

    // Rendering helper functions
    const renderTouchableImage = (imageSource: any, style: any) => {
        return (
            <TouchableOpacity onPress={() => handleImagePress(imageSource)}>
                <Image
                    source={imageSource}
                    style={style}
                />
            </TouchableOpacity>
        );
    };

    const createImageSource = (imagePath: string | undefined) => {
        if (!imagePath) return null;
        return imagePath.startsWith("http")
            ? { uri: imagePath }
            : imageMapping[imagePath];
    };

   const createNumberedImageSources = (num: number) => {
    const aKey = `imageth${num}a` as keyof typeof listing;
    const bKey = `imageth${num}b` as keyof typeof listing;
    const cKey = `imageth${num}c` as keyof typeof listing;
    
    return {
        a: listing?.[aKey] ? createImageSource(listing[aKey] as string) : null,
        b: listing?.[bKey] ? createImageSource(listing[bKey] as string) : null,
        c: listing?.[cKey] ? createImageSource(listing[cKey] as string) : null
    };
};

const imageSources = Array.from({ length: 40 }, (_, i) => createNumberedImageSources(i + 1));

   // Replace your renderTheoryBlock function with this fixed version:

const renderTheoryBlock = (index: number) => {
    const titleKey = `titletheory${index}` as keyof typeof listing;
    const theoryKey = `theory${index}` as keyof typeof listing;
    const videosKey = `videos${index}` as keyof typeof listing;
    const sources = imageSources[index - 1];

    // Add null check for sources
    if (!listing?.[titleKey] && !listing?.[theoryKey] && (!sources || (!sources.a && !sources.b && !sources.c))) {
        return null;
    }

    return (
        <View key={index} style={styles.blocks}>
            <CollapsibleTheoryBlock
                title={listing?.[titleKey] as string}
                theory={listing?.[theoryKey] as string}
            >
                {/* Render images if available - add null check for sources */}
                {sources && (sources.a || sources.b || sources.c) && (
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                    >
                        {sources.a && renderTouchableImage(sources.a, styles.imageSec)}
                        {sources.b && renderTouchableImage(sources.b, styles.imageSec)}
                        {sources.c && renderTouchableImage(sources.c, styles.imageSec)}
                    </ScrollView>
                )}
                
                {/* Render specific videos for this theory block if available */}
                {listing?.[videosKey] && Array.isArray(listing[videosKey]) && (
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                    >
                        {(listing[videosKey] as string[]).map((videoName, vidIndex) => {
                            const isYouTube = videoName.startsWith('youtube:');
                            const youtubeId = isYouTube ? videoName.split(':')[1] : '';
                            const videoSource = isYouTube ? null : imageMapping[videoName];
            
                            return (
                                <TouchableOpacity 
                                    key={vidIndex}
                                    onPress={() => handleMediaPress(videoSource, videoName)}
                                >
                                    <View style={styles.videoContainer}>
                                        {isYouTube ? (
                                            <Image
                                                source={{ uri: `https://img.youtube.com/vi/${youtubeId}/0.jpg` }}
                                                style={styles.videoThumbnail}
                                            />
                                        ) : (
                                            <Video
                                                source={videoSource}
                                                style={styles.videoThumbnail}
                                                resizeMode={ResizeMode.COVER}
                                                shouldPlay={false}
                                                isMuted={true}
                                                useNativeControls={false}
                                                isLooping={false}
                                            />
                                        )}
                                        <View style={styles.playButtonOverlay}>
                                            <Ionicons name="play-circle" size={30} color="white" />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                )}
            </CollapsibleTheoryBlock>
        </View>
    );
};

    const renderVideos = (listing: ListingType) => {
        if (!listing.videos || listing.videos.length === 0) return null;
        
        return (
            <View style={styles.blocks}>
                <Text style={styles.theorytitle}>{t('videos')}</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                >
                    {listing.videos.map((videoName, index) => {
                        const isYouTube = videoName.startsWith('youtube:');
                        const youtubeId = isYouTube ? videoName.split(':')[1] : '';
                        const videoSource = isYouTube ? null : imageMapping[videoName];
    
                        return (
                            <TouchableOpacity 
                                key={index}
                                onPress={() => handleMediaPress(videoSource, videoName)}
                            >
                                <View style={styles.videoContainer}>
                                    {isYouTube ? (
                                        <Image
                                            source={{ uri: `https://img.youtube.com/vi/${youtubeId}/0.jpg` }}
                                            style={styles.videoThumbnail}
                                        />
                                    ) : (
                                        <Video
                                            source={videoSource}
                                            style={styles.videoThumbnail}
                                            resizeMode={ResizeMode.COVER}
                                            shouldPlay={false}
                                            isMuted={true}
                                            useNativeControls={false}
                                            isLooping={false}
                                        />
                                    )}
                                    <View style={styles.playButtonOverlay}>
                                        <Ionicons name="play-circle" size={30} color="white" />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>
        );
    };

    // Bookmark functions
    const saveBookmark = async (itemId: string) => {
        try {
            let bookmarksStr = await AsyncStorage.getItem('bookmark');
            let bookmarks = [];
            
            if (bookmarksStr) {
                try {
                    bookmarks = JSON.parse(bookmarksStr);
                    if (!Array.isArray(bookmarks)) {
                        bookmarks = [];
                    }
                } catch (e) {
                    bookmarks = [];
                }
            }
    
            if (!bookmarks.includes(itemId)) {
                bookmarks.push(itemId);
                await AsyncStorage.setItem('bookmark', JSON.stringify(bookmarks));
                setBookmark(true);
                setAlertMessage(t('addedToFavorites'));
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 2000);
            }
        } catch (error) {
            console.error('Error in saveBookmark:', error);
            setAlertMessage(t('errorSavingFavorite'));
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 2000);
        }
    };

    const removeBookmark = async (itemId: string) => {
        try {
            const bookmarksStr = await AsyncStorage.getItem('bookmark');
            if (!bookmarksStr) return;
    
            let bookmarks = JSON.parse(bookmarksStr);
            if (!Array.isArray(bookmarks)) return;
    
            bookmarks = bookmarks.filter((id: string) => id !== itemId);
            await AsyncStorage.setItem('bookmark', JSON.stringify(bookmarks));
            setBookmark(false);
            setAlertMessage(t('removedFromFavorites'));
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 2000);
        } catch (error) {
            console.error('Error in removeBookmark:', error);
            setAlertMessage(t('errorRemovingFavorite'));
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 2000);
        }
    };

    // Effects
    useEffect(() => {
        const initializeBookmark = async () => {
            if (listing) {
                try {
                    setIsLoading(true);
                    let bookmarksStr = await AsyncStorage.getItem('bookmark');
                    
                    if (!bookmarksStr) {
                        bookmarksStr = '[]';
                        await AsyncStorage.setItem('bookmark', bookmarksStr);
                    }

                    const bookmarks = JSON.parse(bookmarksStr);
                    const isBookmarked = Array.isArray(bookmarks) && bookmarks.includes(listing.id);
                    setBookmark(isBookmarked);
                    setIsLoading(false);
                } catch (error) {
                    console.error('Error in bookmark initialization:', error);
                    setIsLoading(false);
                }
            }
        };

        initializeBookmark();
    }, [listing]);

    // Gesture handlers
    const pinchGesture = Gesture.Pinch()
        .onStart(() => {
            savedScale.value = scale.value;
        })
        .onUpdate((event) => {
            scale.value = savedScale.value * event.scale;
        })
        .onEnd(() => {
            if (scale.value < 1) {
                scale.value = withSpring(1);
                translateX.value = withSpring(0);
                translateY.value = withSpring(0);
            }
        });

    const panGesture = Gesture.Pan()
        .onStart(() => {
            savedTranslateX.value = translateX.value;
            savedTranslateY.value = translateY.value;
        })
        .onUpdate((event) => {
            translateX.value = savedTranslateX.value + event.translationX;
            translateY.value = savedTranslateY.value + event.translationY;
        })
        .onEnd(() => {
            if (scale.value < 1) {
                translateX.value = withSpring(0);
                translateY.value = withSpring(0);
            }
        });

    const composed = Gesture.Simultaneous(pinchGesture, panGesture);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value },
            { translateY: translateY.value },
            { scale: scale.value }
        ]
    }));

    if (!listing) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{t('listingNotFound')}</Text>
            </View>
        );
    }

    const imageSource = listing.image.startsWith("http")
        ? { uri: listing.image }
        : imageMapping[listing.image];

    return (
        <>
            <Stack.Screen 
                options={{
                    headerTransparent: true,
                    headerTitle: "",
                    headerShown: false,
                }}
            />
            <View style={styles.container}>
                <Header/>
                
                {/* Back Button */}
                <TouchableOpacity 
                    style={styles.backButton}
                    activeOpacity={0.6}
                    onPress={() => router.replace('/(tabs)')}
                >
                    <Ionicons 
                        name="arrow-back" 
                        size={24} 
                        color={Colors.primaryColor}
                    />
                </TouchableOpacity>
    
                {/* Bookmark Button */}
                <TouchableOpacity 
                    style={styles.bookmarkButton}
                    activeOpacity={0.6}
                    onPress={() => {
                        if (isLoading || !listing) return;
                        if (bookmark) {
                            removeBookmark(listing.id);
                        } else {
                            saveBookmark(listing.id);
                        }
                    }}
                >
                    <Ionicons 
                        name={bookmark ? "bookmark" : 'bookmark-outline'} 
                        size={24} 
                        color={isLoading ? Colors.lightGrey : Colors.primaryColor}
                    />
                </TouchableOpacity>
    
                {/* Custom Alert */}
                {showAlert && (
                    <Animated.View style={styles.alertContainer}>
                        <Ionicons 
                            name={alertMessage.includes(t('addedToFavorites')) ? 'bookmark' : 'bookmark-outline'} 
                            size={20} 
                            color="white" 
                        />
                        <Text style={styles.alertText}>{alertMessage}</Text>
                    </Animated.View>
                )}
    
                {/* Main Content */}
                <View style={{ flexDirection: 'row'}}>
                    <View style={{ flex:1}}>
                        {renderTouchableImage(imageSource, styles.image)}
                    </View>
                    <View style={{ flex:4}}>
                        <Text style={styles.title}>{listing.name}</Text>
                        <Text style={styles.description}>{listing.description}</Text>
                    </View>            
                </View>
                
                <ScrollView>
                    <Text style={styles.sectiontitle}>{listing.section1}</Text>
                    {Array.from({ length: 12 }, (_, i) => renderTheoryBlock(i + 1))}
    
                    <Text style={styles.sectiontitle}>{listing.section2}</Text>
                    {Array.from({ length: 9 }, (_, i) => renderTheoryBlock(i + 13))}
    
                    <Text style={styles.sectiontitle}>{listing.section3}</Text>
                    {Array.from({ length: 19 }, (_, i) => renderTheoryBlock(i + 22))}
                    
                    <Text style={styles.sectiontitle}>{listing.section4}</Text>
                    {Array.from({ length: 19 }, (_, i) => renderTheoryBlock(i + 41))}

                    <Text style={styles.sectiontitle}>{listing.section5}</Text>
                    {Array.from({ length: 19 }, (_, i) => renderTheoryBlock(i + 60))}

                    {/* Add main videos section if available */}
                    <View style={styles.videoBlock}>
                        {renderVideos(listing)}
                    </View>
                </ScrollView>
                
                <Modal
                    visible={isModalVisible}
                    transparent={true}
                    onRequestClose={() => {
                        scale.value = withSpring(1);
                        translateX.value = withSpring(0);
                        translateY.value = withSpring(0);
                        setIsModalVisible(false);
                    }}
                    animationType="fade"
                >
                    <GestureHandlerRootView style={{ flex: 1 }}>
                        <View style={styles.modalContainer}>
                            <TouchableOpacity 
                                style={styles.closeButton}
                                onPress={() => {
                                    scale.value = withSpring(1);
                                    translateX.value = withSpring(0);
                                    translateY.value = withSpring(0);
                                    setIsModalVisible(false);
                                }}
                            >
                                <Feather name="x" size={30} color="white" />
                            </TouchableOpacity>
                            
                            {isVideo ? (
                                selectedVideoId ? (
                                    <WebView
                                        style={{
                                            width: width * 0.9,
                                            height: height * 0.4,
                                        }}
                                        source={{
                                            uri: `https://www.youtube.com/embed/${selectedVideoId}?playsinline=1&autoplay=1`
                                        }}
                                        allowsFullscreenVideo={true}
                                    />
                                ) : (
                                    <FullscreenVideoPlayer
                                        source={selectedMedia}
                                        isVisible={isModalVisible}
                                        onClose={() => {
                                            setIsModalVisible(false);
                                        }}
                                    />
                                )
                            ) : (
                                <GestureDetector gesture={composed}>
                                    <Animated.View style={[styles.modalBackground]}>
                                        <Animated.Image
                                            source={selectedMedia}
                                            style={[styles.fullScreenImage, animatedStyle]}
                                            resizeMode="contain"
                                        />
                                    </Animated.View>
                                </GestureDetector>
                            )}
                        </View>
                    </GestureHandlerRootView>
                </Modal>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBackground: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullScreenImage: {
        width: width * 0.9,
        height: height * 0.7,
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        zIndex: 1,
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 20,
    },
    
    container: {
        flex: 1,
    },
    errorText: {
        fontSize: 18,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 10,
        marginBottom: 16,
        resizeMode: 'contain'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 2,
        paddingHorizontal: 10,
        textAlign: 'center'
    },
    description: {
        fontSize: 18,
        textAlign: 'justify',
        paddingHorizontal: 10,
    },
    theorytitle: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingHorizontal: 10,
    },
    theory: {
        paddingHorizontal: 10,
    },
    sectiontitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    imageSec: {
        width: 90,
        height: 90,
        borderRadius: 10,
        marginBottom: 16,
        marginHorizontal: 15,
        marginVertical: 10,
        alignSelf: 'center',
        resizeMode: 'contain',
    },
    blocks: {
        backgroundColor: Colors.white,
        marginBottom: 10,
        marginHorizontal: 10,
    },
   
    playButton: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -15 }, { translateY: -15 }],
    },
    videoContainer: {
        position: 'relative',
        marginHorizontal: 15,
        marginVertical: 10,
    },
    videoThumbnail: {
        width: 160,
        height: 90,
        borderRadius: 10,
        backgroundColor: '#000',
    },
    playButtonOverlay: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -15 }, { translateY: -15 }],
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 20,
    },
    fullScreenVideo: {
        width: width,
        height: height * 0.7,
        backgroundColor: 'black',
    },
    alertContainer: {
        position: 'absolute',
        top: 90,
        right: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 10,
        borderRadius: 8,
        zIndex: 9999,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      alertText: {
        color: 'white',
        marginLeft: 8,
        fontSize: 14,
        fontWeight: '500',
      },
      videoBlock: {
        backgroundColor: Colors.white,
        position: 'relative',
        borderRadius: 30,
        borderWidth: 2,
        borderColor: Colors.lightGrey,
        overflow: 'hidden',
        shadowColor: '#080606',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
      },
      backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 999,
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    bookmarkButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        zIndex: 999,
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});

export default ListingDetails;